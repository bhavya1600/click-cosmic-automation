import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import { chatWidgetConfig } from '@/config/chatWidget';
import { BotAvatar } from '@/components/BotAvatar';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Helper function to format message text with proper line breaks and formatting
const formatMessage = (text: string) => {
  const lines = text.split('\n');
  
  return lines.map((line, index) => {
    const trimmedLine = line.trim();
    
    // Skip empty lines but add spacing
    if (!trimmedLine) {
      return <div key={index} className="mb-2"></div>;
    }
    
    // Handle bullet points (-, *, •)
    if (trimmedLine.match(/^[\-\*\•]\s+/)) {
      return (
        <div key={index} className="flex items-start gap-2 mb-1">
          <span className="text-purple-300 mt-0.5 flex-shrink-0">•</span>
          <span className="flex-1">{formatInlineText(trimmedLine.replace(/^[\-\*\•]\s+/, ''))}</span>
        </div>
      );
    }
    
    // Handle numbered lists (1. 2. etc.)
    if (trimmedLine.match(/^\d+\.\s+/)) {
      const match = trimmedLine.match(/^(\d+)\.\s+(.+)/);
      if (match) {
        return (
          <div key={index} className="flex items-start gap-2 mb-1">
            <span className="text-purple-300 mt-0.5 flex-shrink-0">{match[1]}.</span>
            <span className="flex-1">{formatInlineText(match[2])}</span>
          </div>
        );
      }
    }
    
    // Regular line
    return (
      <div key={index} className="mb-1">
        {formatInlineText(trimmedLine)}
      </div>
    );
  });
};

// Helper function to format inline text (bold, italic, etc.)
const formatInlineText = (text: string) => {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyCounter = 0;
  
  // Handle bold text **text**
  while (remaining.includes('**')) {
    const boldStart = remaining.indexOf('**');
    const boldEnd = remaining.indexOf('**', boldStart + 2);
    
    if (boldEnd === -1) break;
    
    // Add text before bold
    if (boldStart > 0) {
      parts.push(remaining.slice(0, boldStart));
    }
    
    // Add bold text
    const boldText = remaining.slice(boldStart + 2, boldEnd);
    parts.push(<strong key={`bold-${keyCounter++}`} className="text-white font-semibold">{boldText}</strong>);
    
    // Continue with remaining text
    remaining = remaining.slice(boldEnd + 2);
  }
  
  // Add any remaining text
  if (remaining) {
    parts.push(remaining);
  }
  
  return parts.length > 0 ? parts : text;
};

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCallout, setShowCallout] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hi 👋, I'm Nova — your AI assistant!\n\nI can help you with:\n• Questions about our services\n• Scheduling consultations\n• General inquiries",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const config = chatWidgetConfig;

  const getChatId = () => {
    let chatId = sessionStorage.getItem('chatId');
    if (!chatId) {
      chatId = 'chat_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('chatId', chatId);
    }
    return chatId;
  };

  // Load chat state from session storage
  useEffect(() => {
    const savedState = sessionStorage.getItem('chatWidgetState');
    if (savedState) {
      const { isOpen: savedIsOpen, isExpanded: savedIsExpanded, messages: savedMessages } = JSON.parse(savedState);
      setIsOpen(savedIsOpen);
      setIsExpanded(savedIsExpanded || false);
      setMessages(savedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    }
  }, []);

  // Save chat state to session storage
  useEffect(() => {
    sessionStorage.setItem('chatWidgetState', JSON.stringify({ isOpen, isExpanded, messages }));
  }, [isOpen, isExpanded, messages]);

  // Show callout bubble after 3s, once per session
  useEffect(() => {
    if (sessionStorage.getItem('novaCalloutSeen')) return;
    const timer = setTimeout(() => setShowCallout(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismissCallout = () => {
    setShowCallout(false);
    sessionStorage.setItem('novaCalloutSeen', '1');
  };

  // Auto-focus input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timeoutId = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, isLoading]);

  // Scroll to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const messageText = inputValue.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const chatId = getChatId();
      const response = await fetch(config.webhook.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId,
          message: messageText,
          route: config.webhook.route
        })
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: data.output || "Sorry, I couldn't understand that.",
        isBot: true,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        isBot: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    const newChatId = 'chat_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('chatId', newChatId);
    sessionStorage.removeItem('chatWidgetState');

    setMessages([
      {
        id: 'welcome',
        text: "Hi 👋, I'm Nova — your AI assistant!\n\nI can help you with:\n• Questions about our services\n• Scheduling consultations\n• General inquiries",
        isBot: true,
        timestamp: new Date()
      }
    ]);
    setInputValue('');
    setIsLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <>
      {/* ───── Floating Toggle Button + Callout ───── */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3">

          {/* Speech bubble callout */}
          {showCallout && (
            <div
              className="relative flex items-center gap-2.5 px-4 py-3 rounded-2xl rounded-br-sm text-sm text-white border border-white/[0.08] bg-black/80 backdrop-blur-xl max-w-[200px]"
              style={{
                boxShadow: '0 0 18px rgba(147,51,234,0.25), 0 8px 32px rgba(0,0,0,0.4)',
                animation: 'calloutIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
              }}
            >
              {/* Gradient top line */}
              <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent rounded-full" />

              {/* Mini Nova orb */}
              <BotAvatar size={26} className="flex-shrink-0" />

              <div className="leading-snug">
                <p className="font-semibold text-white text-[13px]">Talk to Nova</p>
                <p className="text-gray-400 text-[11px] mt-0.5">Ask me anything ✨</p>
              </div>

              {/* Dismiss X */}
              <button
                onClick={(e) => { e.stopPropagation(); dismissCallout(); }}
                className="ml-1 flex-shrink-0 text-gray-500 hover:text-gray-300 transition-colors"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Tail arrow pointing down-right toward button */}
              <div
                className="absolute -bottom-[7px] right-5 w-3.5 h-3.5 bg-black/80 border-r border-b border-white/[0.08] rotate-45"
                style={{ backdropFilter: 'blur(12px)' }}
              />
            </div>
          )}

          {/* Toggle button */}
          <button
            onClick={() => { setIsOpen(true); dismissCallout(); }}
            className="group w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-[0_0_20px_rgba(147,51,234,0.4),0_0_60px_rgba(147,51,234,0.15)]"
          >
            <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            {/* Ping indicator */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-black animate-pulse" />
          </button>
        </div>
      )}

      {/* ───── Chat Widget ───── */}
      {isOpen && (
        <div
          className={`fixed bottom-5 right-5 z-[9999] flex flex-col overflow-hidden transition-all duration-300 ease-out rounded-2xl border border-white/[0.08] bg-black/80 backdrop-blur-2xl ${
            isExpanded
              ? 'w-[500px] h-[700px]'
              : 'w-[370px] h-[520px]'
          }`}
          style={{
            boxShadow: '0 0 15px rgba(147, 51, 234, 0.2), 0 0 50px rgba(147, 51, 234, 0.08), 0 25px 60px rgba(0, 0, 0, 0.5)',
            animation: 'chatSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          {/* ───── Header ───── */}
          <div className="relative px-4 py-3 flex justify-between items-center border-b border-white/[0.08] bg-white/[0.03]">
            {/* Subtle gradient line at top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="flex items-center gap-3">
              <div className="relative">
                <BotAvatar size={36} />
                {/* Online dot */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black z-20" />
              </div>
              <div>
                <span className="font-semibold text-white text-sm leading-tight block">Nova</span>
                <span className="text-[11px] text-emerald-400/80 leading-tight">Online</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                title="Reset chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                title={isExpanded ? 'Make smaller' : 'Make larger'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ───── Chat Body ───── */}
          <div
            ref={chatBodyRef}
            className="flex-1 px-4 py-4 overflow-y-auto space-y-3 scroll-smooth"
            style={{
              background: 'linear-gradient(180deg, rgba(147,51,234,0.03) 0%, transparent 30%)',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(147,51,234,0.2) transparent'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    message.isBot
                      ? 'bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-bl-md text-gray-200'
                      : 'bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl rounded-br-md text-white shadow-[0_2px_15px_rgba(147,51,234,0.25)]'
                  }`}
                >
                  <div className={`whitespace-pre-wrap ${!message.isBot ? 'text-left' : ''}`}>
                    {formatMessage(message.text)}
                  </div>
                  <div className={`text-[10px] mt-1.5 ${message.isBot ? 'text-gray-500' : 'text-purple-200/60'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.6s' }} />
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.6s' }} />
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.6s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ───── Footer / Input ───── */}
          <div className="px-3 py-3 border-t border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 bg-white/[0.05] border border-white/[0.08] rounded-xl focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
                disabled={isLoading}
                autoFocus
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || inputValue.trim() === ''}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:scale-105 disabled:opacity-30 disabled:hover:shadow-none disabled:hover:scale-100 disabled:cursor-not-allowed"
                onMouseDown={(e) => e.preventDefault()}
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {/* Powered-by footer */}
            <div className="mt-2 text-center">
              <span className="text-[10px] text-gray-600">
                Powered by <span className="text-purple-400/60 font-medium">BehindTheClick</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ───── Inline keyframes for chat open animation ───── */}
      <style>{`
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes calloutIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </>
  );
};
