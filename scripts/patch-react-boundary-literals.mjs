/**
 * React 19, suspense/activity sınırını HTML yorumu ve istemci betiğindeki
 * dizgilerle işaretler: `"/$"` ve `"/&"`. Googlebot tırnak içindeki köke
 * göreli yolları bağlantı sanıp https://site/& ve https://site/$ adreslerini
 * tarıyor; Search Console bunları 404 olarak raporluyor.
 *
 * Karşılaştırılan değer aynı kalır (atob("LyQ=") === "/$", atob("LyY=") === "/&")
 * ama kaynakta artık URL gibi görünen bir dizgi yoktur. Yorum işaretleri
 * (<!--/$-->) hidrasyon için durur; onlar tırnaklı yol değildir.
 *
 * next build bu dosyaları minify eder. SWC atob() çağrısını katlamaz.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOTS = [
  // İstemci chunk'ı buradan derlenir.
  "node_modules/next/dist/compiled/react-dom",
  "node_modules/next/dist/compiled/react-dom-experimental",
  "node_modules/react-dom",
  // Asıl HTML'e gömülen hidrasyon betiği Next'in kendi sunucu paketindedir.
  "node_modules/next/dist/compiled/next-server",
];

const REPLACEMENTS = [
  ['"/$"', 'atob("LyQ=")'],
  ['"/&"', 'atob("LyY=")'],
];

if (atob("LyQ=") !== "/$" || atob("LyY=") !== "/&") {
  throw new Error("React sınır dizgileri atob ile çözülemedi.");
}

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err && err.code === "ENOENT") return [];
    throw err;
  }
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(?:js|mjs|cjs)$/.test(entry.name)) files.push(full);
  }
  return files;
}

let filesChanged = 0;
let replacements = 0;

for (const root of ROOTS) {
  for (const file of await walk(root)) {
    const original = await readFile(file, "utf8");
    let next = original;
    for (const [from, to] of REPLACEMENTS) {
      if (!next.includes(from)) continue;
      const parts = next.split(from);
      replacements += parts.length - 1;
      next = parts.join(to);
    }
    if (next !== original) {
      await writeFile(file, next);
      filesChanged++;
    }
  }
}

console.log(
  `patch-react-boundary-literals: ${replacements} dizgi, ${filesChanged} dosya.`
);
