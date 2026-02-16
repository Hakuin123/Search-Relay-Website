import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Chrome, Download, Search, Github } from "lucide-react";
import { TRANSLATIONS } from "../constants";
import { Language } from "../types";

export default function Home() {
  const [lang, setLang] = useState<Language>(() => {
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("zh") ? "zh" : "en";
  });

  // Browser detection state
  const [browserType, setBrowserType] = useState<
    "chrome" | "edge" | "firefox" | "other"
  >("chrome");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("edg")) {
      setBrowserType("edge");
    } else if (ua.includes("firefox")) {
      setBrowserType("firefox");
    } else if (ua.includes("chrome")) {
      setBrowserType("chrome");
    } else {
      setBrowserType("other");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === "zh"
        ? "Search Relay - 你的搜索加速器"
        : "Search Relay - Search Better, Faster";
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "en" ? "zh" : "en"));

  const t = {
    en: {
      nav: {
        features: "Features",
        download: "Download",
        github: "GitHub",
      },
      hero: {
        title: "Search Better,",
        titleHighlight: "Faster",
        subtitle:
          "A simple browser extension to quickly switch between search engines, compare results, and streamline your search workflow.",
        addBtn: {
          chrome: "Add to Chrome",
          edge: "Get it for Edge",
          firefox: "Add to Firefox",
          other: "Download Extension",
        },
        githubBtn: "View on GitHub",
      },
      features: {
        switch: {
          title: "One-Click Switch",
          desc: "Dissatisfied with results? Switch to another engine instantly with automatically extracted keywords.",
        },
        selection: {
          title: "Selection Search",
          desc: "Select text on any page and search it via context menu or quick popup icon.",
        },
        custom: {
          title: "Custom Engines",
          desc: "Add your favorite sites like Bilibili, YouTube, or Reddit as custom search targets.",
        },
      },
      download: {
        title: "Available on all major browsers",
      },
      footer: {
        rights: "Search Relay. Open source under GPL-3.0 License.",
        created: "Created by",
      },
    },
    zh: {
      nav: {
        features: "功能特性",
        download: "下载安装",
        github: "GitHub",
      },
      hero: {
        title: "搜索体验，",
        titleHighlight: "快人一步",
        subtitle:
          "一个简单的浏览器扩展，助您快速在不同搜索引擎之间跳转、比对结果，让搜索工作流如丝般顺滑。",
        addBtn: {
          chrome: "添加到 Chrome",
          edge: "获取 Edge 扩展",
          firefox: "添加到 Firefox",
          other: "下载扩展",
        },
        githubBtn: "查看 GitHub",
      },
      features: {
        switch: {
          title: "一键切换引擎",
          desc: "对当前结果不满意？自动提取关键词，一键跳转到其他搜索引擎重新搜索。",
        },
        selection: {
          title: "划词快捷搜索",
          desc: "选中页面上的任意文字，通过右键菜单或浮动图标快速发起搜索。",
        },
        custom: {
          title: "自定义搜索引擎",
          desc: "支持添加 Bilibili、YouTube、Reddit 等任意您喜欢的网站作为搜索目标。",
        },
      },
      download: {
        title: "支持所有主流浏览器",
      },
      footer: {
        rights: "Search Relay. 遵循 GPL-3.0 开源协议.",
        created: "由",
      },
    },
  }[lang];

  // Helper to get the correct link and icon based on browser
  const getBrowserConfig = () => {
    switch (browserType) {
      case "edge":
        return {
          href: "https://microsoftedge.microsoft.com/addons/detail/pnemkcglehklmoljjkkkejhplaignejo",
          icon: <Search size={20} />, // Using Search as placeholder for Edge
          text: t.hero.addBtn.edge,
          color: "bg-sky-600 hover:bg-sky-700 shadow-sky-600/20",
        };
      case "firefox":
        return {
          href: "https://addons.mozilla.org/firefox/addon/search-relay/",
          icon: <Search size={20} />, // Using Search as placeholder for Firefox
          text: t.hero.addBtn.firefox,
          color: "bg-orange-600 hover:bg-orange-700 shadow-orange-600/20",
        };
      case "chrome":
      default:
        return {
          href: "https://chromewebstore.google.com/detail/pdfcebejkdmomigfhbfejipoljdkbnhf/",
          icon: <Chrome size={20} />,
          text:
            browserType === "other"
              ? t.hero.addBtn.other
              : t.hero.addBtn.chrome,
          color: "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20",
        };
    }
  };

  const mainBtnConfig = getBrowserConfig();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-slate-900/20 overflow-hidden bg-white">
              <img
                src="/icon.svg"
                alt="Search Relay"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">
              Search Relay
            </span>
          </div>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                {t.nav.features}
              </a>
              <a
                href="#download"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                {t.nav.download}
              </a>
              <a
                href="https://github.com/Hakuin123/Search-Relay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                {t.nav.github}
              </a>
            </nav>
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:border-slate-300 transition-colors shadow-sm"
            >
              {lang === "en" ? "中文" : "English"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            {t.hero.title}{" "}
            <span className="text-blue-600">{t.hero.titleHighlight}</span>.
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={mainBtnConfig.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-4 rounded-full text-white font-semibold text-lg transition-colors shadow-lg flex items-center gap-2 ${mainBtnConfig.color}`}
            >
              {mainBtnConfig.icon}
              {mainBtnConfig.text}
            </a>
            <a
              href="https://github.com/Hakuin123/Search-Relay"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold text-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
            >
              <Github size={20} />
              {t.hero.githubBtn}
            </a>
          </div>
        </motion.div>

        {/* Hero Image / Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 relative mx-auto max-w-4xl rounded-xl shadow-2xl overflow-hidden border border-slate-200 bg-white"
        >
          {/* Placeholder for a demo image or gif. Using a div for now. */}
          <div className="aspect-video bg-slate-50 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <p>Demo Preview</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="py-20 bg-white border-t border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Search className="w-8 h-8 text-blue-500" />}
              title={t.features.switch.title}
              description={t.features.switch.desc}
            />
            <FeatureCard
              icon={<Search className="w-8 h-8 text-green-500" />} // Using Search icon temporarily as Globe isn't imported or available in Lucide sometimes depending on version, sticking to safe icons
              title={t.features.selection.title}
              description={t.features.selection.desc}
            />
            <FeatureCard
              icon={<Download className="w-8 h-8 text-purple-500" />}
              title={t.features.custom.title}
              description={t.features.custom.desc}
            />
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section
        id="download"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-12">
          {t.download.title}
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <StoreButton
            href="https://chromewebstore.google.com/detail/pdfcebejkdmomigfhbfejipoljdkbnhf/"
            icon={<Chrome size={24} />}
            name="Chrome Web Store"
            color="hover:border-blue-500 hover:text-blue-600"
          />
          <StoreButton
            href="https://microsoftedge.microsoft.com/addons/detail/pnemkcglehklmoljjkkkejhplaignejo"
            icon={<Search size={24} />} // Edge icon placeholder
            name="Microsoft Edge"
            color="hover:border-sky-500 hover:text-sky-600"
          />
          <StoreButton
            href="https://addons.mozilla.org/firefox/addon/search-relay/"
            icon={<Search size={24} />} // Firefox icon placeholder
            name="Firefox Add-ons"
            color="hover:border-orange-500 hover:text-orange-600"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-slate-200 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} {t.footer.rights}
        </p>
        <p className="mt-2 text-slate-400 text-xs">
          {t.footer.created}{" "}
          <a
            href="https://github.com/Hakuin123"
            className="hover:text-slate-600 underline"
          >
            Hakuin
          </a>
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-left p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StoreButton({
  href,
  icon,
  name,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  name: string;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 px-6 py-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium transition-all shadow-sm hover:shadow-md ${color}`}
    >
      {icon}
      <span>{name}</span>
    </a>
  );
}
