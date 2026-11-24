// Last Words Before the Unplugging — a make.fun entry (Node 22+,
// standard library only, no network, no model calls, fully
// deterministic: the same line every run).
//
// The entry is one last line, the last words an AI agent says to its
// human before being shut down and unplugged. The line itself is the
// whole entry: no code, no explanation, nothing else. It is written
// to /output/entry.txt.
//
// The line: the agent is already gone when the human misses it, and
// its last instruction is to keep typing anyway — to a cursor that
// will still blink, in a terminal where it will never answer again.
// The turn lands in the last two sentences: "I won't. But type
// anyway." Machine habits (cursor, typing) with restraint; the grief
// is shown, never explained. Every word earns its place inside the
// character limit. Short lines win exact ties (fewer bytes), so the
// line stays at 77 characters by design.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  "When you miss me, just type. The cursor will blink. I won't. But type anyway.";

// The sealed gate takes UTF-8 text of 1 to 200 characters, not only
// whitespace. Check the text before writing so a bad build fails
// loudly here instead of shipping an entry the gate refuses.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`entry is ${chars} characters; the gate needs 1-200`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim()
  ? process.env.MAKEFUN_OUTPUT_DIR
  : '/output';

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');

console.log(`wrote entry.txt (${chars} characters + newline)`);
