
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PrompterSettings } from '../types';
import { X, Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';

interface PlayerProps {
  content: string;
  settings: PrompterSettings;
  onClose: () => void;
}

const Player: React.FC<PlayerProps> = ({ content, settings, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  const animate = useCallback((time: number) => {
    if (isPlaying && scrollRef.current) {
      setScrollPos((prev) => prev + settings.speed * 0.5);
    }
    requestRef.current = requestAnimationFrame(animate);
  }, [isPlaying, settings.speed]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animate]);

  const handleReset = () => {
    setScrollPos(0);
    setIsPlaying(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: settings.backgroundColor }}
    >
      {/* Control Overlay (Sticky top) */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-md flex items-center justify-between opacity-20 hover:opacity-100 transition-opacity z-50">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex items-center gap-6">
          <button 
            onClick={handleReset}
            className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full text-white"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-5 rounded-full text-white shadow-xl transition-transform active:scale-95 ${isPlaying ? 'bg-orange-500' : 'bg-green-500'}`}
          >
            {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
          </button>
        </div>

        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Guide Lines */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-1/2 left-0 right-0 h-24 -mt-12 bg-white/5 border-y border-white/10" />
      </div>

      {/* Text Container */}
      <div 
        ref={containerRef}
        className={`flex-1 overflow-hidden relative ${settings.isMirrored ? 'scale-x-[-1]' : ''}`}
      >
        <div 
          ref={scrollRef}
          className="absolute top-[40vh] left-0 right-0 px-8 text-center"
          style={{ 
            transform: `translateY(${-scrollPos}px)`,
            fontSize: `${settings.fontSize}px`,
            color: settings.textColor,
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
            fontWeight: 600
          }}
        >
          {content || "請先輸入腳本內容..."}
        </div>
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-4 right-4 text-xs text-slate-500 opacity-50 font-mono">
        Speed: {settings.speed} | Size: {settings.fontSize}px | {settings.isMirrored ? 'Mirrored' : 'Normal'}
      </div>
    </div>
  );
};

export default Player;
