import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { styleText } from "util";
import path from 'path'

  export function updateNewestFiles() {
  // ========================
  // for newly created files
  // ========================
  // const days = 7;
  const days = 20;
  const cmd = `git log --diff-filter=A --since="${days} days ago" --name-only --pretty=format:`;
  const output = execSync(cmd).toString().trim();
  const files = output
    .split("\n")
    .filter(f => f.startsWith("content/") && f.endsWith(".md"))
    .filter((v, i, a) => a.indexOf(v) === i); // unique

  writeFileSync("newest-added-files.json", JSON.stringify(files, null, 2));
  console.log(styleText("green", `"${path.resolve('newest-added-files.json')}" has been generated.`));

  // ========================
  // for newly modified files
  // ========================
  const cmd2 = `git log --diff-filter=M --since="${days} days ago" --name-only --pretty=format:`;
  const output2 = execSync(cmd2).toString().trim();
  const files2 = output2
    .split("\n")
    .filter(f => f.startsWith("content/") && f.endsWith(".md"))
    .filter((v, i, a) => a.indexOf(v) === i); // unique
  writeFileSync("newest-modified-files.json", JSON.stringify(files2, null, 2));
  console.log(styleText("green", `"${path.resolve('newest-modified-files.json')}" has been generated.`));
}
