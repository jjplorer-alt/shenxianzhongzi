import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.75_0.14_75/5%)_0%,transparent_65%)]" />
      <h1 className="relative font-serif text-2xl font-bold tracking-[0.12em] text-gradient-gold sm:text-3xl">
        此路不通
      </h1>
      <p className="relative mt-4 text-muted-foreground">
        您访问的页面不存在，或链接已失效。
      </p>
      <Link
        href="/"
        className="relative mt-8 inline-flex items-center gap-2 rounded-lg border border-gold/25 bg-gold/10 px-5 py-2.5 font-serif text-gold transition-colors hover:bg-gold/20"
      >
        返回首页
      </Link>
    </div>
  );
}
