import { FOOTER_COPYRIGHT } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="glass-subtle relative border-t border-white/[0.04]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="mx-auto max-w-2xl px-4 py-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[10px] text-gold/50">{"\u2726"}</span>
          <span className="font-serif text-[12px] tracking-[0.2em] text-foreground/60">
            {FOOTER_COPYRIGHT}
          </span>
          <span className="text-[10px] text-gold/50">{"\u2726"}</span>
        </div>
      </div>
    </footer>
  );
}
