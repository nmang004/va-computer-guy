'use client';

import { Button } from "@/components/ui/button";
import { MessageCircle, Search, Calendar, Wrench } from "lucide-react";
import Link from "next/link";
import { TawkActions } from "./tawk-chat";

interface ChatActionsProps {
  className?: string;
  variant?: 'floating' | 'inline' | 'compact';
}

export default function ChatActions({ className = '', variant = 'inline' }: ChatActionsProps) {
  const openChatWithAction = (action: string) => {
    // Pre-fill chat with specific action context
    if (typeof window !== 'undefined' && (window as any).Tawk_API) {
      (window as any).Tawk_API.maximize();
      
      // Set custom attributes for the chat session
      setTimeout(() => {
        if ((window as any).Tawk_API && (window as any).Tawk_API.setAttributes) {
          (window as any).Tawk_API.setAttributes({
            'Quick Action': action,
            'Page': window.location.pathname
          });
        }
      }, 1000);
    }
  };

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-20 right-4 z-40 space-y-2 ${className}`}>
        <Button
          size="sm"
          className="shadow-lg"
          onClick={() => openChatWithAction('Check Repair Status')}
        >
          <Search className="mr-2 h-4 w-4" />
          Check Status
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="shadow-lg bg-background"
          onClick={() => openChatWithAction('Get Quote')}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Get Quote
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="shadow-lg bg-background"
          asChild
        >
          <Link href="/booking">
            <Calendar className="mr-2 h-4 w-4" />
            Book Service
          </Link>
        </Button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => openChatWithAction('Check Repair Status')}
        >
          <Search className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => openChatWithAction('Get Quote')}
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link href="/booking">
            <Calendar className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  // Default inline variant
  return (
    <div className={`grid md:grid-cols-3 gap-4 ${className}`}>
      <Button
        variant="outline"
        className="h-auto p-4 flex flex-col items-center gap-2"
        onClick={() => openChatWithAction('Check Repair Status')}
      >
        <Search className="h-6 w-6 text-primary" />
        <div className="text-center">
          <div className="font-medium">Check Status</div>
          <div className="text-sm text-muted-foreground">Track your repair</div>
        </div>
      </Button>

      <Button
        variant="outline"
        className="h-auto p-4 flex flex-col items-center gap-2"
        onClick={() => openChatWithAction('Get Quote')}
      >
        <MessageCircle className="h-6 w-6 text-primary" />
        <div className="text-center">
          <div className="font-medium">Get Quote</div>
          <div className="text-sm text-muted-foreground">Instant estimate</div>
        </div>
      </Button>

      <Button
        variant="outline"
        className="h-auto p-4 flex flex-col items-center gap-2"
        asChild
      >
        <Link href="/booking">
          <Wrench className="h-6 w-6 text-primary" />
          <div className="text-center">
            <div className="font-medium">Book Service</div>
            <div className="text-sm text-muted-foreground">Schedule appointment</div>
          </div>
        </Link>
      </Button>
    </div>
  );
}

// Component for adding quick actions to any page
export function QuickChatButton({ 
  action, 
  children, 
  className = '',
  ...props 
}: { 
  action: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Button
      className={className}
      onClick={() => {
        if (typeof window !== 'undefined' && (window as any).Tawk_API) {
          (window as any).Tawk_API.maximize();
          
          setTimeout(() => {
            if ((window as any).Tawk_API && (window as any).Tawk_API.setAttributes) {
              (window as any).Tawk_API.setAttributes({
                'Quick Action': action,
                'Page': window.location.pathname
              });
            }
          }, 1000);
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
}