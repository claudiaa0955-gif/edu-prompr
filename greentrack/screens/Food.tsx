import React from 'react';
import { Camera, Image as ImageIcon, Mic, ListPlus, Sparkles, Check, X } from 'lucide-react';
import { Mascot, MascotSays } from '../components/Brand';
import { AppBar, Badge, Button, Card, Meter, Screen, SectionTitle, StatTile, Tabs, StatusBar } from '../components/ui';
import { DonutRing, LineChart } from '../components/charts';
import { aiRecognition, kcalTrend, meals, weeklyLabels } from '../data/mock';

/* 圖 4-41　拍照記錄食物 */
export function FoodCamera({ go }: { go: (id: string) => void }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-aqua-600 to-aqua-500">
      <StatusBar light />
      <div className="flex items-center justify-between px-5 pt-1 text-white">
        <button onClick={() => go('food')} aria-label="關閉" className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/15">
          <X size={20} />
        </button>
        <span className="text-[14px] font-bold">拍照記錄食物</span>
        <span className="w-9" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6">
        {/* 取景框 */}
        <div className="relative aspect-square w-full max-w-[280px]">
          <div className="grid h-full w-full place-items-center rounded-3xl bg-white/15 backdrop-blur">
            <span className="text-[88px]">🥩</span>
          </div>
          {[['left-0 top-0','border-l-4 border-t-4 rounded-tl-3xl'],
            ['right-0 top-0','border-r-4 border-t-4 rounded-tr-3xl'],
            ['left-0 bottom-0','border-l-4 border-b-4 rounded-bl-3xl'],
            ['right-0 bottom-0','border-r-4 border-b-4 rounded-br-3xl']].map(([pos, b]) => (
            <span key={pos} className={`absolute ${pos} h-12 w-12 border-white ${b}`} />
          ))}
        </div>
        <p className="mt-5 text-center text-[12.5px] leading-relaxed text-white/85">
          將食物置於框內，系統會自動辨識品項、<br />熱量與碳排放量
        </p>
      </div>

      <div className="flex items-center justify-around px-8 pb-12">
        <button onClick={() => go('food-ai')} className="flex flex-col items-center gap-1.5 text-white/90 transition hover:text-white">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur"><ImageIcon size={20} /></span>
          <span className="text-[11px] font-bold">相簿</span>
        </button>
        <button onClick={() => go('food-ai')} aria-label="拍照"
          className="grid h-[72px] w-[72px] place-items-center rounded-full border-4 border-white/60 bg-white transition active:scale-95">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-aqua-500 text-white"><Camera size={26} /></span>
        </button>
        <button onClick={() => go('food-list')} className="flex flex-col items-center gap-1.5 text-white/90 transition hover:text-white">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur"><ListPlus size={20} /></span>
          <span className="text-[11px] font-bold">手動</span>
        </button>
      </div>
    </div>
  );
}

/* 圖 4-42 ~ 4-45　飲食紀錄模組（四個分頁） */
export function Food({ go, tab, setTab }: {
  go: (id: string) => void; tab: string; setTab: (t: string) => void;
}) {
  return (
    <Screen bg="bg-aqua-50">
      <AppBar title="飲食紀錄" sub="拍照即記錄，熱量與碳排一次掌握" onBack={() => go('home')} />
      <Tabs tone="aqua" value={tab} onChange={setTab} items={[
        { key:'calc', label:'卡洛里計算' }, { key:'ai', label:'AI 辨識結果' },
        { key:'list', label:'飲食紀錄' },   { key:'health', label:'健康分析' },
      ]} />
      <div className="mt-3">
        {tab === 'calc'   && <CalorieTab go={go} />}
        {tab === 'ai'     && <AiResultTab go={go} />}
        {tab === 'list'   && <FoodListTab />}
        {tab === 'health' && <HealthTab />}
      </div>
    </Screen>
  );
}

/* 圖 4-42　卡洛里計算 */
function CalorieTab({ go }: { go: (id: string) => void }) {
  const eaten = meals.reduce((a, m) => a + m.kcal, 0);
  const goal = 1800;
  return (
    <div className="gt-fade">
      <Card className="flex items-center gap-3 p-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-aqua-50">
          <Mascot pose="avatar" className="w-14" />
        </span>
        <div className="flex-1">
          <div className="text-[14px] font-bold text-ink-900">今天也要健康吃唷！</div>
          <div className="mt-0.5 text-[11.5px] text-ink-400">小綠 · 低碳飲食計畫第 12 天</div>
        </div>
      </Card>

      <Card className="mt-3 p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] font-bold text-ink-900">今日熱量</span>
          <span className="font-num text-[12px] text-ink-400">目標 {goal.toLocaleString()} kcal</span>
        </div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="font-num text-[32px] font-black leading-none text-aqua-600">{eaten.toLocaleString()}</span>
          <span className="text-[12px] font-bold text-ink-400">kcal</span>
          <span className="ml-auto font-num text-[12px] font-bold text-leaf-600">剩餘 {(goal - eaten).toLocaleString()}</span>
        </div>
        <div className="mt-3"><Meter pct={(eaten / goal) * 100} color="#63BFDA" /></div>
      </Card>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <Button variant="aqua" onClick={() => go('food-camera')} icon={<Camera size={16} />}>拍照紀錄食物</Button>
        <Button variant="outline" onClick={() => go('food-camera')} icon={<ImageIcon size={16} />}>照片上傳</Button>
      </div>

      <SectionTitle>AI 辨識功能</SectionTitle>
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { i:<Camera size={18} />,   l:'拍照辨識', d:'2 秒完成' },
          { i:<Mic size={18} />,      l:'語音輸入', d:'說出餐點' },
          { i:<ListPlus size={18} />, l:'手動清單', d:'自訂品項' },
        ].map(f => (
          <Card key={f.l} className="p-3 text-center" onClick={() => go('food-camera')}>
            <span className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-aqua-50 text-aqua-600">{f.i}</span>
            <div className="mt-2 text-[12px] font-bold text-ink-900">{f.l}</div>
            <div className="text-[10px] text-ink-300">{f.d}</div>
          </Card>
        ))}
      </div>

      <SectionTitle action={<span className="font-num text-[12px] text-ink-400">碳排 {meals.reduce((a,m)=>a+m.co2,0).toFixed(2)} kg</span>}>
        今日紀錄
      </SectionTitle>
      <Card className="px-4 py-1">
        {meals.map(m => (
          <div key={m.id} className="flex items-center gap-3 border-b border-ink-100 py-3 last:border-0">
            <span className="text-[22px]">{m.emoji}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-medium text-ink-900">{m.name}</span>
              <span className="font-num text-[11px] text-ink-300">{m.meal} · {m.time}</span>
            </span>
            <span className="text-right">
              <span className="block font-num text-[13px] font-bold text-ink-900">{m.kcal} kcal</span>
              <span className="block font-num text-[10.5px] text-aqua-600">{m.co2} kg CO₂e</span>
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
}

/* 圖 4-43　AI 辨識結果 */
function AiResultTab({ go }: { go: (id: string) => void }) {
  const r = aiRecognition;
  return (
    <div className="gt-fade">
      <div className="relative overflow-hidden rounded-xl2 bg-gradient-to-br from-aqua-200 to-aqua-100 shadow-card">
        <div className="grid h-44 place-items-center text-[84px]">🍜</div>
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-aqua-600 shadow-card backdrop-blur">
          <Sparkles size={12} /> AI 辨識完成
        </div>
      </div>

      <Card className="mt-3 p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[19px] font-black text-ink-900">{r.name}</div>
            <div className="mt-0.5 text-[11.5px] text-ink-400">{r.portion}</div>
          </div>
          <Badge tone="aqua">信心度 {(r.confidence * 100).toFixed(0)}%</Badge>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <StatTile label="熱量" value={r.kcal} unit="kcal" tone="aqua" />
          <StatTile label="碳排放" value={r.co2} unit="kg CO₂e" tone="purple" />
        </div>
      </Card>

      <SectionTitle>營養素分析</SectionTitle>
      <Card className="p-4">
        <DonutRing size={124} center={`${r.kcal}`} sub="kcal"
          segments={r.nutrients.map(n => ({ value: n.pct, color: n.color, label: `${n.label} ${n.value}${n.unit}` }))} />
      </Card>

      <SectionTitle>碳排提示</SectionTitle>
      <Card className="p-4">
        <MascotSays tone="aqua">
          牛肉屬於高碳排食材，改成雞肉或豆製品可減少約 <b className="font-num">1.4 kg CO₂e</b>。
        </MascotSays>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <Button variant="outline" onClick={() => go('food-camera')}>重新辨識</Button>
        <Button variant="aqua" onClick={() => go('food-list')} icon={<Check size={16} />}>加入紀錄</Button>
      </div>
    </div>
  );
}

/* 圖 4-44　飲食紀錄清單（時間軸） */
function FoodListTab() {
  const totalKcal = meals.reduce((a, m) => a + m.kcal, 0);
  const totalCo2 = meals.reduce((a, m) => a + m.co2, 0);
  return (
    <div className="gt-fade">
      <Card className="flex items-center justify-between p-3">
        <button className="grid h-8 w-8 place-items-center rounded-full text-ink-400 transition hover:bg-ink-50">‹</button>
        <span className="font-num text-[13.5px] font-bold text-ink-900">2028 / 06 / 08（四）</span>
        <button className="grid h-8 w-8 place-items-center rounded-full text-ink-400 transition hover:bg-ink-50">›</button>
      </Card>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <StatTile label="今日熱量" value={totalKcal.toLocaleString()} unit="kcal" tone="aqua" sub="目標 1,800" />
        <StatTile label="飲食碳排" value={totalCo2.toFixed(2)} unit="kg CO₂e" tone="purple" sub="日均 4.1" />
      </div>

      <SectionTitle>時間軸</SectionTitle>
      <div className="relative pl-6">
        <span className="absolute bottom-3 left-[7px] top-3 w-[2px] rounded-full bg-ink-100" />
        {meals.map(m => (
          <div key={m.id} className="relative mb-2.5">
            <span className="absolute -left-[22px] top-5 h-3 w-3 rounded-full border-[3px] border-white bg-aqua-400 shadow" />
            <Card className="p-3.5">
              <div className="flex items-center gap-3">
                <span className="text-[24px]">{m.emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-[13.5px] font-bold text-ink-900">{m.meal}</span>
                    <span className="font-num text-[11px] text-ink-300">{m.time}</span>
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-ink-500">{m.name}</span>
                </span>
              </div>
              <div className="mt-2.5 flex gap-2">
                <span className="rounded-full bg-aqua-50 px-2.5 py-1 font-num text-[11px] font-bold text-aqua-600">{m.kcal} kcal</span>
                <span className="rounded-full bg-purple-50 px-2.5 py-1 font-num text-[11px] font-bold text-purple-600">{m.co2} kg CO₂e</span>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 圖 4-45　健康分析 */
function HealthTab() {
  const [range, setRange] = React.useState('7');
  const data: Record<string, number[]> = {
    '7': kcalTrend,
    '30': [1810,1760,1720,1840,1690,1750,1800,1770,1830,1710],
    '90': [1880,1840,1810,1790,1760,1740,1720,1700,1690,1680,1660,1650],
  };
  const d = data[range];
  const labels = range === '7' ? weeklyLabels : d.map((_, i) => `${i + 1}`);
  return (
    <div className="gt-fade">
      <Tabs tone="aqua" value={range} onChange={setRange}
            items={[{ key:'7', label:'7 天' }, { key:'30', label:'30 天' }, { key:'90', label:'90 天' }]} />

      <SectionTitle>熱量趨勢</SectionTitle>
      <Card className="p-4">
        <LineChart data={d} labels={labels} color="#79B77D" fill="rgba(121,183,125,.16)"
                   target={1800} targetLabel="目標熱量 1,800 " unit="kcal" height={126} />
      </Card>

      <SectionTitle>營養素分析</SectionTitle>
      <Card className="p-4">
        {[
          { l:'蛋白質',      p:28, c:'#8B82AD', tip:'略低於建議值' },
          { l:'碳水化合物',  p:50, c:'#93D5E8', tip:'符合建議區間' },
          { l:'脂肪',        p:22, c:'#9DCC9F', tip:'符合建議區間' },
        ].map(n => (
          <div key={n.l} className="border-b border-ink-100 py-3 last:border-0">
            <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
              <span className="font-medium text-ink-700">{n.l}</span>
              <span className="flex items-center gap-2">
                <span className="text-[11px] text-ink-300">{n.tip}</span>
                <span className="font-num font-bold text-ink-900">{n.p}%</span>
              </span>
            </div>
            <Meter pct={n.p} color={n.c} />
          </div>
        ))}
        <div className="mt-3 rounded-2xl bg-aqua-50 px-3 py-2.5 text-[12px] leading-relaxed text-aqua-600">
          💡 建議補充牛肉、豆腐或雞胸等蛋白質來源，讓三大營養素更均衡。
        </div>
      </Card>

      <SectionTitle>飲食碳排與健康</SectionTitle>
      <div className="grid grid-cols-2 gap-2.5">
        <StatTile label="平均每日碳排" value="4.08" unit="kg CO₂e" tone="purple" sub="較上期 -6.2%" />
        <StatTile label="蔬食比例" value="34" unit="%" tone="leaf" sub="目標 40%" />
        <StatTile label="達標天數" value="5" unit="/ 7 天" tone="aqua" />
        <StatTile label="連續紀錄" value="12" unit="天" tone="amber" />
      </div>

      <div className="mt-4"><MascotSays tone="leaf">每週多一餐蔬食，一年就能少排約 190 kg CO₂e。</MascotSays></div>
    </div>
  );
}
