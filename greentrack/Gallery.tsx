import React from 'react';
import { LogoMark } from './components/Brand';
import { FLOWS, HamburgerMenu, SCREENS, renderScreen, type Entry } from './registry';
import { sampleProfile } from './data/mock';
import { brand } from './theme';

/**
 * 一頁總覽 — 將全部介面依流程平鋪於單一網頁，供設計稿檢視與列印。
 * 每個縮圖都是實際渲染的畫面（非截圖），因此任何縮放層級都保持銳利。
 */

const DEVICE_W = 375;
const DEVICE_H = 812;

/** 分頁型畫面在總覽中展開為多格，讓每個分頁都看得到 */
interface Tile extends Entry { variant?: string; caption?: string; menuOpen?: boolean }

const TILES: Tile[] = SCREENS.flatMap<Tile>(s => {
  if (s.id === 'menu') return [{ ...s, menuOpen: true }];
  if (s.id === 'points') return [
    { ...s, fig:'圖 4-39', title:'碳積分總覽', variant:'overview' },
    { ...s, fig:'圖 4-40', title:'點數計算',   variant:'calc' },
  ];
  if (s.id === 'food') return [
    { ...s, fig:'圖 4-42', title:'卡洛里計算',   variant:'calc' },
    { ...s, fig:'圖 4-43', title:'AI 辨識結果',  variant:'ai' },
    { ...s, fig:'圖 4-44', title:'飲食紀錄清單', variant:'list' },
    { ...s, fig:'圖 4-45', title:'健康分析',     variant:'health' },
  ];
  return [s];
});

/** 單一縮圖：以實際裝置尺寸渲染後等比縮放 */
function Thumb({ tile, scale, bezel }: { tile: Tile; scale: number; bezel: boolean }) {
  const noop = () => {};
  const ctx = {
    go: noop, profile: sampleProfile, set: noop,
    slide: 0, setSlide: noop,
    navTab: 'home', setNavTab: noop,
    pointsTab: tile.variant ?? 'overview', setPointsTab: noop,
    foodTab: tile.variant ?? 'calc', setFoodTab: noop,
    recording: true, setRecording: noop,
    openMenu: noop,
  };
  const pad = bezel ? 10 : 0;
  return (
    <figure className="m-0 flex flex-col items-center gap-2 break-inside-avoid">
      <div
        style={{ width: (DEVICE_W + pad * 2) * scale, height: (DEVICE_H + pad * 2) * scale }}
        className="relative shrink-0"
      >
        <div
          style={{
            width: DEVICE_W + pad * 2, height: DEVICE_H + pad * 2,
            transform: `scale(${scale})`, transformOrigin: 'top left', padding: pad,
          }}
          className={`absolute left-0 top-0 ${bezel ? 'rounded-[34px] bg-ink-900 shadow-lift' : 'rounded-[18px] shadow-card ring-1 ring-ink-200'}`}
        >
          <div
            style={{ width: DEVICE_W, height: DEVICE_H }}
            className={`relative overflow-hidden bg-white ${bezel ? 'rounded-[26px]' : 'rounded-[12px]'}`}
          >
            {bezel && (
              <span className="absolute left-1/2 top-2 z-20 h-6 w-[110px] -translate-x-1/2 rounded-full bg-ink-900" />
            )}
            {renderScreen(tile.id, ctx)}
            {tile.menuOpen && <HamburgerMenu go={noop} close={noop} />}
          </div>
        </div>
      </div>
      <figcaption className="text-center">
        <div className="font-num text-[10px] tracking-wide text-ink-300">{tile.fig}</div>
        <div className="text-[12px] font-bold leading-snug text-ink-900">{tile.title}</div>
      </figcaption>
    </figure>
  );
}

export default function Gallery() {
  const [scale, setScale] = React.useState(0.44);
  const [bezel, setBezel] = React.useState(true);

  return (
    <div className="min-h-screen bg-[#EFEDF6] pb-20">
      {/* 頁首 */}
      <header className="border-b border-purple-200/60 bg-white/80 backdrop-blur print:border-0 print:bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-4 px-4 py-5 sm:px-8">
          <LogoMark size={44} />
          <div className="min-w-0 flex-1">
            <h1 className="font-brand text-[30px] leading-none text-purple-600">Green Track</h1>
            <p className="mt-1 text-[12px] tracking-[0.3em] text-purple-400">綠野追蹤</p>
          </div>
          <div className="text-right">
            <p className="text-[13px] font-bold text-ink-900">永續行動碳足跡紀錄 APP</p>
            <p className="text-[11px] text-ink-400">介面設計總覽 · 共 {TILES.length} 個畫面</p>
          </div>
        </div>

        {/* 檢視控制（列印時隱藏） */}
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-4 px-4 pb-4 sm:px-8 print:hidden">
          <label className="flex items-center gap-2 text-[12px] font-medium text-ink-500">
            縮圖大小
            <input
              type="range" min={0.28} max={0.85} step={0.01} value={scale}
              onChange={e => setScale(Number(e.target.value))}
              className="h-1.5 w-40 cursor-pointer appearance-none rounded-full bg-ink-200 accent-purple-700"
            />
            <span className="font-num w-10 tabular-nums text-ink-400">{Math.round(scale * 100)}%</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-[12px] font-medium text-ink-500">
            <input
              type="checkbox" checked={bezel} onChange={e => setBezel(e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-purple-700"
            />
            顯示手機外框
          </label>
          <button
            onClick={() => window.print()}
            className="ml-auto rounded-full border border-purple-300 px-4 py-1.5 text-[12px] font-bold text-purple-700 transition hover:bg-purple-50"
          >
            列印 / 匯出 PDF
          </button>
        </div>
      </header>

      {/* 依流程分組平鋪 */}
      <main className="mx-auto max-w-[1400px] px-4 sm:px-8">
        {FLOWS.map(flow => {
          const tiles = TILES.filter(t => t.flow === flow.key);
          if (!tiles.length) return null;
          return (
            <section key={flow.key} className="mt-12 first:mt-8">
              <div className="mb-5 flex items-baseline gap-3 border-b border-ink-200 pb-2">
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: flow.color }} />
                <h2 className="text-[17px] font-black text-ink-900">{flow.label}</h2>
                <span className="font-num text-[12px] text-ink-300">{tiles.length} 個畫面</span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-8">
                {tiles.map(t => (
                  <Thumb key={`${t.id}-${t.variant ?? t.fig}`} tile={t} scale={scale} bezel={bezel} />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <footer className="mx-auto mt-16 max-w-[1400px] px-4 text-center text-[11px] leading-relaxed text-ink-400 sm:px-8">
        配色取樣自品牌標誌：藍紫 {brand.purple} ／ 天藍 {brand.aqua} ／ 葉綠 {brand.leaf} ／ 藕紫 {brand.mauve}。
        <br />
        每一格皆為實際渲染之介面，非截圖，放大不失真。
      </footer>
    </div>
  );
}
