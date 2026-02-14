import React, { useState } from 'react';
import Header from './components/Header';
import AspectRatioSelector from './components/AspectRatioSelector';
import ImageDisplay from './components/ImageDisplay';
import { generateImageWithGemini } from './services/geminiService';
import { AspectRatio } from './types';
import { Wand2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImageWithGemini(prompt, aspectRatio);
      setGeneratedImage(imageUrl);
    } catch (err: any) {
      setError(err.message || 'فشل في إنشاء الصورة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] font-sans selection:bg-banana-500/30 selection:text-banana-200">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Intro Section */}
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            حول أفكارك إلى <span className="text-banana-400 inline-block decoration-wavy underline decoration-banana-500/30">واقع</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            أدخل وصفاً وشاهد كيف يقوم الذكاء الاصطناعي بتحويل كلماتك إلى لوحات فنية مذهلة في ثوانٍ.
          </p>
        </div>

        {/* Control Panel */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="prompt" className="text-sm font-medium text-slate-300">
                وصف الصورة
              </label>
              <div className="relative">
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="مثال: قطة فضائية تركب لوح تزلج في الفضاء الخارجي، ألوان نيون..."
                  className="w-full min-h-[120px] bg-slate-900/80 border border-slate-700 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-banana-500 focus:border-transparent transition-all resize-none text-lg leading-relaxed shadow-inner"
                  disabled={isLoading}
                />
                <div className="absolute bottom-3 left-3 text-xs text-slate-500">
                  {prompt.length} حرف
                </div>
              </div>
            </div>

            <AspectRatioSelector selected={aspectRatio} onChange={setAspectRatio} />

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className={`
                w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3
                ${isLoading || !prompt.trim()
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-banana-500 to-orange-600 text-white hover:shadow-banana-500/25 hover:scale-[1.01] active:scale-[0.99]'
                }
              `}
            >
              {isLoading ? (
                'جاري المعالجة...'
              ) : (
                <>
                  <Wand2 className="w-6 h-6" />
                  إنشاء الصورة
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result Section */}
        <div className="pb-12">
          <ImageDisplay 
            imageUrl={generatedImage} 
            isLoading={isLoading} 
            prompt={prompt}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
