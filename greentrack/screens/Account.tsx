import React from 'react';
import { User, Target, Heart, Bell, HelpCircle, Info, LogOut, ChevronRight } from 'lucide-react';
import { Mascot } from '../components/Brand';
import { AppBar, Card, ListRow, Meter, Screen, SectionTitle } from '../components/ui';
import { achievements } from '../data/mock';

/* 圖 4-50　帳戶設定頁面 */
export function Account({ go }: { go: (id: string) => void }) {
  const xp = 1200, xpMax = 20000;
  return (
    <Screen bg="bg-ink-50">
      <AppBar title="帳戶設定" onBack={() => go('home')} />

      {/* 個人資訊卡 */}
      <div className="rounded-xl2 bg-gradient-to-br from-purple-700 to-purple-500 p-5 text-white shadow-lift">
        <div className="flex items-center gap-3.5">
          <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-white/25 ring-2 ring-white/40">
            <Mascot pose="avatar" className="w-16" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-black">小綠</span>
              <span className="rounded-full bg-white/25 px-2 py-0.5 font-num text-[10.5px] font-bold backdrop-blur">Lv.12</span>
            </div>
            <div className="mt-1 inline-flex rounded-full bg-mauve-300/40 px-2.5 py-0.5 text-[11px] font-bold">健康新星</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-[11px] opacity-90">
            <span>經驗值</span>
            <span className="font-num font-bold">{xp.toLocaleString()} / {xpMax.toLocaleString()} XP</span>
          </div>
          <Meter pct={(xp / xpMax) * 100} color="linear-gradient(90deg,#BCE4F0,#9DCC9F)" track="rgba(255,255,255,.25)" height={8} />
          <p className="mt-2 text-[11px] opacity-80">再獲得 {(xpMax - xp).toLocaleString()} XP 即可升至 Lv.13</p>
        </div>
      </div>

      {/* 我的成就 */}
      <SectionTitle action={<button className="text-[12px] font-bold text-purple-500">全部成就</button>}>我的成就</SectionTitle>
      <div className="grid grid-cols-2 gap-2.5">
        {achievements.map(a => (
          <Card key={a.label} className="flex items-center gap-3 p-3.5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-purple-50 text-[22px]">{a.emoji}</span>
            <span>
              <span className="block text-[12.5px] font-bold text-ink-900">{a.label}</span>
              <span className="block font-num text-[13px] font-black text-purple-600">{a.value}</span>
            </span>
          </Card>
        ))}
      </div>

      {/* 功能選單列表 */}
      <SectionTitle>帳戶</SectionTitle>
      <Card className="px-4 py-1">
        <ListRow icon={<User size={17} />}   label="個人資料" value="小綠" />
        <ListRow icon={<Target size={17} />} label="目標設定" value="減輕體重" onClick={() => go('reg-target')} />
        <ListRow icon={<Heart size={17} />}  label="我的最愛" value="6 項" onClick={() => go('shop-list')} />
        <ListRow icon={<Bell size={17} />}   label="通知設定" value="上午 9:00" onClick={() => go('reg-notify')} />
      </Card>

      <SectionTitle>支援</SectionTitle>
      <Card className="px-4 py-1">
        <ListRow icon={<HelpCircle size={17} />} label="常見問題" />
        <ListRow icon={<Info size={17} />}       label="關於我們" value="v1.0" onClick={() => go('spec')} />
      </Card>

      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-ink-200 py-3 text-[13.5px] font-bold text-ink-400 transition hover:border-purple-300 hover:text-purple-600">
        <LogOut size={16} /> 登出
      </button>

      <p className="mt-4 text-center text-[11px] text-ink-300">Green Track 綠野追蹤 · 永續行動碳足跡紀錄</p>
    </Screen>
  );
}
