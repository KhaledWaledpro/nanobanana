import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-banana-400 to-banana-600 rounded-lg shadow-lg shadow-banana-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            نانو بانانا <span className="text-banana-400">AI</span>
          </h1>
        </div>
        <div className="text-sm text-slate-400 hidden sm:block">
          مدعوم بواسطة Gemini 2.5
        </div>
      </div>
    </header>
  );
};

export default Header;
