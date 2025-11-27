
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

  // Render Theme-Specific Background Elements
  const renderBackgroundDecorations = () => {
    switch (activePresId) {
      case 0: // Theory - "Astrolabe of Power"
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {/* 1. The Core Glow - Clean, no noise */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vh] h-[40vh] bg-indigo-600/20 rounded-full blur-[80px] mix-blend-screen animate-pulse-slow"></div>

              {/* 2. The Astrolabe Mechanism */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vh] h-[90vh] md:w-[130vh] md:h-[130vh] opacity-40">
                 
                 {/* Outer Ring: The "Universe" - Slow rotation */}
                 <div className="absolute inset-0 rounded-full border border-indigo-500/10 animate-spin-slow" style={{ animationDuration: '200s' }}>
                    {/* Tick marks created by dashed border */}
                    <div className="absolute inset-0 rounded-full border-[4px] border-dashed border-indigo-400/10"></div>
                 </div>

                 {/* Middle Ring: "The State" - Counter rotation */}
                 <div className="absolute inset-[18%] rounded-full border border-indigo-400/20 animate-spin-slow" style={{ animationDuration: '120s', animationDirection: 'reverse' }}>
                    {/* Satellite node (Planet) */}
                    <div className="absolute -top-1.5 left-1/2 w-3 h-3 bg-indigo-300 rounded-full shadow-[0_0_15px_rgba(129,140,248,0.8)]"></div>
                    <div className="absolute -bottom-1.5 left-1/2 w-2 h-2 bg-indigo-400/50 rounded-full"></div>
                 </div>

                 {/* Geometric Layer: "Hierarchy" - Triangle */}
                 <div className="absolute inset-[28%] animate-spin-slow" style={{ animationDuration: '80s' }}>
                    <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-300/15 overflow-visible">
                        <polygon points="50,5 95,85 5,85" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="50" cy="55" r="15" fill="none" stroke="currentColor" strokeWidth="0.2" />
                    </svg>
                 </div>

                 {/* Inner Ring: "The Individual" - Fast rotation */}
                 <div className="absolute inset-[38%] rounded-full border-2 border-dotted border-white/10 animate-spin-slow" style={{ animationDuration: '50s', animationDirection: 'reverse' }}>
                     <div className="absolute top-1/2 -right-1 w-2 h-2 bg-violet-200 rounded-full shadow-[0_0_10px_white]"></div>
                 </div>
                 
                 {/* Central Axis Lines */}
                 <div className="absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent"></div>
                 <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
              </div>
          </div>
        );

      case 1: // Public Control - Digital HUD (Kept as is, previously approved)
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]"></div>
             <div className="absolute inset-x-0 h-[2px] bg-emerald-500/30 shadow-[0_0_20px_#10b981] animate-scan" style={{ animationDuration: '8s', animationIterationCount: 'infinite', animationTimingFunction: 'linear' }}></div>
             <div className="absolute top-6 left-6 w-24 h-24 border-t-2 border-l-2 border-emerald-500/20 rounded-tl-xl animate-pulse-slow"></div>
             <div className="absolute top-6 right-6 w-24 h-24 border-t-2 border-r-2 border-emerald-500/20 rounded-tr-xl animate-pulse-slow"></div>
             <div className="absolute bottom-6 left-6 w-24 h-24 border-b-2 border-l-2 border-emerald-500/20 rounded-bl-xl animate-pulse-slow"></div>
             <div className="absolute bottom-6 right-6 w-24 h-24 border-b-2 border-r-2 border-emerald-500/20 rounded-br-xl animate-pulse-slow"></div>
             <div className="absolute top-1/3 left-10 w-2 h-2 bg-emerald-500/50 animate-flicker"></div>
             <div className="absolute bottom-1/3 right-10 w-2 h-2 bg-emerald-500/50 animate-flicker" style={{ animationDelay: '2s' }}></div>
          </div>
        );

      case 2: // Parliament - Roman Columns (Kept as is, previously approved)
        return (
          <div className="absolute inset-0 flex justify-between px-2 md:px-12 lg:px-24 pointer-events-none z-0 opacity-40">
             <div className="h-full w-12 md:w-24 lg:w-32 flex flex-col items-center">
                 <div className="w-full h-3 md:h-5 bg-amber-700/50 rounded-t-sm" />
                 <div className="w-[120%] h-6 md:h-10 bg-gradient-to-b from-amber-600/40 to-amber-800/40 rounded-sm my-1 shadow-lg" />
                 <div className="w-[85%] flex-1 bg-gradient-to-r from-slate-900 via-[#2a0a0a] to-slate-900 border-x border-amber-900/30 flex justify-around overflow-hidden shadow-2xl">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-full w-1 md:w-2 bg-black/50 blur-[1px] border-r border-white/5" />
                    ))}
                 </div>
                 <div className="w-[120%] h-8 md:h-12 bg-gradient-to-b from-amber-800/40 to-slate-900 rounded-sm mt-1 border-t border-amber-500/20" />
                 <div className="w-[140%] h-4 md:h-8 bg-slate-900" />
             </div>
             
             <div className="h-full w-12 md:w-24 lg:w-32 flex flex-col items-center">
                 <div className="w-full h-3 md:h-5 bg-amber-700/50 rounded-t-sm" />
                 <div className="w-[120%] h-6 md:h-10 bg-gradient-to-b from-amber-600/40 to-amber-800/40 rounded-sm my-1 shadow-lg" />
                 <div className="w-[85%] flex-1 bg-gradient-to-r from-slate-900 via-[#2a0a0a] to-slate-900 border-x border-amber-900/30 flex justify-around overflow-hidden shadow-2xl">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-full w-1 md:w-2 bg-black/50 blur-[1px] border-r border-white/5" />
                    ))}
                 </div>
                 <div className="w-[120%] h-8 md:h-12 bg-gradient-to-b from-amber-800/40 to-slate-900 rounded-sm mt-1 border-t border-amber-500/20" />
                 <div className="w-[140%] h-4 md:h-8 bg-slate-900" />
             </div>
          </div>
        );

      case 3: // Regions - Subtle Grid / Topography (Revised and Approved)
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
             {/* 1. Coordinate Grid - Uniform and Subtle */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#082f49_1px,transparent_1px),linear-gradient(to_bottom,#082f49_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
             
             {/* 2. Uniform Dot Matrix - Replaces distinct flashing dots */}
             <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07]"></div>

             {/* 3. Topographic Curves - Kept but subtle */}
             <svg className="absolute inset-0 w-full h-full opacity-20 mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100,200 Q400,0 800,200 T1800,200" fill="none" stroke="#0ea5e9" strokeWidth="1.5" className="animate-pulse-slow" />
                <path d="M-100,500 Q400,300 800,500 T1800,500" fill="none" stroke="#0ea5e9" strokeWidth="0.5" opacity="0.3" />
                <path d="M-100,800 Q400,1000 800,800 T1800,800" fill="none" stroke="#0ea5e9" strokeWidth="0.5" opacity="0.2" />
             </svg>
             
             {/* 4. Large Ambient Soft Glows (Breathing instead of blinking) */}
             <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDuration: '8s' }}></div>
             <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-cyan-600/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    // ROOT CONTAINER
    <div className="relative w-full min-h-screen flex flex-col overflow-y-auto md:overflow-hidden text-white transition-colors duration-1000 bg-slate-900 font-inter selection:bg-white/20">
      
      {/* 1. Base Gradient Layer */}
      <div 
        className={`absolute inset-0 z-0 animate-gradient transition-all duration-1000 opacity-100 ${currentPres.themeGradient}`}
      />
      
      {/* 2. Standard Blob Layer (Ambient Light) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[100px] opacity-30 pointer-events-none transition-colors duration-1000 z-0 animate-pulse-slow mix-blend-screen"
        style={{ background: `radial-gradient(circle, ${currentPres.accentColorHex} 0%, transparent 70%)` }}
      />

      {/* 3. Theme Specific Decorations */}
      {renderBackgroundDecorations()}

      {/* HEADER */}
      <header className="relative z-40 w-full shrink-0 flex justify-between items-center px-6 py-4 md:py-6 bg-slate-900/20 backdrop-blur-md border-b border-white/5 shadow-sm">
        <div className="flex items-center gap-4">
           <div className="text-xl md:text-2xl font-bold tracking-widest uppercase font-oswald text-white/90 drop-shadow-md select-none flex items-center gap-2">
             I LOVE <span className="text-sm md:text-lg tracking-normal opacity-80 font-sans normal-case line-through">РКН</span>
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
              {p.shortTitle}
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

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 w-full overflow-y-auto md:overflow-hidden flex flex-col">
        <div className="flex-1 w-full flex items-center justify-center px-4 py-6 md:px-16 md:py-20 lg:px-32 lg:py-24">
            <div 
              className="w-full max-w-7xl h-full flex flex-col justify-center" 
              key={`${activePresId}-${activeSlideIdx}`} 
            >
               <SlideRenderer 
                  slide={currentSlide} 
                  accentColor={currentPres.accentColor} 
                  secondaryColor={currentPres.secondaryColor}
               />
            </div>
        </div>
      </main>

      {/* NAV BUTTONS */}
      <div className="fixed top-1/2 -translate-y-1/2 left-4 z-30 hidden lg:block">
        <button 
          onClick={prevSlide}
          disabled={activeSlideIdx === 0}
          className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all disabled:opacity-0 disabled:cursor-not-allowed group border border-white/5 shadow-lg hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="fixed top-1/2 -translate-y-1/2 right-4 z-30 hidden lg:block">
        <button 
          onClick={nextSlide}
          disabled={activeSlideIdx === totalSlides - 1}
          className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all disabled:opacity-0 disabled:cursor-not-allowed group border border-white/5 shadow-lg hover:scale-110 active:scale-95"
        >
          <ChevronRight className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div className="fixed bottom-0 left-0 w-full h-1.5 bg-white/5 z-40">
        <div 
          className={`h-full bg-gradient-to-r from-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* SLIDE COUNTER */}
      <div className="fixed bottom-4 left-4 z-30 text-xs font-mono text-white/40 hidden md:block bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
        SLIDE {activeSlideIdx + 1} / {totalSlides}
      </div>
      
    </div>
  );
};

export default App;
