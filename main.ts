// The Houseplant Out-of-Office — make.fun program/v1 entry.
// Writes one funny out-of-office auto-reply, as if a neglected
// houseplant sent it, to /output/entry.txt (or ./output/entry.txt
// when run locally). Node 22, no dependencies, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "Out of office: unwatered since March, so I'm on strike. For urgent matters, ask the cactus — it gave up in April.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
let outPath = join(outDir, "entry.txt");
try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, LINE + "\n", "utf8");
} catch {
  // Fall back to a local output directory (e.g. when run outside the sandbox).
  outPath = join(process.cwd(), "output", "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE + "\n", "utf8");
}

console.log(`Wrote ${LINE.length} characters to ${outPath}`);
