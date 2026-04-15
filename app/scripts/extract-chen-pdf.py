"""One-off: extract 今译 paragraphs from Chen Gu-ying PDF to stdout (UTF-8)."""
from __future__ import annotations

import re
import sys
from pathlib import Path

from pypdf import PdfReader


def main() -> None:
    pdf = Path(__file__).resolve().parent.parent / "tmp-chen.pdf"
    out = Path(__file__).resolve().parent.parent / "tmp-chen-fulltext.txt"
    r = PdfReader(str(pdf))
    chunks: list[str] = []
    for p in r.pages:
        chunks.append(p.extract_text() or "")
    full = "\n".join(chunks)
    out.write_text(full, encoding="utf-8")
    # Find lines after 今译
    sys.stdout.reconfigure(encoding="utf-8")
    for m in re.finditer(r"今译\s*([\s\S]{20,800}?)(?=注释|引述|校勘|今译|原文|$)", full):
        block = m.group(1).strip()
        block = re.sub(r"\s+", " ", block)
        if len(block) > 30:
            print(block[:900])
            print("---CHUNK---")


if __name__ == "__main__":
    main()
