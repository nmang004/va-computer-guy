'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API?: {
      maximize: () => void;
      minimize: () => void;
      toggle: () => void;
      popup: () => void;
      showWidget: () => void;
      hideWidget: () => void;
      setAttributes: (attrs: Record<string, string>) => void;
      addEvent: (event: string, metadata?: Record<string, unknown>) => void;
      addTags: (tags: string[]) => void;
      removeTags: (tags: string[]) => void;
      onLoad: (callback: () => void) => void;
      onStatusChange: (callback: (status: string) => void) => void;
      onChatMaximized: (callback: () => void) => void;
      onChatMinimized: (callback: () => void) => void;
      onChatHidden: (callback: () => void) => void;
      onChatStarted: (callback: () => void) => void;
      onChatEnded: (callback: () => void) => void;
      onPrechatSubmit: (callback: (data: Record<string, unknown>) => void) => void;
      onOfflineSubmit: (callback: (data: Record<string, unknown>) => void) => void;
      onChatMessageVisitor: (callback: (message: string) => void) => void;
      onChatMessageAgent: (callback: (message: string) => void) => void;
      onChatMessageSystem: (callback: (message: string) => void) => void;
      onAgentJoinChat: (callback: (data: Record<string, unknown>) => void) => void;
      onAgentLeaveChat: (callback: (data: Record<string, unknown>) => void) => void;
      onChatSatisfaction: (callback: (satisfaction: string) => void) => void;
      onVisitorNameChanged: (callback: (visitorName: string) => void) => void;
      onFileUpload: (callback: (link: string) => void) => void;
      onTagsUpdated: (callback: (tags: string[]) => void) => void;
      onUnreadCountChanged: (callback: (unreadCount: number) => void) => void;
    };
    Tawk_LoadStart?: Date;
  }
}

interface TawkChatProps {
  propertyId?: string;
  widgetId?: string;
}

export default function TawkChat({ 
  propertyId = '68a152478c1f741927d35596', 
  widgetId = '1j2r2ipmk' 
}: TawkChatProps) {
  useEffect(() => {
    // Initialize Tawk_LoadStart if not already present
    if (!window.Tawk_LoadStart) {
      window.Tawk_LoadStart = new Date();
    }

    // Check if script is already loaded
    if (document.querySelector(`script[src*="tawk.to"]`)) {
      return;
    }

    // Create and append Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    // Set up custom chat behavior
    const setupTawkAPI = () => {
      if (window.Tawk_API) {
        // Customize chat widget
        if (window.Tawk_API && window.Tawk_API.onLoad) {
          window.Tawk_API.onLoad(function() {
            // Set custom visitor name if available
            const visitorInfo = localStorage.getItem('va-computer-guy-visitor');
            if (visitorInfo && window.Tawk_API?.setAttributes) {
              const info = JSON.parse(visitorInfo);
              window.Tawk_API.setAttributes({
                name: info.name,
                email: info.email,
                phone: info.phone
              });
            }
          });
        }

        // Add custom action buttons
          window.Tawk_API.addEvent = function(action: string, metadata?: Record<string, unknown>) {
          switch(action) {
            case 'check-repair-status':
              window.Tawk_API?.addEvent('Check Repair Status', {
                action: 'navigation',
                url: '/repair-status'
              });
              break;
            case 'get-quote':
              window.Tawk_API?.addEvent('Get Quote', {
                action: 'navigation', 
                url: '/#quote-generator'
              });
              break;
            case 'book-service':
              window.Tawk_API?.addEvent('Book Service', {
                action: 'navigation',
                url: '/booking'
              });
              break;
            default:
              window.Tawk_API?.addEvent(action, metadata);
          }
        };

        // Handle pre-chat form
        if (window.Tawk_API.onPrechatSubmit) {
          window.Tawk_API.onPrechatSubmit(function(data: Record<string, unknown>) {
            // Store visitor info for future reference
            localStorage.setItem('va-computer-guy-visitor', JSON.stringify({
              name: data.name,
              email: data.email,
              phone: data.phone || ''
            }));
          });
        }
      }
    };

    // Set up API after a brief delay to ensure Tawk loads
    setTimeout(setupTawkAPI, 1000);

    // Cleanup function
    return () => {
      // Don't remove the script as it might be needed across page navigation
      // Just clean up any custom event listeners if needed
    };
  }, [propertyId, widgetId]);

  return null; // This component doesn't render anything visible
}

// Utility functions for interacting with Tawk.to
export const TawkActions = {
  // Show chat widget
  showWidget: () => {
    if (window.Tawk_API) {
      window.Tawk_API?.showWidget();
    }
  },

  // Hide chat widget
  hideWidget: () => {
    if (window.Tawk_API) {
      window.Tawk_API?.hideWidget();
    }
  },

  // Maximize chat window
  maximize: () => {
    if (window.Tawk_API) {
      window.Tawk_API?.maximize();
    }
  },

  // Minimize chat window
  minimize: () => {
    if (window.Tawk_API) {
      window.Tawk_API?.minimize();
    }
  },

  // Toggle chat window
  toggle: () => {
    if (window.Tawk_API) {
      window.Tawk_API?.toggle();
    }
  },

  // Send a custom event
  sendEvent: (eventName: string, metadata?: Record<string, unknown>) => {
    if (window.Tawk_API && window.Tawk_API.addEvent) {
      window.Tawk_API.addEvent(eventName, metadata);
    }
  },

  // Quick actions for VA Computer Guy specific needs
  checkRepairStatus: () => {
    TawkActions.sendEvent('check-repair-status');
    TawkActions.maximize();
  },

  getQuote: () => {
    TawkActions.sendEvent('get-quote');
    TawkActions.maximize();
  },

  bookService: () => {
    TawkActions.sendEvent('book-service');
    TawkActions.maximize();
  }
};