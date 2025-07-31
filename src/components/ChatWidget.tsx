import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Maximize2, Minimize2 } from 'lucide-react';
import { chatWidgetConfig } from '@/config/chatWidget';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatWidgetConfig {
  webhook: {
    url: string;
    route: string;
  };
  style: {
    primaryColor: string;
    secondaryColor: string;
    position: string;
    backgroundColor: string;
    fontColor: string;
  };
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
          <span className="text-current mt-0.5 flex-shrink-0">•</span>
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
            <span className="text-current mt-0.5 flex-shrink-0">{match[1]}.</span>
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
    parts.push(<strong key={`bold-${keyCounter++}`}>{boldText}</strong>);
    
    // Continue with remaining text
    remaining = remaining.slice(boldEnd + 2);
  }
  
  // Add any remaining text
  if (remaining) {
    parts.push(remaining);
  }
  
  return parts.length > 0 ? parts : text;
};

// This will be stored in a global context to persist across page navigation
export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Hi 👋, how can we help?\n\nI can assist you with:\n• Questions about our services\n• Scheduling consultations\n• General inquiries',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use configuration from external file
  const config = chatWidgetConfig;

  // Generate or retrieve chat ID from session storage
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

  // Save chat state to session storage whenever it changes
  useEffect(() => {
    const state = {
      isOpen,
      isExpanded,
      messages
    };
    sessionStorage.setItem('chatWidgetState', JSON.stringify(state));
  }, [isOpen, isExpanded, messages]);

  // Auto-focus input when chat opens or after sending a message
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, isLoading]); // Re-focus after isLoading changes (after sending)

  // Scroll to bottom when new messages are added
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
          chatId: chatId,
          message: messageText,
          route: config.webhook.route
        })
      });

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.output || "Sorry, I couldn't understand that.",
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Re-focus the input field after sending
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg z-[9999] flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: config.style.primaryColor }}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div 
          className={`fixed bottom-5 right-5 bg-gray-900 rounded-xl shadow-2xl z-[9999] flex flex-col overflow-hidden animate-slide-in-bottom border border-gray-700 transition-all duration-300 ${
            isExpanded 
              ? 'w-[500px] h-[700px]' 
              : 'w-[350px] h-[500px]'
          }`}
        >
          {/* Header */}
          <div 
            className="bg-purple-600 text-white p-4 flex justify-between items-center"
            style={{ backgroundColor: config.style.primaryColor }}
          >
            <div className="flex items-center gap-3">
              <img 
                src={`${import.meta.env.BASE_URL}bot.gif`} 
                alt="BTC Bot" 
                className="w-14 h-14 object-contain"
              />
              <span className="font-bold text-lg">BTC Bot</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/20 transition-colors"
                title={isExpanded ? "Make smaller" : "Make larger"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/20 transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div 
            ref={chatBodyRef}
            className="flex-1 p-5 overflow-y-auto bg-gray-800"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${message.isBot ? '' : 'text-right'}`}
              >
                <div
                  className={`inline-block max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                  style={message.isBot ? { backgroundColor: config.style.primaryColor } : {}}
                >
                  <div className="whitespace-pre-wrap">
                    {formatMessage(message.text)}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-4">
                <div 
                  className="inline-block bg-purple-600 text-white p-3 rounded-lg"
                  style={{ backgroundColor: config.style.primaryColor }}
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-700 bg-gray-900">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 px-3 py-2 border border-gray-600 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                disabled={isLoading}
                autoFocus
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || inputValue.trim() === ''}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                style={{ backgroundColor: config.style.primaryColor }}
                onMouseDown={(e) => e.preventDefault()} // Prevent stealing focus from input
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 