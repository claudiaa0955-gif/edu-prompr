/**
 * 將 Vite 建置後的頁面打包成單一自含 HTML：
 * CSS/JS 內嵌、圖片轉為 data URI，僅保留 Google Fonts 之外部連結。
 *
 * 注意：Vite 會把圖片引用編譯成 `new URL("檔名", import.meta.url).href`，
 * 該路徑相對於 assets/ 下的 chunk。腳本一旦內嵌進 HTML，
 * import.meta.url 會變成頁面網址而解析錯誤，因此須整段替換成 data URI 字串。
 *
 * 前提：該頁面須為單一 chunk（以 GT_ENTRY 單獨建置），
 * 否則入口 chunk 會以相對路徑 import 共用 chunk，內嵌後同樣失效。
 *
 * 用法：node scripts/inline-preview.mjs <建置目錄> <頁面檔名> <輸出路徑>
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, basename, extname } from 'node:path';

const MIME = {
  '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg', '.svg':'image/svg+xml',
};

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function inlinePage(distDir, htmlName, outFile) {
  const assetsDir = join(distDir, 'assets');

  /** 檔名 → data URI */
  const dataUris = new Map(
    readdirSync(assetsDir)
      .filter(f => MIME[extname(f)])
      .map(f => [f, `data:${MIME[extname(f)]};base64,${readFileSync(join(assetsDir, f)).toString('base64')}`])
  );

  /** 先解掉 new URL(...) 包裝，再把剩餘的檔名引用換成 data URI */
  const inlineAssets = (text) => {
    for (const [file, uri] of dataUris) {
      text = text
        .replace(new RegExp(`new URL\\(\\s*(["'\`])[^"'\`]*${escapeRe(file)}\\1\\s*,\\s*import\\.meta\\.url\\s*\\)\\.href`, 'g'), JSON.stringify(uri))
        .replace(new RegExp(`(?:\\.{0,2}/)*(?:assets/)?${escapeRe(file)}`, 'g'), uri);
    }
    return text;
  };

  let html = readFileSync(join(distDir, htmlName), 'utf8');

  // modulepreload 在內嵌後已無意義，直接移除
  html = html.replace(/<link rel="modulepreload"[^>]*>/g, '');

  html = html.replace(/<link rel="stylesheet"[^>]*href="[^"]*?(assets\/[\w.-]+\.css)"[^>]*>/g,
    (_, href) => `<style>\n${inlineAssets(readFileSync(join(distDir, href), 'utf8'))}\n</style>`);

  const scripts = [...html.matchAll(/<script type="module"[^>]*src="[^"]*?(assets\/[\w.-]+\.js)"[^>]*><\/script>/g)];
  if (scripts.length > 1) {
    throw new Error(`${htmlName} 有 ${scripts.length} 個 script，請以 GT_ENTRY 單獨建置該頁面`);
  }
  html = html.replace(/<script type="module"[^>]*src="[^"]*?(assets\/[\w.-]+\.js)"[^>]*><\/script>/g,
    (_, src) => `<script type="module">\n${inlineAssets(readFileSync(join(distDir, src), 'utf8')).replace(/<\/script/gi, '<\\/script')}\n</script>`);

  html = inlineAssets(html);

  const leftovers = [...dataUris.keys()].filter(f => html.includes(f));
  if (leftovers.length) throw new Error(`仍有未內嵌的資產：${leftovers.join(', ')}`);
  if (html.includes('import.meta.url')) throw new Error('仍有 import.meta.url，內嵌後會解析到錯誤位址');
  if (/(?:src|href)="[^"]*assets\//.test(html)) throw new Error('仍有外部 assets/ 引用');

  writeFileSync(outFile, html);
  const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
  console.log(`  ${basename(outFile)}  ${kb} kB  (${dataUris.size} 個圖片已內嵌)`);
  return outFile;
}

// 直接執行時走 CLI
if (process.argv[1] && import.meta.url.endsWith(basename(process.argv[1]))) {
  const [distDir, htmlName, outFile] = process.argv.slice(2);
  if (!distDir || !htmlName || !outFile) {
    console.error('用法：node scripts/inline-preview.mjs <建置目錄> <頁面檔名> <輸出路徑>');
    process.exit(1);
  }
  inlinePage(distDir, htmlName, outFile);
}
