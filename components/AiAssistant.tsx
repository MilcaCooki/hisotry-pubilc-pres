import React, { useState, useRef, useEffect } from 'react';
import { generateAiResponse } from '../services/geminiService';
import { Slide } from '../types';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AiAssistantProps {
  currentSlide: Slide;
  presentationTitle: string;
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ currentSlide, presentationTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Привет! Я AI Политолог. Задавайте вопросы по теме слайда!' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const context = `
      Presentation Title: ${presentationTitle}
      Slide Title: ${currentSlide.title}
      Slide Subtitle: ${currentSlide.subtitle}
      Content: ${JSON.stringify(currentSlide.content)}
    `;

    const response = await generateAiResponse(userMsg, context);

    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:scale-110 transition-transform ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Sparkles className="animate-pulse" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col shadow-2xl transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-20 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-2xl">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                <Bot size={18} />
             </div>
             <div>
                <h3 className="font-bold text-sm text-white">AI Политолог</h3>
                <p className="text-xs text-indigo-300">Gemini 2.5 Powered</p>
             </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
               <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${msg.role === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-indigo-500/20 text-indigo-300'}`}>
                   {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
               </div>
               <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                   msg.role === 'user' 
                   ? 'bg-blue-600 text-white rounded-tr-none' 
                   : 'bg-white/10 text-slate-100 rounded-tl-none'
               }`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
               </div>
            </div>
          ))}
          {isLoading && (
            <div className="self-start flex gap-2">
                 <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Bot size={14} className="text-indigo-300" />
                 </div>
                 <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                 </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-black/20 rounded-b-2xl">
           <div className="flex gap-2 relative">
             <input 
               type="text" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Задайте вопрос..."
               className="w-full bg-slate-800 text-white text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all border border-transparent placeholder-slate-500"
             />
             <button 
               onClick={handleSend}
               disabled={!input.trim() || isLoading}
               className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
             >
               <Send size={16} />
             </button>
           </div>
        </div>
      </div>
    </>
  );
};