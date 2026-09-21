/**
 * Green Track 綠野追蹤 — Tailwind 設定
 * 色彩取樣自品牌標誌（greentrack/assets/logo.webp）。
 * content 僅涵蓋 greentrack/，既有的 EduPrompt 仍使用自己的 Tailwind CDN。
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./greentrack.html', './greentrack/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* 主色：品牌標誌水滴之藍紫 */
        purple: {
          50:'#F5F4FA', 100:'#EAE7F3', 200:'#D4CFE7', 300:'#B8B1D6',
          400:'#9C93C1', 500:'#8B82AD', 600:'#7268A0', 700:'#5B5382',
          800:'#433D60', 900:'#2E2A40',
        },
        /* 輔色一：水滴內襯之淡天藍 */
        aqua: {
          50:'#F3FBFD', 100:'#E3F6FB', 200:'#BCE4F0', 300:'#93D5E8',
          400:'#63BFDA', 500:'#3FA8C6', 600:'#2D87A3',
        },
        /* 輔色二：葉片之柔和綠 */
        leaf: {
          50:'#F4FAF4', 100:'#E5F4E6', 200:'#C8E7CA', 300:'#9DCC9F',
          400:'#79B77D', 500:'#5A9C60', 600:'#437A48',
        },
        /* 點綴色：孔雀羽之藕紫 */
        mauve: { 100:'#F7EFF6', 200:'#ECD9E9', 300:'#D9B7D5', 400:'#C49BC1' },
        /* 功能色：集點模組之暖琥珀 */
        amber: { 50:'#FEF9EF', 100:'#FDF1DC', 200:'#F9E2B7', 300:'#F2C572', 400:'#E0A63E', 500:'#BE8722' },
        ink: {
          50:'#F7F6FA', 100:'#EBE9F1', 200:'#D8D5E3', 300:'#A9A6B9',
          400:'#8B88A0', 500:'#6C6885', 700:'#4A4561', 900:'#2E2A40',
        },
      },
      fontFamily: {
        sans:  ['"Noto Sans TC"', '"Figtree"', 'system-ui', 'sans-serif'],
        num:   ['"Figtree"', '"Noto Sans TC"', 'system-ui', 'sans-serif'],
        brand: ['"Caveat"', '"Noto Sans TC"', 'cursive'],
      },
      boxShadow: {
        card:  '0 2px 10px -2px rgba(46,42,64,.08), 0 8px 24px -12px rgba(46,42,64,.14)',
        lift:  '0 6px 18px -4px rgba(46,42,64,.14), 0 18px 40px -18px rgba(46,42,64,.22)',
        phone: '0 10px 30px -8px rgba(46,42,64,.22), 0 40px 80px -30px rgba(46,42,64,.38)',
      },
      borderRadius: { xl2: '1.375rem' },
    },
  },
  plugins: [],
};
