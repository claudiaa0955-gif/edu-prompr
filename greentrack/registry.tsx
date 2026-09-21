import React from 'react';
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
import type { FlowKey, UserProfile } from './types';

/**
 * 畫面索引與渲染器 — 互動原型（App）與一頁總覽（Gallery）共用同一份定義，
 * 新增或調整畫面時只需改這裡一處。
 */

export interface Entry {
  id: string;
  /** 論文圖號 */
  fig: string;
  title: string;
  flow: FlowKey;
}

export const FLOWS: { key: FlowKey; label: string; color: string }[] = [
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

export const SCREENS: Entry[] = [
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

/** 渲染畫面所需的狀態與回呼 */
export interface ScreenContext {
  go: (id: string) => void;
  profile: UserProfile;
  set: (p: Partial<UserProfile>) => void;
  slide: number;
  setSlide: (i: number) => void;
  navTab: string;
  setNavTab: (t: string) => void;
  pointsTab: string;
  setPointsTab: (t: string) => void;
  foodTab: string;
  setFoodTab: (t: string) => void;
  recording: boolean;
  setRecording: (b: boolean) => void;
  openMenu: () => void;
}

/** 依畫面 id 渲染對應元件 */
export function renderScreen(id: string, c: ScreenContext): React.ReactNode {
  const step = { go: c.go, profile: c.profile, set: c.set };
  switch (id) {
    case 'splash':      return <Splash go={c.go} />;
    case 'onboarding':  return <Onboarding go={c.go} index={c.slide} setIndex={c.setSlide} />;
    case 'login':       return <Login go={c.go} />;
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
    case 'home':        return <Home go={c.go} openMenu={c.openMenu} tab={c.navTab} setTab={c.setNavTab} />;
    case 'activity':    return <ActivityRecord go={c.go} recording={c.recording} setRecording={c.setRecording} />;
    case 'compare':     return <TransportCompare go={c.go} />;
    case 'plan':        return <CarbonPlan go={c.go} />;
    case 'results':     return <CarbonResults go={c.go} />;
    case 'visual':      return <CarbonVisual go={c.go} />;
    case 'rank':        return <Leaderboard go={c.go} />;
    case 'points':      return <Points go={c.go} tab={c.pointsTab} setTab={c.setPointsTab} />;
    case 'food-camera': return <FoodCamera go={c.go} />;
    case 'food':        return <Food go={c.go} tab={c.foodTab} setTab={c.setFoodTab} />;
    case 'food-ai':     return <Food go={c.go} tab="ai" setTab={c.setFoodTab} />;
    case 'food-list':   return <Food go={c.go} tab="list" setTab={c.setFoodTab} />;
    case 'shop':        return <ShopEntry go={c.go} />;
    case 'shop-list':   return <ShopList go={c.go} />;
    case 'account':     return <Account go={c.go} />;
    case 'spec':        return <Spec />;
    default:            return <Splash go={c.go} />;
  }
}

export { HamburgerMenu };
