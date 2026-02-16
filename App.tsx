
import React, { useState, useEffect } from 'react';
import { PrompterSettings, AppMode } from './types';
import SettingsPanel from './components/SettingsPanel';
import Player from './components/Player';
import { refineScript, generateInitialScript } from './services/geminiService';
import { Sparkles, Languages, Wand2, FileText, Plus, History, Trash2, Video } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('setup');
  const [script, setScript] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [topic, setTopic] = useState('');
  
  const [settings, setSettings] = useState<PrompterSettings>({
    fontSize: 64,
    speed: 5,
    isMirrored: false,
    textColor: '#ffffff',
    backgroundColor: '#0f172a',
    lineHeight: 1.5
  });

  const handleSettingsChange = (newSettings: Partial<PrompterSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleGenerateScript = async () => {
    if (!topic) return;
    setAiLoading(true);
    try {
      const res = await generateInitialScript(topic);
      setScript(res);
    } catch (err) {
      alert("AI 腳本產生失敗，請確認 API Key。");
    } finally {
      setAiLoading(false);
    }
  };

  const handleRefineScript = async (objective: string) => {
    if (!script) return;
    setAiLoading(true);
    try {
      const res = await refineScript(script, objective);
      setScript(res);
    } catch (err) {
      alert("AI 優化失敗，請檢查網路。");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {mode === 'setup' && (
        <div className="max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Video className="text-white w-6 h-6" />
                </div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  EduPrompt
                </h1>
              </div>
              <p className="text-slate-400">專為學生與短影音創作者設計的專業提示播放器</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                AI 腳本助手已連線
              </span>
            </div>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Script Editor */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
                <div className="p-4 bg-slate-700/30 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="text-slate-400 w-4 h-4" />
                    <span className="text-sm font-medium">腳本編輯器</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setScript('')}
                      className="p-1.5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="relative">
                  <textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder="在此貼上你的腳本，或使用下方的 AI 工具產生..."
                    className="w-full h-[400px] p-6 bg-transparent resize-none focus:outline-none text-xl leading-relaxed text-slate-200 placeholder:text-slate-600"
                  />
                  {aiLoading && (
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-blue-400 font-medium animate-pulse">Gemini 正在思考中...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* AI Interaction Area */}
                <div className="p-6 bg-slate-800/30 border-t border-slate-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Gen from Topic */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Plus className="w-4 h-4" />
                        <span>從主題開始</span>
                      </div>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          placeholder="例如：自我介紹、科學實驗..."
                          className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        />
                        <button 
                          onClick={handleGenerateScript}
                          disabled={!topic || aiLoading}
                          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded-xl transition-all flex items-center gap-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          產生
                        </button>
                      </div>
                    </div>

                    {/* Refinement Options */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Wand2 className="w-4 h-4" />
                        <span>腳本優化</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => handleRefineScript("讓內容更幽默有趣")}
                          disabled={!script || aiLoading}
                          className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-lg text-xs transition-colors"
                        >
                          更幽默
                        </button>
                        <button 
                          onClick={() => handleRefineScript("精簡內容，適合 30 秒")}
                          disabled={!script || aiLoading}
                          className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs transition-colors"
                        >
                          精簡化
                        </button>
                        <button 
                          onClick={() => handleRefineScript("口語化，移除生硬措辭")}
                          disabled={!script || aiLoading}
                          className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs transition-colors"
                        >
                          更口語
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-xl flex gap-4 items-start">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Languages className="text-blue-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-300 mb-1">小撇步</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    在拍攝時，將手機或平板放在與鏡頭等高的位置。若使用分光鏡，記得開啟「鏡像模式」以確保文字方向正確。
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Settings */}
            <div className="space-y-6">
              <SettingsPanel 
                settings={settings} 
                onSettingsChange={handleSettingsChange}
                onStart={() => setMode('playing')}
              />
              
              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">由 Google Gemini 驅動</span>
              </div>
            </div>
          </main>
        </div>
      )}

      {mode === 'playing' && (
        <Player 
          content={script} 
          settings={settings} 
          onClose={() => setMode('setup')}
        />
      )}

      {/* Footer (Setup mode only) */}
      {mode === 'setup' && (
        <footer className="mt-auto py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          &copy; 2024 EduPrompt. 學生短影音文字提示播放器.
        </footer>
      )}
    </div>
  );
};

export default App;
