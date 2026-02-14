import React from 'react';
import { AspectRatio } from '../types';
import { Square, RectangleHorizontal, RectangleVertical } from 'lucide-react';

interface AspectRatioSelectorProps {
  selected: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selected, onChange }) => {
  const ratios: { value: AspectRatio; label: string; icon: React.ReactNode }[] = [
    { value: '1:1', label: 'مربع (1:1)', icon: <Square className="w-4 h-4" /> },
    { value: '16:9', label: 'أفقي (16:9)', icon: <RectangleHorizontal className="w-4 h-4" /> },
    { value: '9:16', label: 'عمودي (9:16)', icon: <RectangleVertical className="w-4 h-4" /> },
    { value: '4:3', label: 'قياسي (4:3)', icon: <RectangleHorizontal className="w-4 h-4 scale-90" /> },
    { value: '3:4', label: 'صورة (3:4)', icon: <RectangleVertical className="w-4 h-4 scale-90" /> },
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-300">أبعاد الصورة</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {ratios.map((ratio) => (
          <button
            key={ratio.value}
            onClick={() => onChange(ratio.value)}
            className={`
              flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 border
              ${selected === ratio.value
                ? 'bg-banana-500/20 border-banana-500 text-banana-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
              }
            `}
          >
            {ratio.icon}
            <span>{ratio.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AspectRatioSelector;
