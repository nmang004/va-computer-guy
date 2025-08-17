import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ChatProvider } from "@/lib/chat-context";
import AiChat from "@/components/chat/ai-chat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Computer Guy | Computer Repair & IT Support Virginia Beach",
  description: "Professional computer repair and IT support services in Virginia Beach and Hampton Roads. Fast, reliable solutions for home and business. Call (757) 375-6764.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ChatProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <AiChat />
        </ChatProvider>
      </body>
    </html>
  );
}
