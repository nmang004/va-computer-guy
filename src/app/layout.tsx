import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AiChat from "@/components/chat/ai-chat";
import { StructuredData } from "@/components/seo/structured-data";
import { createBaseMetadata } from "@/lib/seo/metadata";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo/schemas";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", 
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = createBaseMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate global structured data
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en">
      <head>
        <StructuredData data={organizationSchema} id="organization-schema" />
        <StructuredData data={websiteSchema} id="website-schema" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <AiChat />
      </body>
    </html>
  );
}
