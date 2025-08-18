import Link from "next/link";
import { ArrowLeft, Zap, Phone, CheckCircle } from "lucide-react";

export default function ComputerRunningSlowPage() {
  return (
    <div className="flex flex-col min-h-screen bg-va-neutral-50">
      {/* Breadcrumb */}
      <div className="va-container py-4">
        <div className="flex items-center gap-2 text-sm text-va-text-secondary font-roboto">
          <Link href="/" className="hover:text-va-primary">Home</Link>
          <span>/</span>
          <Link href="/support" className="hover:text-va-primary">Support</Link>
          <span>/</span>
          <Link href="/support/troubleshooting" className="hover:text-va-primary">Troubleshooting</Link>
          <span>/</span>
          <span className="text-va-text-primary">Computer Running Slow</span>
        </div>
      </div>

      {/* Back Link */}
      <div className="va-container mb-6">
        <Link 
          href="/support/troubleshooting" 
          className="inline-flex items-center text-va-primary hover:text-va-secondary font-roboto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Troubleshooting
        </Link>
      </div>

      {/* Article Content */}
      <div className="va-container flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-va-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-va-primary" />
            </div>
            <h1 className="text-4xl font-montserrat font-bold mb-4 text-va-text-primary">
              Why Is My Computer Running Slow?
            </h1>
            <p className="text-lg text-va-text-secondary font-roboto max-w-2xl mx-auto">
              Learn the common causes of slow computer performance and simple solutions you can try before calling for professional help.
            </p>
          </div>

          {/* Quick Solution */}
          <div className="bg-va-accent/10 border border-va-accent/20 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-montserrat font-semibold text-va-accent mb-3">
              Quick Fix to Try First
            </h2>
            <p className="text-va-text-secondary font-roboto mb-4">
              Restart your computer completely. This clears temporary files and resets running programs that might be causing slowdowns.
            </p>
            <div className="bg-white rounded-lg p-4">
              <p className="font-medium text-va-text-primary mb-2">How to restart properly:</p>
              <ol className="list-decimal list-inside space-y-1 text-va-text-secondary font-roboto">
                <li>Save all your work and close all programs</li>
                <li>Click Start menu → Power → Restart (not Sleep or Shut down)</li>
                <li>Wait for computer to fully restart and load desktop</li>
                <li>Test if performance has improved</li>
              </ol>
            </div>
          </div>

          {/* Get Help CTA */}
          <div className="bg-va-primary text-white rounded-lg p-8 text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-montserrat font-semibold mb-4">
              Still Having Performance Issues?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Get professional diagnosis and repair to restore your computer&apos;s performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/booking" 
                className="bg-white text-va-primary px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-va-neutral-100 transition-colors"
              >
                Schedule Repair
              </Link>
              <Link 
                href="tel:(757)375-6764" 
                className="bg-va-secondary px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-va-secondary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call (757) 375-6764
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}