import { ABOUT_DISCLAIMER, FOOTER_COPYRIGHT } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="glass-subtle relative border-t border-white/[0.04]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="mx-auto max-w-2xl px-4 py-8 text-center">
        <p className="text-[11px] leading-[1.8] text-muted-foreground/70">
          {ABOUT_DISCLAIMER}
        </p>
        <div className="mt-5 flex items-center justify-center gap-2">
          <span className="text-[10px] text-gold/50">✦</span>
          <span className="font-serif text-[12px] tracking-[0.2em] text-foreground/60">
            {FOOTER_COPYRIGHT}
          </span>
          <span className="text-[10px] text-gold/50">✦</span>
        </div>
      </div>
    </footer>
  );
}
