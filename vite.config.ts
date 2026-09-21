import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/** 各進入點對應的 HTML */
const ENTRIES: Record<string, string> = {
  // EduPrompt（既有應用程式）
  main: 'index.html',
  // Green Track 綠野追蹤（永續行動碳足跡紀錄 APP）互動原型
  greentrack: 'greentrack.html',
  // Green Track 介面設計總覽（全部畫面一頁平鋪）
  greentrackGallery: 'greentrack-gallery.html',
};

/**
 * 預設建置全部進入點；設定 GT_ENTRY 時只建置該進入點，
 * 使其不與其他頁面共用 chunk —— 單檔預覽打包需要這個前提。
 */
function buildInput() {
  const only = process.env.GT_ENTRY;
  if (only) {
    if (!ENTRIES[only]) throw new Error(`未知的 GT_ENTRY：${only}`);
    return { [only]: path.resolve(__dirname, ENTRIES[only]) };
  }
  return Object.fromEntries(
    Object.entries(ENTRIES).map(([k, f]) => [k, path.resolve(__dirname, f)])
  );
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      build: {
        rollupOptions: {
          input: buildInput(),
        }
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
