import React from 'react';
import { Download, Loader2, Image as ImageIcon, Share2 } from 'lucide-react';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  prompt: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, prompt }) => {
  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `nano-banana-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full aspect-square md:aspect-video bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center gap-4 animate-pulse">
        <Loader2 className="w-12 h-12 text-banana-500 animate-spin" />
        <div className="text-slate-400 text-center px-4">
          <p className="font-medium text-banana-400">جاري إنشاء تحفتك الفنية...</p>
          <p className="text-sm mt-1 text-slate-500">قد يستغرق هذا بضع ثوانٍ</p>
        </div>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="w-full aspect-square md:aspect-video bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center gap-4 text-slate-500">
        <div className="p-4 bg-slate-800 rounded-full">
          <ImageIcon className="w-8 h-8 opacity-50" />
        </div>
        <p>ستظهر الصورة المولدة هنا</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in zoom-in duration-500">
      <div className="relative group rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700 bg-slate-900">
        <img
          src={imageUrl}
          alt={prompt}
          className="w-full h-auto object-contain max-h-[70vh] mx-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
          <div className="flex gap-3">
             <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-2.5 bg-banana-500 hover:bg-banana-400 text-slate-900 font-bold rounded-full transition-transform active:scale-95 shadow-lg shadow-banana-500/20"
            >
              <Download className="w-5 h-5" />
              <span>تحميل</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <p className="text-sm text-slate-400 mb-1">الوصف المستخدم:</p>
        <p className="text-slate-200 leading-relaxed">{prompt}</p>
      </div>
    </div>
  );
};

export default ImageDisplay;
