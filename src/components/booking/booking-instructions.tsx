import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, FileText, Wrench } from "lucide-react";

interface BookingInstructionsProps {
  urgency?: string;
}

export const BookingInstructions: React.FC<BookingInstructionsProps> = ({ urgency }) => {
  const getUrgencyText = () => {
    switch (urgency) {
      case 'emergency':
        return {
          title: 'Emergency Service Booking',
          description: 'For same-day service, we recommend calling directly for fastest scheduling',
          timeframe: 'Same day or next business day'
        };
      case 'economy':
        return {
          title: 'Economy Service Booking',
          description: 'Flexible scheduling with our best rates',
          timeframe: '3-5 business days'
        };
      default:
        return {
          title: 'Standard Service Booking',
          description: 'Regular priority scheduling with professional service',
          timeframe: '1-3 business days'
        };
    }
  };

  const urgencyInfo = getUrgencyText();

  return (
    <Card className="va-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-montserrat text-va-text-primary">
          <FileText className="h-5 w-5 text-va-primary" />
          {urgencyInfo.title}
        </CardTitle>
        <CardDescription className="font-roboto text-va-text-secondary">
          {urgencyInfo.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Timeline */}
          <div className="flex items-center gap-3 p-3 bg-va-accent/5 rounded-lg border border-va-accent/20">
            <Clock className="h-5 w-5 text-va-accent" />
            <div>
              <p className="font-medium text-va-text-primary font-montserrat">Expected Timeline</p>
              <p className="text-sm text-va-text-secondary font-roboto">{urgencyInfo.timeframe}</p>
            </div>
          </div>

          {/* What to expect */}
          <div>
            <h4 className="font-montserrat font-semibold text-va-text-primary mb-4">
              What to Expect:
            </h4>
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-va-success mt-0.5" />
                <div>
                  <p className="font-medium text-va-text-primary font-montserrat">Free Diagnosis</p>
                  <p className="text-sm text-va-text-secondary font-roboto">
                    We&apos;ll assess your device and provide a detailed explanation of the issue
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-va-success mt-0.5" />
                <div>
                  <p className="font-medium text-va-text-primary font-montserrat">Transparent Pricing</p>
                  <p className="text-sm text-va-text-secondary font-roboto">
                    You&apos;ll receive a clear quote before any work begins
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-va-success mt-0.5" />
                <div>
                  <p className="font-medium text-va-text-primary font-montserrat">Quality Repair</p>
                  <p className="text-sm text-va-text-secondary font-roboto">
                    Professional repair with a 30-day warranty on all work
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What to bring */}
          <div>
            <h4 className="font-montserrat font-semibold text-va-text-primary mb-4">
              What to Bring:
            </h4>
            <div className="bg-va-neutral-100 rounded-lg p-4">
              <ul className="text-sm text-va-text-secondary font-roboto space-y-2">
                <li className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-va-primary" />
                  Your device and power cable/charger
                </li>
                <li className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-va-primary" />
                  Any error messages or symptoms you&apos;ve noticed
                </li>
                <li className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-va-primary" />
                  Backup of important files (if possible)
                </li>
                <li className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-va-primary" />
                  Software license keys or recovery disks
                </li>
              </ul>
            </div>
          </div>

          {urgency === 'emergency' && (
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm font-medium text-orange-800 font-montserrat mb-1">
                Emergency Service Note:
              </p>
              <p className="text-sm text-orange-700 font-roboto">
                For urgent same-day service, call us directly at (757) 375-6764. 
                Online booking is best for standard scheduling.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};