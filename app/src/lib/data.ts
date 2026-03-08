/* ─────────────────────────────────────────────────
 * Home page — 功能导航
 * 中文集中放 data.ts，避免改 layout 时乱码
 * ───────────────────────────────────────────────── */

export interface NavCard {
  title: string;
  desc: string;
  href: string;
  iconKey: "scripture" | "commentary" | "resources" | "about";
}

export const NAV_CARDS: NavCard[] = [
  { title: "北斗原文", desc: "北斗经简介、简体拼音版浏览", href: "/scripture", iconKey: "scripture" },
  { title: "北斗经注", desc: "学经当解经意，三家注解汇总", href: "/commentary", iconKey: "commentary" },
  { title: "资源索引", desc: "诵经修持、基础知识综合资料", href: "/resources", iconKey: "resources" },
  { title: "关于本站", desc: "缘起、致谢、联系方式", href: "/about", iconKey: "about" },
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

export const AUDIO_VIDEO_GROUPS: AudioVideoGroup[] = [
  {
    groupTitle: "孟圆辉道长《北斗经》",
    items: [
      { title: "孟圆辉道长《北斗经》", platform: "酷狗音乐", url: "https://m.kugou.com/share/song.html?chain=2jNA5fcFZV2" },
      { title: "孟圆辉道长《北斗经》", platform: "B站视频", url: "https://www.bilibili.com/video/BV1tL411G7JR/" },
    ],
  },
  {
    groupTitle: "上海道教学院王院长谈道教经典学修",
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
可见，“神仙种子”是修仙圣体、悟性极强的意思，注定要成为神仙，只不过当下还未成长。屏幕前的你，或许正是一个神仙种子？🌱
而我，不过是一俗居小人，今生有幸皈依玄门之正教，希望这个网站能从一颗小小的种子开始，生根发芽，帮助更多的人了解道教文化。

完成了以上设定，就得开始操作了，但我不会编程。🤣
所幸人工智能技术日新月异，尝试了多种 AI 生成工具、经历了许多失败，我最后用 Cursor 开发环境+ Claude 模型做出了这个网站，部署于 netlify 云端，初步掌握了网站构建和部署技术。🥰
本站先从《北斗经》开始，集合经文原文、名家注解、音频、视频、优质公众号文章等，慢慢扩充、成长。

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
