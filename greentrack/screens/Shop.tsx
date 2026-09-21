import React from 'react';
import { ArrowRight, Search, ShoppingBag, Sparkles } from 'lucide-react';
import { Mascot } from '../components/Brand';
import { AppBar, Badge, Button, Card, Chip, Meter, Screen, SectionTitle } from '../components/ui';
import { shopCategories, shopItems } from '../data/mock';

const MY_POINTS = 2450;

/* 圖 4-46 / 4-47　環保商城入口頁 */
export function ShopEntry({ go }: { go: (id: string) => void }) {
  const steps = [
    { n:'1', l:'進入商城', e:'🚪' },
    { n:'2', l:'瀏覽商品', e:'🔍' },
    { n:'3', l:'使用點數', e:'💚' },
    { n:'4', l:'兌換商品', e:'🎁' },
  ];
  return (
    <Screen bg="bg-leaf-50">
      <AppBar title="環保商城" sub="用減碳成果，換回生活裡的好東西" onBack={() => go('home')} />

      {/* 分類入口 */}
      <div className="grid grid-cols-4 gap-2">
        {shopCategories.map(c => (
          <button key={c.key} onClick={() => go('shop-list')}
            className="rounded-2xl bg-white py-3.5 text-center shadow-card transition hover:shadow-lift active:scale-[.98]">
            <div className="text-[26px] leading-none">{c.emoji}</div>
            <div className="mt-1.5 text-[11px] font-bold text-ink-700">{c.label}</div>
          </button>
        ))}
      </div>

      {/* 點數資訊卡 */}
      <Card className="mt-3 overflow-hidden">
        <div className="bg-gradient-to-br from-leaf-500 to-leaf-300 p-4 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[12px] opacity-90">我的碳積分</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-num text-[34px] font-black leading-none">{MY_POINTS.toLocaleString()}</span>
                <span className="text-[12px] font-bold opacity-85">點</span>
              </div>
            </div>
            <button onClick={() => go('points')}
              className="rounded-full bg-white/25 px-3 py-1.5 text-[11.5px] font-bold backdrop-blur transition hover:bg-white/35">
              點數紀錄
            </button>
          </div>
          <div className="mt-3 rounded-2xl bg-white/20 px-3 py-2.5 backdrop-blur">
            <div className="flex justify-between text-[11px] font-medium">
              <span>目前可兌換 4 項商品</span><span className="font-num font-bold">94%</span>
            </div>
            <div className="mt-2"><Meter pct={94} color="#fff" track="rgba(255,255,255,.3)" height={6} /></div>
          </div>
        </div>
      </Card>

      {/* 四步驟流程圖 */}
      <SectionTitle>兌換流程</SectionTitle>
      <Card className="p-4">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <React.Fragment key={s.n}>
              <div className="flex flex-col items-center gap-1.5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-50 text-[22px]">{s.e}</span>
                <span className="text-[11px] font-bold text-ink-700">{s.l}</span>
              </div>
              {i < steps.length - 1 && <ArrowRight size={14} className="mb-5 shrink-0 text-leaf-300" />}
            </React.Fragment>
          ))}
        </div>
      </Card>

      <SectionTitle>本月精選</SectionTitle>
      <div className="grid grid-cols-2 gap-2.5">
        {shopItems.slice(0, 2).map(it => (
          <Card key={it.id} className="p-3" onClick={() => go('shop-list')}>
            <div className="grid h-20 place-items-center rounded-xl bg-leaf-50 text-[38px]">{it.emoji}</div>
            <div className="mt-2 line-clamp-2 text-[12.5px] font-bold leading-snug text-ink-900">{it.name}</div>
            <div className="mt-1 font-num text-[12px] font-bold text-leaf-600">{it.points.toLocaleString()} pts</div>
          </Card>
        ))}
      </div>

      <div className="mt-5">
        <Button variant="leaf" onClick={() => go('shop-list')} icon={<ShoppingBag size={16} />}>進入商城</Button>
      </div>
    </Screen>
  );
}

/* 圖 4-48 / 4-49　商品列表頁（雙欄網格） */
export function ShopList({ go }: { go: (id: string) => void }) {
  const [cat, setCat] = React.useState('all');
  const list = cat === 'all' ? shopItems : shopItems.filter(i => i.category === cat);
  return (
    <Screen bg="bg-leaf-50">
      <AppBar title="商品列表" onBack={() => go('shop')}
        right={<span className="rounded-full bg-leaf-400 px-3 py-1.5 font-num text-[11.5px] font-bold text-white">{MY_POINTS.toLocaleString()} pts</span>} />

      <Card className="mb-3 flex items-center gap-2 px-3.5 py-2.5">
        <Search size={16} className="text-ink-300" />
        <input placeholder="搜尋商品" aria-label="搜尋商品"
               className="w-full bg-transparent text-[13.5px] text-ink-900 outline-none placeholder:text-ink-300" />
      </Card>

      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        <Chip tone="leaf" active={cat === 'all'} onClick={() => setCat('all')}>全部</Chip>
        {shopCategories.map(c => (
          <Chip key={c.key} tone="leaf" active={cat === c.key} onClick={() => setCat(c.key)}>{c.emoji} {c.label}</Chip>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {list.map(it => {
          const enough = MY_POINTS >= it.points;
          return (
            <Card key={it.id} className="flex flex-col p-3">
              <div className="relative grid h-24 place-items-center rounded-xl bg-leaf-50 text-[42px]">
                {it.emoji}
                <span className="absolute right-1.5 top-1.5"><Badge tone={it.stock === '現貨' ? 'leaf' : 'amber'}>{it.stock}</Badge></span>
              </div>
              <div className="mt-2 line-clamp-2 min-h-[34px] text-[12.5px] font-bold leading-snug text-ink-900">{it.name}</div>
              <div className="mt-1.5 flex items-baseline justify-between">
                <span className="font-num text-[13px] font-black text-leaf-600">{it.points.toLocaleString()}</span>
                <span className="font-num text-[10px] text-ink-300">pts</span>
              </div>
              {!enough && (
                <div className="mt-1.5">
                  <Meter pct={(MY_POINTS / it.points) * 100} color="#F2C572" height={5} />
                  <div className="mt-1 font-num text-[10px] font-bold text-amber-500">
                    點數不足，還差 {(it.points - MY_POINTS).toLocaleString()}
                  </div>
                </div>
              )}
              <button disabled={!enough}
                className={`mt-2.5 w-full rounded-full py-2 text-[12px] font-bold transition
                  ${enough ? 'bg-leaf-400 text-white hover:bg-leaf-500 active:scale-[.98]' : 'bg-ink-100 text-ink-300'}`}>
                {enough ? '立即兌換' : '點數不足'}
              </button>
            </Card>
          );
        })}
      </div>

      <Card className="mt-4 flex items-center gap-3 p-4">
        <Mascot pose="avatar" className="w-14 shrink-0" />
        <p className="flex-1 text-[12px] leading-relaxed text-ink-500">
          <Sparkles size={12} className="mr-1 inline text-leaf-500" />
          所有商品皆通過永續選品標準，並以低碳包材寄送。
        </p>
      </Card>
    </Screen>
  );
}
