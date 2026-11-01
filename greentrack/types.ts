export type ScreenId = string;

export interface ScreenMeta {
  id: ScreenId;
  /** 論文圖號，例：'圖 4-31' */
  fig: string;
  title: string;
  flow: FlowKey;
  note: string;
}

export type FlowKey =
  | 'brand' | 'auth' | 'profile' | 'main' | 'points' | 'food' | 'shop' | 'account' | 'spec';

export interface UserProfile {
  photo: string | null;
  birthYear: number;
  gender: '男性' | '女性' | '非二元性別' | null;
  weight: number;
  height: number;
  activity: string | null;
  targetWeight: number;
  healthIssues: string[];
  allergies: string[];
  commute: string[];
  dietPlan: string | null;
  notifyTime: string | null;
  trackWillingness: string | null;
  goal: string | null;
  channel: string | null;
}

export interface TransportOption {
  key: string;
  label: string;
  /** kg CO₂e per km */
  factor: number;
  icon: string;
}

export interface MealEntry {
  id: string;
  meal: '早餐' | '午餐' | '晚餐' | '點心';
  time: string;
  name: string;
  kcal: number;
  co2: number;
  emoji: string;
}

export interface ShopItem {
  id: string;
  name: string;
  category: string;
  points: number;
  emoji: string;
  stock: string;
}
