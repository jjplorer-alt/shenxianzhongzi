"""Extract all 今译 blocks from tmp-chen-fulltext.txt (OCR noise tolerant)."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
text = (ROOT / "tmp-chen-fulltext.txt").read_text(encoding="utf-8", errors="replace")

# Match line that opens a今译 block (OCR: 舍/含, 译/漳)
start_line = re.compile(
    r"^(?:【|{|[iI]\s+)[舍含][译漳][：:}1】\]\s]*$",
    re.MULTILINE,
)
end_line = re.compile(
    r"^\s*\[?\s*51\s*述",
    re.MULTILINE,
)

starts = list(start_line.finditer(text))
blocks: list[str] = []
for i, sm in enumerate(starts):
    tail = text[sm.end() :]
    em = end_line.search(tail)
    if not em:
        continue
    raw = tail[: em.start()].strip()
    lines: list[str] = []
    for line in raw.splitlines():
        s = line.strip()
        if not s:
            continue
        if re.match(r"^\d+\s+老子今", s):
            continue
        if re.match(r"^\d+\s+卷子今", s):
            continue
        if re.match(r"^注[辑糖]*、今", s):
            continue
        lines.append(s)
    merged = "".join(lines)
    merged = re.sub(r"[ \t]+", "", merged)
    if len(merged) < 12:
        continue
    blocks.append(merged)

out_path = ROOT / "scripts" / "chen-blocks.json"
out_path.write_text(json.dumps(blocks, ensure_ascii=False, indent=2), encoding="utf-8")
print("starts", len(starts), "blocks", len(blocks))
