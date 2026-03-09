/* ─────────────────────────────────────────────────
 * Home page — 功能导航
 * 中文集中放 data.ts，避免改 layout 时乱码
 * ───────────────────────────────────────────────── */

export interface NavCard {
  title: string;
  desc: string;
  href: string;
  iconKey: "intro" | "resources" | "about";
}

export const NAV_CARDS: NavCard[] = [
  { title: "道经入门", desc: "入门典籍及注解、常见问题", href: "/intro", iconKey: "intro" },
  { title: "资源索引", desc: "诵经修持、基础知识综合资料", href: "/resources", iconKey: "resources" },
  { title: "关于本站", desc: "缘起、致谢、声明、联系方式", href: "/about", iconKey: "about" },
];

/* ─────────────────────────────────────────────────
 * 道经入门 — 玄门四品经、祖师语录、道门经典
 * 各条链接至外部原文，供入门学习
 * ───────────────────────────────────────────────── */

export interface IntroItem {
  title: string;
  url: string;
  desc?: string;
}

export interface IntroGroup {
  groupTitle: string;
  groupDesc?: string;
  items: IntroItem[];
}

export const DAOJING_INTRO_GROUPS: IntroGroup[] = [
  {
    groupTitle: "玄门四品经",
    groupDesc: "道教徒日常念诵的四部经《早课》、《晚课》、《三官》、《北斗》，是信众修学之根基。初学者、感兴趣者可在酷狗音乐、QQ音乐搜索孟圆辉道长，感受经韵唱诵的玄妙，他是当今道教音乐的代表人物。",
    items: [
      {
        title: "早坛功课经",
        url: "/intro/zaotan",
        desc: "信徒早课时念诵，含八大神咒、《太上老君说常清静经》等诸品真经与宝诰。",
      },
      {
        title: "晚坛功课经",
        url: "/intro/wantan",
        desc: "信徒晚课时念诵，主要有《太上洞玄灵宝救苦妙经》等。",
      },
      {
        title: "三官经",
        url: "/intro/sanguan",
        desc: "全称《太上三元赐福赦罪解厄消灾延生保命妙经》，天官赐福、地官赦罪、水官解厄。",
      },
      {
        title: "北斗经",
        url: "/intro/beidou",
        desc: "全称《太上玄灵北斗本命延生真经》，北斗七星为造化枢机，有消灾度厄、回生注死之功。本站提供原文、经注及拼音版。",
      },
    ],
  },
  {
    groupTitle: "祖师语录",
    groupDesc: "历代祖师高道的开示、规诫与问答，为修行立身、持戒守规之根本。",
    items: [
      { title: "重阳立教十五论", url: "https://zh.daoinfo.org/index.php?title=%E9%87%8D%E9%99%BD%E7%AB%8B%E6%95%99%E5%8D%81%E4%BA%94%E8%AB%96&variant=zh-hans", desc: "全真祖师王重阳阐述修炼立教的十五条基本原则。" },
      { title: "邱祖垂训文", url: "https://www.sjzyes.com/lhsdj/9905.html", desc: "长春真人丘处机留给后世道士的垂诫与训示。" },
      { title: "道门十规", url: "https://www.daorenjia.com/daozang27-1411", desc: "明代张宇初天师所定，规范道士修行与丛林生活的十条准则。" },
      { title: "崆峒问答", url: "http://www.tangnet.cn/novel/87.html", desc: "五十四代天师张继宗所述正一道入门问答集录，共三百余问。" },
    ],
  },
  {
    groupTitle: "道门经典",
    groupDesc: "道教根本典籍与广为流传的劝善经典，为学道者必读。",
    items: [
      { title: "道德真经", url: "https://www.daorenjia.com/daozang15-649", desc: "太上老君所述，道家哲学之根源，在全球广为流传。" },
      { title: "太上感应篇", url: "https://zh.wikisource.org/zh-hans/%E5%A4%AA%E4%B8%8A%E6%84%9F%E6%87%89%E7%AF%87", desc: "道教劝善经典，阐述善恶感应、因果报应，为民间流传极广的修身宝典。" },
      { title: "朝真发愿忏悔文", url: "http://www.baxiangong.cn/index.php?a=show&c=index&catid=36&id=2695&m=content", desc: "用于诚心忏悔、改过迁善的发愿与忏悔文。" },
      { title: "老君五戒", url: "/intro/wujie", desc: "太上老君传授的基本戒律，杀、盗、淫、妄、酒五戒，为出家在家共守。" },
    ],
  },
];

/* ─────────────────────────────────────────────────
 * 道经入门 — 常见问题 Q&A（引用信息源带超链接）
 * ───────────────────────────────────────────────── */

export type QAContentPart = { t: string } | { l: string; href: string };

export interface IntroQA {
  q: string;
  a: QAContentPart[];
}

export const DAOJING_QA: IntroQA[] = [
  /* ── 入门与资格 ── */
  {
    q: "初学道经，应该从哪部开始？在家居士可以念哪些？",
    a: [
      { t: "建议从玄门四品经入手：" },
      { l: "早坛功课经", href: "/intro/zaotan" },
      { t: "、" },
      { l: "晚坛功课经", href: "/intro/wantan" },
      { t: "、" },
      { l: "三官经", href: "/intro/sanguan" },
      { t: "、" },
      { l: "北斗经", href: "/intro/beidou" },
      { t: "。本站「道经入门」提供这四部的经文原文、经文注解、诵经音频链接。祖师语录、" },
      { l: "重阳立教十五论", href: "https://zh.daoinfo.org/index.php?title=%E9%87%8D%E9%99%BD%E7%AB%8B%E6%95%99%E5%8D%81%E4%BA%94%E8%AB%96&variant=zh-hans" },
      { t: "、" },
      { l: "邱祖垂训文", href: "https://www.sjzyes.com/lhsdj/9905.html" },
      { t: "等、道门经典（道德真经、太上感应篇）亦有原文链接可拓展阅读。北京白云观" },
      { l: "《在家居士可以诵读哪些经书》", href: "https://mp.weixin.qq.com/s/5kz9OhcUU7UQfwkyRVVffw" },
      { t: "可在" },
      { l: "资源索引", href: "/resources" },
      { t: "中查阅。" },
    ],
  },
  {
    q: "不是道教信徒可以阅读道经吗？",
    a: [{ t: "可以，不限信仰。只需保持恭敬心、清净身心即可。" }],
  },
  {
    q: "有没有道经不能读、不允许阅读？",
    a: [
      { t: "部分传统说法中，确有「某经需师传」「某时不宜诵」等讲究。但本页面所涉玄门四品经、" },
      { l: "道德真经", href: "https://www.daorenjia.com/daozang15-649" },
      { t: "、" },
      { l: "太上感应篇", href: "https://zh.wikisource.org/zh-hans/%E5%A4%AA%E4%B8%8A%E6%84%9F%E6%87%89%E7%AF%87" },
      { t: "等，均为广为流传的入门经典，经中曰「凡有男女」可诵，一般人均可恭敬诵读。若有特殊顾虑（如特定传承要求），可咨询当地宫观或道长得明确解答。" },
    ],
  },
  /* ── 诵经方法与习惯 ── */
  {
    q: "诵经需要什么准备？有什么注意事项？",
    a: [
      { t: "理想状态：净手、净口、衣着整洁，选安静处所，可焚一柱香（家中无香炉可用清水或心香代替）。诵前可默念净心、净口、净身神咒；持诵时心念专一、字句清晰。正式科仪有跪拜礼节，日常自修端坐恭诵即可，心诚为本。出声念诵有助于专注，条件不便亦可默念。本站" },
      { l: "早坛", href: "/intro/zaotan/audio" },
      { t: "、" },
      { l: "晚坛", href: "/intro/wantan/audio" },
      { t: "、" },
      { l: "三官", href: "/intro/sanguan/audio" },
      { t: "、" },
      { l: "北斗", href: "/intro/beidou/audio" },
      { t: "均有诵经音频可跟随学习。上清崇宁靖室" },
      { l: "《崇宁靖室诵读指南》", href: "https://mp.weixin.qq.com/s/qhocgf0kUHx8JameRcpqiA" },
      { t: "可在" },
      { l: "资源索引", href: "/resources" },
      { t: "中查阅。" },
    ],
  },
  {
    q: "诵读道经有哪些方法？",
    a: [
      { t: "按是否出声分：音诵（出声念诵）与默诵（合口无声或微声自闻）。音诵利于专注与熟悉经韵腔调，为宫观早晚课传统；默诵适合不便出声场合，贵在心诚。按是否看经本分：看诵（对照经文诵读，初学常用）与讽诵（背诵而诵，道士上殿多用）。道教还有神诵、心诵、气诵之说，分别以发于上、中、下丹田之气诵念，属进阶炼养。初学者选用能坚持的方式即可，诵是口诵心会，持是落于行动，诵持结合方为完整。龙虎法脉" },
      { l: "《诵经的好处、方法、仪轨》", href: "https://www.sjzyes.com/lhsdj/28.html" },
      { t: "可拓展阅读。" },
    ],
  },
  {
    q: "每天应该诵几遍？什么时间诵读最好？",
    a: [
      { t: "初学每日一遍即可，贵在坚持；熟悉后可增至三遍或七遍。传统建议清晨（卯时）或晚间（亥时），但能坚持的固定时间就是最好的时间。北斗经等全文诵读约 15—20 分钟。" },
    ],
  },
  /* ── 学习与进阶 ── */
  {
    q: "经文读不懂怎么办？",
    a: [
      { t: "本站各经均有「经文注解」栏目。早晚功课经可参阅" },
      { l: "闵智亭《玄门日诵早晚功课经注》", href: "https://baike.baidu.com/item/%E7%8E%84%E9%97%A8%E6%97%A5%E8%AF%B5%E6%97%A9%E6%99%9A%E5%8A%9F%E8%AF%BE%E7%B6%93%E6%B3%A8/9163136" },
      { t: "；北斗经有徐道龄、玄元真人、傅洞真三家注解，可在" },
      { l: "道人家", href: "https://www.daorenjia.com/daozang11-555" },
      { t: "、" },
      { l: "识典古籍", href: "https://www.shidianguji.com/book/DZ0750" },
      { t: "查阅。学经当解经意，先通大意再精读。" },
      { l: "资源索引", href: "/resources" },
      { t: "中上海道教学院王院长的" },
      { l: "「道门经典研修导论」", href: "https://www.bilibili.com/video/BV1BN411x7yj/" },
      { t: "等视频也有帮助。" },
    ],
  },
];

/* ───────────────────────────────────────────────── */

export const SCRIPTURE_INTRO = `《北斗经》，全称《太上玄灵北斗本命延生真经》。经中称：北斗七星君乃造化之枢机、人神之主宰，有回生注死之功、消灾度厄之力，凡人性命由本命星官主掌。清净身心、诚意诵经，自可消除罪业，福寿臻身，远离诸祸。

《北斗经》乃昔日太上老君悲悯众生，传于张天师，宣说妙经以普度众生、脱离苦难。此经是入道必须习诵的功课。

另外，更为方便易行的是持诵七字圣号"大圣北斗七元君"，诚心持念即有不可思议功德，经云："念此大圣北斗七元真君名号，当得罪业消除，灾衰洗荡，福寿资命，善果臻身。"

在此附上一份简体拼音版 PDF，可下载打印诵读，末尾有整理者署名。`;

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

export interface AudioVideoGroup {
  groupTitle: string;
  items: AudioVideoItem[];
}

/* ─────────────────────────────────────────────────
 * 早坛功课经 · 晚坛功课经 · 三官经 — 玄门四品经模块数据
 * ───────────────────────────────────────────────── */

export const ZAOTAN_INTRO = `《早坛功课经》为信徒早课时必诵的经文集合，全真、正一两派皆有传承。常与晚坛功课经合刊为一本，统称早晚功课经。

早坛含八大神咒、《太上老君说常清静经》等诸品真经与宝诰。`;

export const WANTAN_INTRO = `《晚坛功课经》为信徒晚课时必诵的经文集合，全真、正一两派皆有传承。常与早坛功课经合刊为一本，统称早晚功课经。

晚坛含步虚、吊挂、《太上洞玄灵宝救苦妙经》等。`;

export const ZAOTAN_SCRIPTURE_LINKS: { label: string; url: string }[] = [
  { label: "道教文化中心", url: "https://zh.daoinfo.org/index.php?title=%E6%97%A9%E6%99%9A%E5%8A%9F%E8%AA%B2&variant=zh-hans" },
  { label: "识典古籍", url: "https://www.shidianguji.com/search?q=%E6%97%A9%E6%99%9A%E5%8A%9F%E8%AA%B2%E7%B6%93" },
];

export const WANTAN_SCRIPTURE_LINKS: { label: string; url: string }[] = [
  { label: "道教文化中心", url: "https://zh.daoinfo.org/index.php?title=%E6%97%A9%E6%99%9A%E5%8A%9F%E8%AA%B2&variant=zh-hans" },
  { label: "识典古籍", url: "https://www.shidianguji.com/search?q=%E6%97%A9%E6%99%9A%E5%8A%9F%E8%AA%B2%E7%B6%93" },
];

export const ZAOTAN_COMMENTARY: Commentator[] = [
  {
    name: "闵智亭《玄门日诵早晚功课经注》",
    links: [
      { label: "百度百科", url: "https://baike.baidu.com/item/%E7%8E%84%E9%97%A8%E6%97%A5%E8%AF%B5%E6%97%A9%E6%99%9A%E5%8A%9F%E8%AF%BE%E7%B6%93%E6%B3%A8/9163136" },
    ],
  },
];

export const WANTAN_COMMENTARY: Commentator[] = [
  {
    name: "闵智亭《玄门日诵早晚功课经注》",
    links: [
      { label: "百度百科", url: "https://baike.baidu.com/item/%E7%8E%84%E9%97%A8%E6%97%A5%E8%AF%B5%E6%97%A9%E6%99%9A%E5%8A%9F%E8%AF%BE%E7%B6%93%E6%B3%A8/9163136" },
    ],
  },
];

export const ZAOTAN_AUDIO: AudioVideoItem[] = [
  { title: "早坛功课经（孟圆辉）", platform: "酷狗音乐", url: "https://m.kugou.com/share/song.html?chain=3faCl5fFZV2" },
];

export const WANTAN_AUDIO: AudioVideoItem[] = [
  { title: "晚坛功课经（孟圆辉）", platform: "酷狗音乐", url: "https://www.kugou.com/song-36/tgrei8e.html" },
];

export const SANGUAN_INTRO = `《三官经》，全称《太上三元赐福赦罪解厄消灾延生保命妙经》，约出于明代，收入《万历续道藏》。三元即天官、地官、水官，合称三官大帝：天官赐福、地官赦罪、水官解厄。

此经为道教入门必习功课之一，经文阐述诵持功德及三官大帝济度众生之愿力，信众常于三元节（上元正月十五、中元七月十五、下元十月十五）持诵。`;

export const SANGUAN_SCRIPTURE_LINKS: { label: string; url: string }[] = [
  { label: "中华典藏", url: "https://www.zhonghuadiancang.com/xuanxuewushu/sanguanjing/" },
  { label: "道教世界（拼音版）", url: "https://dao-world.org/2020/12/19/%E4%B8%89%E5%AE%98%E7%BB%8F-san-guan-jing/" },
];

export const SANGUAN_COMMENTARY: Commentator[] = [];

/* ─────────────────────────────────────────────────
 * 老君五戒 — 太上老君说五戒经注
 * ───────────────────────────────────────────────── */
export const LAOJUN_WUJIE_CONTENT = `《老君说五戒》

老君曰：是五者，戒于此而顺于彼。

谓上来五事，悉在于人，故云戒于此也。顺于彼者，理也。夫息之所生，由于违理，若顺理而行，复何戒乎？明为戒于过耳，若过而不戒，祸息之兴，岂可穰也！

故杀戒者，东方也，受生之气，尚于长养，而人犯杀，则肝受其害。气数相感，自内于外。
肝主长养，故一切咸知慕生。怀杀之性，则逆气冲肝，肝气凶壮，还自灾身，故云害也。

盗戒者，北方也，太阴之精，主于闭藏，而人为盗，则肾受其殃。肾为太阴，阴主闭藏，故一切咸知收敛。而人为盗，则肾气为伤，故云殃也。殃者，积恶之应者也。

淫戒者，西方也，少阴之质，男女贞固，而人好淫，则肺受其珍。肺为少阴，金性坚贞，故男正女洁。而人好淫，则肺气枯竭，故云珍珍恶气也。旱灾日珍也。

酒戒者，南方火也，太阳之气，物以之成，而人好酒，则心受其毒。心为一身之主，以成乎人，是太阳之气也。好酒之人，则毒冲于心，脏府荒废，以致迷丧者也。

妄语戒者，中央土德信，而人妄语，则脾受其辱。脾属土，土信而有旦，故言德也。人之禀性，以信为本，而人妄语，则辱归于己。脾总人身为义也。

五德相资，不可亏缺。亏，谓废也。缺，谓伤也。言人受生，悉备此五德，五德无亏，则终享福吉，故云不可亏缺者也。老君曰：此五失一，则命不成。向辩人身，各有所生，此名毁犯，亏缺之咎，故云命不成。命不成者，谓不全其性分及天年也。《元命包》曰：行正不过得寿命。寿命，正命。

是故不杀者，乃至无有杀心。夫杀心之起，起于不戒，遂至增甚。今言乃至无有杀心者，自微自防也。自有虽不手杀，或因人行杀，或劝人行杀，或看人行杀，或使人行杀，而心不为恶，皆同于杀也。所以然者，皆由有杀心。若其不戒，终不能成就者也。

不盗，乃至无有邪取。谓贪盗之人，始于小窃，小窃不戒，遂至大取。或因公利私，或凭法招物，或依恃势力，封山畋泽，或诱说痴愚，以役其力。如此而得，皆非正理，同于盗，故云乃至无有邪取。明非正偷盗也，贪婪皆是者也。

不淫，乃至无有邪念。淫者，皆由放咨，或男或女，情欲不一。寻五戒之重，莫过于淫，亡身丧家，故不复论。又有不畏罪网，因法构欲，外诧奉道，内实淫浊。如斯之徒，实为巨恶，故云乃至无有邪念。自非夫妻而行淫者，皆为邪也。

不酒，乃至无有势力。夫酒致过，或因尊上之所劝逼，遂至乱失。今以戒自持，虽有势力，亦不违犯。酒之伤人，如火不救，逾多逾盛，不极而不止者也。

不妄语，乃至无有漏泄。真实之心，则无私恶。无私恶，故无有隐讳。无隐讳，复何漏泄也。如是可谓成也。前云失一则命不成，是理未曲备。今既重说，其义粗显，故云如是可谓成也。`;

export const SANGUAN_AUDIO: AudioVideoItem[] = [
  { title: "三官经（孟圆辉）", platform: "酷狗音乐", url: "https://m.kugou.com/share/song.html?chain=3fain2fFZV2" },
];

/* ───────────────────────────────────────────────── */

/** 孟圆辉道长《北斗经》— 已移至北斗经模块 /intro/beidou/audio */
export const BEIDOU_AUDIO_MENG: AudioVideoItem[] = [
  { title: "孟圆辉道长《北斗经》", platform: "酷狗音乐", url: "https://m.kugou.com/share/song.html?chain=2jNA5fcFZV2" },
  { title: "孟圆辉道长《北斗经》", platform: "B站视频", url: "https://www.bilibili.com/video/BV1tL411G7JR/" },
];

export const AUDIO_VIDEO_GROUPS: AudioVideoGroup[] = [
  {
    groupTitle: "上海道教学院王院长 · 道教经典学修讲座",
    items: [
      { title: "道教学修概述", platform: "B站视频", url: "https://www.bilibili.com/video/BV14o7dzYEzV/" },
      { title: "道藏七部玄教发微", platform: "B站视频", url: "https://www.bilibili.com/video/BV1u64y1J79e/" },
      { title: "道藏研读导论", platform: "B站视频", url: "https://www.bilibili.com/video/BV1Hz8bz5EFV/" },
      { title: "道门经典研修导论", platform: "B站视频", url: "https://www.bilibili.com/video/BV1BN411x7yj/" },
    ],
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
        title: "在家居士可以诵读哪些经书",
        date: "2025.10",
        url: "https://mp.weixin.qq.com/s/5kz9OhcUU7UQfwkyRVVffw",
      },
      {
        title: "「经功浩力不思议」，道教为什么极为重视诵经功德？",
        date: "2025.05",
        url: "https://mp.weixin.qq.com/s/pPzYvzKElMFB8ytQb7zW2w",
      },
      {
        title: "持诵圣号的功德和利益",
        date: "2025.04",
        url: "https://mp.weixin.qq.com/s/ApoMPpG_tW0QB3HpM1AW4g",
      },
      {
        title: "皈依三宝——入道之起点",
        date: "2025.03",
        url: "https://mp.weixin.qq.com/s/AxcNSAy0SrLsA5xLgsnT4A",
      },
      {
        title: "【北斗降日】朝真礼斗，赐福消灾",
        date: "2023.10",
        url: "https://mp.weixin.qq.com/s/NCQ_iICNFyrUKBgCUuSb4g",
      },
    ],
  },
  {
    source: "上清崇宁靖室",
    articles: [
      {
        title: "【杂谈】初学答疑（一）",
        date: "2023.11",
        url: "https://mp.weixin.qq.com/s/QIlz70tNslL6Ujp3A9lnuQ",
      },
      {
        title: "【杂谈】崇宁靖室诵读指南",
        date: "2023.09",
        url: "https://mp.weixin.qq.com/s/qhocgf0kUHx8JameRcpqiA",
      },
      {
        title: "【杂谈】关于\u201C在家修道\u201D的进一步讨论",
        date: "2023.04",
        url: "https://mp.weixin.qq.com/s/9iSlAnf8a_CvUiz2s9d7uQ",
      },
      {
        title: "【经籍道典】诵北斗经诀",
        date: "2022.03",
        url: "https://mp.weixin.qq.com/s/6BfRHe7GW8uE02Dst6o16g",
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
  { name: "中华典藏", url: "https://www.zhonghuadiancang.com", desc: "旨在推广国学知识，吸取国学精华，传承中华文化" },
  { name: "道人家", url: "https://www.daorenjia.com", desc: "中华道藏在线阅读与下载，根据《中华道藏》DJVU版逐篇人工校对，收书1500多种、约6000余万字" },
  { name: "静山草堂", url: "http://www.tangnet.cn/", desc: "道教文化、古籍经典在线阅读。" },
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
  { name: "道教世界 Dao World", url: "https://dao-world.org/", desc: "德国道教协会主办的国际道教文化网站，提供道经、道历、道教音乐、养生、讲坛等，涵盖传统道教文化与修行" },
  {
    name: "中国道教协会",
    url: "https://www.taoist.org.cn",
    desc: "成立于1957年的全国道教徒联合爱国宗教团体和教务组织，弘扬道教教义、传扬道教文化",
    children: [
      { name: "道教主要仪范", url: "http://www.taoist.org.cn/getDjzsById.do?id=286" },
      { name: "道教主要戒律", url: "http://www.taoist.org.cn/getDjzsById.do?id=65" },
      { name: "道教冠巾证、传度证、净戒牒、箓牒管理办法", url: "http://www.taoist.org.cn/getDjzsById.do?id=1716" },
      { name: "道教教职人员认定管理办法", url: "http://www.taoist.org.cn/getDjzsById.do?id=1712" },
      { name: "道教居士行为守则", url: "http://www.taoist.org.cn/getDjzsById.do?id=1721" },
    ],
  },
  { name: "国家宗教事务局", url: "https://www.sara.gov.cn", desc: "国家宗教事务管理部门官方门户，提供宗教政策法规、动态信息与宗教基础信息公共查询服务" },
];

/* ─────────────────────────────────────────────────
 * Static content
 * ───────────────────────────────────────────────── */

export const ABOUT_ORIGIN = `你好，我是源逸，一个道教居士、初学者。

学道之人，当学经书。📘
当今网络发达、学习资源无数，看似便利。但就我亲身体验而言，各种资源散落于公众号、B站、微信群、独立网站、音乐软件、网盘……或不便寻找、或不便传递、或错字、或攀缘附会、或不便展示长篇内容、或容易被删。😞

省流就是：不好找、不好用。❌

于是我想做一个资源聚合索引网站，设想如下：
「网站定位」：道经入门学习资源索引。重点服务于刚开始接触道教文化的人群。
「建站原则」：实用、精简、包容、新手友好，界面清爽、结构清晰、浏览舒适、加载快速。
「运营模式」：只做高质量内容的搬运工。无广告、免费使用。
「使命」：助推道教文化传播，减少误解与偏见。
「愿景」：成为道教文化初学者可信赖的一块指路牌。

我设想两种场景：💡
1.如有朋友对道教文化感兴趣/好奇，对ta说“去看神仙种子网站”，即可省去千言万语。
2.若有朋友真的想学点什么，但不知道学什么、怎么学、去哪学，处于迷茫中，对ta说“去看神仙种子网站”，即能助其少走弯路。
假设能做到这样，我便心满意足了。😊

网站名为“神仙种子”，主要是为了朗朗上口，方便大家轻松找到本站。
“神仙种子”是什么意思呢？🤔
《度人经》曰：“此灵书乃大道之根，还丹之主。有知其音，盖此隐语，非中下士所能颖悟。若至圣大根、神仙种子，得师点破，即解其音。一闻百悟，欣庆无量，更不迟疑，内斋外戒，信受奉行。”
可见，“神仙种子”是修仙圣体、悟性极强的意思，注定要成为神仙，只不过有待指点和成长。屏幕前的你，或许正是一个神仙种子？🌱
而我，不过是一俗居小人，今生有幸皈依玄门之正教，希望这个网站能从一颗小小的种子开始，生根发芽，帮助更多的人了解道教文化。

完成了以上设定，就得开始操作了，但我不会编程。🤣
所幸人工智能技术日新月异，尝试了多种 AI 生成工具、经历了许多失败，我最后用 Cursor 开发环境+ Claude 模型做出了这个网站，部署于 netlify 云端，初步掌握了网站构建和部署技术。🥰
本站先从《北斗经》开始，集合经文原文、名家注解、音频、视频、优质公众号文章等，慢慢扩充完善。

面对浩瀚的知识之海，愿诸位独立思考、不盲从、不迷信，我们一同精进学习。✊
`;

export const ABOUT_THANKS = `
感谢我的师父、老师，带领我入门、教我知识。
感谢一路上认识的朋友，给我诸多帮助和鼓励。
感谢本站引用的所有内容的创作者。
感谢你的使用、支持、分享。`;

export const ABOUT_DISCLAIMER = `本站内容仅供学习研究使用，经典原文来源于公开出版物，其他内容版权归原著作权人所有。
如权利人认为本站内容侵犯其合法权益，请联系我们，将在核实后立即删除。`;

export const FOOTER_COPYRIGHT = `© 2026 神仙种子`;
