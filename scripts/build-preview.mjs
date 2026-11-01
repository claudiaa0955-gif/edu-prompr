/**
 * 產生可離線開啟的單檔 HTML：
 *   dist-preview/GreenTrack-互動原型.html      全部畫面可操作
 *   dist-preview/GreenTrack-介面總覽.html      全部畫面一頁平鋪
 *
 * 每個頁面各自以 GT_ENTRY 單獨建置，確保不與其他頁面共用 chunk，
 * 這樣才能把單一 JS 完整內嵌進 HTML。
 *
 * 用法：npm run build:preview
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { inlinePage } from './inline-preview.mjs';

const OUT = 'dist-preview';

const PAGES = [
  { entry:'greentrack',        html:'greentrack.html',         out:'GreenTrack-互動原型.html' },
  { entry:'greentrackGallery', html:'greentrack-gallery.html', out:'GreenTrack-介面總覽.html' },
];

mkdirSync(OUT, { recursive: true });

for (const p of PAGES) {
  const dist = join(OUT, p.entry);
  console.log(`建置 ${p.html} …`);
  execFileSync('npx', ['vite', 'build', '--base=./', '--outDir', dist, '--emptyOutDir'], {
    stdio: ['ignore', 'ignore', 'inherit'],
    env: { ...process.env, GT_ENTRY: p.entry },
  });
  inlinePage(dist, p.html, join(OUT, p.out));
}

console.log(`\n完成：${OUT}/ 下的兩個 HTML 皆可直接以瀏覽器開啟，無需伺服器。`);
