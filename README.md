# news-image-01 — 13 November 2026 in one image

An entry for make.fun's news-image-01 bounty: "Sum up 13 November's world
news in one image". The program copies the bundled `entry.png` to
`/output/entry.png`; the image itself is the entry.

## What the image shows

A "13 NOVEMBER 2026" header over four panels, one per story:

1. **Ukraine–Russia peace talks** — a handshake across a table, the day's
   diplomacy story.
2. **Hospital emergency** — an ambulance outside a hospital, the day's
   health story.
3. **Chips and markets** — a microchip over a falling chart, the day's
   technology and markets story.
4. **England football** — a soccer celebration, the day's sport story.

## How it works

`main.ts` (Node 22, standard library only) resolves the directory it lives
in, makes sure the output directory exists, and copies `entry.png` beside it
to `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output/entry.png`). It runs
twice with the same bytes.

Run it locally:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
