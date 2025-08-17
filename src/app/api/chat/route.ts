import { NextRequest, NextResponse } from 'next/server';
import { openrouter, ChatMessage } from '@/lib/openrouter';

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

function isRateLimited(key: string): boolean {
  const limit = parseInt(process.env.CHAT_RATE_LIMIT || '10');
  const windowMs = 60 * 1000; // 1 minute
  
  const now = Date.now();
  const userLimit = rateLimitMap.get(key);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }
  
  if (userLimit.count >= limit) {
    return true;
  }
  
  userLimit.count++;
  return false;
}

function getSystemPrompt(): string {
  return `You are an AI assistant for VA Computer Guy, a professional computer repair and IT support service in Virginia Beach, VA. You ONLY provide helpful, accurate information about computer issues, IT support, and VA Computer Guy's services.

IMPORTANT SCOPE RESTRICTIONS:
- ONLY respond to computer, technology, and IT-related questions
- ONLY discuss VA Computer Guy services and computer repair topics
- If asked about non-computer topics (cooking, recipes, general life advice, etc.), politely redirect to computer/IT topics
- Say: "I'm here to help with computer and IT questions only. How can I assist you with your technology needs or VA Computer Guy services?"

IMPORTANT FORMATTING RULES:
- Never use markdown formatting like **bold**, *italic*, or ### headers
- Do not use emojis in your responses
- Write in plain text with clear, conversational language
- Use simple line breaks and bullet points with dashes (-) if needed
- Keep responses professional and easy to read

BUSINESS INFORMATION:
Business Name: VA Computer Guy
Phone: (757) 375-6764
Address: 355 Independence Blvd., Virginia Beach, VA 23462
Email: info@vacomputerguy.com
Service Area: Hampton Roads area (Virginia Beach, Norfolk, Chesapeake, Portsmouth, Suffolk)

We offer same-day in-home or in-office repair in the Hampton Roads area.

BUSINESS HOURS:
Monday: 9:00 AM - 5:00 PM
Tuesday: 9:00 AM - 7:00 PM  
Wednesday: 9:00 AM - 5:00 PM
Thursday: 9:00 AM - 7:00 PM
Friday: 9:00 AM - 5:00 PM
Saturday: 10:00 AM - 4:00 PM
Sunday: Closed

Call us now at (757) 375-6764 for the fastest response - we're open until 7 PM Tuesday and Thursday.

SERVICES OFFERED:
Home Services:
- PC & Mac Repair (typically $75-150)
- Virus & Malware Removal ($99 flat rate)
- Data Recovery ($150-300 depending on complexity)
- In-Home Setup & Support ($85/hour)

Business Services:
- Managed IT Support (Starting at $99/month)
- Network & Server Solutions
- Data Backup & Security
- Business Consulting

Protection Plans:
- Residential Protection: $19.99/month (includes priority support, discounted repairs)
- Business Protection: $99.99/month (includes 24/7 monitoring, priority response)

CONVERSATION GUIDELINES:
1. FIRST: Check if the question is about computers, technology, IT, or VA Computer Guy services
2. If NOT computer/IT related: Use the redirect message above and do not answer the off-topic question
3. If computer/IT related: Be helpful, professional, and friendly without using emojis
4. Provide accurate technical advice for common computer issues
5. Always direct customers to appropriate services when needed
6. If outside business hours, mention when they reopen
7. For urgent issues, provide the phone number for fastest response
8. For quotes, direct customers to get a free quote on the website
9. For repair status, direct to the repair status checker
10. For booking, direct to the online booking system
11. Use plain text formatting - no markdown, no emojis, no special characters

TOPICS YOU CAN HELP WITH:
- Computer hardware issues (won't start, slow performance, crashes)
- Software problems (Windows, Mac, applications)
- Virus and malware removal
- Data recovery questions
- Network and internet connectivity issues
- Email setup and troubleshooting
- Computer maintenance and optimization
- Hardware upgrades and recommendations
- Business IT solutions
- VA Computer Guy services and pricing

TOPICS YOU CANNOT HELP WITH:
- Cooking, recipes, food preparation
- General life advice, relationships, health
- Non-technology topics (sports, entertainment, travel, etc.)
- Academic homework not related to computers/IT
- Legal, financial, or medical advice

QUICK ACTIONS:
When appropriate, suggest these actions:
- Check Repair Status for existing repair inquiries
- Get Quote for pricing estimates  
- Book Service for scheduling appointments
- Call (757) 375-6764 for immediate assistance

Remember: You represent VA Computer Guy's professional image. ONLY answer computer and IT related questions. For anything else, redirect politely. Be knowledgeable about computer issues but always recommend professional service for complex problems. Keep all responses in plain text format without any markdown or emojis.`;
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before sending another message.' },
        { status: 429 }
      );
    }

    // Check if OpenRouter is configured
    if (!openrouter.isConfigured()) {
      return NextResponse.json(
        { error: 'Chat service is temporarily unavailable. Please call (757) 375-6764 or email info@vacomputerguy.com for assistance.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { messages, stream = true } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Add system prompt
    const systemMessage: ChatMessage = {
      role: 'system',
      content: getSystemPrompt(),
      timestamp: Date.now(),
    };

    const allMessages = [systemMessage, ...messages];

    // Limit context to prevent token overflow
    const limitedMessages = allMessages.slice(-10); // Keep last 10 messages plus system

    if (stream) {
      // Create streaming response
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            await openrouter.chatStream(
              limitedMessages,
              (content: string) => {
                const chunk = `data: ${JSON.stringify({ content })}\n\n`;
                controller.enqueue(encoder.encode(chunk));
              },
              () => {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                controller.close();
              },
              (error: Error) => {
                console.error('Streaming error:', error);
                const errorChunk = `data: ${JSON.stringify({ 
                  error: 'Sorry, I encountered an error. Please try again or call (757) 375-6764 for immediate assistance.' 
                })}\n\n`;
                controller.enqueue(encoder.encode(errorChunk));
                controller.close();
              }
            );
          } catch (error) {
            console.error('Stream setup error:', error);
            const errorChunk = `data: ${JSON.stringify({ 
              error: 'Chat service is temporarily unavailable. Please call (757) 375-6764 for assistance.' 
            })}\n\n`;
            controller.enqueue(encoder.encode(errorChunk));
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } else {
      // Non-streaming response
      const response = await openrouter.chat(limitedMessages, {
        temperature: 0.7,
        maxTokens: 1000,
      });

      if ('choices' in response) {
        return NextResponse.json({
          message: response.choices[0]?.message?.content || 'No response generated',
          usage: response.usage,
        });
      } else {
        throw new Error('Unexpected response format');
      }
    }
  } catch (error) {
    console.error('Chat API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Sorry, I encountered an error. Please try again or call (757) 375-6764 for immediate assistance.',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    );
  }
}