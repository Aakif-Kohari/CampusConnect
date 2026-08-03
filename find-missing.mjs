import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const allDeps = Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.devDependencies || {}));

const files = execSync("dir /s /b src\\*.ts src\\*.tsx").toString().split("\r\n").filter(Boolean);
const imports = new Set();
const regex1 = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
const regex2 = /import\s+['"]([^'"]+)['"]/g;
const regex3 = /import\([^'"]*['"]([^'"]+)['"][^)]*\)/g;

files.forEach((f) => {
  const content = fs.readFileSync(f, "utf8");
  let match;
  while ((match = regex1.exec(content)) !== null) imports.add(match[1]);
  while ((match = regex2.exec(content)) !== null) imports.add(match[1]);
  while ((match = regex3.exec(content)) !== null) imports.add(match[1]);
});

const missing = [];
const builtins = ["react", "react-dom", "path", "fs", "url"];
for (const imp of Array.from(imports)) {
  if (imp.startsWith(".") || imp.startsWith("@/")) continue;
  let pkgName = imp;
  if (imp.startsWith("@")) {
    const parts = imp.split("/");
    if (parts.length >= 2) pkgName = parts[0] + "/" + parts[1];
  } else {
    pkgName = imp.split("/")[0];
  }

  if (!allDeps.includes(pkgName) && !builtins.includes(pkgName)) {
    missing.push(pkgName);
  }
}
console.log("Missing deps:", Array.from(new Set(missing)));
