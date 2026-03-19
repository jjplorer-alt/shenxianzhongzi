"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, X } from "lucide-react";
import { cn } from "@/lib/utils";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type PlatformGuide = {
  title: string;
  steps: string;
};

function getPlatformGuide(): PlatformGuide {
  const ua = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  const isSafari = /Safari/i.test(ua) && !/Chrome|Chromium|Edg/i.test(ua);
  const isChrome = /Chrome/i.test(ua) && !/Edg/i.test(ua);
  const isEdge = /Edg/i.test(ua);
  const isFirefox = /Firefox/i.test(ua);
  const isSamsungBrowser = /SamsungBrowser/i.test(ua);

  if (isIOS) {
    return {
      title: "iOS 添加到主屏幕",
      steps:
        "点击 Safari 底部的「分享」按钮（方框带向上箭头），向下滚动选择「添加到主屏幕」，然后点击「添加」。",
    };
  }

  if (isAndroid) {
    if (isChrome) {
      return {
        title: "Android Chrome 安装",
        steps:
          "点击浏览器右上角「⋮」菜单，选择「安装应用」或「添加到主屏幕」。若未看到该选项，请确保已满足安装条件（如使用 HTTPS）。",
      };
    }
    if (isSamsungBrowser) {
      return {
        title: "Samsung 浏览器安装",
        steps: "点击菜单按钮，选择「添加到主屏幕」或「添加到页面」。",
      };
    }
    if (isFirefox) {
      return {
        title: "Android Firefox 安装",
        steps: "点击右上角「⋮」菜单，选择「安装」或「添加到主屏幕」。",
      };
    }
    return {
      title: "Android 添加到主屏幕",
      steps: "打开浏览器菜单（通常为右上角三点），查找「添加到主屏幕」「安装应用」或类似选项。",
    };
  }

  // 桌面端
  if (isChrome || isEdge) {
    return {
      title: "Chrome / Edge 安装",
      steps:
        "点击地址栏右侧的「⊕」安装图标，或打开菜单（⋮）→「安装 神仙种子」/「应用」→「安装此站点作为应用」。",
    };
  }
  if (isFirefox) {
    return {
      title: "Firefox 安装",
      steps: "点击地址栏左侧的「⋮」菜单，选择「安装」或「更多工具」→「安装」。",
    };
  }
  if (isSafari) {
    return {
      title: "Safari 安装",
      steps: "菜单栏选择「文件」→「添加到 Dock」，或使用「开发」菜单中的 PWA 相关选项。",
    };
  }

  return {
    title: "添加到主屏幕",
    steps:
      "请使用 Chrome、Edge 或 Safari 打开本页。Chrome/Edge 可在地址栏找到 ⊕ 安装图标；iOS 请用 Safari 的「分享」→「添加到主屏幕」。",
  };
}

export function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [showFallbackHint, setShowFallbackHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [platformGuide, setPlatformGuide] = useState<PlatformGuide | null>(null);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (isStandalone) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // iOS、部分 Android 等不支持 beforeinstallprompt，需要手动指引
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (isIOS) setShowFallbackHint(true);

    setShowButton(true);
    setPlatformGuide(getPlatformGuide());

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") setDismissed(true);
      } catch {
        // 原生 prompt 失败时显示指引
        setShowInstructions(true);
      }
    } else {
      setShowInstructions(true);
    }
  };

  const visible = (showButton || showFallbackHint) && !dismissed;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="relative mt-8 flex justify-center"
        >
          <button
            type="button"
            onClick={handleClick}
            className={cn(
              "glass-card group inline-flex items-center gap-2.5 rounded-xl border border-gold/10 px-5 py-3",
              "transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/20 hover:shadow-[0_4px_16px_-4px_rgba(232,198,120,0.15)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30"
            )}
          >
            <Smartphone className="h-4 w-4 shrink-0 text-gold/80 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-serif text-[13px] text-foreground/90">
              将本网页添加到设备主页成为APP
            </span>
          </button>

          <AnimatePresence>
            {showInstructions && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                  onClick={() => setShowInstructions(false)}
                  aria-hidden
                />
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="fixed left-4 right-4 top-1/2 z-50 -translate-y-1/2 rounded-xl border border-gold/15 bg-background/95 p-5 shadow-xl backdrop-blur-md sm:left-auto sm:right-auto sm:max-w-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-serif text-[15px] font-bold text-gold">
                        {platformGuide?.title ?? "添加到主屏幕"}
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                        {platformGuide?.steps ??
                          "请使用支持的浏览器（Chrome、Edge、Safari）打开本页，按浏览器提示添加应用。"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowInstructions(false)}
                      className="-m-1 rounded p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30"
                      aria-label="关闭"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
