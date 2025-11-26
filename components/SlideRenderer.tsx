
import React from 'react';
import { Slide, ContentItem, IconName } from '../types';
import * as Icons from 'lucide-react';

interface SlideRendererProps {
  slide: Slide;
  accentColor: string;
  secondaryColor: string;
}

const IconComponent: React.FC<{ name: IconName; className?: string }> = ({ name, className }) => {
  // @ts-ignore
  const LucideIcon = Icons[name] || Icons.Circle;
  return <LucideIcon className={className} />;
};

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, accentColor, secondaryColor }) => {
  
  // -- 1. HEADER --
  const renderHeader = () => (
    <div className="mb-4 md:mb-8 text-center md:text-left animate-slide-in shrink-0">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-oswald uppercase tracking-tight mb-2 drop-shadow-2xl leading-tight text-white">
        {slide.title}
      </h1>
      <div className="flex items-center justify-center md:justify-start gap-4">
        <div className={`h-1 w-12 md:w-16 ${accentColor.replace('text-', 'bg-')} rounded-full shadow-[0_0_10px_currentColor]`}></div>
        <p className={`text-sm md:text-xl font-medium tracking-[0.2em] uppercase ${secondaryColor} text-shadow-sm`}>
          {slide.subtitle}
        </p>
      </div>
    </div>
  );

  // -- 2. SPLIT LAYOUT --
  if (slide.layout === 'split') {
    return (
      <div className="w-full h-full flex flex-col">
        {renderHeader()}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
          {/* Main Text */}
          <div className="lg:col-span-5 animate-slide-in flex flex-col" style={{ animationDelay: '100ms' }}>
            <div className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden group border-t-4 border-white/20 shadow-2xl h-full flex flex-col justify-center">
              <div className="absolute -right-8 -top-8 text-[8rem] md:text-[10rem] text-white/5 rotate-12 transition-transform group-hover:rotate-0 duration-700">
                {slide.icon && <IconComponent name={slide.icon} />}
              </div>
              <p className="text-lg md:text-xl text-slate-100 font-light leading-relaxed relative z-10 font-merriweather drop-shadow-md">
                {slide.content.left}
              </p>
            </div>
          </div>
          
          {/* List Items */}
          <div className="lg:col-span-7 flex flex-col gap-4 justify-center">
            {(slide.content.right as ContentItem[])?.map((item, idx) => (
              <div 
                key={idx}
                className="glass-panel p-4 md:p-6 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-all duration-300 border-l-4 border-transparent hover:border-white/40 animate-slide-in group shadow-lg hover:translate-x-1"
                style={{ animationDelay: `${200 + idx * 100}ms` }}
              >
                <div className={`p-2 rounded-xl bg-white/5 text-xl md:text-2xl ${idx % 2 === 0 ? accentColor : secondaryColor} group-hover:scale-110 transition-transform shadow-inner flex-shrink-0`}>
                  {item.icon && <IconComponent name={item.icon} />}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg md:text-xl mb-1 font-oswald">{item.title}</h4>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // -- 3. COMPARE LAYOUT --
  if (slide.layout === 'compare') {
    const items = slide.content.items || [];
    return (
      <div className="w-full h-full flex flex-col">
        {renderHeader()}
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-16 mt-2 items-stretch relative">
            
            {/* Card 1 */}
            <div className="glass-panel p-6 md:p-10 rounded-3xl border-l-8 border-slate-500 animate-slide-in flex flex-col justify-start relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500 shadow-2xl" style={{ animationDelay: '100ms' }}>
                <div className="absolute top-0 right-0 p-24 bg-slate-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-slate-500/20 transition-colors"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold font-oswald text-slate-200">{items[0]?.title}</h3>
                    <div className="text-3xl md:text-4xl text-slate-500">
                        {items[0]?.icon && <IconComponent name={items[0].icon} />}
                    </div>
                </div>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed font-merriweather relative z-10">{items[0]?.text}</p>
            </div>

            {/* VS Badge */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 lg:w-16 lg:h-16 glass-panel rounded-full items-center justify-center z-20 shadow-[0_0_50px_rgba(255,255,255,0.3)] border-2 border-white/20 backdrop-blur-3xl">
                <span className="text-white font-black text-xl font-oswald tracking-widest">VS</span>
            </div>

            {/* Card 2 */}
            <div className={`glass-panel p-6 md:p-10 rounded-3xl border-l-8 border-white animate-slide-in flex flex-col justify-start transform md:scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500`} style={{ animationDelay: '300ms' }}>
                 <div className={`absolute top-0 right-0 p-24 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors`}></div>
                 <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className={`text-2xl md:text-3xl font-bold font-oswald ${accentColor} drop-shadow-md`}>{items[1]?.title}</h3>
                    <div className={`text-3xl md:text-4xl ${secondaryColor} drop-shadow-md`}>
                         {items[1]?.icon && <IconComponent name={items[1].icon} />}
                    </div>
                </div>
                <p className="text-base md:text-lg text-white leading-relaxed font-merriweather relative z-10">{items[1]?.text}</p>
            </div>
        </div>
      </div>
    );
  }

  // -- 4. QUOTE LAYOUT --
  if (slide.layout === 'center-quote') {
    return (
      <div className="w-full h-full flex flex-col relative">
        {/* ADDED HEADER HERE as requested */}
        {renderHeader()}
        
        <div className="flex-1 flex flex-col justify-center items-center text-center relative p-4 md:p-12">
            {/* Background glow */}
            <div className={`absolute inset-0 bg-white/5 blur-[100px] rounded-full z-0 animate-pulse pointer-events-none`}></div>
            
            <div className={`mb-6 animate-slide-in ${accentColor} opacity-60 scale-125`}>
                <Icons.Quote size={48} />
            </div>

            <blockquote className="relative z-10 text-2xl md:text-4xl lg:text-5xl font-merriweather italic text-slate-100 leading-tight mb-8 max-w-4xl animate-slide-in drop-shadow-2xl" style={{ animationDelay: '100ms' }}>
                "{slide.content.quote}"
            </blockquote>
            
            {slide.content.author && (
                <div className={`relative z-10 text-lg md:text-2xl font-oswald uppercase tracking-[0.2em] ${secondaryColor} mb-8 animate-slide-in font-bold`} style={{ animationDelay: '200ms' }}>
                    — {slide.content.author}
                </div>
            )}

            <div className="flex gap-3 flex-wrap justify-center relative z-10 animate-slide-in" style={{ animationDelay: '300ms' }}>
                 {slide.content.points?.map((p, i) => (
                     <span key={i} className={`px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-all hover:scale-105 shadow-lg ${i % 2 === 0 ? accentColor : secondaryColor}`}>
                         {p}
                     </span>
                 ))}
            </div>
        </div>
      </div>
    );
  }

  // -- 5. GRID-3 / STATS LAYOUT --
  if (slide.layout === 'grid-3' || slide.layout === 'stats') {
      const isStats = slide.layout === 'stats';
      return (
        <div className="w-full h-full flex flex-col">
            {renderHeader()}
            <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-2 items-center">
                {slide.content.items?.map((item, idx) => (
                    <div 
                        key={idx} 
                        className={`glass-panel p-6 rounded-3xl flex flex-col ${isStats ? 'items-center text-center justify-center' : 'items-start text-left'} hover:bg-white/10 transition-all duration-300 group border-t-2 border-white/10 hover:border-white/30 hover:-translate-y-1 shadow-xl animate-slide-in h-full`}
                        style={{ animationDelay: `${100 + idx * 150}ms` }}
                    >
                        {isStats ? (
                            // Stats View
                            <>
                                <div className="mb-2 opacity-50 text-slate-400 group-hover:text-white transition-colors"><IconComponent name={item.icon as IconName} className="w-8 h-8 md:w-10 md:h-10" /></div>
                                <div className={`text-5xl md:text-6xl lg:text-7xl font-oswald font-bold mb-3 bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform drop-shadow-sm`}>
                                    {item.value}
                                </div>
                                <h3 className={`text-lg md:text-xl font-bold mb-3 uppercase tracking-wide ${idx === 1 ? secondaryColor : accentColor}`}>{item.title}</h3>
                                <div className="w-12 h-1 bg-white/20 rounded-full mb-3"></div>
                                <p className="text-slate-300 text-sm md:text-base leading-relaxed">{item.text}</p>
                            </>
                        ) : (
                            // Grid View
                            <>
                                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl md:text-3xl ${idx === 1 ? secondaryColor : accentColor} mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.2)] border border-white/5`}>
                                    {item.icon && <IconComponent name={item.icon} />}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-oswald tracking-wide">{item.title}</h3>
                                <div className={`w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent mb-3`}></div>
                                <p className="text-slate-400 text-sm md:text-base leading-relaxed">{item.text}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
      )
  }

  // -- 6. FEATURES LAYOUT --
  if (slide.layout === 'features') {
      return (
        <div className="w-full h-full flex flex-col">
           {renderHeader()}
           <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-2 content-center">
              {slide.content.items?.map((item, idx) => (
                  <div key={idx} className="glass-panel p-5 md:p-6 rounded-2xl flex items-start gap-4 md:gap-5 hover:bg-white/5 transition-all animate-slide-in hover:translate-x-1" style={{ animationDelay: `${idx * 100}ms` }}>
                      <div className={`p-3 rounded-full bg-slate-900/50 border border-white/10 ${idx % 2 === 0 ? accentColor : secondaryColor} shadow-[0_0_15px_rgba(0,0,0,0.5)] flex-shrink-0`}>
                          {item.icon && <IconComponent name={item.icon} className="w-5 h-5 md:w-6 md:h-6" />}
                      </div>
                      <div>
                          <h3 className="text-lg md:text-xl font-bold text-white mb-1 font-oswald tracking-wide">{item.title}</h3>
                          <p className="text-slate-300 text-sm md:text-base leading-relaxed">{item.text}</p>
                      </div>
                  </div>
              ))}
           </div>
        </div>
      );
  }

  // -- 7. PYRAMID / HIERARCHY LAYOUT --
  if (slide.layout === 'pyramid') {
      return (
        <div className="w-full h-full flex flex-col">
            {renderHeader()}
            <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3 md:gap-4 mt-2">
                {slide.content.levels?.map((level, idx) => {
                    const widthClass = idx === 0 ? 'w-full md:w-8/12' : idx === 1 ? 'w-full md:w-9/12' : 'w-full md:w-10/12';
                    return (
                        <div 
                            key={idx} 
                            className={`${widthClass} glass-panel p-5 md:p-6 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-transform hover:scale-[1.01] border-l-8 ${idx === 0 ? 'border-red-500' : idx === 1 ? 'border-yellow-500' : 'border-emerald-500'} animate-slide-in shadow-xl`}
                            style={{ animationDelay: `${idx * 200}ms` }}
                        >
                             <div className="flex items-center gap-4">
                                 <div className={`text-2xl md:text-3xl opacity-90 ${idx === 0 ? accentColor : secondaryColor} drop-shadow-md`}>
                                    {level.icon && <IconComponent name={level.icon} />}
                                 </div>
                                 <div className="text-left">
                                     <h3 className="font-bold text-lg md:text-xl text-white font-oswald uppercase tracking-wider mb-0.5">{level.title}</h3>
                                     <p className="text-slate-300 text-sm md:text-base">{level.text}</p>
                                 </div>
                             </div>
                             <div className="text-3xl md:text-5xl font-black text-white/5 select-none font-oswald hidden sm:block">{idx + 1}</div>
                        </div>
                    )
                })}
            </div>
        </div>
      )
  }

  // -- 8. PROCESS / TIMELINE LAYOUT --
  if (slide.layout === 'process' || slide.layout === 'timeline') {
      const items = slide.content.steps || slide.content.items || [];
      return (
        <div className="w-full h-full flex flex-col">
            {renderHeader()}
            <div className="flex-1 min-h-0 flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-full md:h-auto items-stretch">
                    {items.map((step, idx) => (
                        <div key={idx} className="relative animate-slide-in h-full flex flex-col" style={{ animationDelay: `${idx * 200}ms` }}>
                             {/* Arrow Connector (Hidden on mobile/last item) */}
                             {idx < items.length - 1 && (
                                 <div className="hidden md:block absolute top-1/2 -right-8 -translate-y-1/2 text-white/10 z-0">
                                     <Icons.ArrowRight size={32} />
                                 </div>
                             )}
                             
                             <div className="glass-panel p-6 rounded-3xl text-center h-full flex flex-col items-center justify-start hover:bg-white/10 transition-colors border-2 border-white/5 hover:border-white/20 z-10 relative group shadow-lg">
                                 <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-2xl md:text-3xl mb-4 bg-gradient-to-br from-white/10 to-transparent shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${idx % 2 === 0 ? accentColor : secondaryColor} group-hover:scale-110 transition-transform border border-white/10`}>
                                     {step.icon ? <IconComponent name={step.icon} /> : idx + 1}
                                 </div>
                                 <h3 className="text-white text-lg md:text-xl font-bold mb-3 font-oswald tracking-wide">{step.title}</h3>
                                 <div className="w-full h-px bg-white/10 mb-3"></div>
                                 <p className="text-slate-300 text-sm md:text-base leading-relaxed">{step.text}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )
  }

  return <div>Unknown Layout</div>;
};
