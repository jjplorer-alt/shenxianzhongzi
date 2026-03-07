"use client";

import { useEffect } from "react";

export function PWARegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .then((reg) => {
            reg.addEventListener("updatefound", () => {
              const newSW = reg.installing;
              if (!newSW) return;
              newSW.addEventListener("statechange", () => {
                if (
                  newSW.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  console.log("[PWA] 新版本已缓存，刷新页面以更新");
                }
              });
            });
          })
          .catch((err) => console.warn("[PWA] SW 注册失败:", err));
      });
    }
  }, []);

  return null;
}
