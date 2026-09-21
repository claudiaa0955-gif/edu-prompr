import React from 'react';
import logoUrl from '../assets/logo.webp';
import logoOnDarkUrl from '../assets/logo-on-dark.webp';
import logoMarkUrl from '../assets/logo-mark.webp';
import mascotUrl from '../assets/mascot.webp';
import mascotFigureUrl from '../assets/mascot-figure.webp';
import mascotAvatarUrl from '../assets/mascot-avatar.webp';

/**
 * 品牌標誌 — 水滴 × 孔雀 × 葉片。
 *
 * tone="onDark" 供深色／彩色底使用：字標改為白色，水滴與葉片維持原色。
 * 白色字標是從原始標誌的像素重建（依覆蓋率轉為白色），並非以網頁字型重打，
 * 因此手寫字體的外形與原標誌完全一致。
 */
export function Logo({ className = '', size = 64, tone = 'color' }:
  { className?: string; size?: number; tone?: 'color' | 'onDark' }) {
  return (
    <img
      src={tone === 'onDark' ? logoOnDarkUrl : logoUrl}
      alt="Green Track 綠野追蹤 品牌標誌"
      width={size}
      height={size}
      style={{ width: size, height: 'auto' }}
      className={`select-none ${className}`}
      draggable={false}
    />
  );
}

/** 品牌標記 — 僅水滴造型，用於已另有文字標的緊湊版面 */
export function LogoMark({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <img
      src={logoMarkUrl}
      alt="Green Track 品牌標記"
      style={{ height: size, width: 'auto' }}
      className={`select-none ${className}`}
      draggable={false}
    />
  );
}

export type MascotPose = 'full' | 'figure' | 'avatar';

/** 品牌吉祥物「小綠」 */
export function Mascot({ pose = 'figure', className = '', style, float = false }:
  { pose?: MascotPose; className?: string; style?: React.CSSProperties; float?: boolean }) {
  const src = pose === 'full' ? mascotUrl : pose === 'avatar' ? mascotAvatarUrl : mascotFigureUrl;
  return (
    <img
      src={src}
      alt="Green Track 品牌吉祥物 小綠"
      className={`select-none pointer-events-none ${float ? 'gt-float' : ''} ${className}`}
      style={style}
      draggable={false}
    />
  );
}

/** 吉祥物對話框 — 用於 AI 回饋與鼓勵文案 */
export function MascotSays({ children, tone = 'purple' }:
  { children: React.ReactNode; tone?: 'purple' | 'aqua' | 'leaf' | 'amber' }) {
  const tones = {
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    aqua:   'bg-aqua-50 border-aqua-200 text-aqua-600',
    leaf:   'bg-leaf-50 border-leaf-200 text-leaf-600',
    amber:  'bg-amber-50 border-amber-200 text-amber-500',
  }[tone];
  return (
    <div className="flex items-end gap-2">
      <Mascot pose="avatar" className="w-14 shrink-0 -mb-1" />
      <div className={`relative flex-1 rounded-2xl rounded-bl-md border px-3.5 py-2.5 text-[13px] leading-relaxed ${tones}`}>
        {children}
      </div>
    </div>
  );
}
