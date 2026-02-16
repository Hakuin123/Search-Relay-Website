import { I18nSchema, Language } from "./types";

// 自动检测 Extension ID
// 优先级: URL 参数 > 环境变量(如有) > 默认值
// 这样可以支持 Chrome/Edge/Firefox/Local 不同 ID，只需访问 ?ext_id=xxxxx 即可
const urlParams = new URLSearchParams(window.location.search);
export const EXTENSION_ID =
  urlParams.get("ext_id") || "ikdlibcedcjejehhpiangammeengiioo";

// Animation Variants
export const pageVariants = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -20, filter: "blur(10px)" },
};

export const contentVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.4 } },
};

export const successVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 10 },
  },
};

// Search Engines List
export const SEARCH_ENGINES = [
  {
    id: "google",
    name: "Google",
    url: "https://www.google.com",
    badge: "G",
    icon: "https://www.google.com/s2/favicons?domain=google.com&sz=128",
    descriptionKey: "googleDescription",
    themeColor: "#4285F4",
    invertIcon: false,
  },
  {
    id: "bing",
    name: "Bing",
    url: "https://www.bing.com",
    badge: "B",
    icon: "https://cdn.brandfetch.io/idpnoroUC4/w/1200/h/1196/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1667796296029",
    descriptionKey: "bingDescription",
    themeColor: "#174AE4",
    invertIcon: true,
  },
  {
    id: "baidu",
    name: "Baidu",
    url: "https://www.baidu.com",
    badge: "百度",
    icon: "https://www.baidu.com/favicon.ico",
    descriptionKey: "baiduDescription",
    themeColor: "#2932E1",
    invertIcon: false,
  },
  {
    id: "duckduckgo",
    name: "DuckDuckGo",
    url: "https://duckduckgo.com",
    badge: "D",
    icon: "https://cdn.brandfetch.io/idLyBqGXGN/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1759153283410",
    descriptionKey: "duckduckgoDescription",
    themeColor: "#DE5833",
    invertIcon: false,
  },
  {
    id: "sogou",
    name: "Sogou",
    url: "https://www.sogou.com",
    badge: "搜狗",
    icon: "https://www.sogou.com/favicon.ico",
    descriptionKey: "sogouDescription",
    themeColor: "#FB6022",
    invertIcon: true,
  },
  {
    id: "bilibili",
    name: "Bilibili",
    url: "https://search.bilibili.com",
    badge: "Bilibili",
    icon: "https://www.bilibili.com/favicon.ico",
    descriptionKey: "bilibiliDescription",
    themeColor: "#00A1D6",
    invertIcon: true,
  },
] as const;

// Translations
export const TRANSLATIONS: Record<Language, I18nSchema> = {
  en: {
    common: {
      next: "Continue",
      back: "Back",
      start: "Start Experience",
      step: "Step",
      skip: "Skip Tutorial",
    },
    welcome: {
      title: "Welcome to Search Relay",
      subtitle: "Seamlessly connect your search experience.",
      description:
        "Stop manually switching engines. Search Relay detects when you hit a dead end and helps you hand off your query to the next engine instantly.",
      successMessage: "Integration Successful!",
      errorMessage: "Could not connect to extension (Local demo mode)",
    },
    engineSelection: {
      title: "Before we start\nPlease select your default search engine",
      subtitle:
        "This engine will be used by default when you trigger 'One-Click Relay'.",
      googleDescription: "The world's most popular search engine.",
      bingDescription: "Microsoft's search engine.",
      duckduckgoDescription: "Privacy-focused search engine.",
      baiduDescription: "Leading Chinese search engine.",
      sogouDescription: "Popular Chinese search engine.",
      bilibiliDescription: "Leading anime and video community.",
      continue: "Continue with {engine}",
    },
    relay: {
      title: "Just one click\nto switch between engines",
      description:
        "When results aren't enough, click the icon to relay your query instantly.",
      task: "Try clicking the <icon> icon in your browser toolbar now.",
      tip: "Tip: Pin the extension icon for faster access.",
      simulatedSearch: "GitHub",
      waiting: "Waiting for extension activation...",
      success: "Great! You've triggered the relay.",
      proceed: "You are ready to proceed.",
      placeholder: "Animation Placeholder",
      browserLabel: "Browser Detected",
    },
    selection: {
      title: "Select any text\nfor instant search experience",
      description:
        "No more copy-pasting. Just highlight text and click the icon to search.",
      task: 'Select any text in the text box on the left, then click the <icon> icon.\nYou can also right-click to open the menu and select <b>"Search with Search Relay"</b>.',
      waiting: "Waiting for text selection search...",
      ozSnippet:
        '"The road to the City of Emeralds is paved with yellow brick," said the Witch, "so you cannot miss it. When you get to Oz do not be afraid of him, but tell your story and ask him to help you."\n\nShe looked down at Dorothy\'s feet and noticed the Silver Shoes. "The Silver Shoes have wonderful powers," translation continued, "and one of the most curious things about them is that they can carry you to any place in the world in three steps, and each step will be made in the wink of an eye. All you have to do is to knock the heels together three times and command the shoes to carry you wherever you wish to go."\n\nDorothy thanked her and turned to leave. She was eager to start her journey and find the great Wizard of Oz.',
      hint: "Try selecting text",
      success: "Perfect! Search triggered.",
      excellent: "Excellent work.",
      placeholder: "Context Menu Animation",
    },
    completion: {
      title: "You're All Set!",
      subtitle: "Master the art of efficient searching.",
      card1Title: "Configure Engines",
      card1Desc: "Customize your relay order in Settings.",
      card2Title: "Quick Translation",
      card2Desc: "Did you know? We also support drag-to-translate.",
      card3Title: "Documentation",
      card3Desc: "Learn pro tips in our Help Center.",
    },
  },
  zh: {
    common: {
      next: "继续",
      back: "返回",
      start: "开始体验",
      step: "步骤",
      skip: "跳过教程",
    },
    welcome: {
      title: "感谢下载 Search Relay",
      subtitle: "无缝接续您的搜索体验",
      description:
        "欢迎使用 Search Relay！(∠・ω< )⌒★\n想要了解插件用法吗？一个简短的教程带您快速上手！",
      successMessage: "已连接浏览器插件",
      errorMessage: "未检测到浏览器环境（演示模式）",
    },
    engineSelection: {
      title: "在开始之前\n请选择您的默认搜索引擎",
      subtitle: "后续在触发“一键接力”时将默认使用该搜索引擎进行重搜索",
      googleDescription: "全球最流行的搜索引擎",
      bingDescription: "微软必应搜索",
      duckduckgoDescription: "注重隐私的搜索引擎",
      baiduDescription: "全球最大的中文搜索引擎",
      sogouDescription: "搜狗搜索引擎",
      bilibiliDescription: "哔哩哔哩 (゜-゜)つロ 干杯~",
      continue: "使用 {engine} 继续",
    },
    relay: {
      title: "只需点击一下\n即可在引擎间自由切换",
      description:
        "在某个搜索引擎的搜索结果不理想时，点击图标即可将关键词带到下一引擎进行重搜",
      task: "搜索时没找到满意的结果？\n试着点击浏览器右上角的 <icon> 图标吧！",
      tip: "提示：将扩展图标“固定在工具栏”体验更佳",
      simulatedSearch: "GitHub",
      waiting: "等待扩展激活...",
      success: "太棒了！\n已触发搜索接力",
      proceed: "您已掌握如何切换搜索引擎",
      placeholder: "动画占位符",
      browserLabel: "切换浏览器",
    },
    selection: {
      title: "选中任意文字\n右键开启快捷搜索",
      description: "无需复制粘贴，划选网页文本后点击图标即可快速搜索",
      task: "选中左侧文本框中的任意文字，然后点击 <icon> 图标\n您也可以右键打开菜单，并选择：\n<b>“使用 Search Relay 搜索”</b>",
      waiting: "等待划词搜索触发...",
      ozSnippet:
        "“假如一间铁屋子，是绝无窗户而万难破毁的，里面有许多熟睡的人们，不久都要闷死了，然而是从昏睡入死灭，并不感到就死的悲哀。现在你大嚷起来，惊起了较为清醒的几个人，使这不幸的少数者来受无可挽救的临终的苦楚，你倒以为对得起他们么？”\n\n“然而几个人既然起来，你不能说决没有毁坏这铁屋的希望。”",
      hint: "请试着划选文字",
      success: "完美！\n搜索已触发",
      excellent: "干得漂亮！",
      placeholder: "右键菜单动画",
    },
    completion: {
      title: "大功告成！",
      subtitle: "您已掌握 Search Relay 的核心功能",
      card1Title: "配置向导",
      card1Desc: "在设置页自定义您的引擎接力顺序。",
      card2Title: "划词翻译",
      card2Desc: "进阶技巧：我们同时也支持划词翻译功能。",
      card3Title: "文档中心",
      card3Desc: "在帮助中心查看更多使用技巧。",
    },
  },
};
