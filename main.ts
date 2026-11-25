// Make the AI Judge Laugh - make.fun bounty entry.
// One line about office life: the passive-aggressive email phrase,
// turned back on the sender.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I replied to my own email with 'per my last email' and finally understood why nobody likes me.";

const MAX_CHARS = 200;

function main(): void {
  // Gate: 1 to 200 characters, a single line, not only white space.
  const chars = [...LINE].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry must be 1 to ${MAX_CHARS} characters, got ${chars}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Guard: reject control characters so the line stays clean, printable text.
  if (/[\u0000-\u001f\u007f]/.test(LINE)) {
    throw new Error("entry must not contain control characters");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");

  // Round-trip check: what was written is exactly the line.
  const back = readFileSync(outPath, "utf8");
  if (back !== LINE) {
    throw new Error("round-trip check failed: entry.txt does not match the line");
  }
}

main();
