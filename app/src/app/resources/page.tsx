"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music,
  MessageSquare,
  Globe,
  ChevronDown,
  Play,
  ArrowUpRight,
} from "lucide-react";
import {
  AUDIO_VIDEO_GROUPS,
  ARTICLE_GROUPS,
  WEBSITES,
  type ArticleGroup,
  type AudioVideoGroup,
  type WebsiteLink,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ResourcesPage() {
  const [audioOpen, setAudioOpen] = useState(true);
  const [articleOpen, setArticleOpen] = useState(true);
  const [siteOpen, setSiteOpen] = useState(true);

  const audioCount = AUDIO_VIDEO_GROUPS.reduce((s, g) => s + g.items.length, 0);
  const articleCount = ARTICLE_GROUPS.reduce((s, g) => s + g.articles.length, 0);
  const siteCount = WEBSITES.length;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-3xl px-4 py-10"
    >
      <motion.div variants={fadeUp}>
        <h1 className="font-serif text-2xl font-bold tracking-wider text-gold">
          资源索引
        </h1>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          诵经修持、基础知识综合学习资料，持续更新。
        </p>
      </motion.div>

      {/* ─── Audio / Video ─── */}
      <motion.section variants={fadeUp} className="mt-10">
        <CollapsibleSection
          icon={Music}
          label="音视频"
          open={audioOpen}
          onToggle={() => setAudioOpen(!audioOpen)}
          count={audioCount}
        >
          <div className="mt-3 space-y-3">
            {AUDIO_VIDEO_GROUPS.map((group) => (
              <AudioVideoGroupCard key={group.groupTitle} group={group} />
            ))}
          </div>
        </CollapsibleSection>
      </motion.section>

      {/* ─── WeChat Articles (grouped by source) ─── */}
      <motion.section variants={fadeUp} className="mt-10">
        <CollapsibleSection
          icon={MessageSquare}
          label="公众号"
          open={articleOpen}
          onToggle={() => setArticleOpen(!articleOpen)}
          count={articleCount}
        >
          <div className="mt-3 space-y-3">
            {ARTICLE_GROUPS.map((group) => (
              <ArticleGroupCard key={group.source} group={group} />
            ))}
          </div>
        </CollapsibleSection>
      </motion.section>

      {/* ─── Websites (compact chip grid) ─── */}
      <motion.section variants={fadeUp} className="mt-10">
        <CollapsibleSection
          icon={Globe}
          label="网站链接"
          open={siteOpen}
          onToggle={() => setSiteOpen(!siteOpen)}
          count={siteCount}
        >
          <div className="mt-3 space-y-2">
            {/* flat links as chip grid */}
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {WEBSITES.filter((s) => !s.children).map((site) => (
                <SiteChip key={site.name} name={site.name} url={site.url} desc={site.desc} />
              ))}
            </div>

            {/* grouped site: 白云深处人家 */}
            {WEBSITES.filter((s) => s.children).map((site) => (
              <SiteGroup key={site.name} site={site} />
            ))}
          </div>
        </CollapsibleSection>
      </motion.section>
    </motion.div>
  );
}

/* ── Primitives ────────────────────────────────── */

function CollapsibleSection({
  icon,
  label,
  open,
  onToggle,
  count,
  children,
}: {
  icon: React.ElementType;
  label: string;
  open: boolean;
  onToggle: () => void;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <>
      <SectionHead
        icon={icon}
        label={label}
        open={open}
        onToggle={onToggle}
        count={count}
      />
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SectionHead({
  icon: Icon,
  label,
  open,
  onToggle,
  count,
}: {
  icon: React.ElementType;
  label: string;
  open?: boolean;
  onToggle?: () => void;
  count?: number;
}) {
  const isCollapsible = onToggle !== undefined;

  return (
    <button
      type="button"
      onClick={isCollapsible ? onToggle : undefined}
      className={cn(
        "flex w-full items-center gap-2 text-left",
        isCollapsible && "cursor-pointer transition-all duration-200 hover:opacity-90"
      )}
    >
      <Icon className="h-4 w-4 shrink-0 text-gold/80" />
      <h2 className="text-[13px] font-semibold tracking-wide">{label}</h2>
      {count !== undefined && (
        <span className="rounded-full bg-white/[0.06] px-1.5 py-px text-[11px] tabular-nums text-muted-foreground">
          {count}
        </span>
      )}
      {isCollapsible && (
        <ChevronDown
          className={cn(
            "ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground/70 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      )}
    </button>
  );
}

function AudioVideoGroupCard({ group }: { group: AudioVideoGroup }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="glass overflow-hidden rounded-xl">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-left transition-all duration-200 hover:bg-white/[0.02] active:bg-white/[0.03]"
      >
        <span className="text-[13px] font-semibold">{group.groupTitle}</span>
        <span className="rounded-full bg-white/[0.06] px-1.5 py-px text-[11px] tabular-nums text-muted-foreground">
          {group.items.length}
        </span>
        <ChevronDown
          className={cn(
            "ml-auto h-3.5 w-3.5 text-muted-foreground/70 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden"
          >
            <div className="grid gap-2 border-t border-white/[0.04] p-3 sm:grid-cols-2">
              {group.items.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/15 hover:shadow-[0_6px_24px_-6px_rgba(232,198,120,0.1)]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/8 transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-3.5 w-3.5 text-gold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium">{item.title}</div>
                    <div className="text-[11px] text-muted-foreground">{item.platform}</div>
                  </div>
                  <ArrowUpRight className="h-3 w-3 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArticleGroupCard({ group }: { group: ArticleGroup }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="glass overflow-hidden rounded-xl">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-left transition-all duration-200 hover:bg-white/[0.02] active:bg-white/[0.03]"
      >
        <span className="text-[13px] font-semibold">{group.source}</span>
        <span className="rounded-full bg-white/[0.06] px-1.5 py-px text-[11px] tabular-nums text-muted-foreground">
          {group.articles.length}
        </span>
        <ChevronDown
          className={cn(
            "ml-auto h-3.5 w-3.5 text-muted-foreground/70 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.04] px-1 pb-1">
              {group.articles.map((a, i) => (
                <a
                  key={i}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/[0.03] hover:pl-4"
                >
                  <span className="min-w-0 flex-1 truncate text-[13px] text-muted-foreground transition-colors group-hover:text-foreground">
                    {a.title}
                  </span>
                  <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground/80">
                    {a.date}
                  </span>
                  <ArrowUpRight className="h-2.5 w-2.5 shrink-0 text-muted-foreground/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SiteChip({ name, url, desc }: { name: string; url: string; desc?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass group flex flex-col rounded-xl border border-gold/10 bg-gold/[0.02] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/15 hover:shadow-[0_6px_24px_-6px_rgba(232,198,120,0.1)]"
    >
      <span className="flex items-center gap-1 text-[13px] font-medium text-foreground/90 transition-colors group-hover:text-gold">
        {name}
        <ArrowUpRight className="h-2.5 w-2.5 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
      </span>
      {desc && (
        <span className="mt-0.5 text-[11px] text-muted-foreground/60">{desc}</span>
      )}
    </a>
  );
}

function SiteGroup({ site }: { site: WebsiteLink }) {
  return (
    <div className="glass rounded-xl border border-gold/10 bg-gold/[0.02] px-4 py-3">
      <div>
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-[13px] font-medium text-foreground/90 transition-all duration-300 hover:text-gold"
        >
          {site.name}
          <ArrowUpRight className="h-2.5 w-2.5 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
        </a>
        {site.desc && (
          <div className="mt-0.5 text-[11px] text-muted-foreground/60">{site.desc}</div>
        )}
      </div>
      {site.children && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {site.children.map((child) => (
            <a
              key={child.name}
              href={child.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/child inline-flex flex-col rounded-md bg-white/[0.04] px-2 py-1.5 transition-all duration-200 hover:scale-[1.02] hover:bg-white/[0.07]"
            >
              <span className="flex items-center gap-0.5 text-[12px] text-muted-foreground transition-colors group-hover/child:text-foreground">
                {child.name}
                <ArrowUpRight className="h-2 w-2 shrink-0 text-muted-foreground/50 transition-all duration-200 group-hover/child:translate-x-0.5 group-hover/child:-translate-y-0.5 group-hover/child:text-gold" />
              </span>
              {child.desc && (
                <span className="mt-0.5 text-[10px] text-muted-foreground/80">{child.desc}</span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
