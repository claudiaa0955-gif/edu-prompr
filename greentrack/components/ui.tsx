import React from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

/* ── 版面骨架 ───────────────────────────────────────────── */

/** 手機畫面容器：狀態列 + 可捲動內容 */
export function Screen({ children, bg = 'bg-white', pad = true, className = '' }:
  { children: React.ReactNode; bg?: string; pad?: boolean; className?: string }) {
  return (
    <div className={`relative flex h-full flex-col overflow-hidden ${bg} ${className}`}>
      <StatusBar />
      <div className={`gt-scroll flex-1 overflow-y-auto ${pad ? 'px-5 pb-8' : ''}`}>{children}</div>
    </div>
  );
}

export function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? 'text-white' : 'text-ink-900';
  return (
    <div className={`flex h-11 shrink-0 items-center justify-between px-6 text-[13px] font-semibold ${c}`}>
      <span className="font-num">9:41</span>
      <div className="flex items-center gap-1.5 opacity-90">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
          <rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden>
          <path d="M8 10.5 5.2 7.6a4 4 0 0 1 5.6 0L8 10.5ZM2.6 5a7.6 7.6 0 0 1 10.8 0l-1.4 1.4a5.6 5.6 0 0 0-8 0L2.6 5ZM0 2.4a11.3 11.3 0 0 1 16 0l-1.4 1.4a9.3 9.3 0 0 0-13.2 0L0 2.4Z" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden>
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.2" fill="none" stroke="currentColor" opacity=".45" />
          <rect x="2" y="2" width="15" height="8" rx="2" fill="currentColor" />
          <path d="M23 4v4a2.2 2.2 0 0 0 0-4Z" fill="currentColor" opacity=".45" />
        </svg>
      </div>
    </div>
  );
}

/** 頁首導覽列 */
export function AppBar({ title, onBack, right, light = false, sub }:
  { title?: string; onBack?: () => void; right?: React.ReactNode; light?: boolean; sub?: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 pt-1">
      {onBack && (
        <button onClick={onBack} aria-label="返回"
          className={`-ml-2 grid h-9 w-9 place-items-center rounded-full transition
            ${light ? 'text-white hover:bg-white/15' : 'text-ink-700 hover:bg-ink-100'}`}>
          <ChevronLeft size={22} />
        </button>
      )}
      <div className="min-w-0 flex-1">
        {title && <h1 className={`truncate text-[19px] font-bold ${light ? 'text-white' : 'text-ink-900'}`}>{title}</h1>}
        {sub && <p className={`truncate text-[12px] ${light ? 'text-white/70' : 'text-ink-400'}`}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function SectionTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-2.5 mt-6 flex items-baseline justify-between first:mt-0">
      <h2 className="text-[15px] font-bold text-ink-900">{children}</h2>
      {action}
    </div>
  );
}

/* ── 基礎元件 ───────────────────────────────────────────── */

export function Card({ children, className = '', onClick, as = 'div' }:
  { children: React.ReactNode; className?: string; onClick?: () => void; as?: 'div' | 'button' }) {
  const Tag: any = onClick ? 'button' : as;
  return (
    <Tag onClick={onClick}
      className={`block w-full rounded-xl2 bg-white text-left shadow-card ${onClick ? 'transition hover:shadow-lift active:scale-[.99]' : ''} ${className}`}>
      {children}
    </Tag>
  );
}

type BtnVariant = 'primary' | 'soft' | 'ghost' | 'outline' | 'leaf' | 'amber' | 'aqua';
export function Button({ children, onClick, variant = 'primary', full = true, size = 'md', disabled, icon, className = '' }: {
  children: React.ReactNode; onClick?: () => void; variant?: BtnVariant; full?: boolean;
  size?: 'sm' | 'md' | 'lg'; disabled?: boolean; icon?: React.ReactNode; className?: string;
}) {
  const v: Record<BtnVariant, string> = {
    primary: 'bg-purple-500 text-white shadow-[0_6px_16px_-6px_rgba(91,83,130,.75)] hover:bg-purple-600',
    soft:    'bg-purple-100 text-purple-700 hover:bg-purple-200',
    ghost:   'text-purple-600 hover:bg-purple-50',
    outline: 'border border-purple-300 text-purple-600 hover:bg-purple-50',
    leaf:    'bg-leaf-400 text-white shadow-[0_6px_16px_-6px_rgba(67,122,72,.7)] hover:bg-leaf-500',
    amber:   'bg-amber-400 text-white shadow-[0_6px_16px_-6px_rgba(190,135,34,.65)] hover:bg-amber-500',
    aqua:    'bg-aqua-400 text-white shadow-[0_6px_16px_-6px_rgba(45,135,163,.65)] hover:bg-aqua-500',
  };
  const s = { sm: 'h-9 px-4 text-[13px]', md: 'h-12 px-5 text-[15px]', lg: 'h-14 px-6 text-[16px]' }[size];
  return (
    <button onClick={onClick} disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold transition
        ${s} ${full ? 'w-full' : ''} ${v[variant]} ${disabled ? 'pointer-events-none opacity-40' : 'active:scale-[.98]'} ${className}`}>
      {icon}{children}
    </button>
  );
}

export function Chip({ children, active, onClick, tone = 'purple' }:
  { children: React.ReactNode; active?: boolean; onClick?: () => void; tone?: 'purple' | 'aqua' | 'leaf' | 'amber' }) {
  const on = {
    purple: 'bg-purple-500 text-white border-purple-500',
    aqua:   'bg-aqua-400 text-white border-aqua-400',
    leaf:   'bg-leaf-400 text-white border-leaf-400',
    amber:  'bg-amber-400 text-white border-amber-400',
  }[tone];
  return (
    <button onClick={onClick}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition
        ${active ? on : 'border-ink-200 bg-white text-ink-500 hover:border-purple-300 hover:text-purple-600'}`}>
      {children}
    </button>
  );
}

/** 單／複選選項列 — 註冊流程大量使用 */
export function OptionRow({ label, desc, emoji, selected, onClick, multi }: {
  label: string; desc?: string; emoji?: string; selected?: boolean; onClick?: () => void; multi?: boolean;
}) {
  return (
    <button onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition
        ${selected ? 'border-purple-400 bg-purple-50 shadow-[0_4px_14px_-8px_rgba(91,83,130,.6)]'
                   : 'border-ink-100 bg-white hover:border-purple-200'}`}>
      {emoji && <span className="text-2xl leading-none">{emoji}</span>}
      <span className="min-w-0 flex-1">
        <span className={`block text-[15px] font-bold ${selected ? 'text-purple-700' : 'text-ink-900'}`}>{label}</span>
        {desc && <span className="mt-0.5 block text-[12px] leading-snug text-ink-400">{desc}</span>}
      </span>
      <span className={`grid h-6 w-6 shrink-0 place-items-center border-2 transition
        ${multi ? 'rounded-md' : 'rounded-full'}
        ${selected ? 'border-purple-500 bg-purple-500 text-white' : 'border-ink-200 text-transparent'}`}>
        <Check size={14} strokeWidth={3.5} />
      </span>
    </button>
  );
}

/** 清單列 — 帳戶設定、選單使用 */
export function ListRow({ icon, label, value, onClick, tint = 'text-purple-500' }: {
  icon?: React.ReactNode; label: string; value?: string; onClick?: () => void; tint?: string;
}) {
  return (
    <button onClick={onClick}
      className="flex w-full items-center gap-3 border-b border-ink-100 px-1 py-3.5 text-left last:border-0 transition hover:bg-ink-50">
      {icon && <span className={`grid h-9 w-9 place-items-center rounded-xl bg-ink-50 ${tint}`}>{icon}</span>}
      <span className="flex-1 text-[15px] font-medium text-ink-900">{label}</span>
      {value && <span className="text-[13px] text-ink-400">{value}</span>}
      <ChevronRight size={18} className="text-ink-300" />
    </button>
  );
}

/** 步驟進度條 — 註冊流程頂部 */
export function StepProgress({ step, total, onBack }: { step: number; total: number; onBack?: () => void }) {
  return (
    <div className="mb-5 flex items-center gap-3 pt-1">
      {onBack && (
        <button onClick={onBack} aria-label="上一步"
          className="-ml-2 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-700 transition hover:bg-ink-100">
          <ChevronLeft size={22} />
        </button>
      )}
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100">
        <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-aqua-300 transition-[width] duration-500"
             style={{ width: `${(step / total) * 100}%` }} />
      </div>
      <span className="shrink-0 font-num text-[12px] font-bold tabular-nums text-ink-400">{step}/{total}</span>
    </div>
  );
}

/** 數據磚 */
export function StatTile({ label, value, unit, sub, tone = 'purple', icon }: {
  label: string; value: string | number; unit?: string; sub?: string;
  tone?: 'purple' | 'aqua' | 'leaf' | 'amber' | 'white'; icon?: React.ReactNode;
}) {
  const t = {
    purple: 'bg-purple-50 text-purple-700', aqua: 'bg-aqua-50 text-aqua-600',
    leaf: 'bg-leaf-50 text-leaf-600', amber: 'bg-amber-50 text-amber-500',
    white: 'bg-white/15 text-white backdrop-blur',
  }[tone];
  return (
    <div className={`rounded-2xl px-3.5 py-3 ${t}`}>
      <div className="flex items-center gap-1.5 text-[11px] font-medium opacity-80">{icon}{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="font-num text-[22px] font-extrabold leading-none tabular-nums">{value}</span>
        {unit && <span className="text-[11px] font-semibold opacity-70">{unit}</span>}
      </div>
      {sub && <div className="mt-1 text-[11px] opacity-70">{sub}</div>}
    </div>
  );
}

/** 分頁標籤 */
export function Tabs({ items, value, onChange, tone = 'purple' }: {
  items: { key: string; label: string }[]; value: string; onChange: (k: string) => void;
  tone?: 'purple' | 'aqua' | 'leaf' | 'amber';
}) {
  const on = { purple:'bg-purple-500', aqua:'bg-aqua-400', leaf:'bg-leaf-400', amber:'bg-amber-400' }[tone];
  /** 分頁數多時自動收縮字級與內距，避免標籤被截斷 */
  const dense = items.length > 3;
  return (
    <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-full bg-ink-100 p-1">
      {items.map(i => (
        <button key={i.key} onClick={() => onChange(i.key)}
          className={`flex-1 whitespace-nowrap rounded-full py-2 font-bold transition
            ${dense ? 'px-1.5 text-[12px]' : 'px-3 text-[13px]'}
            ${value === i.key ? `${on} text-white shadow-sm` : 'text-ink-500 hover:text-ink-900'}`}>
          {i.label}
        </button>
      ))}
    </div>
  );
}

/** 進度條 */
export function Meter({ pct, color = '#8B82AD', track = '#EBE9F1', height = 8 }:
  { pct: number; color?: string; track?: string; height?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-full" style={{ background: track, height }}>
      <div className="h-full rounded-full transition-[width] duration-700"
           style={{ width: `${Math.min(100, Math.max(0, pct))}%`, background: color }} />
    </div>
  );
}

/** 底部主導覽列 */
export function BottomNav({ value, onChange }: { value: string; onChange: (k: string) => void }) {
  const items = [
    { key: 'home',    label: '首頁',   d: 'M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5Z' },
    { key: 'track',   label: '行動',   d: 'M13 3 4 14h6l-1 7 9-11h-6l1-7Z' },
    { key: 'food',    label: '飲食',   d: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z' },
    { key: 'shop',    label: '商城',   d: 'M6 7V6a6 6 0 1 1 12 0v1h2l1 14H3L4 7h2Zm2 0h8V6a4 4 0 0 0-8 0v1Z' },
    { key: 'account', label: '我的',   d: 'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5 0-9 2.5-9 5.5V22h18v-2.5c0-3-4-5.5-9-5.5Z' },
  ];
  return (
    <div className="shrink-0 border-t border-ink-100 bg-white/95 px-2 pb-5 pt-2 backdrop-blur">
      <div className="flex">
        {items.map(i => {
          const active = value === i.key;
          return (
            <button key={i.key} onClick={() => onChange(i.key)}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1 transition
                ${active ? 'text-purple-600' : 'text-ink-300 hover:text-ink-500'}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={i.d} /></svg>
              <span className="text-[10px] font-bold">{i.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** 標籤徽章 */
export function Badge({ children, tone = 'leaf' }:
  { children: React.ReactNode; tone?: 'leaf' | 'purple' | 'aqua' | 'amber' | 'mauve' }) {
  const t = {
    leaf:'bg-leaf-100 text-leaf-600', purple:'bg-purple-100 text-purple-700',
    aqua:'bg-aqua-100 text-aqua-600', amber:'bg-amber-100 text-amber-500',
    mauve:'bg-mauve-100 text-mauve-400',
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${t}`}>{children}</span>;
}
