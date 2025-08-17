"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Calendar, AlertCircle, Loader2 } from "lucide-react";

const SQUARE_BOOKING_URL = "https://vacomputerguy.square.site/";

interface SquareBookingProps {
  quoteData?: {
    device?: string;
    issue?: string;
    urgency?: string;
  };
}

export const SquareBooking: React.FC<SquareBookingProps> = ({ quoteData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const openSquareInNewTab = () => {
    window.open(SQUARE_BOOKING_URL, '_blank', 'noopener,noreferrer');
  };

  if (hasError) {
    return (
      <Card className="va-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-montserrat text-va-text-primary">
            <AlertCircle className="h-5 w-5 text-va-primary" />
            Online Booking
          </CardTitle>
          <CardDescription className="font-roboto text-va-text-secondary">
            Book your appointment through our secure online system
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Calendar className="h-16 w-16 mx-auto text-va-text-muted mb-4" />
          <p className="text-va-text-secondary mb-6 font-roboto">
            Ready to schedule your appointment? Click below to access our online booking system.
          </p>
          <div className="space-y-4">
            <Button 
              onClick={openSquareInNewTab}
              className="va-btn-primary w-full sm:w-auto"
              size="lg"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Book Appointment Online
            </Button>
            <p className="text-sm text-va-text-muted font-roboto">
              Opens in a new tab for your convenience
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="va-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-montserrat text-va-text-primary">
          <Calendar className="h-5 w-5 text-va-primary" />
          Online Booking
        </CardTitle>
        <CardDescription className="font-roboto text-va-text-secondary">
          Schedule your appointment directly through our booking system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Loading state */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-va-neutral-50 rounded-lg z-10">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-va-primary mx-auto mb-2" />
                <p className="text-sm text-va-text-secondary font-roboto">Loading booking calendar...</p>
              </div>
            </div>
          )}
          
          {/* Iframe container */}
          <div className="rounded-lg overflow-hidden border border-va-neutral-200">
            <iframe
              src={SQUARE_BOOKING_URL}
              title="VA Computer Guy - Book Appointment"
              className="w-full h-[600px] border-0"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          </div>
          
          {/* Fallback button */}
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={openSquareInNewTab}
              className="va-btn-secondary"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in New Tab
            </Button>
          </div>
        </div>
        
        {/* Booking tips */}
        <div className="mt-6 p-4 bg-va-primary/5 rounded-lg border border-va-primary/20">
          <h4 className="font-montserrat font-semibold text-va-text-primary mb-2">
            Booking Tips:
          </h4>
          <ul className="text-sm text-va-text-secondary font-roboto space-y-1">
            <li>• Select the service that best matches your issue</li>
            {quoteData?.device && (
              <li>• Mention you have a <strong>{quoteData.device}</strong> when booking</li>
            )}
            {quoteData?.issue && (
              <li>• Reference your <strong>{quoteData.issue}</strong> issue in the notes</li>
            )}
            {quoteData?.urgency === 'emergency' && (
              <li>• Select the earliest available time for emergency service</li>
            )}
            <li>• Have your device make/model ready when you arrive</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};