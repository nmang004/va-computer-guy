'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isConnected: boolean;
  isTyping: boolean;
  unreadCount: number;
  sessionId: string;
}

type ChatAction =
  | { type: 'TOGGLE_CHAT' }
  | { type: 'OPEN_CHAT' }
  | { type: 'CLOSE_CHAT' }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; content: string } }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'MARK_READ' }
  | { type: 'LOAD_MESSAGES'; payload: ChatMessage[] }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'SET_STREAMING'; payload: { id: string; isStreaming: boolean } };

const initialState: ChatState = {
  messages: [],
  isOpen: false,
  isConnected: true,
  isTyping: false,
  unreadCount: 0,
  sessionId: '',
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'TOGGLE_CHAT':
      return {
        ...state,
        isOpen: !state.isOpen,
        unreadCount: !state.isOpen ? 0 : state.unreadCount,
      };
    
    case 'OPEN_CHAT':
      return {
        ...state,
        isOpen: true,
        unreadCount: 0,
      };
    
    case 'CLOSE_CHAT':
      return {
        ...state,
        isOpen: false,
      };
    
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        unreadCount: state.isOpen ? 0 : state.unreadCount + (action.payload.role === 'assistant' ? 1 : 0),
      };
    
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.id
            ? { ...msg, content: action.payload.content }
            : msg
        ),
      };
    
    case 'SET_STREAMING':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.id
            ? { ...msg, isStreaming: action.payload.isStreaming }
            : msg
        ),
      };
    
    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload,
      };
    
    case 'SET_CONNECTED':
      return {
        ...state,
        isConnected: action.payload,
      };
    
    case 'MARK_READ':
      return {
        ...state,
        unreadCount: 0,
      };
    
    case 'LOAD_MESSAGES':
      return {
        ...state,
        messages: action.payload,
      };
    
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: [],
      };
    
    default:
      return state;
  }
}

interface ChatContextType {
  state: ChatState;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  markAsRead: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, {
    ...initialState,
    sessionId: generateSessionId(),
  });

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('va-chat-messages');
    if (savedMessages) {
      try {
        const messages = JSON.parse(savedMessages);
        dispatch({ type: 'LOAD_MESSAGES', payload: messages });
      } catch (error) {
        console.error('Failed to load saved messages:', error);
      }
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (state.messages.length > 0) {
      localStorage.setItem('va-chat-messages', JSON.stringify(state.messages));
    }
  }, [state.messages]);

  const toggleChat = () => {
    dispatch({ type: 'TOGGLE_CHAT' });
  };

  const openChat = () => {
    dispatch({ type: 'OPEN_CHAT' });
  };

  const closeChat = () => {
    dispatch({ type: 'CLOSE_CHAT' });
  };

  const markAsRead = () => {
    dispatch({ type: 'MARK_READ' });
  };

  const clearMessages = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
    localStorage.removeItem('va-chat-messages');
  };

  const sendMessage = async (content: string): Promise<void> => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: generateMessageId(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

    // Create assistant message for streaming
    const assistantMessage: ChatMessage = {
      id: generateMessageId(),
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
    };

    dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
    dispatch({ type: 'SET_TYPING', payload: true });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...state.messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(line => line.trim());

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              
              if (data === '[DONE]') {
                dispatch({ type: 'SET_STREAMING', payload: { id: assistantMessage.id, isStreaming: false } });
                break;
              }

              try {
                const parsed = JSON.parse(data);
                
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
                
                if (parsed.content) {
                  accumulatedContent += parsed.content;
                  dispatch({ 
                    type: 'UPDATE_MESSAGE', 
                    payload: { id: assistantMessage.id, content: accumulatedContent }
                  });
                }
              } catch (parseError) {
                console.warn('Failed to parse stream chunk:', parseError);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again or call (757) 375-6764 for immediate assistance.';
      
      dispatch({ 
        type: 'UPDATE_MESSAGE', 
        payload: { id: assistantMessage.id, content: errorMessage }
      });
      dispatch({ type: 'SET_CONNECTED', payload: false });
      
      // Reconnect after a delay
      setTimeout(() => {
        dispatch({ type: 'SET_CONNECTED', payload: true });
      }, 3000);
    } finally {
      dispatch({ type: 'SET_TYPING', payload: false });
      dispatch({ type: 'SET_STREAMING', payload: { id: assistantMessage.id, isStreaming: false } });
    }
  };

  const contextValue: ChatContextType = {
    state,
    toggleChat,
    openChat,
    closeChat,
    sendMessage,
    clearMessages,
    markAsRead,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}