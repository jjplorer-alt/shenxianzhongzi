const http = require('http');
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PORT = 3366;

const SONG_CONFIG = {
  hash: '237ee75c26c648997c04884eb3e48fab',
  album_audio_id: '260162617',
  album_id: '38003511',
  audio_id: '74322155',
  name: '太上北斗真经',
  artist: '孟圆辉',
  album: '太上玄灵北斗本命延生真经',
  cover: 'http://imge.kugou.com/stdmusic/150/20210818/20210818103926769314.jpg',
  duration: 5530,
};

function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', ...options.headers };
    mod.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function getSongUrl(hash, albumAudioId) {
  const key = crypto.createHash('md5').update(hash + 'kgcloudv2').digest('hex');
  const url = `https://trackercdnbj.kugou.com/i/v2/?cmd=25&pid=1&behavior=play&hash=${hash}&album_audio_id=${albumAudioId}&key=${key}`;
  const data = JSON.parse(await fetch(url));
  if (data.status === 1 && data.url?.length) {
    return { url: data.url[0], bitRate: data.bitRate, duration: data.timeLength, extName: data.extName };
  }
  throw new Error('Failed to get song URL');
}

async function getLyrics(hash) {
  const searchUrl = `https://krcs.kugou.com/search?ver=1&man=yes&client=mobi&keyword=&duration=&hash=${hash}&album_audio_id=`;
  const searchData = JSON.parse(await fetch(searchUrl));
  if (!searchData.candidates?.length) throw new Error('No lyrics found');

  const { id, accesskey } = searchData.candidates[0];
  const lyricUrl = `https://krcs.kugou.com/download?ver=1&client=pc&id=${id}&accesskey=${accesskey}&fmt=lrc&charset=utf8`;
  const lyricData = JSON.parse(await fetch(lyricUrl));
  if (lyricData.content) {
    return Buffer.from(lyricData.content, 'base64').toString('utf8');
  }
  throw new Error('Failed to decode lyrics');
}

async function searchSongs(keywords) {
  const kw = encodeURIComponent(keywords);
  const url = `http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=${kw}&page=1&pagesize=20&showtype=1`;
  const data = JSON.parse(await fetch(url));
  if (data.status === 1 && data.data?.info?.length) {
    return data.data.info.map((s) => ({
      hash: s.hash,
      name: s.songname,
      artist: s.singername,
      album: s.album_name,
      album_id: s.album_id,
      album_audio_id: s.album_audio_id,
      audio_id: s.audio_id,
      duration: s.duration,
      cover: s.trans_param?.union_cover?.replace('{size}', '150') || '',
    }));
  }
  return [];
}

const MIME = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg' };

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    try {
      if (pathname === '/api/config') {
        res.end(JSON.stringify({ status: 1, data: SONG_CONFIG }));
        return;
      }
      if (pathname === '/api/song-url') {
        const hash = url.searchParams.get('hash') || SONG_CONFIG.hash;
        const aid = url.searchParams.get('album_audio_id') || SONG_CONFIG.album_audio_id;
        const data = await getSongUrl(hash, aid);
        res.end(JSON.stringify({ status: 1, data }));
        return;
      }
      if (pathname === '/api/lyrics') {
        const hash = url.searchParams.get('hash') || SONG_CONFIG.hash;
        const lrc = await getLyrics(hash);
        res.end(JSON.stringify({ status: 1, data: lrc }));
        return;
      }
      if (pathname === '/api/search') {
        const kw = url.searchParams.get('keywords') || '';
        const songs = await searchSongs(kw);
        res.end(JSON.stringify({ status: 1, data: songs }));
        return;
      }
      res.writeHead(404);
      res.end(JSON.stringify({ status: 0, error: 'Not found' }));
    } catch (e) {
      res.writeHead(500);
      res.end(JSON.stringify({ status: 0, error: e.message }));
    }
    return;
  }

  // Proxy audio stream to avoid CORS
  if (pathname === '/api/audio-proxy') {
    try {
      const hash = url.searchParams.get('hash') || SONG_CONFIG.hash;
      const aid = url.searchParams.get('album_audio_id') || SONG_CONFIG.album_audio_id;
      const { url: audioUrl } = await getSongUrl(hash, aid);
      const rangeHeader = req.headers.range;

      const audioReqOptions = { headers: { 'User-Agent': 'Mozilla/5.0' } };
      if (rangeHeader) audioReqOptions.headers['Range'] = rangeHeader;

      http.get(audioUrl, audioReqOptions, (audioRes) => {
        res.writeHead(audioRes.statusCode, {
          'Content-Type': 'audio/mpeg',
          'Content-Length': audioRes.headers['content-length'],
          'Content-Range': audioRes.headers['content-range'] || '',
          'Accept-Ranges': 'bytes',
        });
        audioRes.pipe(res);
      }).on('error', () => {
        res.writeHead(502);
        res.end('Audio proxy error');
      });
    } catch (e) {
      res.writeHead(500);
      res.end(e.message);
    }
    return;
  }

  // Static files
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(__dirname, filePath);
  const ext = path.extname(filePath);

  try {
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain; charset=utf-8' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`\n  🎵 北斗真经播放器已启动`);
  console.log(`  📍 http://localhost:${PORT}\n`);
});
