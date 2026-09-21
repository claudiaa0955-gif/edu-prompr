import React from 'react';
import { LogoMark } from './components/Brand';
import { FLOWS, HamburgerMenu, SCREENS, renderScreen } from './registry';
import { defaultProfile } from './data/mock';
import type { UserProfile } from './types';

/* ── 應用程式 ───────────────────────────────────────────── */
export default function App() {
  const [screen, setScreen] = React.useState('splash');
  const [profile, setProfile] = React.useState<UserProfile>(defaultProfile);
  const [slide, setSlide] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [navTab, setNavTab] = React.useState('home');
  const [pointsTab, setPointsTab] = React.useState('overview');
  const [foodTab, setFoodTab] = React.useState('calc');
  const [recording, setRecording] = React.useState(true);
  const [indexOpen, setIndexOpen] = React.useState(true);

  const go = React.useCallback((id: string) => {
    setMenuOpen(false);
    setScreen(id);
    if (['home', 'food', 'shop', 'account'].includes(id)) setNavTab(id);
    if (id === 'activity') setNavTab('track');
  }, []);
  const set = React.useCallback((p: Partial<UserProfile>) => setProfile(v => ({ ...v, ...p })), []);
  const step = { go, profile, set };

  const ctx = {
    go, profile, set, slide, setSlide, navTab, setNavTab,
    pointsTab, setPointsTab, foodTab, setFoodTab, recording, setRecording,
    openMenu: () => setMenuOpen(true),
  };

  const current = SCREENS.find(s => s.id === screen || (screen === 'food-ai' && s.id === 'food') || (screen === 'food-list' && s.id === 'food'));

  return (
    <div className="flex min-h-screen bg-[#EFEDF6]">
      {/* 左側畫面索引 */}
      <aside className={`gt-scroll sticky top-0 hidden h-screen shrink-0 overflow-y-auto border-r border-purple-200/60 bg-white/70 backdrop-blur transition-all lg:block
        ${indexOpen ? 'w-[286px]' : 'w-0'}`}>
        <div className="p-5">
          <div className="flex items-center gap-2.5">
            <LogoMark size={40} />
            <div className="text-left">
              <div className="font-brand text-[22px] leading-none text-purple-600">Green Track</div>
              <div className="text-[10px] tracking-[0.35em] text-purple-400">綠野追蹤</div>
            </div>
          </div>
          <p className="mt-3 text-[11.5px] leading-relaxed text-ink-400">
            永續行動碳足跡紀錄 APP<br />高保真互動原型 · 共 50 個介面畫面
          </p>

          {FLOWS.map(f => {
            const items = SCREENS.filter(s => s.flow === f.key);
            return (
              <div key={f.key} className="mt-5">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: f.color }} />
                  <span className="text-[11.5px] font-bold text-ink-700">{f.label}</span>
                  <span className="font-num text-[10px] text-ink-300">{items.length}</span>
                </div>
                <div className="space-y-0.5">
                  {items.map(s => {
                    const active = current?.id === s.id;
                    return (
                      <button key={s.id}
                        onClick={() => { go(s.id === 'menu' ? 'home' : s.id); if (s.id === 'menu') setMenuOpen(true); }}
                        className={`flex w-full items-baseline gap-2 rounded-lg px-2.5 py-1.5 text-left transition
                          ${active ? 'bg-purple-500 text-white' : 'text-ink-600 hover:bg-purple-50'}`}>
                        <span className={`shrink-0 font-num text-[10px] ${active ? 'text-white/70' : 'text-ink-300'}`}>{s.fig}</span>
                        <span className="text-[12.5px] font-medium">{s.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* 右側預覽區 */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6">
        <div className="mb-4 flex w-full max-w-[420px] items-center justify-between">
          <button onClick={() => setIndexOpen(v => !v)}
            className="hidden rounded-full border border-purple-200 bg-white px-3 py-1.5 text-[11.5px] font-bold text-purple-600 transition hover:bg-purple-50 lg:block">
            {indexOpen ? '收合索引' : '展開索引'}
          </button>
          <div className="text-right">
            <div className="font-num text-[11px] text-ink-400">{current?.fig}</div>
            <div className="text-[14px] font-bold text-ink-900">{current?.title ?? '畫面'}</div>
          </div>
        </div>

        {/* 手機外框 */}
        <div className="relative shrink-0 rounded-[46px] bg-ink-900 p-[11px] shadow-phone">
          <div className="relative h-[min(812px,calc(100dvh-11rem))] min-h-[560px] w-[min(375px,calc(100vw-3.5rem))] overflow-hidden rounded-[36px] bg-white">
            <span className="absolute left-1/2 top-2 z-20 h-6 w-[110px] -translate-x-1/2 rounded-full bg-ink-900" />
            {renderScreen(screen, ctx)}
            {menuOpen && <HamburgerMenu go={go} close={() => setMenuOpen(false)} />}
            <span className="pointer-events-none absolute bottom-1.5 left-1/2 z-20 h-1 w-[126px] -translate-x-1/2 rounded-full bg-ink-900/25" />
          </div>
        </div>

        <div className="mt-5 w-full max-w-[420px] lg:hidden">
          <select value={screen}
                  onChange={e => { const v = e.target.value; go(v === 'menu' ? 'home' : v); if (v === 'menu') setMenuOpen(true); }}
                  aria-label="選擇畫面"
                  className="w-full rounded-full border border-purple-200 bg-white px-4 py-2.5 text-[13px] font-medium text-ink-900">
            {FLOWS.map(f => (
              <optgroup key={f.key} label={f.label}>
                {SCREENS.filter(s => s.flow === f.key).map(s => (
                  <option key={s.id} value={s.id}>{s.fig} · {s.title}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <p className="mt-5 max-w-[420px] text-center text-[11px] leading-relaxed text-ink-400">
          配色取樣自品牌標誌（藍紫 #8B82AD ／ 天藍 #BCE4F0 ／ 葉綠 #9DCC9F ／ 藕紫 #C49BC1），
          吉祥物「小綠」貫穿引導、註冊回饋、AI 建議與成就頁。
        </p>
      </main>
    </div>
  );
}
