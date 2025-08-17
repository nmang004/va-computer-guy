'use client';

import React from 'react';
import { ChatMessage } from '@/lib/chat-context';
import { User, Bot, Phone, MessageSquare, Calculator, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  message: ChatMessage;
  onQuickAction?: (action: string) => void;
}

export default function ChatMessageComponent({ message, onQuickAction }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isStreaming = message.isStreaming;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleQuickAction = (action: string) => {
    if (onQuickAction) {
      onQuickAction(action);
    } else {
      // Default actions
      switch (action) {
        case 'repair-status':
          window.location.href = '/repair-status';
          break;
        case 'get-quote':
          window.location.href = '/#quote-generator';
          break;
        case 'book-service':
          window.location.href = '/booking';
          break;
        case 'call-now':
          window.location.href = 'tel:7573756764';
          break;
      }
    }
  };

  // Check if this is the first assistant message to show quick actions
  const shouldShowQuickActions = !isUser && message.content && !isStreaming;

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-va-primary rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-va-primary text-white rounded-br-md'
              : 'bg-va-neutral-100 text-va-text-primary rounded-bl-md'
          }`}
        >
          <div className="whitespace-pre-wrap break-words">
            {message.content}
            {isStreaming && (
              <span className="inline-block w-2 h-5 bg-current opacity-50 animate-pulse ml-1" />
            )}
          </div>
        </div>
        
        <div className={`text-xs text-va-text-muted mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
          {!isUser && !message.content && isStreaming && (
            <span className="ml-2 text-va-primary">Typing...</span>
          )}
        </div>

        {/* Quick Actions for first assistant message */}
        {shouldShowQuickActions && message.content.length > 50 && (
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('repair-status')}
              className="text-xs bg-white border-va-neutral-200 hover:bg-va-neutral-50"
            >
              <Search className="w-3 h-3 mr-1" />
              Check Repair Status
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('get-quote')}
              className="text-xs bg-white border-va-neutral-200 hover:bg-va-neutral-50"
            >
              <Calculator className="w-3 h-3 mr-1" />
              Get Quote
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('book-service')}
              className="text-xs bg-white border-va-neutral-200 hover:bg-va-neutral-50"
            >
              <MessageSquare className="w-3 h-3 mr-1" />
              Book Service
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('call-now')}
              className="text-xs bg-white border-va-neutral-200 hover:bg-va-neutral-50"
            >
              <Phone className="w-3 h-3 mr-1" />
              Call Now
            </Button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-va-neutral-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-va-text-primary" />
          </div>
        </div>
      )}
    </div>
  );
}