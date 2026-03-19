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

/** 通用菜单操作提示 */
const MENU_PHRASE =
  "点击三个点或三条横线打开菜单，选择「添加到主屏幕」/「添加到桌面」/「安装应用」。";

/** 检测设备与浏览器，返回针对性安装指引 */
function getPlatformGuide(): PlatformGuide {
  const ua = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isHarmonyOS = /HarmonyOS|OpenHarmony|HuaweiBrowser|HMSCore/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  // 浏览器检测（优先于系统，微信/QQ 内无法安装 PWA）
  const isWeChat = /MicroMessenger/i.test(ua);
  const isQQ = /QQ\//i.test(ua) || /MQQBrowser/i.test(ua);
  const isSafari = /Safari/i.test(ua) && !/Chrome|Chromium|Edg/i.test(ua);
  const isChrome = /Chrome/i.test(ua) && !/Edg/i.test(ua);
  const isEdge = /Edg/i.test(ua);
  const isFirefox = /Firefox/i.test(ua);
  const isSamsungBrowser = /SamsungBrowser/i.test(ua);
  const isUCBrowser = /UCBrowser|UCWEB|U3/i.test(ua);
  const isBaiduBrowser = /baidubrowser|Baidu/i.test(ua);
  const isMiuiBrowser = /MiuiBrowser|MiBrowser/i.test(ua);
  const isOppoBrowser = /HeytapBrowser|Oprel|OPPO/i.test(ua);
  const isVivoBrowser = /vivoBrowser|V1824|vivo/i.test(ua);
  const isHonorBrowser = /HonorBrowser|HONOR/i.test(ua);

  // 设备品牌（用于更贴近用户的标题）
  const deviceXiaomi = /MI\s|Redmi|M2012|2201|2211|2304|2311/i.test(ua);
  const deviceOppo = /OPPO|PCCM00|PCLM10|PDSM00|PDHM00|PCAM00/i.test(ua);
  const deviceVivo = /vivo|V1824|V2118|iQOO/i.test(ua);
  const deviceHuawei = /HUAWEI|Huawei|HW-|Honor|HONOR|ALP-|TAS-/i.test(ua);
  const deviceSamsung = /Samsung|SM-/i.test(ua);

  // ═══ 微信 / QQ 内置浏览器：无法安装 PWA，必须先跳转系统浏览器 ═══
  if (isWeChat) {
    if (isIOS) {
      return {
        title: "微信内打开 · 需用 Safari",
        steps:
          "微信内置浏览器不支持添加到主屏幕。请点击右上角「⋯」→「在 Safari 中打开」。用 Safari 打开本页后：点击底部的「分享」按钮（方框带向上箭头），选择「添加到主屏幕」→「添加」；或 " + MENU_PHRASE,
      };
    }
    if (isAndroid) {
      return {
        title: "微信内打开 · 需用系统浏览器",
        steps:
          "微信内置浏览器不支持添加到主屏幕。请点击右上角「⋮」或「⋯」→「在浏览器中打开」或「用默认浏览器打开」。用系统浏览器打开后：" + MENU_PHRASE,
      };
    }
    return {
      title: "微信内打开",
      steps: "请点击右上角「⋯」→「在浏览器中打开」。用系统浏览器打开后：" + MENU_PHRASE,
    };
  }

  if (isQQ) {
    if (isIOS) {
      return {
        title: "QQ 内打开 · 建议用 Safari",
        steps:
          "QQ 内置浏览器对「添加到主屏幕」支持有限。建议点击右上角菜单→「在 Safari 中打开」。用 Safari 打开后：点击底部「分享」→「添加到主屏幕」→「添加」；或 " + MENU_PHRASE,
      };
    }
    if (isAndroid) {
      return {
        title: "QQ 内打开 · 建议用 Chrome",
        steps:
          "QQ 浏览器对 PWA 支持不稳定。建议点击 QQ 右上角菜单→「在浏览器中打开」。用系统浏览器打开后：" + MENU_PHRASE,
      };
    }
  }

  // ═══ iOS（非微信/QQ） ═══
  if (isIOS) {
    return {
      title: "iPhone / iPad 添加到主屏幕",
      steps:
        "点击 Safari 底部的「分享」按钮（方框带向上箭头），向下滚动选择「添加到主屏幕」，然后点击「添加」。或 " + MENU_PHRASE,
    };
  }

  // ═══ 鸿蒙 / 华为 ═══
  if (isHarmonyOS || (isAndroid && deviceHuawei)) {
    const isNativeHuawei = /HuaweiBrowser|HiBrowser|HMSCore/i.test(ua);
    if (isNativeHuawei) {
      return {
        title: deviceHuawei ? "华为 / 鸿蒙 浏览器" : "鸿蒙 添加到主屏幕",
        steps:
          "点击网页底部右下角的「四个点」按钮，选择「添加至桌面」。若无此选项，" + MENU_PHRASE,
      };
    }
    return {
      title: "华为 / 鸿蒙 设备",
      steps:
        "鸿蒙原生浏览器：点击底部右下角「四个点」→「添加至桌面」。其他浏览器：" + MENU_PHRASE,
    };
  }

  // ═══ Android 各浏览器（品牌浏览器优先于通用 Chrome，因多为 Chromium 内核） ═══
  if (isAndroid) {

    if (isSamsungBrowser) {
      return {
        title: "三星 浏览器安装",
        steps: MENU_PHRASE,
      };
    }
    if (isMiuiBrowser) {
      return {
        title: "小米 浏览器",
        steps: MENU_PHRASE,
      };
    }
    if (isOppoBrowser) {
      return {
        title: "OPPO / 真我 浏览器",
        steps: MENU_PHRASE,
      };
    }
    if (isVivoBrowser) {
      return {
        title: "vivo / iQOO 浏览器",
        steps: MENU_PHRASE,
      };
    }
    if (isHonorBrowser) {
      return {
        title: "荣耀 浏览器",
        steps: MENU_PHRASE,
      };
    }
    if (isUCBrowser) {
      return {
        title: "UC 浏览器",
        steps: `${MENU_PHRASE} 部分版本可能在「更多」或「工具箱」中。`,
      };
    }
    if (isBaiduBrowser) {
      return {
        title: "百度 浏览器",
        steps: MENU_PHRASE,
      };
    }
    if (isFirefox) {
      return {
        title: "Android Firefox 安装",
        steps: MENU_PHRASE,
      };
    }
    if (isChrome) {
      const brand =
        deviceXiaomi ? "小米" : deviceOppo ? "OPPO" : deviceVivo ? "vivo" : deviceSamsung ? "三星" : "";
      return {
        title: brand ? `${brand} 手机 · Chrome` : "Android Chrome 安装",
        steps: `${MENU_PHRASE} 若未看到该选项，请确保使用 HTTPS 访问。`,
      };
    }
    return {
      title: deviceXiaomi
        ? "小米 手机"
        : deviceOppo
          ? "OPPO 手机"
          : deviceVivo
            ? "vivo 手机"
            : "Android 添加到主屏幕",
      steps: MENU_PHRASE,
    };
  }

  // ═══ 桌面端 ═══
  if (isChrome || isEdge) {
    return {
      title: "Chrome / Edge 安装",
      steps:
        "点击地址栏右侧的「⊕」安装图标；或 " + MENU_PHRASE,
    };
  }
  if (isFirefox) {
    return {
      title: "Firefox 安装",
      steps: MENU_PHRASE,
    };
  }
  if (isSafari) {
    return {
      title: "Safari 安装",
      steps: MENU_PHRASE,
    };
  }

  return {
    title: "添加到主屏幕",
    steps: MENU_PHRASE,
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
          className="relative"
        >
          <button
            type="button"
            onClick={handleClick}
            className={cn(
              "glass-card group flex w-full items-center gap-2.5 rounded-xl border border-gold/10 px-4 py-3 text-left",
              "transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/20 hover:shadow-[0_4px_16px_-4px_rgba(232,198,120,0.15)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 sm:px-5 sm:py-3.5"
            )}
          >
            <Smartphone
              className="h-5 w-5 shrink-0 text-gold/80 transition-transform duration-300 group-hover:scale-110"
              aria-hidden
            />
            <span className="font-serif text-[15px] font-medium text-foreground/95">
              安装APP
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
                          "请使用支持的浏览器（Chrome、Edge、Safari）打开本页。可在右上角或右下角的菜单（三个点 ⋮ 或三条横线 ≡）中查找「添加到主屏幕」或「安装应用」。"}
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
