
import React from 'react';
import { PrompterSettings } from '../types';
import { Settings, Type, Play, RotateCcw, Monitor } from 'lucide-react';

interface SettingsPanelProps {
  settings: PrompterSettings;
  onSettingsChange: (newSettings: Partial<PrompterSettings>) => void;
  onStart: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSettingsChange, onStart }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="text-blue-400 w-5 h-5" />
        <h2 className="text-xl font-bold">播放設定</h2>
      </div>

      <div className="space-y-6">
        {/* Font Size */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-slate-400">字體大小: {settings.fontSize}px</label>
          </div>
          <input 
            type="range" min="20" max="120" 
            value={settings.fontSize}
            onChange={(e) => onSettingsChange({ fontSize: parseInt(e.target.value) })}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Speed */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-slate-400">滾動速度: {settings.speed}</label>
          </div>
          <input 
            type="range" min="1" max="20" 
            value={settings.speed}
            onChange={(e) => onSettingsChange({ speed: parseInt(e.target.value) })}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </div>

        {/* Mirror Mode */}
        <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-xl">
          <div className="flex items-center gap-2">
            <Monitor className="text-slate-400 w-4 h-4" />
            <span className="text-sm">鏡像模式 (適合分光鏡)</span>
          </div>
          <button 
            onClick={() => onSettingsChange({ isMirrored: !settings.isMirrored })}
            className={`w-12 h-6 rounded-full transition-colors relative ${settings.isMirrored ? 'bg-blue-600' : 'bg-slate-600'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.isMirrored ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">文字顏色</label>
            <input 
              type="color" 
              value={settings.textColor}
              onChange={(e) => onSettingsChange({ textColor: e.target.value })}
              className="w-full h-10 rounded bg-slate-700 border-none cursor-pointer"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">背景顏色</label>
            <input 
              type="color" 
              value={settings.backgroundColor}
              onChange={(e) => onSettingsChange({ backgroundColor: e.target.value })}
              className="w-full h-10 rounded bg-slate-700 border-none cursor-pointer"
            />
          </div>
        </div>

        <button 
          onClick={onStart}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
        >
          <Play className="fill-current" />
          啟動提示器
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
