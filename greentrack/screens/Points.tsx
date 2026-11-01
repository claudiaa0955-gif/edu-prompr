import React from 'react';
import { Calculator, History, TreeDeciduous, Gift } from 'lucide-react';
import { Mascot, MascotSays } from '../components/Brand';
import { AppBar, Badge, Button, Card, Meter, Screen, SectionTitle, StatTile, Tabs } from '../components/ui';
import { BarChart } from '../components/charts';
import { weeklyLabels } from '../data/mock';

/* 圖 4-39 / 4-40　集點點數模組（碳積分總覽 ╱ 點數計算） */
export function Points({ go, tab, setTab }: {
  go: (id: string) => void; tab: string; setTab: (t: string) => void;
}) {
  return (
    <Screen bg="bg-amber-50">
      <AppBar title="集點點數" sub="把減碳量換成看得見的回饋" onBack={() => go('home')} />
      <Tabs tone="amber" value={tab} onChange={setTab}
            items={[{ key:'overview', label:'碳積分總覽' }, { key:'calc', label:'點數計算' }]} />
      <div className="mt-3">{tab === 'overview' ? <PointsOverview go={go} /> : <PointsCalc />}</div>
    </Screen>
  );
}

function PointsOverview({ go }: { go: (id: string) => void }) {
  return (
    <div className="gt-fade">
      {/* 區塊一：目前累積點數 */}
      <div className="rounded-xl2 bg-gradient-to-br from-amber-400 to-amber-300 p-5 text-white shadow-lift">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[12px] font-medium opacity-90">目前累積點數</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-num text-[40px] font-black leading-none">2,450</span>
              <span className="text-[13px] font-bold opacity-85">pts</span>
            </div>
          </div>
          <button className="flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1.5 text-[11.5px] font-bold backdrop-blur transition hover:bg-white/35">
            <History size={13} /> 點數紀錄
          </button>
        </div>
        <div className="mt-4 rounded-2xl bg-white/20 px-3 py-2.5 backdrop-blur">
          <div className="flex justify-between text-[11px] font-medium">
            <span>距離下一個兌換門檻（2,600）</span><span className="font-num font-bold">94%</span>
          </div>
          <div className="mt-2"><Meter pct={94} color="#fff" track="rgba(255,255,255,.32)" height={6} /></div>
        </div>
      </div>

      {/* 區塊二：今日減碳量視覺化 */}
      <Card className="mt-3 overflow-hidden">
        <div className="relative bg-gradient-to-b from-leaf-50 to-white px-4 pb-4 pt-5">
          <div className="text-center">
            <div className="text-[12px] font-bold text-leaf-600">今日減碳量</div>
            <div className="mt-1 flex items-baseline justify-center gap-1">
              <span className="font-num text-[42px] font-black leading-none text-leaf-600">1.25</span>
              <span className="text-[13px] font-bold text-leaf-500">kg CO₂e</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-leaf-100 px-3 py-1 text-[11.5px] font-bold text-leaf-600">
              <TreeDeciduous size={13} /> 相當於種植 0.14 棵樹
            </div>
          </div>
          <div className="mt-4 flex items-end justify-center gap-2">
            {['🌳','🌲','🌿','🌲','🌳'].map((e, i) => (
              <span key={i} className="leading-none" style={{ fontSize: [26,34,44,34,26][i], opacity: [.5,.75,1,.75,.5][i] }}>{e}</span>
            ))}
          </div>
          <div className="mt-1 h-2 rounded-full bg-gradient-to-r from-leaf-100 via-leaf-200 to-leaf-100" />
        </div>
      </Card>

      {/* 區塊三：本週點數累積 */}
      <SectionTitle>本週點數累積</SectionTitle>
      <Card className="p-4">
        <BarChart data={[18,14,22,9,16,11,12.5]} labels={weeklyLabels} color="#F9E2B7" highlight={6} unit="" />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <StatTile label="本週新增" value="103" unit="pts" tone="amber" />
          <StatTile label="可兌換商品" value="4" unit="項" tone="leaf" />
        </div>
      </Card>

      <div className="mt-4">
        <Button variant="amber" onClick={() => go('shop')} icon={<Gift size={16} />}>前往環保商城兌換</Button>
      </div>
      <div className="mt-4"><MascotSays tone="amber">再減碳 15 kg，就能換到那個保溫瓶囉！</MascotSays></div>
    </div>
  );
}

function PointsCalc() {
  return (
    <div className="gt-fade">
      {/* 區塊一：轉換機制 */}
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-50 text-amber-500"><Calculator size={18} /></span>
          <span className="text-[14px] font-bold text-ink-900">轉換機制</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[['1 kg CO₂','10 pts'], ['10 kg CO₂','100 pts']].map(([a, b]) => (
            <div key={a} className="rounded-2xl bg-amber-50 px-3 py-3 text-center">
              <div className="font-num text-[13px] font-bold text-ink-700">{a}</div>
              <div className="my-1 text-[11px] text-amber-400">＝</div>
              <div className="font-num text-[16px] font-black text-amber-500">{b}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11.5px] leading-relaxed text-ink-400">
          減碳量以「同路程改採低碳方式所節省之碳排」計算，換算比率公開透明，可於點數紀錄逐筆查核。
        </p>
      </Card>

      {/* 區塊二：今日點數計算 */}
      <SectionTitle>今日點數計算</SectionTitle>
      <Card className="p-4">
        <div className="space-y-2.5 font-num text-[14px]">
          <div className="flex items-center justify-between border-b border-ink-100 pb-2.5">
            <span className="text-ink-500">今日減碳數量</span>
            <span className="font-bold text-ink-900">1.25 kg CO₂</span>
          </div>
          <div className="flex items-center justify-between border-b border-ink-100 pb-2.5">
            <span className="text-ink-500">× 轉換比率</span>
            <span className="font-bold text-ink-900">10 pts / kg</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[13px] font-bold text-ink-900">今日可得點數</span>
            <span className="text-[24px] font-black text-amber-500">12.5 pts</span>
          </div>
        </div>
      </Card>

      {/* 區塊三：點數明細 */}
      <SectionTitle>點數來源明細</SectionTitle>
      <Card className="px-4 py-1">
        {[
          { n:'捷運取代自行開車', d:'8.6 km', c:'1.15 kg', p:'+11.5' },
          { n:'步行返家',         d:'3.2 km', c:'0.10 kg', p:'+1.0' },
          { n:'蔬食午餐',         d:'1 餐',   c:'0.00 kg', p:'+0.0' },
        ].map(r => (
          <div key={r.n} className="flex items-center gap-3 border-b border-ink-100 py-3 last:border-0">
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium text-ink-900">{r.n}</span>
              <span className="font-num text-[11px] text-ink-300">{r.d} · 減碳 {r.c}</span>
            </span>
            <span className="font-num text-[13.5px] font-bold text-amber-500">{r.p} pts</span>
          </div>
        ))}
      </Card>

      <Card className="mt-3 flex items-center gap-3 p-4">
        <Mascot pose="avatar" className="w-14 shrink-0" />
        <div className="flex-1">
          <Badge tone="amber">小提醒</Badge>
          <p className="mt-1.5 text-[12px] leading-relaxed text-ink-500">
            點數每日 24:00 結算入帳，有效期限為取得後 12 個月。
          </p>
        </div>
      </Card>
    </div>
  );
}
