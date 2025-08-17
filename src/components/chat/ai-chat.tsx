'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChatContext } from '@/lib/chat-context';
import ChatMessageComponent from './chat-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  X, 
  Send, 
  Trash2, 
  Phone,
  Clock,
  WifiOff,
  Minimize2
} from 'lucide-react';

export default function AiChat() {
  const { state, toggleChat, closeChat, sendMessage, clearMessages, markAsRead } = useChatContext();
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (state.isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.messages, state.isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (state.isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [state.isOpen, isMinimized]);

  // Mark messages as read when chat is opened
  useEffect(() => {
    if (state.isOpen) {
      markAsRead();
    }
  }, [state.isOpen, markAsRead]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || state.isTyping) return;

    const message = inputValue.trim();
    setInputValue('');
    await sendMessage(message);
  };

  const handleQuickStart = (message: string) => {
    sendMessage(message);
  };

  const isBusinessHours = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    
    // Business hours logic
    if (day === 0) return false; // Sunday - Closed
    if (day === 1 || day === 3 || day === 5) return hour >= 9 && hour < 17; // Mon, Wed, Fri: 9-5
    if (day === 2 || day === 4) return hour >= 9 && hour < 19; // Tue, Thu: 9-7
    if (day === 6) return hour >= 10 && hour < 16; // Sat: 10-4
    
    return false;
  };

  const businessHours = isBusinessHours();

  if (!state.isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-va-primary hover:bg-va-secondary shadow-lg relative"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          {state.unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
              {state.unreadCount > 9 ? '9+' : state.unreadCount}
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <div className="bg-white rounded-lg shadow-2xl border border-va-neutral-200 flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="bg-va-primary text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">VA Computer Guy</h3>
              <div className="flex items-center gap-1 text-xs opacity-90">
                {state.isConnected ? (
                  businessHours ? (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Online
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" />
                      After Hours
                    </>
                  )
                ) : (
                  <>
                    <WifiOff className="w-3 h-3" />
                    Reconnecting...
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeChat}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto min-h-[300px] max-h-[50vh]">
              {state.messages.length === 0 ? (
                <div className="text-center space-y-4">
                  <div className="text-va-text-muted text-sm mb-4">
                    👋 Hi! I&apos;m here to help with your computer questions and VA Computer Guy services.
                  </div>
                  
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickStart('I need help with my computer not starting up')}
                      className="w-full text-xs justify-start"
                    >
                      Computer won&apos;t start
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickStart('My computer is running very slow')}
                      className="w-full text-xs justify-start"
                    >
                      Computer is slow
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickStart('I think I have a virus')}
                      className="w-full text-xs justify-start"
                    >
                      Virus/malware issues
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickStart('What are your service rates?')}
                      className="w-full text-xs justify-start"
                    >
                      Service pricing
                    </Button>
                  </div>

                  {!businessHours && (
                    <div className="mt-4 p-3 bg-va-neutral-100 rounded-lg text-xs text-va-text-secondary">
                      We&apos;re currently closed. Leave a message and we&apos;ll respond as soon as possible, or call (757) 375-6764 for urgent issues.
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  {state.messages.map((message) => (
                    <ChatMessageComponent
                      key={message.id}
                      message={message}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-va-neutral-200">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={state.isTyping ? "AI is typing..." : "Type your message..."}
                  disabled={state.isTyping || !state.isConnected}
                  className="flex-1 text-sm"
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || state.isTyping || !state.isConnected}
                  size="sm"
                  className="bg-va-primary hover:bg-va-secondary"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              
              {state.messages.length > 0 && (
                <div className="flex justify-between items-center mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearMessages}
                    className="text-xs text-va-text-muted hover:text-va-text-primary"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Clear chat
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open('tel:7573756764')}
                    className="text-xs text-va-text-muted hover:text-va-text-primary"
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    Call us
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}