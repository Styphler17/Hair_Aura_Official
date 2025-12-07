import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, MessageSquare } from 'lucide-react';
import { createChatStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from "@google/genai";

const AIStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello beauty! I'm Aura, your personal hair consultant. Looking for a new look for a special occasion or just everyday slay?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Pass only history needed for context, excluding the latest user message which is sent as argument
      const historyForApi = messages.map(m => ({ role: m.role, text: m.text }));
      
      const streamResult = await createChatStream(historyForApi, userMessage.text);
      
      let fullResponseText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]); // Placeholder

      for await (const chunk of streamResult) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
           fullResponseText += c.text;
           setMessages(prev => {
             const newArr = [...prev];
             newArr[newArr.length - 1] = { role: 'model', text: fullResponseText };
             return newArr;
           });
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a bad hair day (connection error). Please try again later or check our WhatsApp!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 ${
          isOpen ? 'bg-neutral-200 text-aura-black scale-0' : 'bg-aura-black text-white hover:scale-110'
        }`}
      >
        <Sparkles size={24} />
        <span className="hidden md:inline font-bold tracking-wider text-xs uppercase">Ask Aura</span>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[500px] bg-white z-50 shadow-2xl rounded-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right border border-neutral-100 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
      }`}>
        
        {/* Header */}
        <div className="bg-aura-black text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neutral-400 to-white flex items-center justify-center">
              <Sparkles size={16} className="text-aura-black" />
            </div>
            <div>
              <h3 className="font-serif font-bold">Aura Stylist</h3>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest">AI Consultant</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === 'user' 
                  ? 'bg-aura-black text-white rounded-br-none' 
                  : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-neutral-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-neutral-100">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask for hair advice..."
              className="w-full bg-neutral-50 border border-neutral-200 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-black text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 bg-aura-black text-white rounded-full hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIStylist;