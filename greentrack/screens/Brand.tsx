import React from 'react';
import { Logo, LogoMark, Mascot } from '../components/Brand';
import { Button, StatusBar } from '../components/ui';
import { onboardingSlides } from '../data/mock';
import { gradient } from '../theme';

/* 圖 4-1　啟動畫面 */
export function Splash({ go }: { go: (id: string) => void }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden" style={{ background: gradient.splash }}>
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <Logo size={192} className="gt-float" />
        <div className="mt-4 text-center">
          <div className="text-[13px] tracking-[0.62em] pl-[0.62em] text-purple-500">綠野追蹤</div>
        </div>
      </div>
      <div className="px-8 pb-12 text-center">
        <p className="text-[13px] font-medium tracking-wide text-purple-600">
          記錄生活 <span className="text-mauve-400">×</span> 減碳行動 <span className="text-mauve-400">×</span> 綠色回饋
        </p>
        <div className="mt-6">
          <Button onClick={() => go('onboarding')}>開始體驗</Button>
        </div>
        <p className="mt-4 text-[11px] text-purple-400">永續行動碳足跡紀錄 APP</p>
      </div>
    </div>
  );
}

/* 圖 4-2 ~ 4-9　引導頁面系列（八頁） */
export function Onboarding({ go, index, setIndex }: {
  go: (id: string) => void; index: number; setIndex: (i: number) => void;
}) {
  const s = onboardingSlides[index];
  const last = index === onboardingSlides.length - 1;
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white">
      <StatusBar />
      {/* 版面結構固定：頂部 Logo → 中段視覺 → 下方藍色直線文字區塊 */}
      <div className="flex items-center justify-between px-6 pb-2">
        <div className="flex items-center gap-2">
          <LogoMark size={26} />
          <span className="font-brand text-xl text-purple-600">Green Track</span>
        </div>
        <button onClick={() => go('login')} className="text-[12px] font-bold text-ink-300 transition hover:text-purple-500">
          略過
        </button>
      </div>

      <div className="flex-1 px-5">
        <div key={index} className="gt-fade flex h-full flex-col">
          {/* 視覺區塊撐滿可用高度，但設上限避免單卡過於空曠 */}
          <div className="flex min-h-0 flex-1 items-center">
            <div className="h-full max-h-[372px] w-full">
              <OnboardArt kind={s.art} index={index} />
            </div>
          </div>
          <div className="mt-5 flex shrink-0 gap-3.5">
            <span className="mt-1 w-[3px] shrink-0 rounded-full bg-gradient-to-b from-aqua-400 to-purple-400" />
            <div>
              <span className="mb-1.5 inline-flex rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-600">
                {s.tag}
              </span>
              <h2 className="text-[22px] font-black leading-snug text-ink-900">{s.title}</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">{s.body}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-9 pt-5">
        <div className="mb-5 flex justify-center gap-1.5">
          {onboardingSlides.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} aria-label={`第 ${i + 1} 頁`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-purple-500' : 'w-1.5 bg-ink-200'}`} />
          ))}
        </div>
        <Button onClick={() => (last ? go('login') : setIndex(index + 1))}>
          {last ? '開始你的綠色追蹤' : '下一步'}
        </Button>
      </div>
    </div>
  );
}

/** 引導頁視覺素材：以拼貼卡片重現論文所述之四格／雙格構圖 */
function OnboardArt({ kind, index }: { kind: string; index: number }) {
  const frame = 'overflow-hidden rounded-2xl shadow-card';

  if (kind === 'food') {
    const items = [
      { emoji:'🥗', n:'沙拉碗', p:'蛋白 12g', c:'#E5F4E6' },
      { emoji:'🍱', n:'日式便當', p:'碳水 68g', c:'#E3F6FB' },
      { emoji:'🍜', n:'牛肉麵', p:'熱量 620', c:'#F5F4FA' },
      { emoji:'🥞', n:'早餐盤', p:'脂肪 18g', c:'#FDF1DC' },
    ];
    return (
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2.5">
        {items.map(i => (
          <div key={i.n} className={`${frame} flex flex-col p-3.5`} style={{ background: i.c }}>
            <div className="flex flex-1 items-center justify-center text-[46px] leading-none">{i.emoji}</div>
            <div>
              <div className="text-[13px] font-bold text-ink-900">{i.n}</div>
              <div className="mt-1 inline-flex rounded-full bg-white/80 px-2 py-0.5 font-num text-[10px] font-bold text-purple-600">
                AI · {i.p}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'transit') {
    const items = [
      { emoji:'🚶', n:'步行', v:'-0.15' }, { emoji:'🚲', n:'自行車', v:'-0.3' },
      { emoji:'🚇', n:'捷運', v:'-2.1' },  { emoji:'🚗', n:'乘車', v:'-1.8' },
    ];
    return (
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2.5">
        {items.map(i => (
          <div key={i.n} className={`${frame} flex flex-col bg-gradient-to-br from-purple-50 to-aqua-50 p-3.5`}>
            <div className="flex items-start justify-end">
              <span className="rounded-full bg-leaf-400 px-2 py-0.5 font-num text-[10px] font-bold text-white">
                {i.v} kg
              </span>
            </div>
            <div className="flex flex-1 items-center justify-center text-[44px] leading-none">{i.emoji}</div>
            <div>
              <div className="text-[13px] font-bold text-ink-900">{i.n}</div>
              <div className="text-[10.5px] text-ink-400">CO₂e 已自動記錄</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'camera') {
    return (
      <div className={`${frame} flex h-full w-full flex-col justify-center bg-gradient-to-br from-aqua-100 to-purple-100 p-5`}>
        <div className="mx-auto grid w-full max-w-[230px] flex-1 place-items-center rounded-2xl border-[3px] border-dashed border-white bg-white/50">
          <span className="text-[76px]">🥗</span>
        </div>
        <div className="mt-4 flex shrink-0 items-center justify-center gap-2">
          <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-aqua-600">辨識中…</span>
          <span className="rounded-full bg-aqua-500 px-3 py-1.5 font-num text-[11px] font-bold text-white">468 kcal</span>
        </div>
      </div>
    );
  }
  if (kind === 'points') {
    return (
      <div className="flex h-full w-full flex-col gap-2.5">
        <div className={`${frame} flex flex-1 flex-col justify-center bg-gradient-to-br from-amber-100 to-amber-50 p-4`}>
          <div className="text-[11px] font-bold text-amber-500">本月累積碳積分</div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-num text-[38px] font-black leading-none text-amber-500">2,450</span>
            <span className="text-[13px] font-bold text-amber-400">pts</span>
          </div>
          <div className="mt-2 text-[11px] text-ink-400">1 kg CO₂ ＝ 10 pts · 透明化換算</div>
        </div>
        <div className={`${frame} flex shrink-0 items-center gap-3 bg-purple-50 p-4`}>
          <Mascot pose="avatar" className="w-16" />
          <p className="text-[12.5px] leading-relaxed text-purple-700">
            每一次低碳選擇，都換成看得見的回饋。
          </p>
        </div>
      </div>
    );
  }
  if (kind === 'rank') {
    const rows = [['🥇','Amy','15,320'], ['🥈','我','12,850'], ['🥉','Eric','10,420']];
    return (
      <div className={`${frame} flex h-full w-full flex-col justify-center bg-gradient-to-br from-purple-100 to-aqua-50 p-4`}>
        <div className="text-[12.5px] font-black text-purple-700">步行挑戰 · 減碳排行榜 TOP 3</div>
        <div className="mt-3 space-y-2">
          {rows.map(([m, n, v], i) => (
            <div key={n} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${i === 1 ? 'bg-purple-500 text-white' : 'bg-white'}`}>
              <span className="text-lg">{m}</span>
              <span className={`flex-1 text-[13px] font-bold ${i === 1 ? 'text-white' : 'text-ink-900'}`}>{n}</span>
              <span className={`font-num text-[13px] font-bold tabular-nums ${i === 1 ? 'text-white' : 'text-purple-600'}`}>{v} 步</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (kind === 'shop') {
    const goods = [['🍴','環保餐具','1,200'], ['👜','帆布提袋','1,800'], ['📔','再生手帳','900'], ['🍶','保溫瓶','2,600']];
    return (
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2.5">
        {goods.map(([e, n, p]) => (
          <div key={n} className={`${frame} flex flex-col items-center justify-center bg-leaf-50 p-3 text-center`}>
            <div className="text-[40px]">{e}</div>
            <div className="mt-2 text-[12.5px] font-bold text-ink-900">{n}</div>
            <div className="mt-1 font-num text-[11.5px] font-bold text-leaf-600">{p} pts</div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'plan') {
    return (
      <div className="relative h-full w-full">
        <div className={`${frame} flex h-full flex-col justify-center bg-gradient-to-br from-leaf-100 to-aqua-50 p-4`}>
          <div className="text-[12px] font-black text-leaf-600">本週綠色行動計畫</div>
          <div className="mt-3 space-y-2">
            {[['步行 8,000 步', 78], ['蔬食一餐', 60], ['搭乘大眾運輸', 92]].map(([l, p]) => (
              <div key={l as string}>
                <div className="mb-1 flex justify-between text-[11px] font-medium text-ink-600">
                  <span>{l}</span><span className="font-num">{p}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-leaf-400" style={{ width: `${p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Mascot pose="figure" className="absolute -bottom-1 right-1 w-24" />
      </div>
    );
  }
  /* start */
  return (
    <div className={`${frame} relative flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-100 via-purple-50 to-aqua-100 p-4`}>
      <Mascot pose="full" className="max-h-full w-auto" float />
      <div className="absolute left-3 top-4 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-purple-600 shadow-card">
        🌱 今日減碳 1.25 kg
      </div>
      <div className="absolute bottom-4 right-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-leaf-600 shadow-card">
        🚶 12,850 步
      </div>
    </div>
  );
}
