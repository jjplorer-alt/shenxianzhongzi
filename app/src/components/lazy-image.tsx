"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  /** 前 N 张图立即加载，不等待视口 */
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function LazyImage({
  src,
  alt,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, 800px",
}: LazyImageProps) {
  const [inView, setInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || inView) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { rootMargin: "200px", threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, inView]);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {inView ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={className}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
      ) : (
        <div className="absolute inset-0 animate-pulse bg-muted/30" aria-hidden />
      )}
    </div>
  );
}
