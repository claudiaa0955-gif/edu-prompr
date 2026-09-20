import type { MealEntry, ShopItem, TransportOption, UserProfile } from '../types';

export const defaultProfile: UserProfile = {
  photo: null,
  birthYear: 2001,
  gender: null,
  weight: 62.5,
  height: 166.5,
  activity: null,
  targetWeight: 59.4,
  healthIssues: [],
  allergies: [],
  commute: [],
  dietPlan: null,
  notifyTime: '上午 9:00',
  trackWillingness: null,
  goal: null,
  channel: null,
};

/* 引導頁文案 — 對應論文圖 4-2 至 4-9 */
export const onboardingSlides = [
  {
    title: '走進你的綠色生活',
    body: '每一天的選擇，都在改變世界的未來。現在，從你的每一步開始。',
    tag: 'AI 飲食辨識',
    art: 'food',
  },
  {
    title: '記錄每一次移動，掌握碳足跡',
    body: '通勤・步行・騎車・搭車，自動記錄你的日常行動，即時計算碳排放與減碳成果，讓數據看見你的改變。',
    tag: '自動化 × 數據化',
    art: 'transit',
  },
  {
    title: '拍下每一餐，管理卡路里',
    body: '拍照即可記錄飲食，快速分析熱量與營養，掌握每日卡路里攝取，健康與環保一次到位。',
    tag: '拍照即記錄',
    art: 'camera',
  },
  {
    title: '你的每一次減碳，都有價值',
    body: '選擇低碳生活方式，累積屬於你的碳積分，把日常通勤變成看得見的貢獻。',
    tag: '碳積分回饋',
    art: 'points',
  },
  {
    title: '一起挑戰，讓改變更有動力',
    body: '加入減碳排行榜，與朋友一起競賽，分享你的綠色成就，讓永續成為一種習慣。',
    tag: '社群競賽',
    art: 'rank',
  },
  {
    title: '綠色行動，換取真實回饋',
    body: '累積的碳積分可兌換環保餐具、文創商品與永續服飾，讓善意回到你的生活裡。',
    tag: '點數兌換',
    art: 'shop',
  },
  {
    title: '綠野追蹤，綠色行動計畫',
    body: '步行挑戰、減碳排行榜、每週任務，把永續目標拆成一步一步做得到的日常。',
    tag: '行動計畫',
    art: 'plan',
  },
  {
    title: '開始你的綠色追蹤',
    body: '下載綠野追蹤，記錄生活、減少碳排，打造專屬你的永續未來。',
    tag: '立即開始',
    art: 'start',
  },
];

export const loginMethods = [
  { key:'phone',    label:'通過手機繼續',     hint:'SMS 驗證' },
  { key:'google',   label:'通過 Google 繼續', hint:'OAuth' },
  { key:'line',     label:'通過 Line 繼續',   hint:'OAuth' },
  { key:'mail',     label:'通過信箱繼續',     hint:'Email' },
  { key:'apple',    label:'通過 Apple 繼續',  hint:'Apple ID' },
  { key:'facebook', label:'通過 Facebook 繼續', hint:'OAuth' },
];

export const goals = [
  { key:'lose',  label:'減輕體重', desc:'建立熱量赤字，健康穩定地瘦下來', emoji:'🎯' },
  { key:'keep',  label:'保持身材', desc:'維持現有體態，養成規律飲食習慣', emoji:'⚖️' },
  { key:'track', label:'足跡紀錄', desc:'專注記錄碳足跡，累積減碳成果',   emoji:'🌱' },
];

export const activityLevels = [
  { key:'low',      label:'活動量較少', desc:'久坐為主，每日步行少於 3,000 步', factor:1.2 },
  { key:'light',    label:'輕度活躍',   desc:'每週運動 1–2 次或通勤步行',       factor:1.375 },
  { key:'moderate', label:'適度活躍',   desc:'每週運動 3–5 次',                 factor:1.55 },
  { key:'high',     label:'非常活躍',   desc:'每週運動 6 次以上或勞力工作',     factor:1.725 },
];

export const healthIssues = ['膽固醇','血壓','血糖','腸道健康','心理健康','免疫健康','健康衰老','以上皆非'];
export const allergies = ['牛奶','雞蛋','魚','甲殼類','堅果','花生','無'];
export const dietPlans = [
  { key:'protein', label:'高蛋白飲食', emoji:'🥩', desc:'提高蛋白質比例，維持肌肉量' },
  { key:'balance', label:'均衡飲食',   emoji:'🥗', desc:'三大營養素均衡分配' },
  { key:'lowcarb', label:'低碳飲食',   emoji:'🥦', desc:'降低碳水比例與飲食碳排' },
  { key:'unsure',  label:'不確定',     emoji:'🤔', desc:'讓 AI 依據你的數據建議' },
];
export const notifyTimes = ['上午 9:00','中午 12:00','下午 3:00'];
export const trackWillingness = ['我會一直追蹤飲食','我偶而追蹤飲食','我不追蹤飲食'];
export const channels = ['Instagram','Facebook','TikTok','App Store','Google','其他'];

/* 交通工具碳排係數（kg CO₂e / km）— 參考環境部溫室氣體排放係數 */
export const transports: TransportOption[] = [
  { key:'walk',  label:'步行',   factor:0,     icon:'walk' },
  { key:'bike',  label:'自行車', factor:0,     icon:'bike' },
  { key:'metro', label:'捷運',   factor:0.041, icon:'train' },
  { key:'bus',   label:'公車',   factor:0.078, icon:'bus' },
  { key:'moto',  label:'機車',   factor:0.095, icon:'moto' },
  { key:'car',   label:'汽車',   factor:0.174, icon:'car' },
];

export const commuteOptions = ['步行','捷運','火車','高鐵','汽車','摩托車','腳踏車（機動）','腳踏車（人力）'];

/* 主頁今日數據 */
export const todayStats = {
  co2: 2.35,
  kcal: 1800,
  steps: 15000,
  trees: 6.4,
  points: 2450,
};

export const weeklyCarbon = [3.1, 2.8, 3.4, 2.2, 2.6, 1.9, 2.35];
export const weeklyLabels = ['一','二','三','四','五','六','日'];
export const kcalTrend = [1720, 1880, 1640, 1950, 1780, 1600, 1800];

export const meals: MealEntry[] = [
  { id:'m1', meal:'早餐', time:'08:30', name:'燕麥牛奶 + 水果', kcal:350, co2:0.75, emoji:'🥣' },
  { id:'m2', meal:'午餐', time:'12:20', name:'牛肉麵',           kcal:620, co2:2.10, emoji:'🍜' },
  { id:'m3', meal:'點心', time:'15:10', name:'美式咖啡',         kcal:15,  co2:0.21, emoji:'☕' },
  { id:'m4', meal:'晚餐', time:'19:05', name:'烤鮭魚沙拉',       kcal:480, co2:0.95, emoji:'🥗' },
];

export const aiRecognition = {
  name: '牛肉麵',
  confidence: 0.94,
  portion: '1 碗（約 550 g）',
  kcal: 620,
  co2: 2.1,
  nutrients: [
    { label:'蛋白質',   value:32, unit:'g', pct:28, color:'#8B82AD' },
    { label:'碳水化合物', value:78, unit:'g', pct:50, color:'#93D5E8' },
    { label:'脂肪',     value:18, unit:'g', pct:22, color:'#9DCC9F' },
  ],
};

export const shopCategories = [
  { key:'ware',    label:'環保餐具', emoji:'🍴' },
  { key:'culture', label:'文創商品', emoji:'🎨' },
  { key:'apparel', label:'永續服飾', emoji:'👕' },
  { key:'lowcarb', label:'低碳商品', emoji:'🌿' },
];

export const shopItems: ShopItem[] = [
  { id:'s1', name:'小麥環保餐具三件組', category:'ware',    points:1200, emoji:'🍴', stock:'現貨' },
  { id:'s2', name:'綠野追蹤帆布提袋',   category:'apparel', points:1800, emoji:'👜', stock:'現貨' },
  { id:'s3', name:'再生紙質手帳本',     category:'culture', points:  900, emoji:'📔', stock:'現貨' },
  { id:'s4', name:'不鏽鋼保溫瓶 500ml', category:'ware',    points:2600, emoji:'🍶', stock:'限量' },
  { id:'s5', name:'有機棉短袖上衣',     category:'apparel', points:3200, emoji:'👕', stock:'預購' },
  { id:'s6', name:'低碳蔬食料理包',     category:'lowcarb', points:  750, emoji:'🥘', stock:'現貨' },
];

export const leaderboard: { rank: number; name: string; steps: number; co2: number; me?: boolean }[] = [
  { rank:1, name:'Amy',  steps:15320, co2:5.4 },
  { rank:2, name:'小綠（我）', steps:12850, co2:4.7, me:true },
  { rank:3, name:'Eric', steps:10420, co2:3.9 },
  { rank:4, name:'Nina', steps: 9180, co2:3.2 },
];

export const achievements = [
  { label:'連續紀錄', value:'7 天',  emoji:'🔥' },
  { label:'熱量達標', value:'10 次', emoji:'🎯' },
  { label:'均衡飲食', value:'5 次',  emoji:'🥗' },
  { label:'減碳達人', value:'3 次',  emoji:'🌳' },
];

export const menuItems = [
  { key:'activity',  label:'行動紀錄',   desc:'自動辨識交通方式' },
  { key:'plan',      label:'減碳量計畫', desc:'本月減碳目標追蹤' },
  { key:'compare',   label:'交通替換比較', desc:'路線碳排一鍵比較' },
  { key:'food',      label:'飲食紀錄',   desc:'拍照辨識與卡路里' },
  { key:'results',   label:'減碳成果',   desc:'日／週／月／年統計' },
  { key:'rank',      label:'成就排行榜', desc:'與朋友一起挑戰' },
  { key:'shop',      label:'綠色商城',   desc:'碳積分兌換好物' },
  { key:'account',   label:'帳戶設定',   desc:'個人資料與偏好' },
];
