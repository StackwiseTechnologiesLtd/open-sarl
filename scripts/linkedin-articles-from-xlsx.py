#!/usr/bin/env python3
"""Regenerate lib/data/linkedin-articles.json from the private xlsx export."""
from __future__ import annotations

import json
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
XLSX = ROOT / "docs/Private Email Attachments/Articles and LinkedIn.xlsx"
OUT = ROOT / "lib/data/linkedin-articles.json"
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def col_row(ref: str) -> tuple[int, int]:
    col = "".join(c for c in ref if c.isalpha())
    row = int("".join(c for c in ref if c.isdigit()) or 0)
    idx = 0
    for c in col:
        idx = idx * 26 + (ord(c.upper()) - ord("A") + 1)
    return row, idx - 1


def main() -> None:
    with zipfile.ZipFile(XLSX) as z:
        shared: list[str] = []
        if "xl/sharedStrings.xml" in z.namelist():
            root = ET.fromstring(z.read("xl/sharedStrings.xml"))
            for si in root.findall(".//m:si", NS):
                texts = [t.text or "" for t in si.findall(".//m:t", NS)]
                shared.append("".join(texts))

        sheet = ET.fromstring(z.read("xl/worksheets/sheet1.xml"))
        grid: dict[tuple[int, int], str] = {}
        for c in sheet.findall(".//m:sheetData/m:row/m:c", NS):
            ref = c.get("r", "")
            row, col = col_row(ref)
            v_el = c.find("m:v", NS)
            if v_el is None:
                continue
            val = v_el.text or ""
            if c.get("t") == "s":
                val = shared[int(val)]
            grid[(row, col)] = val.strip()

    items = []
    for row in range(3, 100):
        post = grid.get((row, 0), "")
        topic = grid.get((row, 1), "")
        if not post and not topic:
            break
        if not post or not topic:
            continue
        url_raw = grid.get((row, 2), "")
        items.append(
            {
                "post": int(post),
                "topic": topic,
                "url": url_raw if url_raw else None,
            }
        )

    payload = {
        "title": "Articles / LinkedIn posts",
        "sourceFile": "docs/Private Email Attachments/Articles and LinkedIn.xlsx",
        "columns": ["post", "topic", "url"],
        "items": items,
    }
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {len(items)} items to {OUT}")


if __name__ == "__main__":
    main()
