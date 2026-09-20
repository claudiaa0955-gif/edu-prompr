import React from 'react';

/* ── 折線圖 ─────────────────────────────────────────────── */
export function LineChart({ data, labels, color = '#8B82AD', fill = 'rgba(139,130,173,.16)',
  height = 120, target, targetLabel, unit = '' }: {
  data: number[]; labels?: string[]; color?: string; fill?: string;
  height?: number; target?: number; targetLabel?: string; unit?: string;
}) {
  const w = 300, h = height, pad = 10;
  const all = target != null ? [...data, target] : data;
  /** 以資料實際跨距（而非絕對值）留白，避免變化幅度小時曲線被壓平 */
  const lo = Math.min(...all), hi = Math.max(...all);
  const range = hi - lo || Math.abs(hi) * 0.1 || 1;
  const min = lo - range * 0.18, max = hi + range * 0.18;
  const x = (i: number) => pad + (i * (w - pad * 2)) / Math.max(1, data.length - 1);
  const y = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
  const path = data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${path} L${x(data.length - 1)},${h - pad} L${x(0)},${h - pad} Z`;
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} role="img" aria-label="趨勢折線圖">
        {[0.25, 0.5, 0.75].map(p => (
          <line key={p} x1={pad} x2={w - pad} y1={pad + p * (h - pad * 2)} y2={pad + p * (h - pad * 2)}
                stroke="#EBE9F1" strokeWidth="1" />
        ))}
        {target != null && (
          <line x1={pad} x2={w - pad} y1={y(target)} y2={y(target)} stroke="#C49BC1" strokeWidth="1.5" strokeDasharray="5 4" />
        )}
        <path d={area} fill={fill} />
        <path d={path} fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((v, i) => (
          <circle key={i} cx={x(i)} cy={y(v)} r={i === data.length - 1 ? 4.5 : 3}
                  fill={i === data.length - 1 ? color : '#fff'} stroke={color} strokeWidth="2" />
        ))}
      </svg>
      <div className="mt-1 flex justify-between px-1">
        {labels?.map((l, i) => <span key={i} className="font-num text-[10px] text-ink-300">{l}</span>)}
      </div>
      {target != null && targetLabel && (
        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-ink-400">
          <span className="inline-block h-0 w-4 border-t-2 border-dashed border-mauve-400" />
          {targetLabel}{unit}
        </div>
      )}
    </div>
  );
}

/* ── 長條圖 ─────────────────────────────────────────────── */
export function BarChart({ data, labels, color = '#9DCC9F', highlight, height = 110, unit = '' }: {
  data: number[]; labels: string[]; color?: string; highlight?: number; height?: number; unit?: string;
}) {
  const max = Math.max(...data) * 1.12;
  return (
    <div className="flex items-stretch gap-1.5" style={{ height }}>
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
          <span className="font-num text-[9px] font-bold tabular-nums text-ink-400">{v}{unit}</span>
          <div className="flex w-full flex-1 items-end">
            <div className="w-full rounded-t-lg transition-[height] duration-700"
                 style={{ height: `${(v / max) * 100}%`, background: i === highlight ? '#8B82AD' : color, minHeight: 4 }} />
          </div>
          <span className="text-[10px] text-ink-300">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ── 儀表板（半圓）─────────────────────────────────────── */
export function Gauge({ value, max, label, unit, color = '#8B82AD', size = 128 }: {
  value: number; max: number; label: string; unit: string; color?: string; size?: number;
}) {
  const pct = Math.min(1, value / max);
  const r = 46, c = Math.PI * r;
  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg viewBox="0 0 110 62" style={{ width: size }} role="img" aria-label={`${label} ${value} ${unit}`}>
        <path d="M9 55a46 46 0 0 1 92 0" fill="none" stroke="#EBE9F1" strokeWidth="9" strokeLinecap="round" />
        <path d="M9 55a46 46 0 0 1 92 0" fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
              strokeDasharray={`${c * pct} ${c}`} style={{ transition: 'stroke-dasharray .8s cubic-bezier(.22,1,.36,1)' }} />
      </svg>
      <div className="-mt-5 text-center">
        <div className="font-num text-[20px] font-extrabold leading-none tabular-nums text-ink-900">{value}</div>
        <div className="text-[10px] text-ink-400">{unit}</div>
        <div className="mt-1 text-[11px] font-bold text-ink-700">{label}</div>
      </div>
    </div>
  );
}

/* ── 環形圖（營養素占比）───────────────────────────────── */
export function DonutRing({ segments, center, sub, size = 132 }: {
  segments: { value: number; color: string; label: string }[];
  center: string; sub?: string; size?: number;
}) {
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  const r = 52, C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 130 130" style={{ width: size, height: size }} role="img" aria-label="營養素占比環形圖">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#F3F2F7" strokeWidth="16" />
        {segments.map((s, i) => {
          const len = (s.value / total) * C;
          const el = (
            <circle key={i} cx="65" cy="65" r={r} fill="none" stroke={s.color} strokeWidth="16"
                    strokeDasharray={`${len - 2} ${C - len + 2}`} strokeDashoffset={-acc}
                    strokeLinecap="round" transform="rotate(-90 65 65)" />
          );
          acc += len; return el;
        })}
        <text x="65" y="62" textAnchor="middle" className="fill-ink-900 font-num" fontSize="21" fontWeight="800">{center}</text>
        {sub && <text x="65" y="78" textAnchor="middle" className="fill-ink-400" fontSize="10">{sub}</text>}
      </svg>
      <div className="flex-1 space-y-2">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-[12px]">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
            <span className="flex-1 text-ink-500">{s.label}</span>
            <span className="font-num font-bold tabular-nums text-ink-900">{Math.round((s.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 水平刻度尺（體重）─────────────────────────────────── */
export function RulerH({ value, onChange, min, max, step = 0.1, unit = 'kg' }: {
  value: number; onChange: (v: number) => void; min: number; max: number; step?: number; unit?: string;
}) {
  const TICK = 11;          // 每一刻度之間距（px）
  const PER_TICK = 0.5;     // 每一刻度代表 0.5 kg
  const SPAN = 20;          // 左右各顯示 20 個刻度
  /** 以目前數值為中心產生刻度，並依小數位平移，使刻度尺跟著數值捲動 */
  const base = Math.round(value / PER_TICK);
  const offset = (value / PER_TICK - base) * TICK;
  const ticks = Array.from({ length: SPAN * 2 + 1 }, (_, i) => base - SPAN + i);

  return (
    <div className="select-none">
      <div className="flex items-end justify-center gap-1.5">
        <span className="font-num text-[52px] font-extrabold leading-none tabular-nums text-purple-600">{value.toFixed(1)}</span>
        <span className="mb-2 text-[15px] font-bold text-ink-400">{unit}</span>
      </div>

      <div className="relative mt-5 h-[72px] overflow-hidden">
        <div className="absolute inset-x-0 bottom-4 flex items-end justify-center"
             style={{ transform: `translateX(${-offset}px)` }}>
          {ticks.map(t => {
            const v = t * PER_TICK;
            const major = t % 5 === 0;
            const inRange = v >= min && v <= max;
            return (
              <span key={t} className="relative flex shrink-0 flex-col items-center" style={{ width: TICK }}>
                <span className={`w-[2px] rounded-full ${!inRange ? 'bg-ink-100' : major ? 'h-9 bg-purple-300' : 'h-5 bg-ink-200'}`}
                      style={!inRange ? { height: major ? 36 : 20 } : undefined} />
                {major && inRange && (
                  <span className="absolute -bottom-4 font-num text-[10px] tabular-nums text-ink-300">{v}</span>
                )}
              </span>
            );
          })}
        </div>
        <span className="pointer-events-none absolute bottom-4 left-1/2 h-14 w-[3px] -translate-x-1/2 rounded-full bg-purple-500" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />
      </div>

      <input type="range" min={min} max={max} step={step} value={value} aria-label={`數值（${unit}）`}
             onChange={e => onChange(Number(e.target.value))}
             className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink-100 accent-purple-500" />
      <div className="mt-1.5 flex justify-between font-num text-[11px] text-ink-300">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

/* ── 垂直刻度尺（身高）─────────────────────────────────── */
export function RulerV({ value, onChange, min, max, height = 272 }: {
  value: number; onChange: (v: number) => void; min: number; max: number; height?: number;
}) {
  const pct = (value - min) / (max - min);
  const COUNT = 25;                                   // 刻度數量
  const stepVal = (max - min) / (COUNT - 1);

  return (
    <div className="flex select-none items-stretch gap-3" style={{ height }}>
      {/* 刻度與指示線 */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 right-0 flex w-full flex-col-reverse justify-between">
          {Array.from({ length: COUNT }, (_, i) => {
            const major = i % 4 === 0;
            const v = Math.round(min + i * stepVal);
            return (
              <span key={i} className="relative flex items-center justify-end gap-2">
                {major && <span className="font-num text-[10px] tabular-nums text-ink-300">{v}</span>}
                <span className={`h-[2px] shrink-0 rounded-full ${major ? 'w-9 bg-purple-300' : 'w-5 bg-ink-200'}`} />
              </span>
            );
          })}
        </div>
        {/* 目前數值指示 */}
        <div className="pointer-events-none absolute right-0 flex items-center gap-2 transition-[bottom] duration-150"
             style={{ bottom: `${pct * 100}%`, transform: 'translateY(50%)' }}>
          <span className="whitespace-nowrap font-num text-[24px] font-extrabold italic tabular-nums text-purple-600">
            {value.toFixed(1)}
          </span>
          <span className="h-[3px] w-14 shrink-0 rounded-full bg-purple-500" />
        </div>
      </div>

      {/* 垂直滑桿（以固定尺寸容器包住旋轉後的 input，避免溢出版面） */}
      <div className="relative w-9 shrink-0">
        <input type="range" min={min} max={max} step={0.5} value={value} aria-label="身高（cm）"
               onChange={e => onChange(Number(e.target.value))}
               className="absolute left-1/2 top-1/2 h-1.5 cursor-pointer appearance-none rounded-full bg-ink-100 accent-purple-500"
               style={{ width: height, transform: 'translate(-50%,-50%) rotate(-90deg)' }} />
      </div>
    </div>
  );
}

/* ── 滾輪選擇器（出生年份）─────────────────────────────── */
export function WheelPicker({ value, onChange, options, suffix = '' }: {
  value: number; onChange: (v: number) => void; options: number[]; suffix?: string;
}) {
  const idx = options.indexOf(value);
  const view = [-2, -1, 0, 1, 2].map(d => options[idx + d]);
  return (
    <div className="relative select-none py-2">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-12 w-40 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-purple-200 bg-white" />
      <div className="relative flex flex-col items-center gap-1">
        {view.map((v, i) => {
          const center = i === 2;
          return (
            <button key={i} disabled={v == null} onClick={() => v != null && onChange(v)}
              className={`font-num tabular-nums transition ${
                center ? 'text-[30px] font-extrabold text-mauve-400'
                       : Math.abs(i - 2) === 1 ? 'text-[19px] font-bold text-ink-300' : 'text-[15px] text-ink-200'}`}>
              {v != null ? `${v}${suffix}` : ''}
            </button>
          );
        })}
      </div>
      <input type="range" min={0} max={options.length - 1} value={Math.max(0, idx)} aria-label="出生年份"
             onChange={e => onChange(options[Number(e.target.value)])}
             className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink-100 accent-purple-500" />
    </div>
  );
}

/* ── BMI 色彩量表 ───────────────────────────────────────── */
export function BmiScale({ bmi }: { bmi: number }) {
  const stops = [
    { label: '過輕', max: 18.5, color: '#93D5E8' },
    { label: '健康', max: 24,   color: '#9DCC9F' },
    { label: '過重', max: 27,   color: '#F2C572' },
    { label: '肥胖', max: 35,   color: '#C49BC1' },
  ];
  const pct = Math.min(100, Math.max(0, ((bmi - 15) / 20) * 100));
  return (
    <div>
      <div className="relative h-3 overflow-hidden rounded-full"
           style={{ background: 'linear-gradient(90deg,#93D5E8 0%,#9DCC9F 32%,#F2C572 62%,#C49BC1 100%)' }} />
      <div className="relative h-0">
        <span className="absolute -top-[18px] grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full border-[3px] border-white bg-purple-600 shadow-md"
              style={{ left: `${pct}%` }} />
      </div>
      <div className="mt-3 flex justify-between text-[10px] text-ink-300">
        {stops.map(s => <span key={s.label}>{s.label}</span>)}
      </div>
    </div>
  );
}

/* ── 迷你折線（卡片內）─────────────────────────────────── */
export function Sparkline({ data, color = '#fff', width = 90, height = 30 }: {
  data: number[]; color?: string; width?: number; height?: number;
}) {
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) =>
    `${(i * width) / (data.length - 1)},${height - ((v - min) / (max - min || 1)) * height}`).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".9" />
    </svg>
  );
}
