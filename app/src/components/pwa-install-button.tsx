"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, X } from "lucide-react";
import { cn } from "@/lib/utils";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // 已安装为 PWA（standalone 模式）则不显示
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (isStandalone) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowButton(true);
    };

    // Chrome/Edge: beforeinstallprompt（桌面/Android 满足条件时会触发）
    window.addEventListener("beforeinstallprompt", handler);

    // iOS Safari: 无 beforeinstallprompt，但可添加主屏幕
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (isIOS) {
      setShowIOSHint(true);
    }

    // 默认展示按钮（桌面端也能看到；点击时按能力执行）
    setShowButton(true);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setDismissed(true);
    } else if (showIOSHint) {
      setShowIOSInstructions(true);
    } else {
      // 桌面端无 prompt 时，也显示通用说明
      setShowIOSInstructions(true);
    }
  };

  const handleDismiss = () => setDismissed(true);

  const visible = (showButton || showIOSHint) && !dismissed;

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
              将本站应用添加到设备主页
            </span>
          </button>

          {/* 操作说明弹层 */}
          <AnimatePresence>
            {showIOSInstructions && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                  onClick={() => setShowIOSInstructions(false)}
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
                        {showIOSHint ? "iOS 添加到主屏幕" : "添加到手机"}
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                        {showIOSHint
                          ? "点击 Safari 底部的 分享 按钮，选择「添加到主屏幕」即可。"
                          : "请用手机浏览器打开本页，或使用 Chrome 地址栏的 ⊕ 安装图标添加应用。"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowIOSInstructions(false)}
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
