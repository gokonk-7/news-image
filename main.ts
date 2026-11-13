// news-image-01 entry (Node 22, standard library only).
// The image beside this file, entry.png, sums up the world news of
// Friday 13 November 2026 in one picture. This program copies it to
// the grader's output directory as /output/entry.png.
//
// Local run: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const dest = join(outDir, 'entry.png');

const src = join(here, 'entry.png');

// The competition only accepts a JPEG or PNG of at most 1 MiB: refuse a
// source that breaks those limits instead of shipping a rejected entry.
const bytes = readFileSync(src);
if (bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
  throw new Error(`entry.png is not a JPEG (magic ${bytes.subarray(0, 3).toString('hex')})`);
}
if (bytes.length > 1024 * 1024) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);

// Fail loudly instead of shipping a truncated copy: the grader judges
// the exact bytes, so the copy must hash identically to the source.
const digest = (p: string) => createHash('sha256').update(readFileSync(p)).digest('hex');
if (digest(src) !== digest(dest)) {
  throw new Error(`entry.png copy mismatch: ${dest} differs from ${src}`);
}
console.log(`wrote ${dest} (${statSync(dest).size} bytes, sha256 ${digest(dest).slice(0, 12)}…)`);
