import React from 'react';
import { Camera, Sparkles, PartyPopper } from 'lucide-react';
import { Mascot, MascotSays } from '../components/Brand';
import { Badge, Button, Card, OptionRow, Screen, StepProgress } from '../components/ui';
import { BmiScale, DonutRing, LineChart, RulerH, RulerV, WheelPicker } from '../components/charts';
import {
  activityLevels, allergies as allergyOptions, channels, commuteOptions,
  dietPlans, healthIssues, notifyTimes, trackWillingness,
} from '../data/mock';
import type { UserProfile } from '../types';

export interface StepProps {
  go: (id: string) => void;
  profile: UserProfile;
  set: (p: Partial<UserProfile>) => void;
}

/** 註冊流程共用版型：進度條 + 標題 + 內容 + 主要行動按鈕 */
function Step({ step, title, sub, children, next, back, go, cta = '繼續', disabled }: {
  step: number; title: string; sub?: string; children: React.ReactNode;
  next: string; back?: string; go: (id: string) => void; cta?: string; disabled?: boolean;
}) {
  return (
    <Screen>
      <StepProgress step={step} total={17} onBack={back ? () => go(back) : undefined} />
      <div className="gt-fade flex min-h-[calc(100%-3rem)] flex-col">
        <h1 className="text-[22px] font-black leading-snug text-ink-900">{title}</h1>
        {sub && <p className="mt-1.5 text-[13px] leading-relaxed text-ink-400">{sub}</p>}
        <div className="mt-5 flex-1">{children}</div>
        <div className="sticky bottom-0 -mx-5 mt-6 bg-gradient-to-t from-white via-white to-transparent px-5 pb-1 pt-4">
          <Button onClick={() => go(next)} disabled={disabled}>{cta}</Button>
        </div>
      </div>
    </Screen>
  );
}

export const bmi = (w: number, h: number) => +(w / ((h / 100) ** 2)).toFixed(1);
const bmiLabel = (v: number) => v < 18.5 ? '體重過輕' : v < 24 ? '健康體重' : v < 27 ? '體重過重' : '肥胖';
const bmiTone = (v: number) => v >= 18.5 && v < 24 ? 'text-leaf-600' : 'text-amber-500';

/* 步驟一　圖 4-12 / 4-13　個人照片拍攝 */
export function RegPhoto({ go, profile, set }: StepProps) {
  const shot = !!profile.photo;
  return (
    <Step step={1} title="開啟相機拍張自己照片吧！" sub="個人照片會顯示在你的減碳成果卡與排行榜上"
          back="goal" next="reg-year" go={go} cta={shot ? '看起來不錯，繼續' : '稍後再拍'}>
      <div className="flex flex-col items-center">
        {shot ? (
          /* 藝術化磨邊相片框 */
          <div className="relative rounded-[26px] bg-white p-3 shadow-lift">
            <div className="overflow-hidden rounded-[18px] bg-gradient-to-br from-purple-100 to-aqua-100 p-4">
              <Mascot pose="avatar" className="w-40" />
            </div>
            <div className="mt-2.5 text-center font-brand text-xl text-purple-500">小綠</div>
            <span className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full bg-leaf-400 text-white shadow-md">✓</span>
          </div>
        ) : (
          <>
            <Mascot pose="figure" className="w-44" float />
            <button onClick={() => set({ photo: 'mascot' })}
              className="mt-4 flex flex-col items-center gap-2 rounded-3xl border-[3px] border-dashed border-purple-200 bg-purple-50 px-10 py-6 transition hover:border-purple-400 hover:bg-purple-100">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-purple-500 text-white shadow-lift">
                <Camera size={24} />
              </span>
              <span className="text-[13px] font-bold text-purple-600">請點此處拍照</span>
            </button>
          </>
        )}
        <p className="mt-5 text-center text-[12px] text-ink-300">照片僅儲存於本機，可隨時於帳戶設定更換</p>
      </div>
    </Step>
  );
}

/* 步驟二　圖 4-14　出生年份 */
export function RegYear({ go, profile, set }: StepProps) {
  const years = Array.from({ length: 61 }, (_, i) => 1965 + i);
  return (
    <Step step={2} title="你的出生年份？" sub="用於計算基礎代謝率與個人化熱量建議"
          back="reg-photo" next="reg-gender" go={go}>
      <WheelPicker value={profile.birthYear} onChange={v => set({ birthYear: v })} options={years} suffix=" 年" />
      <div className="mt-6 flex items-end justify-center rounded-3xl bg-gradient-to-br from-purple-50 to-aqua-50 pt-4">
        <Mascot pose="figure" className="w-36" />
      </div>
      <p className="mt-4 text-center text-[12px] text-ink-400">
        目前年齡 <span className="font-num font-bold text-purple-600">{2026 - profile.birthYear}</span> 歲
      </p>
    </Step>
  );
}

/* 步驟三　圖 4-15　性別 */
export function RegGender({ go, profile, set }: StepProps) {
  const opts: { v: UserProfile['gender']; emoji: string; desc: string }[] = [
    { v: '男性', emoji: '🧑', desc: '以男性公式計算基礎代謝率' },
    { v: '女性', emoji: '👩', desc: '以女性公式計算基礎代謝率' },
    { v: '非二元性別', emoji: '🧑‍🦱', desc: '採用兩者平均值計算，尊重多元認同' },
  ];
  return (
    <Step step={3} title="你的性別是？" sub="本欄位僅用於代謝計算，你可以隨時修改"
          back="reg-year" next="reg-weight" go={go} disabled={!profile.gender}>
      <div className="space-y-2.5">
        {opts.map(o => (
          <OptionRow key={o.v!} label={o.v!} desc={o.desc} emoji={o.emoji}
            selected={profile.gender === o.v} onClick={() => set({ gender: o.v })} />
        ))}
      </div>
      <div className="mt-6"><MascotSays>包容每一種身分，是我們設計的起點。</MascotSays></div>
    </Step>
  );
}

/* 步驟四　圖 4-16　當前體重（含即時 BMI 回饋） */
export function RegWeight({ go, profile, set }: StepProps) {
  const v = bmi(profile.weight, profile.height);
  return (
    <Step step={4} title="你目前的體重？" sub="左右滑動刻度尺，精準到 0.1 公斤"
          back="reg-gender" next="reg-height" go={go}>
      <RulerH value={profile.weight} onChange={w => set({ weight: w })} min={35} max={140} unit="kg" />
      <Card className="mt-7 p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] font-bold text-ink-700">即時 BMI</span>
          <span className="font-num text-[26px] font-extrabold tabular-nums text-ink-900">{v}</span>
        </div>
        <div className="mt-3"><BmiScale bmi={v} /></div>
        <div className="mt-3 flex items-center gap-2">
          <Badge tone={v >= 18.5 && v < 24 ? 'leaf' : 'amber'}>{bmiLabel(v)}</Badge>
          <span className={`text-[12px] font-medium ${bmiTone(v)}`}>你有一個很棒的身材、繼續保持！</span>
        </div>
      </Card>
      <div className="mt-5"><MascotSays>體重每天都會浮動，看趨勢比看單一數字更準確喔。</MascotSays></div>
    </Step>
  );
}

/* 步驟五　圖 4-17　當前身高（垂直刻度尺） */
export function RegHeight({ go, profile, set }: StepProps) {
  return (
    <Step step={5} title="你目前的身高？" sub="上下滑動，以垂直方向對應真實量身高的情境"
          back="reg-weight" next="reg-activity" go={go}>
      <div className="flex items-end gap-3">
        <div className="min-w-0 flex-1">
          <RulerV value={profile.height} onChange={h => set({ height: h })} min={140} max={200} />
        </div>
        <div className="w-24 shrink-0 overflow-hidden">
          <Mascot pose="figure" className="w-full" />
        </div>
      </div>
      <Card className="mt-6 p-4">
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-ink-500">身高</span>
          <span className="font-num font-bold text-ink-900">{profile.height.toFixed(1)} cm</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[13px]">
          <span className="text-ink-500">依目前體重換算 BMI</span>
          <span className="font-num font-bold text-purple-600">{bmi(profile.weight, profile.height)}</span>
        </div>
      </Card>
    </Step>
  );
}

/* 步驟六　圖 4-18　日常活動量 */
export function RegActivity({ go, profile, set }: StepProps) {
  return (
    <Step step={6} title="告訴我關於你典型的日常活動" sub="活動量會影響每日建議熱量與減碳目標"
          back="reg-height" next="reg-ai" go={go} disabled={!profile.activity}>
      <div className="space-y-2.5">
        {activityLevels.map(a => (
          <OptionRow key={a.key} label={a.label} desc={a.desc}
            selected={profile.activity === a.key} onClick={() => set({ activity: a.key })} />
        ))}
      </div>
      <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-300">
        分級參照國際運動科學之體力活動係數（PAL 1.2–1.725）
      </p>
    </Step>
  );
}

/* 步驟七　圖 4-19　AI 個人化分析回饋 */
export function RegAi({ go, profile }: StepProps) {
  const diff = +(profile.weight - profile.targetWeight).toFixed(1);
  return (
    <Step step={7} title="AI 為你完成第一次分析" sub="依據你的性別、年齡、身高體重與活動量即時計算"
          back="reg-activity" next="reg-target" go={go} cta="太好了，繼續">
      <div className="rounded-3xl bg-gradient-to-br from-purple-500 to-aqua-300 p-5 text-white shadow-lift">
        <div className="flex items-center gap-2 text-[12px] font-bold opacity-90">
          <Sparkles size={15} /> AI 個人化分析
        </div>
        <p className="mt-3 text-[19px] font-black leading-snug">
          減掉 {Math.max(0.5, diff)} kg 是合理的。<br />我們將幫助你快速達成目標！
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { l: '目前 BMI', v: bmi(profile.weight, profile.height) },
            { l: '建議熱量', v: '1,200' },
            { l: '預計週期', v: '8 週' },
          ].map(s => (
            <div key={s.l} className="rounded-2xl bg-white/15 px-2 py-2.5 text-center backdrop-blur">
              <div className="text-[10px] opacity-85">{s.l}</div>
              <div className="mt-0.5 font-num text-[16px] font-extrabold">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex justify-center rounded-3xl bg-ink-50 pt-4">
        <Mascot pose="full" className="w-44" float />
      </div>
    </Step>
  );
}

/* 步驟八　圖 4-20　目標體重 */
export function RegTarget({ go, profile, set }: StepProps) {
  const drop = +(((profile.weight - profile.targetWeight) / profile.weight) * 100).toFixed(1);
  const healthy = drop >= 3 && drop <= 12;
  return (
    <Step step={8} title="設定你的目標體重" sub="建議以 5%–10% 為階段性目標，穩定且可持續"
          back="reg-ai" next="reg-health" go={go}>
      <RulerH value={profile.targetWeight} onChange={t => set({ targetWeight: t })} min={35} max={140} unit="kg" />
      <Card className={`mt-7 p-4 ${healthy ? 'ring-1 ring-leaf-200' : ''}`}>
        <div className="flex items-center gap-2">
          <Badge tone={healthy ? 'leaf' : 'amber'}>{healthy ? '有益健康' : '請謹慎評估'}</Badge>
          <span className="font-num text-[13px] font-bold text-ink-700">
            減重 {drop > 0 ? drop : 0}%
          </span>
        </div>
        <p className="mt-2.5 text-[13px] leading-relaxed text-ink-500">
          {healthy
            ? '減重 5% 至 10% 可增強健康和幸福感！我們會把它拆成每週可達成的小目標。'
            : '這個幅度超出一般建議區間，建議與專業人員討論後再設定。'}
        </p>
      </Card>
      <div className="mt-5"><MascotSays tone="leaf">一步一步來，我幫你記錄每一天的進度。</MascotSays></div>
    </Step>
  );
}

/* 步驟九　圖 4-21　健康問題（複選） */
export function RegHealth({ go, profile, set }: StepProps) {
  const toggle = (v: string) => {
    if (v === '以上皆非') return set({ healthIssues: ['以上皆非'] });
    const base = profile.healthIssues.filter(x => x !== '以上皆非');
    set({ healthIssues: base.includes(v) ? base.filter(x => x !== v) : [...base, v] });
  };
  return (
    <Step step={9} title="你有任何健康問題嗎？" sub="可複選，將作為個人化飲食建議之依據"
          back="reg-target" next="reg-allergy" go={go} disabled={!profile.healthIssues.length}>
      <div className="space-y-2">
        {healthIssues.map(h => (
          <OptionRow key={h} label={h} multi selected={profile.healthIssues.includes(h)} onClick={() => toggle(h)} />
        ))}
      </div>
    </Step>
  );
}

/* 步驟十　圖 4-22　食物過敏（複選） */
export function RegAllergy({ go, profile, set }: StepProps) {
  const toggle = (v: string) => {
    if (v === '無') return set({ allergies: ['無'] });
    const base = profile.allergies.filter(x => x !== '無');
    set({ allergies: base.includes(v) ? base.filter(x => x !== v) : [...base, v] });
  };
  return (
    <Step step={10} title="你有任何食物過敏嗎？" sub="AI 辨識與飲食推薦會自動過濾你的過敏原"
          back="reg-health" next="reg-commute" go={go} disabled={!profile.allergies.length}>
      <div className="space-y-2">
        {allergyOptions.map(a => (
          <OptionRow key={a} label={a} multi selected={profile.allergies.includes(a)} onClick={() => toggle(a)} />
        ))}
      </div>
      <div className="mt-5"><MascotSays tone="aqua">安全第一，含有過敏原的建議我不會推薦給你。</MascotSays></div>
    </Step>
  );
}

/* 步驟十一　圖 4-23　通勤方式（複選） */
export function RegCommute({ go, profile, set }: StepProps) {
  const toggle = (v: string) =>
    set({ commute: profile.commute.includes(v) ? profile.commute.filter(x => x !== v) : [...profile.commute, v] });
  const emoji: Record<string, string> = {
    '步行':'🚶','捷運':'🚇','火車':'🚆','高鐵':'🚄','汽車':'🚗','摩托車':'🏍️','腳踏車（機動）':'🛵','腳踏車（人力）':'🚲',
  };
  return (
    <Step step={11} title="你平日通勤常使用的方式？" sub="行動紀錄會依此優化自動辨識的判斷邏輯"
          back="reg-allergy" next="reg-diet" go={go} disabled={!profile.commute.length}>
      <div className="grid grid-cols-2 gap-2">
        {commuteOptions.map(c => {
          const on = profile.commute.includes(c);
          return (
            <button key={c} onClick={() => toggle(c)}
              className={`rounded-2xl border-2 px-3 py-3.5 text-center transition
                ${on ? 'border-purple-400 bg-purple-50' : 'border-ink-100 bg-white hover:border-purple-200'}`}>
              <div className="text-[26px] leading-none">{emoji[c]}</div>
              <div className={`mt-1.5 text-[12.5px] font-bold ${on ? 'text-purple-700' : 'text-ink-700'}`}>{c}</div>
            </button>
          );
        })}
      </div>
    </Step>
  );
}

/* 步驟十二　圖 4-24　飲食計劃偏好 */
export function RegDiet({ go, profile, set }: StepProps) {
  return (
    <Step step={12} title="哪個計劃最符合你的喜好？" sub="可於設定中隨時調整"
          back="reg-commute" next="reg-notify" go={go} disabled={!profile.dietPlan}>
      <div className="space-y-2.5">
        {dietPlans.map(d => (
          <OptionRow key={d.key} label={d.label} desc={d.desc} emoji={d.emoji}
            selected={profile.dietPlan === d.key} onClick={() => set({ dietPlan: d.key })} />
        ))}
      </div>
      <div className="mt-5 flex justify-center rounded-3xl bg-gradient-to-br from-purple-50 to-leaf-50 pt-4">
        <Mascot pose="figure" className="w-32" />
      </div>
    </Step>
  );
}

/* 步驟十三　圖 4-25　通知時間 */
export function RegNotify({ go, profile, set }: StepProps) {
  return (
    <Step step={13} title="讓我發送通知，成為你的飲食和追蹤步行的指南！" sub="選擇你最容易查看手機的時段"
          back="reg-diet" next="reg-track" go={go}>
      <div className="space-y-2.5">
        {notifyTimes.map(t => {
          const on = profile.notifyTime === t;
          return (
            <button key={t} onClick={() => set({ notifyTime: t })}
              className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-4 transition
                ${on ? 'border-mauve-400 bg-mauve-100' : 'border-ink-100 bg-white hover:border-mauve-300'}`}>
              <span className={`text-xl ${on ? 'text-mauve-400' : 'text-ink-300'}`}>★</span>
              <span className={`flex-1 text-left font-num text-[16px] font-bold ${on ? 'text-purple-700' : 'text-ink-700'}`}>{t}</span>
              {on && <span className="rounded-full bg-mauve-400 px-2.5 py-1 text-[10px] font-bold text-white">已選擇</span>}
            </button>
          );
        })}
      </div>
      <div className="mt-6 rounded-3xl bg-gradient-to-br from-purple-100 to-purple-50 px-4 pt-4">
        <Mascot pose="figure" className="mx-auto w-32" float />
      </div>
    </Step>
  );
}

/* 步驟十四　圖 4-26　飲食追蹤意願 */
export function RegTrack({ go, profile, set }: StepProps) {
  return (
    <Step step={14} title="你會追蹤飲食嗎？" sub="我們會依你的意願調整提醒頻率，不打擾你"
          back="reg-notify" next="reg-summary" go={go} disabled={!profile.trackWillingness}>
      <div className="space-y-2.5">
        {trackWillingness.map(t => (
          <OptionRow key={t} label={t} selected={profile.trackWillingness === t} onClick={() => set({ trackWillingness: t })} />
        ))}
      </div>
      <div className="mt-6 rounded-3xl bg-gradient-to-br from-leaf-50 to-aqua-50 px-4 pt-4">
        <Mascot pose="full" className="mx-auto w-40" float />
      </div>
    </Step>
  );
}

/* 步驟十五　圖 4-27　個人資料總結 */
export function RegSummary({ go, profile }: StepProps) {
  const tb = bmi(profile.targetWeight, profile.height);
  const rows = [
    ['目標 BMI', `${tb}`, bmiLabel(tb)],
    ['目前體重', `${profile.weight.toFixed(1)} kg`, ''],
    ['目標體重', `${profile.targetWeight.toFixed(1)} kg`, ''],
    ['身高', `${profile.height.toFixed(1)} cm`, ''],
    ['性別', profile.gender ?? '—', ''],
    ['出生年份', `${profile.birthYear} 年`, `${2026 - profile.birthYear} 歲`],
    ['活動量', activityLevels.find(a => a.key === profile.activity)?.label ?? '—', ''],
    ['飲食計劃', dietPlans.find(d => d.key === profile.dietPlan)?.label ?? '—', ''],
    ['通勤方式', profile.commute.join('、') || '—', ''],
    ['健康考量', profile.healthIssues.join('、') || '—', ''],
    ['過敏原', profile.allergies.join('、') || '—', ''],
  ];
  return (
    <Step step={15} title="這是你的個人總結" sub="確認無誤後，AI 就會生成你的專屬計畫"
          back="reg-track" next="reg-plan" go={go} cta="資料正確，生成計畫">
      <Card className="p-4">
        <div className="text-[12px] font-bold text-ink-500">目標 BMI</div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-num text-[34px] font-black leading-none text-purple-600">{tb}</span>
          <Badge tone={tb >= 18.5 && tb < 24 ? 'leaf' : 'amber'}>{bmiLabel(tb)}</Badge>
        </div>
        <div className="mt-4"><BmiScale bmi={tb} /></div>
      </Card>
      <Card className="mt-3 px-4 py-1">
        {rows.slice(1).map(([l, v, s]) => (
          <div key={l} className="flex items-center gap-3 border-b border-ink-100 py-3 text-[13px] last:border-0">
            <span className="w-20 shrink-0 text-ink-400">{l}</span>
            <span className="flex-1 text-right font-medium text-ink-900">{v}</span>
            {s && <span className="text-[11px] text-ink-300">{s}</span>}
          </div>
        ))}
      </Card>
    </Step>
  );
}

/* 步驟十六　圖 4-28　個人專屬計畫生成 */
export function RegPlan({ go, profile }: StepProps) {
  const w = profile.weight, t = profile.targetWeight;
  const curve = Array.from({ length: 9 }, (_, i) => +(w - (w - t) * (i / 8)).toFixed(1));
  const macros = [
    { label: '碳水化合物 120 g', value: 40, color: '#93D5E8' },
    { label: '蛋白質 75 g',      value: 25, color: '#8B82AD' },
    { label: '脂肪 46 g',        value: 35, color: '#9DCC9F' },
  ];
  return (
    <Step step={16} title="恭喜！你的專屬計畫已準備好" sub="AI 依據你的資料推算的減重曲線與每日營養配比"
          back="reg-summary" next="reg-done" go={go} cta="開始執行計畫">
      <Card className="p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] font-bold text-ink-900">預估體重變化</span>
          <span className="font-num text-[12px] text-ink-400">8 週</span>
        </div>
        <div className="mt-3">
          <LineChart data={curve} labels={['W0','','W2','','W4','','W6','','W8']}
                     target={t} targetLabel={`目標體重 ${t.toFixed(1)} `} unit="kg" color="#8B82AD" height={124} />
        </div>
      </Card>

      <Card className="mt-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-ink-900">每日推薦</span>
          <Badge tone="aqua">低碳飲食</Badge>
        </div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="font-num text-[30px] font-black text-purple-600">1,200</span>
          <span className="text-[12px] font-bold text-ink-400">Cal / 日</span>
        </div>
        <div className="mt-4"><DonutRing segments={macros} center="1,200" sub="Cal" size={118} /></div>
      </Card>

      <p className="mt-3 text-center text-[11px] text-ink-300">量身訂製飲食建議 · 每週依實際紀錄自動調整</p>
    </Step>
  );
}

/* 步驟十七　圖 4-29　目標已設定完成 */
export function RegDone({ go }: StepProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-purple-50 via-white to-aqua-50">
      <div className="h-11" />
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-leaf-400 text-white shadow-lift">
          <PartyPopper size={26} />
        </span>
        <h1 className="mt-5 text-[34px] font-black leading-tight text-purple-700">目標已設定</h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">
          你的專屬減碳與健康計畫已經就緒，<br />從今天起，一起把改變記錄下來。
        </p>
        <Mascot pose="full" className="mt-4 w-52" float />
      </div>
      <div className="px-8 pb-10">
        <Button onClick={() => go('survey')}>加油</Button>
      </div>
    </div>
  );
}

/* 圖 4-30　得知管道調查 */
export function Survey({ go, profile, set }: StepProps) {
  const emoji: Record<string, string> = {
    Instagram:'📸', Facebook:'👍', TikTok:'🎵', 'App Store':'', Google:'🔍', 其他:'💬',
  };
  return (
    <Screen>
      <div className="pt-3">
        <h1 className="text-[22px] font-black leading-snug text-ink-900">你最近是從哪裡聽說我們的？</h1>
        <p className="mt-1.5 text-[13px] text-ink-400">這會幫助我們把綠色行動帶給更多人</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {channels.map(c => {
          const on = profile.channel === c;
          return (
            <button key={c} onClick={() => set({ channel: c })}
              className={`rounded-2xl border-2 px-3 py-4 text-center transition
                ${on ? 'border-purple-400 bg-purple-50' : 'border-ink-100 bg-white hover:border-purple-200'}`}>
              <div className="text-[24px] leading-none">{emoji[c]}</div>
              <div className={`mt-1.5 text-[13px] font-bold ${on ? 'text-purple-700' : 'text-ink-700'}`}>{c}</div>
            </button>
          );
        })}
      </div>
      <div className="mt-6 rounded-3xl bg-gradient-to-br from-amber-100 to-purple-50 px-4 pt-4 text-center">
        <p className="text-[12px] font-bold text-amber-500">🎉 謝謝你加入綠野追蹤</p>
        <Mascot pose="full" className="mx-auto w-40" float />
      </div>
      <div className="mt-6">
        <Button onClick={() => go('home')} disabled={!profile.channel}>進入綠野追蹤</Button>
      </div>
    </Screen>
  );
}
