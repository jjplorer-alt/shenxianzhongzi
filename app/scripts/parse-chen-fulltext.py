# Parse tmp-chen-fulltext.txt for 【今译】 blocks (OCR:舍译, 舍漳, etc.)
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
text = (ROOT / "tmp-chen-fulltext.txt").read_text(encoding="utf-8", errors="replace")

# Start markers (OCR corruption variants)
start_re = re.compile(
    r"【舍[译漳][：:}】]?\s*\n",
    re.MULTILINE,
)
# End: [51 述 with optional typo
end_re = re.compile(r"\n\[51\s*述", re.MULTILINE)

blocks: list[str] = []
for m in start_re.finditer(text):
    rest = text[m.end() :]
    em = end_re.search(rest)
    if not em:
        continue
    raw = rest[: em.start()].strip()
    # Merge broken lines, drop lone page headers
    lines = []
    for line in raw.splitlines():
        line = line.strip()
        if not line:
            continue
        if re.match(r"^\d+\s+老子今", line):
            continue
        if re.match(r"^\d+\s+卷子今", line):
            continue
        lines.append(line)
    merged = re.sub(r"\s+", "", "".join(lines))
    # Restore sentence breaks (OCR often removed spaces between sentences)
    merged = merged.replace(";", "；")
    if len(merged) < 15:
        continue
    blocks.append(merged)

out = ROOT / "scripts" / "chen-parsed-count.txt"
out.write_text(f"count={len(blocks)}\n\n" + "\n---\n".join(blocks[:5]), encoding="utf-8")
print("blocks", len(blocks))
