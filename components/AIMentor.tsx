
import React, { useState, useRef, useEffect } from 'react';
import { getMentorResponse } from '../services/geminiService';

const AIMentor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([
    { role: 'model', content: 'Hello! I am your SkillForge AI Mentor. How can I assist with your technical learning today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const response = await getMentorResponse([], userMsg);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "I'm having trouble connecting to my neural core. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-80 sm:w-96 h-[32rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-bottom-right">
          <div className="p-4 bg-zinc-800 border-b border-zinc-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <i className="fa-solid fa-robot text-white text-sm"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">AI Mentor</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-zinc-700 rounded-lg text-zinc-400 transition-colors"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 text-zinc-200 px-4 py-2.5 rounded-2xl rounded-tl-none border border-zinc-700 flex gap-1">
                  <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-zinc-800 border-none rounded-xl px-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <button 
              type="submit"
              disabled={isTyping}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white rounded-xl flex items-center justify-center transition-colors"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        >
          <i className="fa-solid fa-comment-dots text-2xl group-hover:rotate-12 transition-transform"></i>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-zinc-950">1</span>
        </button>
      )}
    </div>
  );
};

export default AIMentor;
