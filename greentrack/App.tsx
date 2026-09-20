import React from 'react';
import { LogoMark } from './components/Brand';
import { Account } from './screens/Account';
import { GoalSelect, Login } from './screens/Auth';
import { Onboarding, Splash } from './screens/Brand';
import { Food, FoodCamera } from './screens/Food';
import {
  ActivityRecord, CarbonPlan, CarbonResults, CarbonVisual,
  HamburgerMenu, Home, Leaderboard, TransportCompare,
} from './screens/Main';
import { Points } from './screens/Points';
import {
  RegActivity, RegAi, RegAllergy, RegCommute, RegDiet, RegDone, RegGender,
  RegHealth, RegHeight, RegNotify, RegPhoto, RegPlan, RegSummary, RegTarget,
  RegTrack, RegWeight, RegYear, Survey,
} from './screens/Register';
import { ShopEntry, ShopList } from './screens/Shop';
import { Spec } from './screens/Spec';
import { defaultProfile } from './data/mock';
import type { FlowKey, UserProfile } from './types';

/* ── 畫面索引（對應論文圖 4-1 ~ 4-50）──────────────────── */
interface Entry { id: string; fig: string; title: string; flow: FlowKey }

const FLOWS: { key: FlowKey; label: string; color: string }[] = [
  { key:'brand',   label:'品牌識別與引導頁',   color:'#8B82AD' },
  { key:'auth',    label:'登入與目標設定',     color:'#9C93C1' },
  { key:'profile', label:'註冊與個人資料流程', color:'#B8B1D6' },
  { key:'main',    label:'主要功能頁面',       color:'#8B82AD' },
  { key:'points',  label:'集點點數／碳積分',   color:'#F2C572' },
  { key:'food',    label:'飲食紀錄',           color:'#63BFDA' },
  { key:'shop',    label:'環保商城',           color:'#9DCC9F' },
  { key:'account', label:'帳戶設定',           color:'#5B5382' },
  { key:'spec',    label:'視覺設計規範',       color:'#C49BC1' },
];

const SCREENS: Entry[] = [
  { id:'splash',      fig:'圖 4-1',        title:'啟動畫面',         flow:'brand' },
  { id:'onboarding',  fig:'圖 4-2 ~ 4-9',  title:'引導頁面（八頁）', flow:'brand' },
  { id:'login',       fig:'圖 4-10',       title:'使用者登入',       flow:'auth' },
  { id:'goal',        fig:'圖 4-11',       title:'使用目標選擇',     flow:'auth' },
  { id:'reg-photo',   fig:'圖 4-12/4-13',  title:'① 個人照片',       flow:'profile' },
  { id:'reg-year',    fig:'圖 4-14',       title:'② 出生年份',       flow:'profile' },
  { id:'reg-gender',  fig:'圖 4-15',       title:'③ 性別',           flow:'profile' },
  { id:'reg-weight',  fig:'圖 4-16',       title:'④ 當前體重',       flow:'profile' },
  { id:'reg-height',  fig:'圖 4-17',       title:'⑤ 當前身高',       flow:'profile' },
  { id:'reg-activity',fig:'圖 4-18',       title:'⑥ 日常活動量',     flow:'profile' },
  { id:'reg-ai',      fig:'圖 4-19',       title:'⑦ AI 分析回饋',    flow:'profile' },
  { id:'reg-target',  fig:'圖 4-20',       title:'⑧ 目標體重',       flow:'profile' },
  { id:'reg-health',  fig:'圖 4-21',       title:'⑨ 健康問題',       flow:'profile' },
  { id:'reg-allergy', fig:'圖 4-22',       title:'⑩ 食物過敏',       flow:'profile' },
  { id:'reg-commute', fig:'圖 4-23',       title:'⑪ 通勤方式',       flow:'profile' },
  { id:'reg-diet',    fig:'圖 4-24',       title:'⑫ 飲食計劃偏好',   flow:'profile' },
  { id:'reg-notify',  fig:'圖 4-25',       title:'⑬ 通知時間',       flow:'profile' },
  { id:'reg-track',   fig:'圖 4-26',       title:'⑭ 飲食追蹤意願',   flow:'profile' },
  { id:'reg-summary', fig:'圖 4-27',       title:'⑮ 個人資料總結',   flow:'profile' },
  { id:'reg-plan',    fig:'圖 4-28',       title:'⑯ 專屬計畫生成',   flow:'profile' },
  { id:'reg-done',    fig:'圖 4-29',       title:'⑰ 目標已設定',     flow:'profile' },
  { id:'survey',      fig:'圖 4-30',       title:'得知管道調查',     flow:'profile' },
  { id:'home',        fig:'圖 4-31',       title:'APP 主頁面',       flow:'main' },
  { id:'menu',        fig:'圖 4-32',       title:'漢堡選單',         flow:'main' },
  { id:'activity',    fig:'圖 4-33',       title:'行動紀錄',         flow:'main' },
  { id:'compare',     fig:'圖 4-34',       title:'交通替換比較',     flow:'main' },
  { id:'plan',        fig:'圖 4-35',       title:'減碳量計畫',       flow:'main' },
  { id:'results',     fig:'圖 4-36',       title:'減碳成果',         flow:'main' },
  { id:'visual',      fig:'圖 4-37/4-38',  title:'視覺化紀錄碳排放', flow:'main' },
  { id:'rank',        fig:'延伸',          title:'成就排行榜',       flow:'main' },
  { id:'points',      fig:'圖 4-39/4-40',  title:'碳積分與點數計算', flow:'points' },
  { id:'food-camera', fig:'圖 4-41',       title:'拍照記錄食物',     flow:'food' },
  { id:'food',        fig:'圖 4-42 ~ 4-45',title:'飲食紀錄四分頁',   flow:'food' },
  { id:'shop',        fig:'圖 4-46/4-47',  title:'環保商城入口',     flow:'shop' },
  { id:'shop-list',   fig:'圖 4-48/4-49',  title:'商品列表',         flow:'shop' },
  { id:'account',     fig:'圖 4-50',       title:'帳戶設定',         flow:'account' },
  { id:'spec',        fig:'規範',          title:'視覺設計規範',     flow:'spec' },
];

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

  const view = () => {
    switch (screen) {
      case 'splash':      return <Splash go={go} />;
      case 'onboarding':  return <Onboarding go={go} index={slide} setIndex={setSlide} />;
      case 'login':       return <Login go={go} />;
      case 'goal':        return <GoalSelect {...step} />;
      case 'reg-photo':   return <RegPhoto {...step} />;
      case 'reg-year':    return <RegYear {...step} />;
      case 'reg-gender':  return <RegGender {...step} />;
      case 'reg-weight':  return <RegWeight {...step} />;
      case 'reg-height':  return <RegHeight {...step} />;
      case 'reg-activity':return <RegActivity {...step} />;
      case 'reg-ai':      return <RegAi {...step} />;
      case 'reg-target':  return <RegTarget {...step} />;
      case 'reg-health':  return <RegHealth {...step} />;
      case 'reg-allergy': return <RegAllergy {...step} />;
      case 'reg-commute': return <RegCommute {...step} />;
      case 'reg-diet':    return <RegDiet {...step} />;
      case 'reg-notify':  return <RegNotify {...step} />;
      case 'reg-track':   return <RegTrack {...step} />;
      case 'reg-summary': return <RegSummary {...step} />;
      case 'reg-plan':    return <RegPlan {...step} />;
      case 'reg-done':    return <RegDone {...step} />;
      case 'survey':      return <Survey {...step} />;
      case 'menu':
      case 'home':        return <Home go={go} openMenu={() => setMenuOpen(true)} tab={navTab} setTab={setNavTab} />;
      case 'activity':    return <ActivityRecord go={go} recording={recording} setRecording={setRecording} />;
      case 'compare':     return <TransportCompare go={go} />;
      case 'plan':        return <CarbonPlan go={go} />;
      case 'results':     return <CarbonResults go={go} />;
      case 'visual':      return <CarbonVisual go={go} />;
      case 'rank':        return <Leaderboard go={go} />;
      case 'points':      return <Points go={go} tab={pointsTab} setTab={setPointsTab} />;
      case 'food-camera': return <FoodCamera go={go} />;
      case 'food':        return <Food go={go} tab={foodTab} setTab={setFoodTab} />;
      case 'food-ai':     return <Food go={go} tab="ai" setTab={setFoodTab} />;
      case 'food-list':   return <Food go={go} tab="list" setTab={setFoodTab} />;
      case 'shop':        return <ShopEntry go={go} />;
      case 'shop-list':   return <ShopList go={go} />;
      case 'account':     return <Account go={go} />;
      case 'spec':        return <Spec />;
      default:            return <Splash go={go} />;
    }
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
            {view()}
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
