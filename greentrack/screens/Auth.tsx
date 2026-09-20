import React from 'react';
import { Logo, Mascot, MascotSays } from '../components/Brand';
import { AppBar, Button, OptionRow, Screen } from '../components/ui';
import { goals, loginMethods } from '../data/mock';
import type { UserProfile } from '../types';

/**
 * 登入方式圖示。
 * Apple 標誌必須以內嵌 SVG 繪製：U+F8FF（）是 Apple 私有造字區的字元，
 * 只有 Apple 平台的系統字型才有對應字形，其他平台會渲染成空白。
 */
const brandIcon: Record<string, React.ReactNode> = {
  phone: <span className="text-[15px]">📱</span>,
  google: <span className="font-num text-[15px] font-black text-[#4285F4]">G</span>,
  line: <span className="text-[13px] font-black text-[#06C755]">LINE</span>,
  mail: <span className="text-[15px]">✉️</span>,
  apple: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="#000000" aria-hidden focusable="false">
      <path d="M16.365 12.78c.026 2.83 2.483 3.772 2.51 3.784-.02.066-.392 1.343-1.294 2.66-.78 1.14-1.59 2.274-2.865 2.297-1.253.023-1.656-.743-3.088-.743-1.432 0-1.88.72-3.066.766-1.231.047-2.169-1.232-2.955-2.367-1.607-2.322-2.835-6.562-1.186-9.425.819-1.422 2.283-2.322 3.871-2.345 1.209-.023 2.35.813 3.089.813.739 0 2.126-1.005 3.584-.858.61.025 2.323.246 3.423 1.855-.088.055-2.043 1.193-2.023 3.563M14.02 4.548C14.673 3.757 15.113 2.656 14.993 1.56c-.942.038-2.082.628-2.757 1.418-.605.7-1.135 1.82-.992 2.895 1.05.081 2.123-.534 2.776-1.325" />
    </svg>
  ),
  facebook: <span className="font-num text-[15px] font-black text-[#1877F2]">f</span>,
};

/* 圖 4-10　使用者登入頁面 */
export function Login({ go }: { go: (id: string) => void }) {
  return (
    <Screen bg="bg-gradient-to-b from-purple-50 via-white to-aqua-50">
      <div className="flex flex-col items-center pt-2">
        <Logo size={96} />
        <div className="mt-1.5 text-[11px] tracking-[0.55em] pl-[0.55em] text-purple-500">綠野追蹤</div>
      </div>

      <div className="relative mx-auto mt-3 w-full max-w-[260px]">
        <div className="rounded-3xl bg-gradient-to-br from-purple-100 to-aqua-100 pt-3">
          <Mascot pose="figure" className="mx-auto w-40" float />
        </div>
      </div>

      <h2 className="mt-5 text-center text-[17px] font-bold text-ink-900">歡迎回到綠野追蹤</h2>
      <p className="mt-1 text-center text-[12px] text-ink-400">選擇你習慣的方式登入，一秒接續你的減碳紀錄</p>

      <div className="mt-5 space-y-2.5">
        {loginMethods.map(m => (
          <button key={m.key} onClick={() => go('goal')}
            className="flex w-full items-center gap-3 rounded-full border border-purple-200 bg-white px-4 py-3 text-left transition hover:border-purple-400 hover:bg-purple-50 active:scale-[.99]">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-purple-50">{brandIcon[m.key]}</span>
            <span className="flex-1 text-[14px] font-bold text-ink-900">{m.label}</span>
            <span className="text-[11px] text-ink-300">{m.hint}</span>
          </button>
        ))}
      </div>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-ink-300">
        繼續即表示你同意《服務條款》與《隱私權政策》
      </p>
    </Screen>
  );
}

/* 圖 4-11　使用目標選擇頁面 */
export function GoalSelect({ go, profile, set }: {
  go: (id: string) => void; profile: UserProfile; set: (p: Partial<UserProfile>) => void;
}) {
  return (
    <Screen>
      <AppBar title="你的目標是什麼？" sub="我們會依據目標為你量身打造計畫" onBack={() => go('login')} />
      <div className="space-y-2.5">
        {goals.map(g => (
          <OptionRow key={g.key} label={g.label} desc={g.desc} emoji={g.emoji}
            selected={profile.goal === g.key} onClick={() => set({ goal: g.key })} />
        ))}
      </div>

      <div className="mt-6 rounded-3xl bg-gradient-to-br from-purple-100 to-aqua-100 px-4 pt-4">
        <Mascot pose="figure" className="mx-auto w-36" float />
      </div>

      <div className="mt-5">
        <MascotSays>選好目標，我就陪你一路追蹤到達成為止！</MascotSays>
      </div>

      <div className="mt-6">
        <Button onClick={() => go('reg-photo')} disabled={!profile.goal}>讓我們開始吧</Button>
      </div>
    </Screen>
  );
}
