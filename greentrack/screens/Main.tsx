import React from 'react';
import {
  Menu, Bell, TreeDeciduous, Footprints, Flame, X, MapPin, Navigation,
  Play, Square, TrendingDown, Info, ChevronRight,
} from 'lucide-react';
import { LogoMark, Mascot, MascotSays } from '../components/Brand';
import {
  AppBar, Badge, BottomNav, Button, Card, Chip, Meter,
  Screen, SectionTitle, StatTile, StatusBar, Tabs,
} from '../components/ui';
import { BarChart, Gauge, LineChart, Sparkline } from '../components/charts';
import { leaderboard, menuItems, todayStats, transports, weeklyCarbon, weeklyLabels } from '../data/mock';

/* 圖 4-31　APP 主頁面 */
export function Home({ go, openMenu, tab, setTab }: {
  go: (id: string) => void; openMenu: () => void; tab: string; setTab: (t: string) => void;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-ink-50">
      <div className="relative shrink-0 bg-gradient-to-br from-purple-500 via-purple-400 to-aqua-300 pb-14">
        <StatusBar light />
        <div className="flex items-center gap-2 px-5 pt-1">
          <button onClick={openMenu} aria-label="開啟選單"
            className="-ml-2 grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/15">
            <Menu size={22} />
          </button>
          <div className="flex flex-1 items-center gap-2">
            <LogoMark size={24} />
            <span className="font-brand text-xl text-white">Green Track</span>
          </div>
          <button aria-label="通知" className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/15">
            <Bell size={20} />
          </button>
        </div>

        <div className="px-5 pt-3">
          <p className="text-[13px] text-white/80">早安，小綠 ☀️</p>
          <h1 className="mt-0.5 text-[20px] font-black text-white">今天也一起減碳吧！</h1>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[12px] font-bold text-white backdrop-blur">
            <TreeDeciduous size={14} /> 今日成果相當於種植 {todayStats.trees} 棵樹
          </div>
        </div>
      </div>

      <div className="gt-scroll relative z-10 -mt-10 flex-1 overflow-y-auto px-5 pb-6">
        {/* 今日三大指標 */}
        <Card className="p-4">
          <div className="grid grid-cols-3 divide-x divide-ink-100">
            {[
              { l:'今日碳排放', v:todayStats.co2, u:'kg CO₂e', i:<TreeDeciduous size={13} />, c:'text-purple-600' },
              { l:'今日卡洛里', v:todayStats.kcal.toLocaleString(), u:'kcal', i:<Flame size={13} />, c:'text-aqua-600' },
              { l:'今日步數',   v:todayStats.steps.toLocaleString(), u:'步', i:<Footprints size={13} />, c:'text-leaf-600' },
            ].map(s => (
              <div key={s.l} className="px-2 text-center first:pl-0 last:pr-0">
                <div className={`flex items-center justify-center gap-1 text-[10.5px] font-medium ${s.c}`}>{s.i}{s.l}</div>
                <div className="mt-1 font-num text-[19px] font-extrabold leading-none tabular-nums text-ink-900">{s.v}</div>
                <div className="mt-0.5 text-[10px] text-ink-300">{s.u}</div>
              </div>
            ))}
          </div>
        </Card>

        <SectionTitle action={<button onClick={() => go('results')} className="text-[12px] font-bold text-purple-500">查看成果</button>}>
          本週減碳趨勢
        </SectionTitle>
        <Card className="p-4">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-num text-[24px] font-black text-ink-900">
                18.35 <span className="text-[12px] font-bold text-ink-400">kg CO₂e</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-[11.5px] font-bold text-leaf-600">
                <TrendingDown size={13} /> 較上週減少 12.4%
              </div>
            </div>
            <Badge tone="leaf">達成率 86%</Badge>
          </div>
          <div className="mt-4">
            <BarChart data={weeklyCarbon} labels={weeklyLabels} highlight={6} unit="" color="#C8E7CA" />
          </div>
        </Card>

        <SectionTitle>快速記錄</SectionTitle>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { k:'activity', t:'行動紀錄', d:'自動辨識交通', e:'🚇', c:'from-purple-100 to-purple-50' },
            { k:'food',     t:'飲食紀錄', d:'拍照即辨識',   e:'🍜', c:'from-aqua-100 to-aqua-50' },
            { k:'points',   t:'碳積分',   d:`${todayStats.points.toLocaleString()} pts`, e:'🎁', c:'from-amber-100 to-amber-50' },
            { k:'shop',     t:'綠色商城', d:'點數兌換',     e:'🛒', c:'from-leaf-100 to-leaf-50' },
          ].map(q => (
            <button key={q.k} onClick={() => go(q.k)}
              className={`rounded-xl2 bg-gradient-to-br ${q.c} p-4 text-left shadow-card transition hover:shadow-lift active:scale-[.99]`}>
              <div className="text-[26px] leading-none">{q.e}</div>
              <div className="mt-2 text-[14px] font-bold text-ink-900">{q.t}</div>
              <div className="mt-0.5 text-[11px] text-ink-400">{q.d}</div>
            </button>
          ))}
        </div>

        <SectionTitle>今日提醒</SectionTitle>
        <Card className="p-4"><MascotSays>還差 2,150 步就達成今日目標，走一段路回家吧！</MascotSays></Card>
      </div>

      <BottomNav value={tab} onChange={k => { setTab(k); go(k === 'track' ? 'activity' : k); }} />
    </div>
  );
}

/* 圖 4-32　漢堡選單（左側浮層） */
export function HamburgerMenu({ go, close }: { go: (id: string) => void; close: () => void }) {
  const route: Record<string, string> = {
    activity:'activity', plan:'plan', compare:'compare', food:'food',
    results:'results', rank:'rank', shop:'shop', account:'account',
  };
  return (
    <div className="absolute inset-0 z-30 flex">
      <div className="gt-fade flex h-full w-[78%] flex-col bg-white shadow-lift">
        <div className="bg-gradient-to-br from-purple-500 to-aqua-300 px-5 pb-5 pt-14 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-white/25">
                <Mascot pose="avatar" className="w-12" />
              </span>
              <div>
                <div className="text-[15px] font-black">小綠</div>
                <div className="text-[11px] text-white/80">Lv.12 · 健康新星</div>
              </div>
            </div>
            <button onClick={close} aria-label="關閉選單" className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-white/15">
              <X size={18} />
            </button>
          </div>
          <div className="mt-4 rounded-2xl bg-white/15 px-3 py-2.5 backdrop-blur">
            <div className="flex justify-between text-[11px]">
              <span>本月累積碳積分</span><span className="font-num font-bold">2,450 pts</span>
            </div>
            <div className="mt-2"><Meter pct={62} color="#fff" track="rgba(255,255,255,.3)" height={5} /></div>
          </div>
        </div>

        <div className="gt-scroll flex-1 overflow-y-auto px-4 py-2">
          {menuItems.map(m => (
            <button key={m.key} onClick={() => { close(); go(route[m.key] ?? 'home'); }}
              className="flex w-full items-center gap-3 border-b border-ink-100 py-3.5 text-left transition last:border-0 hover:bg-ink-50">
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-bold text-ink-900">{m.label}</span>
                <span className="mt-0.5 block text-[11.5px] text-ink-400">{m.desc}</span>
              </span>
              <ChevronRight size={17} className="text-ink-300" />
            </button>
          ))}
        </div>
        <div className="border-t border-ink-100 px-5 py-4 text-[11px] text-ink-300">Green Track 綠野追蹤 v1.0</div>
      </div>
      <button onClick={close} aria-label="關閉選單" className="h-full flex-1 bg-ink-900/35 backdrop-blur-[1px]" />
    </div>
  );
}

/** 地圖示意底圖（以 SVG 繪製，避免外部依賴） */
function MapCanvas({ children, height = 260 }: { children?: React.ReactNode; height?: number }) {
  return (
    <div className="relative overflow-hidden rounded-xl2 bg-[#EAF1EC]" style={{ height }}>
      <svg viewBox="0 0 320 260" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
        <rect width="320" height="260" fill="#EDF3EE" />
        <rect x="0" y="60" width="320" height="26" fill="#fff" />
        <rect x="0" y="170" width="320" height="20" fill="#fff" />
        <rect x="70" y="0" width="22" height="260" fill="#fff" />
        <rect x="210" y="0" width="26" height="260" fill="#fff" />
        <rect x="100" y="96" width="92" height="62" rx="6" fill="#DCE9DE" />
        <rect x="248" y="96" width="60" height="62" rx="6" fill="#DCE9DE" />
        <rect x="14" y="100" width="44" height="58" rx="6" fill="#E3EDE4" />
        <rect x="248" y="200" width="60" height="46" rx="6" fill="#D6E7D9" />
        <circle cx="40" cy="220" r="22" fill="#C8E7CA" />
        <path d="M81 240 L81 178 L222 178 L222 73 L300 73" fill="none" stroke="#8B82AD" strokeWidth="7"
              strokeLinecap="round" strokeLinejoin="round" opacity=".95" />
        <path d="M81 240 L81 178 L222 178 L222 73 L300 73" fill="none" stroke="#BCE4F0" strokeWidth="2.5"
              strokeDasharray="8 8" strokeLinecap="round" />
      </svg>
      {children}
    </div>
  );
}

/* 圖 4-33　行動紀錄頁面 */
export function ActivityRecord({ go, recording, setRecording }: {
  go: (id: string) => void; recording: boolean; setRecording: (b: boolean) => void;
}) {
  return (
    <Screen bg="bg-ink-50">
      <AppBar title="行動紀錄" sub="自動辨識交通方式並即時計算碳排" onBack={() => go('home')} />
      <MapCanvas>
        <span className="absolute left-[22%] top-[89%] grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-white bg-purple-500 shadow-lift">
          <span className="h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="absolute left-[91%] top-[28%] -translate-x-1/2 -translate-y-full text-purple-600">
          <MapPin size={26} fill="#8B82AD" strokeWidth={1.5} />
        </span>
        {recording && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-purple-600 shadow-card backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> 正在紀錄中
          </div>
        )}
      </MapCanvas>

      <Card className="mt-3 p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-50 text-[24px]">🚇</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-ink-900">捷運</span>
              <Badge tone="purple">自動辨識 · 信心 96%</Badge>
            </div>
            <div className="mt-0.5 text-[11.5px] text-ink-400">中山站 → 市政府站</div>
          </div>
          <button onClick={() => go('compare')} className="text-[12px] font-bold text-purple-500">更換</button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <StatTile label="搭乘時間" value="24" unit="分" tone="purple" />
          <StatTile label="移動距離" value="8.6" unit="km" tone="aqua" />
          <StatTile label="本次碳排" value="0.35" unit="kg" tone="leaf" />
        </div>
      </Card>

      <Card className="mt-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-ink-900">相較自行開車</span>
          <Badge tone="leaf">減少 1.15 kg CO₂e</Badge>
        </div>
        <div className="mt-3"><Meter pct={77} color="#79B77D" /></div>
        <p className="mt-2 text-[11.5px] text-ink-400">這趟通勤替你省下約 77% 的碳排放，相當於種植 0.06 棵樹。</p>
      </Card>

      <div className="mt-5">
        <Button variant={recording ? 'outline' : 'primary'} onClick={() => setRecording(!recording)}
          icon={recording ? <Square size={16} /> : <Play size={16} />}>
          {recording ? '結束本次紀錄' : '開始追蹤'}
        </Button>
      </div>

      <SectionTitle>今日行程</SectionTitle>
      <Card className="px-4 py-1">
        {[
          { e:'🚶', n:'步行 · 住家→捷運站', t:'08:05', v:'0.00' },
          { e:'🚇', n:'捷運 · 中山→市政府', t:'08:14', v:'0.35' },
          { e:'🚌', n:'公車 · 午餐往返',    t:'12:30', v:'0.18' },
        ].map(r => (
          <div key={r.n} className="flex items-center gap-3 border-b border-ink-100 py-3 last:border-0">
            <span className="text-[20px]">{r.e}</span>
            <span className="flex-1">
              <span className="block text-[13px] font-medium text-ink-900">{r.n}</span>
              <span className="font-num text-[11px] text-ink-300">{r.t}</span>
            </span>
            <span className="font-num text-[13px] font-bold text-purple-600">{r.v} kg</span>
          </div>
        ))}
      </Card>
    </Screen>
  );
}

/* 圖 4-34　交通替換比較頁面 */
export function TransportCompare({ go }: { go: (id: string) => void }) {
  const [mode, setMode] = React.useState('metro');
  const distance = 8.6;
  const rows = transports.map(t => ({ ...t, co2: +(t.factor * distance).toFixed(2) }));
  const best = rows.reduce((a, b) => (a.co2 <= b.co2 ? a : b));
  const current = rows.find(r => r.key === mode)!;
  const saved = +(rows.find(r => r.key === 'car')!.co2 - current.co2).toFixed(2);

  return (
    <Screen bg="bg-ink-50">
      <AppBar title="交通替換比較" sub="同一段路，換個方式差多少？" onBack={() => go('home')} />

      <Card className="p-3">
        <div className="flex items-center gap-2 border-b border-ink-100 pb-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-leaf-400" />
          <input defaultValue="台北市中山區 中山站" aria-label="出發地"
                 className="w-full bg-transparent text-[13.5px] font-medium text-ink-900 outline-none" />
        </div>
        <div className="flex items-center gap-2 pt-2.5">
          <Navigation size={12} className="text-purple-500" />
          <input defaultValue="台北市信義區 市政府站" aria-label="目的地"
                 className="w-full bg-transparent text-[13.5px] font-medium text-ink-900 outline-none" />
        </div>
      </Card>

      <div className="mt-3"><MapCanvas height={168} /></div>

      <SectionTitle>選擇交通工具</SectionTitle>
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {rows.map(t => (
          <Chip key={t.key} active={mode === t.key} onClick={() => setMode(t.key)}>{t.label}</Chip>
        ))}
      </div>

      <Card className="mt-3 p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] font-bold text-ink-900">{current.label} · {distance} km</span>
          {current.key === best.key && <Badge tone="leaf">最低碳選擇</Badge>}
        </div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="font-num text-[34px] font-black leading-none text-purple-600">{current.co2.toFixed(2)}</span>
          <span className="text-[12px] font-bold text-ink-400">kg CO₂e</span>
        </div>
        {saved > 0 && (
          <p className="mt-2 text-[12px] font-bold text-leaf-600">較開車減少 {saved.toFixed(2)} kg CO₂e</p>
        )}
      </Card>

      <SectionTitle>各交通方式比較</SectionTitle>
      <Card className="px-4 py-1">
        {rows.map(t => {
          const max = Math.max(...rows.map(r => r.co2)) || 1;
          const on = t.key === mode;
          return (
            <button key={t.key} onClick={() => setMode(t.key)}
              className="flex w-full items-center gap-3 border-b border-ink-100 py-3 text-left last:border-0">
              <span className={`w-12 shrink-0 text-[12.5px] font-bold ${on ? 'text-purple-600' : 'text-ink-700'}`}>{t.label}</span>
              <span className="flex-1">
                <Meter pct={(t.co2 / max) * 100} color={t.co2 === 0 ? '#79B77D' : on ? '#8B82AD' : '#D4CFE7'} height={9} />
              </span>
              <span className="w-14 shrink-0 text-right font-num text-[12.5px] font-bold tabular-nums text-ink-900">
                {t.co2.toFixed(2)}
              </span>
            </button>
          );
        })}
      </Card>
      <p className="mt-2 text-center text-[11px] text-ink-300">係數參考環境部溫室氣體排放係數管理表</p>
    </Screen>
  );
}

/* 圖 4-35　減碳量計畫頁面 */
export function CarbonPlan({ go }: { go: (id: string) => void }) {
  const [picked, setPicked] = React.useState('metro');
  return (
    <Screen bg="bg-ink-50">
      <AppBar title="減碳量計畫" onBack={() => go('home')} />

      <div className="rounded-xl2 bg-gradient-to-br from-purple-500 to-aqua-300 p-5 text-white shadow-lift">
        <div className="flex items-center gap-3">
          <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white/25">
            <Mascot pose="avatar" className="w-14" />
          </span>
          <div className="flex-1">
            <div className="text-[12px] opacity-85">本月減碳量</div>
            <div className="flex items-baseline gap-1">
              <span className="font-num text-[30px] font-black leading-none">2.35</span>
              <span className="text-[11px] font-bold opacity-80">kg CO₂e</span>
            </div>
          </div>
          <Sparkline data={weeklyCarbon} />
        </div>
        <div className="mt-3 rounded-2xl bg-white/15 px-3 py-2 text-[11.5px] font-medium backdrop-blur">
          🌳 相當於種植 0.26 顆樹 · 距離本月目標還差 1.65 kg
        </div>
      </div>

      <SectionTitle>今日活動</SectionTitle>
      <div className="grid grid-cols-3 gap-2">
        {transports.map(t => {
          const on = picked === t.key;
          const emoji: Record<string,string> = { walk:'🚶', bike:'🚲', metro:'🚇', bus:'🚌', moto:'🏍️', car:'🚗' };
          return (
            <button key={t.key} onClick={() => setPicked(t.key)}
              className={`rounded-2xl border-2 py-3 transition ${on ? 'border-purple-400 bg-purple-50' : 'border-ink-100 bg-white hover:border-purple-200'}`}>
              <div className="text-[24px] leading-none">{emoji[t.key]}</div>
              <div className={`mt-1 text-[12px] font-bold ${on ? 'text-purple-700' : 'text-ink-700'}`}>{t.label}</div>
              <div className="font-num text-[10px] text-ink-300">{t.factor} kg/km</div>
            </button>
          );
        })}
      </div>

      <SectionTitle>本月目標進度</SectionTitle>
      <Card className="p-4">
        {[
          { l:'低碳通勤 20 次', v:14, m:20, c:'#8B82AD' },
          { l:'蔬食 12 餐',     v:8,  m:12, c:'#9DCC9F' },
          { l:'步行 200,000 步', v:138500, m:200000, c:'#93D5E8' },
        ].map(g => (
          <div key={g.l} className="border-b border-ink-100 py-3 last:border-0">
            <div className="mb-1.5 flex justify-between text-[12.5px]">
              <span className="font-medium text-ink-700">{g.l}</span>
              <span className="font-num font-bold text-ink-900">{g.v.toLocaleString()} / {g.m.toLocaleString()}</span>
            </div>
            <Meter pct={(g.v / g.m) * 100} color={g.c} />
          </div>
        ))}
      </Card>

      <div className="mt-4"><Button onClick={() => go('results')} variant="soft">查看減碳成果</Button></div>
    </Screen>
  );
}

/* 圖 4-36　減碳成果頁面 */
export function CarbonResults({ go }: { go: (id: string) => void }) {
  const [range, setRange] = React.useState('week');
  const sets: Record<string, { data: number[]; labels: string[]; total: string; delta: string }> = {
    day:   { data:[0.4,0.3,0.6,0.5,0.25,0.2,0.1], labels:['6','9','12','15','18','21','24'], total:'2.35', delta:'-8.2%' },
    week:  { data:weeklyCarbon, labels:weeklyLabels, total:'18.35', delta:'-12.4%' },
    month: { data:[21.4,19.8,18.2,18.35], labels:['W1','W2','W3','W4'], total:'77.75', delta:'-14.1%' },
    year:  { data:[92,88,85,79,81,74,72,70,68,66,63,61], labels:['1','2','3','4','5','6','7','8','9','10','11','12'], total:'899', delta:'-21.6%' },
  };
  const s = sets[range];
  return (
    <Screen bg="bg-ink-50">
      <AppBar title="減碳成果" onBack={() => go('home')} />
      <Tabs value={range} onChange={setRange} items={[
        { key:'day', label:'今日' }, { key:'week', label:'每週' },
        { key:'month', label:'每月' }, { key:'year', label:'年度' },
      ]} />

      <Card className="mt-3 p-4">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[12px] text-ink-400">期間碳排放</div>
            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="font-num text-[30px] font-black leading-none text-ink-900">{s.total}</span>
              <span className="text-[11px] font-bold text-ink-400">kg CO₂e</span>
            </div>
          </div>
          <Badge tone="leaf">{s.delta}</Badge>
        </div>
        <div className="mt-4">
          <LineChart data={s.data} labels={s.labels} color="#8B82AD" height={132} />
        </div>
      </Card>

      <SectionTitle>成果統計</SectionTitle>
      <div className="grid grid-cols-2 gap-2.5">
        <StatTile label="累積減碳" value="42.8" unit="kg CO₂e" tone="purple" sub="自加入以來" />
        <StatTile label="等同種樹" value="4.75" unit="棵" tone="leaf" sub="以 9 kg/棵/年換算" />
        <StatTile label="低碳通勤" value="86" unit="次" tone="aqua" sub="本月 14 次" />
        <StatTile label="累積碳積分" value="2,450" unit="pts" tone="amber" sub="可兌換 2 項商品" />
      </div>

      <SectionTitle>碳排來源占比</SectionTitle>
      <Card className="p-4">
        {[
          { l:'交通移動', p:52, c:'#8B82AD' },
          { l:'飲食消費', p:33, c:'#93D5E8' },
          { l:'日常用電', p:15, c:'#9DCC9F' },
        ].map(r => (
          <div key={r.l} className="border-b border-ink-100 py-2.5 last:border-0">
            <div className="mb-1.5 flex justify-between text-[12.5px]">
              <span className="text-ink-600">{r.l}</span>
              <span className="font-num font-bold text-ink-900">{r.p}%</span>
            </div>
            <Meter pct={r.p} color={r.c} />
          </div>
        ))}
      </Card>

      <div className="mt-4"><MascotSays tone="leaf">這個月你已經超越 78% 的使用者，繼續保持！</MascotSays></div>
    </Screen>
  );
}

/* 圖 4-37 / 4-38　視覺化紀錄碳排放（含展開說明狀態） */
export function CarbonVisual({ go }: { go: (id: string) => void }) {
  const [open, setOpen] = React.useState<string | null>(null);
  const gauges = [
    { k:'day',   label:'每日', v:2.35,  max:5,   unit:'kg CO₂e', color:'#8B82AD',
      note:'今日碳排主要來自通勤（0.53 kg）與飲食（1.82 kg）。相較個人日均 3.1 kg 已下降 24%。' },
    { k:'week',  label:'每週', v:18.35, max:30,  unit:'kg CO₂e', color:'#93D5E8',
      note:'本週共 7 趟低碳通勤，週均碳排 2.62 kg，低於全體使用者中位數 3.4 kg。' },
    { k:'month', label:'每月', v:77.75, max:120, unit:'kg CO₂e', color:'#9DCC9F',
      note:'本月距離目標 90 kg 尚有 12.25 kg 餘裕，依目前趨勢可提前 4 天達標。' },
  ];
  return (
    <Screen bg="bg-ink-50">
      <AppBar title="視覺化紀錄碳排放" onBack={() => go('home')} />

      <Card className="flex items-center justify-between p-3">
        <button className="grid h-8 w-8 place-items-center rounded-full text-ink-400 transition hover:bg-ink-50">‹</button>
        <span className="font-num text-[13.5px] font-bold text-ink-900">2028 / 06 / 08（四）</span>
        <button className="grid h-8 w-8 place-items-center rounded-full text-ink-400 transition hover:bg-ink-50">›</button>
      </Card>

      <Card className="mt-3 p-4">
        <div className="flex justify-between">
          {gauges.map(g => (
            <button key={g.k} onClick={() => setOpen(open === g.k ? null : g.k)} className="flex-1">
              <Gauge value={g.v} max={g.max} label={g.label} unit={g.unit} color={g.color} size={94} />
            </button>
          ))}
        </div>
        <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-ink-300">
          <Info size={12} /> 點擊儀表板查看詳細說明
        </p>
      </Card>

      {open && (
        <Card className="gt-fade mt-3 p-4">
          {(() => {
            const g = gauges.find(x => x.k === open)!;
            return (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-ink-900">{g.label}碳排放明細</span>
                  <button onClick={() => setOpen(null)} aria-label="收合" className="text-ink-300"><X size={16} /></button>
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-500">{g.note}</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <StatTile label="交通" value="0.53" unit="kg" tone="purple" />
                  <StatTile label="飲食" value="1.82" unit="kg" tone="aqua" />
                  <StatTile label="其他" value="0.00" unit="kg" tone="leaf" />
                </div>
              </>
            );
          })()}
        </Card>
      )}

      <SectionTitle>本日碳排時序</SectionTitle>
      <Card className="p-4">
        <BarChart data={[0.4,0.3,0.62,0.5,0.25,0.18,0.1]} labels={['6時','9時','12時','15時','18時','21時','24時']} color="#D4CFE7" highlight={2} />
      </Card>

      <SectionTitle>紀錄明細</SectionTitle>
      <Card className="px-4 py-1">
        {[
          { t:'08:14', n:'捷運通勤', v:'+0.35', c:'text-purple-600' },
          { t:'12:20', n:'午餐 · 牛肉麵', v:'+1.82', c:'text-aqua-600' },
          { t:'18:40', n:'步行返家 3.2 km', v:'−0.56', c:'text-leaf-600' },
        ].map(r => (
          <div key={r.t} className="flex items-center gap-3 border-b border-ink-100 py-3 last:border-0">
            <span className="font-num text-[12px] text-ink-300">{r.t}</span>
            <span className="flex-1 text-[13px] font-medium text-ink-900">{r.n}</span>
            <span className={`font-num text-[13px] font-bold ${r.c}`}>{r.v} kg</span>
          </div>
        ))}
      </Card>
    </Screen>
  );
}

/* 成就排行榜（漢堡選單項目） */
export function Leaderboard({ go }: { go: (id: string) => void }) {
  return (
    <Screen bg="bg-ink-50">
      <AppBar title="成就排行榜" sub="步行挑戰 · 本週" onBack={() => go('home')} />
      <Card className="p-4">
        {leaderboard.map(r => (
          <div key={r.name}
            className={`flex items-center gap-3 rounded-2xl px-3 py-3 ${r.me ? 'bg-purple-500 text-white' : ''}`}>
            <span className={`grid h-7 w-7 place-items-center rounded-full font-num text-[12px] font-black
              ${r.me ? 'bg-white/25 text-white' : 'bg-ink-100 text-ink-500'}`}>{r.rank}</span>
            <span className={`flex-1 text-[14px] font-bold ${r.me ? 'text-white' : 'text-ink-900'}`}>{r.name}</span>
            <span className="text-right">
              <span className={`block font-num text-[13px] font-bold ${r.me ? 'text-white' : 'text-purple-600'}`}>
                {r.steps.toLocaleString()} 步
              </span>
              <span className={`block font-num text-[10.5px] ${r.me ? 'text-white/75' : 'text-ink-300'}`}>
                減碳 {r.co2} kg
              </span>
            </span>
          </div>
        ))}
      </Card>
      <div className="mt-4"><MascotSays>再走 2,470 步就能追上 Amy，一起衝吧！</MascotSays></div>
    </Screen>
  );
}
