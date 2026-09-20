/**
 * 將 Vite 建置後的 greentrack.html 打包成單一自含 HTML 檔，供線上預覽使用：
 * CSS/JS 內嵌、圖片轉為 data URI，僅保留 Google Fonts 之外部連結。
 *
 * 注意：Vite 會把圖片引用編譯成 `new URL("檔名", import.meta.url).href`，
 * 此路徑是相對於 assets/ 下的 chunk。腳本一旦內嵌進 HTML，
 * import.meta.url 會變成頁面網址而解析錯誤，因此須整段替換成 data URI 字串。
 *
 * 用法：npm run build -- --base=./ && node scripts/inline-preview.mjs <輸出路徑>
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, basename, extname } from 'node:path';

const DIST = 'dist';
const ASSETS = join(DIST, 'assets');
const out = process.argv[2] ?? join(DIST, 'greentrack-preview.html');
const MIME = { '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml' };

/** 檔名 → data URI */
const dataUris = new Map(
  readdirSync(ASSETS)
    .filter(f => MIME[extname(f)])
    .map(f => [f, `data:${MIME[extname(f)]};base64,${readFileSync(join(ASSETS, f)).toString('base64')}`])
);

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** 先解掉 new URL(...) 包裝，再把剩餘的檔名引用換成 data URI */
function inlineAssets(text) {
  for (const [file, uri] of dataUris) {
    text = text
      .replace(new RegExp(`new URL\\(\\s*(["'\`])[^"'\`]*${escapeRe(file)}\\1\\s*,\\s*import\\.meta\\.url\\s*\\)\\.href`, 'g'), JSON.stringify(uri))
      .replace(new RegExp(`(?:\\.{0,2}/)*(?:assets/)?${escapeRe(file)}`, 'g'), uri);
  }
  return text;
}

let html = readFileSync(join(DIST, 'greentrack.html'), 'utf8');

html = html.replace(/<link rel="stylesheet"[^>]*href="[^"]*?(assets\/[\w.-]+\.css)"[^>]*>/g,
  (_, href) => `<style>\n${inlineAssets(readFileSync(join(DIST, href), 'utf8'))}\n</style>`);

html = html.replace(/<script type="module"[^>]*src="[^"]*?(assets\/[\w.-]+\.js)"[^>]*><\/script>/g,
  (_, src) => `<script type="module">\n${inlineAssets(readFileSync(join(DIST, src), 'utf8')).replace(/<\/script/gi, '<\\/script')}\n</script>`);

html = inlineAssets(html);

const leftovers = [...dataUris.keys()].filter(f => html.includes(f));
if (leftovers.length) throw new Error(`仍有未內嵌的資產：${leftovers.join(', ')}`);
if (html.includes('import.meta.url')) throw new Error('仍有 import.meta.url，內嵌後會解析到錯誤位址');
if (/(?:src|href)="[^"]*assets\//.test(html)) throw new Error('仍有外部 assets/ 引用');

writeFileSync(out, html);
console.log(`${basename(out)}  ${(Buffer.byteLength(html) / 1024).toFixed(0)} kB  (${dataUris.size} 個圖片已內嵌)`);
