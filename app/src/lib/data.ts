export const SCRIPTURE_INTRO = `《北斗经》，全称《太上玄灵北斗本命延生真经》。经中称：北斗七星君乃造化之枢机、人神之主宰，有回生注死之功、消灾度厄之力，凡人性命由本命星官主掌。清净身心、诚意诵经，自可消除罪业，福寿臻身，远离诸祸。

《北斗经》乃昔日太上老君悲悯众生，传于张天师，宣说妙经以普度众生、脱离苦难。此经是入道必须习诵的功课。

另外，更为方便易行的是持诵七字圣号"大圣北斗七元君"，诚心持念即有不可思议功德，经云："念此大圣北斗七元真君名号，当得罪业消除，灾衰洗荡，福寿资命，善果臻身。"

在此附上一份简体带拼音的PDF，可下载打印诵读，末尾有整理者署名。`;

export interface Commentator {
  name: string;
  links: { label: string; url: string }[];
}

export const COMMENTATORS: Commentator[] = [
  {
    name: "徐道龄",
    links: [
      { label: "道人家", url: "https://www.daorenjia.com/daozang11-555" },
      { label: "识典古籍", url: "https://www.shidianguji.com/book/DZ0750" },
    ],
  },
  {
    name: "玄元真人",
    links: [
      { label: "道人家", url: "https://www.daorenjia.com/daozang11-556" },
      { label: "识典古籍", url: "https://www.shidianguji.com/book/DZ0751" },
    ],
  },
  {
    name: "傅洞真",
    links: [
      { label: "道人家", url: "https://www.daorenjia.com/daozang11-554" },
      { label: "识典古籍", url: "https://www.shidianguji.com/book/DZ0752" },
    ],
  },
];

/* ─────────────────────────────────────────────────
 * Resources — grouped by type with nested structure
 * ───────────────────────────────────────────────── */

export interface AudioVideoItem {
  title: string;
  platform: string;
  url: string;
}

export const AUDIO_VIDEO: AudioVideoItem[] = [
  {
    title: "孟圆辉道长《北斗经》",
    platform: "酷狗音乐",
    url: "https://m.kugou.com/share/song.html?chain=2jNA5fcFZV2",
  },
  {
    title: "孟圆辉道长《北斗经》",
    platform: "B站视频",
    url: "https://www.bilibili.com/video/BV1tL411G7JR/",
  },
];

export interface ArticleGroup {
  source: string;
  articles: { title: string; date: string; url: string }[];
}

export const ARTICLE_GROUPS: ArticleGroup[] = [
  {
    source: "北京白云观",
    articles: [
      {
        title: "什么是《北斗经》？",
        date: "2026.01",
        url: "https://mp.weixin.qq.com/s/jcYlu--4mj1sxBQiEQeWVw",
      },
      {
        title: "如何依法修持《北斗经》",
        date: "2025.11",
        url: "https://mp.weixin.qq.com/s/OQ8JBbzotxPqf7dsoTQ9Tw",
      },
      {
        title: "【北斗降日】朝真礼斗，赐福消灾",
        date: "2023.10",
        url: "https://mp.weixin.qq.com/s/NCQ_iICNFyrUKBgCUuSb4g",
      },
      {
        title: "在家居士可以诵读哪些经书",
        date: "2025.10",
        url: "https://mp.weixin.qq.com/s/5kz9OhcUU7UQfwkyRVVffw",
      },
      {
        title: "持诵圣号的功德和利益",
        date: "2025.04",
        url: "https://mp.weixin.qq.com/s/ApoMPpG_tW0QB3HpM1AW4g",
      },
    ],
  },
  {
    source: "上清崇宁靖室",
    articles: [
      {
        title: "【经籍道典】诵北斗经诀",
        date: "2022.03",
        url: "https://mp.weixin.qq.com/s/6BfRHe7GW8uE02Dst6o16g",
      },
      {
        title: "【杂谈】初学答疑（一）",
        date: "2023.11",
        url: "https://mp.weixin.qq.com/s/QIlz70tNslL6Ujp3A9lnuQ",
      },
      {
        title: "【杂谈】关于\u201C在家修道\u201D的进一步讨论",
        date: "2023.04",
        url: "https://mp.weixin.qq.com/s/9iSlAnf8a_CvUiz2s9d7uQ",
      },
      {
        title: "【杂谈】崇宁靖室诵读指南",
        date: "2023.09",
        url: "https://mp.weixin.qq.com/s/qhocgf0kUHx8JameRcpqiA",
      },
    ],
  },
];

export interface WebsiteLink {
  name: string;
  url: string;
  desc?: string;
  children?: { name: string; url: string; desc?: string }[];
}

export const WEBSITES: WebsiteLink[] = [
  { name: "识典古籍", url: "https://www.shidianguji.com", desc: "北京大学与字节跳动合作开发的古籍数字化开放平台，免费提供古籍在线阅读、全文检索与注解查询" },
  { name: "中國哲學書電子化計劃", url: "https://ctext.org", desc: "全球最大的先秦典籍在线数据库，收录逾三万部典籍、超五十亿字，提供开放获取的中国古典文献全文检索" },
  { name: "中华典藏", url: "https://www.zhonghuadiancang.com", desc: "旨在推广国学知识，吸取国学精华，传承中华文化" },
  { name: "道人家", url: "https://www.daorenjia.com", desc: "中华道藏在线阅读与下载，根据《中华道藏》DJVU版逐篇人工校对，收书1500多种、约6000余万字" },
  {
    name: "白雲深處人家",
    url: "https://www.homeinmists.com",
    desc: "中華傳統道文化數字圖書館，创建于2005年，纯属个人公益网站，所有资料免费共享供学习研究之用",
    children: [
      { name: "道教網站大薈萃", url: "https://www.homeinmists.com", desc: "道教相关网站导航" },
      { name: "道教辞典", url: "https://www.homeinmists.com", desc: "道教术语与概念查询" },
      { name: "道家文化推薦閱讀書目", url: "https://www.homeinmists.com", desc: "入门到进阶的推荐书单" },
    ],
  },
  { name: "道教文化中心资料库", url: "https://zh.daoinfo.org", desc: "蓬瀛仙馆营运的道教百科全书网站，收录五千余篇条目，涵盖道教历史、人物、信仰、经典、宫观、修持等" },
  { name: "中国道教协会", url: "https://www.taoist.org.cn", desc: "成立于1957年的全国道教徒联合爱国宗教团体和教务组织，弘扬道教教义、传扬道教文化" },
  { name: "国家宗教事务局", url: "https://www.sara.gov.cn", desc: "国家宗教事务管理部门官方门户，提供宗教政策法规、动态信息与宗教基础信息公共查询服务" },
];

/* ─────────────────────────────────────────────────
 * Static content
 * ───────────────────────────────────────────────── */

export const ABOUT_ORIGIN = `我是源逸，一个道教居士、初学者。

学道之人，当学经书。当今网络发达、学习资源无数，看似便利，但就我亲身体验，各种资源散落于公众号、B站、微信群、独立网站、音乐软件、网盘……或不便寻找、或不便传递、或错字、或攀缘附会、或不便展示长篇内容、或容易被删。

省流就是：不好找、不好用。

于是我想做一个资源聚合索引网站。我不会编程，所幸人工智能技术日新月异，尝试了多种AI生成工具、经历了许多失败后，最后我用Cursor开发环境+Claude模型完成了这个网站。本站先从《北斗经》开始，集合经文原文、名家注解、音频、视频、优质公众号文章等，慢慢扩充。

本站运用 PWA 技术，可将网站添加到桌面，如原生应用般便捷。`;

export const ABOUT_THANKS = `感谢我的师父、老师，带领我入门、教我知识。
感谢一路上认识的朋友，给我诸多帮助和鼓励。
感谢本站引用的所有内容的创作者。`;

export const ABOUT_DISCLAIMER = `本站内容仅供学习研究使用，经典原文来源于公开出版物，其他内容版权归原著作权人所有。`;
