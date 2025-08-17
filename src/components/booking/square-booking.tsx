"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Calendar } from "lucide-react";

const SQUARE_BOOKING_URL = "https://vacomputerguy.square.site/";

interface SquareBookingProps {
  quoteData?: {
    device?: string;
    issue?: string;
    urgency?: string;
  };
}

export const SquareBooking: React.FC<SquareBookingProps> = ({ quoteData }) => {
  const openSquareInNewTab = () => {
    window.open(SQUARE_BOOKING_URL, '_blank', 'noopener,noreferrer');
  };

  // Always show the external link approach for better reliability
  return (
    <Card className="va-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-montserrat text-va-text-primary">
          <Calendar className="h-5 w-5 text-va-primary" />
          Online Booking
        </CardTitle>
        <CardDescription className="font-roboto text-va-text-secondary">
          Book your appointment through our secure Square booking system
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center py-8">
        <div className="space-y-6">
          {/* Main booking CTA */}
          <div className="p-6 bg-va-primary/5 border-2 border-va-primary/20 rounded-lg">
            <Calendar className="h-20 w-20 mx-auto text-va-primary mb-4" />
            <h3 className="text-xl font-montserrat font-semibold text-va-text-primary mb-2">
              Schedule Your Appointment
            </h3>
            <p className="text-va-text-secondary mb-6 font-roboto">
              Click below to access our Square booking site. Look for appointment scheduling options once the site loads.
            </p>
            <Button 
              onClick={openSquareInNewTab}
              className="va-btn-primary"
              size="lg"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Book Appointment Online
            </Button>
          </div>
          
          {/* Instructions */}
          <div className="text-left">
            <h4 className="font-montserrat font-semibold text-va-text-primary mb-3 text-center">
              Booking Instructions:
            </h4>
            <div className="grid gap-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-va-primary text-va-neutral-50 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-va-text-secondary font-roboto">
                  Look for "Book Online" or appointment options on the Square site
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-va-primary text-va-neutral-50 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-va-text-secondary font-roboto">
                  Select the service that matches your repair needs
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-va-primary text-va-neutral-50 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-va-text-secondary font-roboto">
                  Choose your preferred date and time, then provide contact details
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Booking tips */}
        <div className="mt-6 p-4 bg-va-accent/5 rounded-lg border border-va-accent/20 text-left">
          <h4 className="font-montserrat font-semibold text-va-text-primary mb-3">
            💡 Booking Tips:
          </h4>
          <ul className="text-sm text-va-text-secondary font-roboto space-y-2">
            {quoteData?.device && (
              <li>• Mention you have a <strong>{quoteData.device}</strong> when booking</li>
            )}
            {quoteData?.issue && (
              <li>• Reference your <strong>{quoteData.issue}</strong> issue in the notes</li>
            )}
            {quoteData?.urgency === 'emergency' && (
              <li className="text-orange-700 font-medium">• Select the earliest available time for emergency service</li>
            )}
            <li>• Have your device make/model ready to mention during booking</li>
            <li>• Include any error messages you&apos;ve seen in the notes section</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};