import React from 'react';
import { Logo, Mascot } from '../components/Brand';
import { AppBar, Badge, Button, Card, Chip, Meter, OptionRow, Screen, SectionTitle, StatTile } from '../components/ui';
import { moduleTheme, spacing, typeScale } from '../theme';

const palette = [
  { name:'品牌藍紫 Purple', hex:'#8B82AD', use:'主色｜按鈕、主標題、主要資訊', from:'標誌水滴主體' },
  { name:'深紫 Purple Deep', hex:'#5B5382', use:'主色深階｜按壓狀態、深色卡片', from:'水滴陰影' },
  { name:'淡天藍 Aqua',     hex:'#BCE4F0', use:'輔色一｜飲食模組、漸層收尾',   from:'水滴內襯' },
  { name:'湖水藍 Aqua Deep', hex:'#3FA8C6', use:'輔色一深階｜飲食模組主色',     from:'水滴內襯' },
  { name:'柔和綠 Leaf',     hex:'#9DCC9F', use:'輔色二｜環保商城、正向回饋',   from:'標誌葉片' },
  { name:'森林綠 Leaf Deep', hex:'#5A9C60', use:'輔色二深階｜成功狀態',         from:'標誌葉片' },
  { name:'藕紫 Mauve',      hex:'#C49BC1', use:'點綴色｜選取態、目標線',       from:'孔雀羽毛' },
  { name:'暖琥珀 Amber',    hex:'#F2C572', use:'功能色｜集點碳積分模組',       from:'品牌延伸' },
  { name:'墨黑 Ink',        hex:'#2E2A40', use:'文字｜主要內文',               from:'品牌延伸' },
];

/** 視覺設計規範頁 — 對應論文「建立視覺設計規範（色彩、字型、元件系統）」 */
export function Spec() {
  return (
    <Screen bg="bg-white">
      <AppBar title="視覺設計規範" sub="Green Track Design System v1.0" />

      <Card className="flex items-center gap-4 p-4">
        <Logo size={84} />
        <div className="flex-1">
          <div className="text-[13px] font-bold text-ink-900">Green Track 綠野追蹤</div>
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-400">
            水滴造型融合孔雀頭部與葉片，象徵水資源保護、生命活力與永續環境。
          </p>
        </div>
      </Card>

      <SectionTitle>色彩系統</SectionTitle>
      <div className="space-y-2">
        {palette.map(c => (
          <div key={c.hex} className="flex items-center gap-3 rounded-2xl border border-ink-100 p-2.5">
            <span className="h-11 w-11 shrink-0 rounded-xl shadow-inner" style={{ background: c.hex }} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[12.5px] font-bold text-ink-900">{c.name}</span>
                <span className="font-num text-[11px] text-ink-300">{c.hex}</span>
              </div>
              <div className="mt-0.5 text-[11px] text-ink-400">{c.use}</div>
              <div className="text-[10px] text-ink-300">取樣自：{c.from}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>模組色彩識別</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(moduleTheme).map(([k, m]) => (
          <div key={k} className="rounded-2xl p-3" style={{ background: m.soft }}>
            <span className="inline-block h-3 w-8 rounded-full" style={{ background: m.tint }} />
            <div className="mt-1.5 text-[12.5px] font-bold text-ink-900">{m.label}</div>
            <div className="font-num text-[10.5px] text-ink-400">{m.tint} · {m.text}</div>
          </div>
        ))}
      </div>

      <SectionTitle>字型階層</SectionTitle>
      <Card className="px-4 py-1">
        {typeScale.map(t => (
          <div key={t.name} className="flex items-center gap-3 border-b border-ink-100 py-3 last:border-0">
            <span className="w-16 shrink-0 font-num text-[11px] text-ink-300">{t.name}</span>
            <span className="flex-1 truncate text-ink-900" style={{ fontSize: Math.min(t.px, 24), fontWeight: t.weight }}>
              綠野追蹤 Green Track
            </span>
            <span className="shrink-0 font-num text-[10.5px] text-ink-300">{t.px}/{t.weight}</span>
          </div>
        ))}
        <div className="border-t border-ink-100 py-3 text-[11px] leading-relaxed text-ink-400">
          中文 Noto Sans TC · 數字 Figtree（等寬數字）· 品牌字 Caveat 手寫體
        </div>
      </Card>

      <SectionTitle>間距系統（8pt Grid）</SectionTitle>
      <Card className="p-4">
        <div className="flex items-end gap-2">
          {spacing.map(s => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <span className="w-5 rounded-t bg-purple-300" style={{ height: s * 1.4 }} />
              <span className="font-num text-[10px] text-ink-300">{s}</span>
            </div>
          ))}
        </div>
      </Card>

      <SectionTitle>元件系統</SectionTitle>
      <Card className="space-y-3 p-4">
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm">主要按鈕</Button>
          <Button size="sm" variant="soft">次要按鈕</Button>
          <Button size="sm" variant="outline">外框按鈕</Button>
          <Button size="sm" variant="leaf">成功按鈕</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip active>已選標籤</Chip><Chip>未選標籤</Chip>
          <Badge>成功</Badge><Badge tone="amber">警示</Badge><Badge tone="purple">資訊</Badge>
        </div>
        <OptionRow label="單選選項" desc="註冊流程使用之標準選項列" selected emoji="🌱" />
        <div className="grid grid-cols-2 gap-2">
          <StatTile label="碳排放" value="2.35" unit="kg" tone="purple" />
          <StatTile label="碳積分" value="2,450" unit="pts" tone="amber" />
        </div>
        <div className="space-y-2">
          <Meter pct={72} />
          <Meter pct={48} color="#9DCC9F" />
        </div>
      </Card>

      <SectionTitle>品牌吉祥物「小綠」</SectionTitle>
      <Card className="p-4">
        <div className="flex items-end justify-around rounded-2xl bg-ink-50 p-3">
          <div className="text-center"><Mascot pose="full" className="w-20" /><div className="mt-1 text-[10px] text-ink-400">完整形象</div></div>
          <div className="text-center"><Mascot pose="figure" className="w-16" /><div className="mt-1 text-[10px] text-ink-400">站立去底</div></div>
          <div className="text-center"><Mascot pose="avatar" className="w-14" /><div className="mt-1 text-[10px] text-ink-400">頭像</div></div>
        </div>
        <p className="mt-3 text-[11.5px] leading-relaxed text-ink-400">
          小綠頭戴品牌水滴、手持健康數據面板，出現於引導頁、註冊流程回饋、AI 建議對話框與成就頁，
          負責把數據轉譯成親切的鼓勵語氣，是情感化設計（Emotional Design）的主要載體。
        </p>
      </Card>

      <SectionTitle>圓角與陰影</SectionTitle>
      <Card className="grid grid-cols-3 gap-3 p-4 text-center">
        {[['12px','rounded-xl'],['22px','rounded-xl2'],['999px','rounded-full']].map(([l, c]) => (
          <div key={l}>
            <div className={`h-14 w-full bg-purple-100 ${c}`} />
            <div className="mt-1.5 font-num text-[10.5px] text-ink-400">{l}</div>
          </div>
        ))}
      </Card>
    </Screen>
  );
}
