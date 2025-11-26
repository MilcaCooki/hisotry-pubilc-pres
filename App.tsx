
import React, { useState, useEffect } from 'react';
import { PRESENTATIONS } from './constants';
import { SlideRenderer } from './components/SlideRenderer';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [activePresId, setActivePresId] = useState<number>(0);
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
  const currentPres = PRESENTATIONS.find(p => p.id === activePresId) || PRESENTATIONS[0];
  const currentSlide = currentPres.slides[activeSlideIdx];
  const totalSlides = currentPres.slides.length;
  const progress = ((activeSlideIdx + 1) / totalSlides) * 100;

  // Key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlideIdx, activePresId]);

  const nextSlide = () => {
    if (activeSlideIdx < totalSlides - 1) {
      setActiveSlideIdx(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (activeSlideIdx > 0) {
      setActiveSlideIdx(prev => prev - 1);
    }
  };

  const changePresentation = (id: number) => {
    setActivePresId(id);
    setActiveSlideIdx(0);
    setIsMenuOpen(false);
  };

  return (
    // ROOT CONTAINER: Flex Column, H-Screen. 
    // This structure ensures Header and Main stack vertically without overlap.
    <div className="relative w-full min-h-screen flex flex-col overflow-y-auto md:overflow-hidden text-white transition-colors duration-1000 bg-slate-900 font-inter">
      
      {/* Dynamic Background Layer (Absolute behind everything) */}
      <div 
        className={`absolute inset-0 z-0 animate-gradient transition-opacity duration-1000 opacity-100 ${currentPres.themeGradient}`}
      />
      
      {/* Decorative Blob Layer */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-1000 z-0 animate-float"
        style={{ background: `radial-gradient(circle, ${currentPres.accentColorHex} 0%, transparent 70%)` }}
      />

      {/* HEADER: Flex Item (Not Fixed) */}
      {/* It sits in the flow, so it pushes the Main content down naturally. */}
      <header className="relative z-40 w-full shrink-0 flex justify-between items-center px-6 py-4 md:py-6 bg-slate-900/20 backdrop-blur-md border-b border-white/5 shadow-sm">
        <div className="flex items-center gap-4">
           <div className="text-xl md:text-2xl font-bold tracking-widest uppercase font-oswald text-white/90 drop-shadow-md select-none">
             I FUCKING HATE <span className={`text-xs align-top ${currentPres.accentColor} font-normal ml-1 line-through`}> RKN</span>
           </div>
        </div>

        {/* Desktop Tabs */}
        <nav className="hidden md:flex gap-2 p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
          {PRESENTATIONS.map(p => (
            <button
              key={p.id}
              onClick={() => changePresentation(p.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                activePresId === p.id 
                  ? 'bg-white/15 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] border border-white/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {p.id + 1}. {p.shortTitle}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden animate-slide-in">
           <button className="absolute top-6 right-6 p-2 text-white/70 hover:text-white" onClick={() => setIsMenuOpen(false)}><X size={32}/></button>
           {PRESENTATIONS.map(p => (
            <button
              key={p.id}
              onClick={() => changePresentation(p.id)}
              className={`text-2xl font-oswald uppercase tracking-widest px-8 py-4 ${activePresId === p.id ? currentPres.accentColor : 'text-slate-500'}`}
            >
              {p.title}
            </button>
          ))}
        </div>
      )}

      {/* MAIN CONTENT: Overflow Hidden to prevent scrolling */}
      <main className="relative z-10 flex-1 w-full overflow-y-auto md:overflow-hidden flex flex-col">
        {/* Adjusted padding to give more breathing room on top/bottom/sides */}
        <div className="flex-1 w-full flex items-center justify-center px-8 py-10 md:px-16 md:py-20 lg:px-32 lg:py-24">
            <div 
              className="w-full max-w-7xl h-full flex flex-col justify-center" 
              key={`${activePresId}-${activeSlideIdx}`} // Forces animation reset
            >
               <SlideRenderer 
                  slide={currentSlide} 
                  accentColor={currentPres.accentColor} 
                  secondaryColor={currentPres.secondaryColor}
               />
            </div>
        </div>
      </main>

      {/* FIXED OVERLAYS (Navigation, Progress) */}
      
      {/* Nav Buttons (Absolute relative to viewport) */}
      <div className="fixed top-1/2 -translate-y-1/2 left-4 z-30 hidden lg:block">
        <button 
          onClick={prevSlide}
          disabled={activeSlideIdx === 0}
          className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all disabled:opacity-0 disabled:cursor-not-allowed group border border-white/5 shadow-lg"
        >
          <ChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="fixed top-1/2 -translate-y-1/2 right-4 z-30 hidden lg:block">
        <button 
          onClick={nextSlide}
          disabled={activeSlideIdx === totalSlides - 1}
          className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all disabled:opacity-0 disabled:cursor-not-allowed group border border-white/5 shadow-lg"
        >
          <ChevronRight className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1.5 bg-white/5 z-40">
        <div 
          className={`h-full bg-gradient-to-r from-white to-${currentPres.accentColor.split('-')[1]}-400 shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide Counter */}
      <div className="fixed bottom-4 left-4 z-30 text-xs font-mono text-white/30 hidden md:block bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
        SLIDE {activeSlideIdx + 1} / {totalSlides}
      </div>
      
    </div>
  );
};

export default App;
