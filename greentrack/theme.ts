/**
 * Green Track 綠野追蹤 — 視覺設計規範（Design Tokens）
 *
 * 色彩系統直接取樣自品牌標誌（logo.webp）：
 *   水滴主體的藍紫 #8B82AD、水滴內襯的淡天藍 #BCE4F0、
 *   葉片的柔和綠 #9DCC9F、孔雀羽的藕紫 #C49BC1。
 * 各功能模組沿用論文第四章所述之色彩分區策略，但一律
 * 收斂到上述品牌色相中，確保整體識別一致。
 */

export const brand = {
  purple: '#8B82AD',
  purpleDeep: '#5B5382',
  aqua: '#BCE4F0',
  aquaDeep: '#3FA8C6',
  leaf: '#9DCC9F',
  leafDeep: '#5A9C60',
  mauve: '#C49BC1',
  amber: '#F2C572',
  amberDeep: '#E0A63E',
  ink: '#2E2A40',
} as const;

/** 功能模組主色 — 對應論文之模組色彩識別 */
export type ModuleKey =
  | 'brand' | 'onboarding' | 'home' | 'points' | 'food' | 'shop' | 'account';

export const moduleTheme: Record<ModuleKey, {
  label: string; tint: string; deep: string; soft: string; text: string;
}> = {
  brand:      { label: '品牌識別',   tint:'#8B82AD', deep:'#5B5382', soft:'#F5F4FA', text:'品牌藍紫' },
  onboarding: { label: '引導與註冊', tint:'#9C93C1', deep:'#7268A0', soft:'#F5F4FA', text:'品牌藍紫' },
  home:       { label: '主要功能',   tint:'#8B82AD', deep:'#5B5382', soft:'#F5F4FA', text:'品牌藍紫' },
  points:     { label: '集點碳積分', tint:'#F2C572', deep:'#BE8722', soft:'#FEF9EF', text:'暖琥珀' },
  food:       { label: '飲食紀錄',   tint:'#93D5E8', deep:'#2D87A3', soft:'#F3FBFD', text:'天空藍' },
  shop:       { label: '環保商城',   tint:'#9DCC9F', deep:'#437A48', soft:'#F4FAF4', text:'永續綠' },
  account:    { label: '帳戶設定',   tint:'#7268A0', deep:'#433D60', soft:'#F5F4FA', text:'深紫' },
};

/** 漸層 — 啟動畫面與各功能頁主視覺 */
export const gradient = {
  splash: 'linear-gradient(180deg,#FFFFFF 0%,#F3F1FA 42%,#DAD4EC 100%)',
  hero:   'linear-gradient(135deg,#8B82AD 0%,#9C93C1 46%,#BCE4F0 100%)',
  aqua:   'linear-gradient(135deg,#63BFDA 0%,#93D5E8 55%,#E3F6FB 100%)',
  leaf:   'linear-gradient(135deg,#5A9C60 0%,#9DCC9F 60%,#E5F4E6 100%)',
  amber:  'linear-gradient(135deg,#E0A63E 0%,#F2C572 55%,#FDF1DC 100%)',
  deep:   'linear-gradient(160deg,#5B5382 0%,#8B82AD 60%,#B8B1D6 100%)',
} as const;

/** 字級階層 */
export const typeScale = [
  { name: 'Display', px: 34, weight: 900, use: '啟動畫面、慶賀頁大標' },
  { name: 'H1',      px: 26, weight: 700, use: '頁面主標題' },
  { name: 'H2',      px: 20, weight: 700, use: '區塊標題' },
  { name: 'H3',      px: 17, weight: 500, use: '卡片標題' },
  { name: 'Body',    px: 15, weight: 400, use: '內文與說明' },
  { name: 'Caption', px: 12, weight: 400, use: '輔助說明、單位' },
];

/** 8pt 間距系統 */
export const spacing = [4, 8, 12, 16, 20, 24, 32, 40];
