'use client';

import React, { useState } from 'react';
import GuidedFlow from './guided-flow';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  X, 
  Clock,
  Minimize2
} from 'lucide-react';

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount] = useState(0);

  const toggleChat = () => setIsOpen(!isOpen);
  const closeChat = () => setIsOpen(false);

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

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 pointer-events-none">
        <Button
          onClick={toggleChat}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-va-primary hover:bg-va-secondary shadow-lg relative pointer-events-auto"
        >
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop for mobile - close chat when clicking outside */}
      <div 
        className="fixed inset-0 z-30 md:hidden"
        onClick={closeChat}
      />
      
      <div className="fixed inset-x-2 bottom-2 md:bottom-4 md:right-4 md:left-auto z-40 md:w-80 md:max-w-[calc(100vw-2rem)] pointer-events-none">
        <div className="bg-white rounded-lg shadow-2xl border border-va-neutral-200 flex flex-col max-h-[90vh] md:max-h-[75vh] pointer-events-auto overflow-hidden">
          {/* Header */}
          <div className="bg-va-primary text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Computer Guy</h3>
                <div className="flex items-center gap-1 text-xs opacity-90">
                  {businessHours ? (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Online
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" />
                      After Hours
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
            <div className="flex-1 min-h-[400px] md:min-h-[350px] max-h-[75vh] md:max-h-[55vh] overflow-hidden">
              <GuidedFlow onClose={closeChat} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}