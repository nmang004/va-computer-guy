import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, CheckCircle, Clock, DollarSign } from "lucide-react";

interface ServiceSummaryProps {
  quoteData: {
    device?: string;
    issue?: string;
    urgency?: string;
  };
}

export const ServiceSummary: React.FC<ServiceSummaryProps> = ({ quoteData }) => {
  // Calculate estimated price based on selections (same logic as quote generator)
  const calculateQuote = () => {
    const basePrices = {
      software: 75,
      virus: 125, 
      hardware: 150,
      data: 200
    };
    
    const urgencyMultipliers = {
      emergency: 1.5,
      standard: 1,
      economy: 0.8
    };
    
    const deviceMultipliers = {
      desktop: 1,
      laptop: 1.1,
      mac: 1.2,
      phone: 0.9
    };
    
    const basePrice = basePrices[quoteData.issue as keyof typeof basePrices] || 100;
    const urgencyMultiplier = urgencyMultipliers[quoteData.urgency as keyof typeof urgencyMultipliers] || 1;
    const deviceMultiplier = deviceMultipliers[quoteData.device as keyof typeof deviceMultipliers] || 1;
    
    const total = basePrice * urgencyMultiplier * deviceMultiplier;
    return {
      low: Math.round(total * 0.8),
      high: Math.round(total * 1.2)
    };
  };

  // Display friendly names for the parameters
  const getDisplayName = (type: string, value: string) => {
    const mappings = {
      device: {
        desktop: 'Desktop PC',
        laptop: 'Laptop/Notebook', 
        mac: 'Mac (Desktop/Laptop)',
        phone: 'Smartphone/Tablet'
      },
      issue: {
        software: 'Software Issues',
        virus: 'Virus/Malware Removal',
        hardware: 'Hardware Problems',
        data: 'Data Recovery'
      },
      urgency: {
        emergency: 'Emergency Service',
        standard: 'Standard Service', 
        economy: 'Economy Service'
      }
    } as const;
    
    type MappingType = keyof typeof mappings;
    const mapping = mappings[type as MappingType];
    if (mapping && value in mapping) {
      return mapping[value as keyof typeof mapping];
    }
    return value;
  };

  const quote = calculateQuote();

  const getUrgencyInfo = () => {
    switch (quoteData.urgency) {
      case 'emergency':
        return {
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          timeline: 'Same day service',
          icon: '🚨'
        };
      case 'economy':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          timeline: '3-5 business days',
          icon: '💰'
        };
      default:
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          timeline: '1-3 business days',
          icon: '⭐'
        };
    }
  };

  const urgencyInfo = getUrgencyInfo();

  return (
    <Card className="va-card border-2 border-va-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-montserrat text-va-text-primary">
          <Calculator className="h-5 w-5 text-va-primary" />
          Your Service Quote
        </CardTitle>
        <CardDescription className="font-roboto text-va-text-secondary">
          Based on your selections, here&apos;s your estimated service details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price estimate */}
        <div className="text-center p-6 bg-va-primary/5 rounded-lg border border-va-primary/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <DollarSign className="h-6 w-6 text-va-primary" />
            <span className="text-3xl font-bold text-va-primary font-montserrat">
              ${quote.low} - ${quote.high}
            </span>
          </div>
          <p className="text-sm text-va-text-secondary font-roboto">
            Estimated price range • Final price after free diagnosis
          </p>
        </div>

        {/* Service details */}
        <div className="grid gap-4 md:grid-cols-3">
          {quoteData.device && (
            <div className="p-3 bg-va-neutral-50 rounded-lg border border-va-neutral-200">
              <p className="text-xs font-medium text-va-text-muted font-roboto uppercase tracking-wide mb-1">
                Device Type
              </p>
              <p className="font-semibold text-va-text-primary font-montserrat">
                {getDisplayName('device', quoteData.device)}
              </p>
            </div>
          )}
          
          {quoteData.issue && (
            <div className="p-3 bg-va-neutral-50 rounded-lg border border-va-neutral-200">
              <p className="text-xs font-medium text-va-text-muted font-roboto uppercase tracking-wide mb-1">
                Issue Type
              </p>
              <p className="font-semibold text-va-text-primary font-montserrat">
                {getDisplayName('issue', quoteData.issue)}
              </p>
            </div>
          )}
          
          {quoteData.urgency && (
            <div className="p-3 bg-va-neutral-50 rounded-lg border border-va-neutral-200">
              <p className="text-xs font-medium text-va-text-muted font-roboto uppercase tracking-wide mb-1">
                Service Level
              </p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-va-text-primary font-montserrat">
                  {getDisplayName('urgency', quoteData.urgency)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Timeline badge */}
        {quoteData.urgency && (
          <div className="flex items-center justify-center">
            <Badge className={`${urgencyInfo.color} font-roboto`}>
              <Clock className="h-3 w-3 mr-1" />
              {urgencyInfo.timeline}
            </Badge>
          </div>
        )}

        {/* Service guarantees */}
        <div className="bg-va-accent/5 border border-va-accent/20 rounded-lg p-4">
          <h4 className="font-montserrat font-semibold text-va-text-primary mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-va-success" />
            Service Guarantees
          </h4>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-va-success" />
              <span className="text-va-text-secondary font-roboto">Free comprehensive diagnosis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-va-success" />
              <span className="text-va-text-secondary font-roboto">30-day warranty on all repairs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-va-success" />
              <span className="text-va-text-secondary font-roboto">No fix, no fee guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-va-success" />
              <span className="text-va-text-secondary font-roboto">Transparent pricing before work begins</span>
            </div>
          </div>
        </div>

        {/* Special notes based on selections */}
        {quoteData.issue === 'data' && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-medium text-yellow-800 font-montserrat mb-1">
              Data Recovery Note:
            </p>
            <p className="text-sm text-yellow-700 font-roboto">
              Data recovery pricing varies based on drive condition and data amount. 
              We&apos;ll provide a detailed quote after initial assessment.
            </p>
          </div>
        )}

        {quoteData.device === 'mac' && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-800 font-montserrat mb-1">
              Mac Service:
            </p>
            <p className="text-sm text-blue-700 font-roboto">
              We specialize in both Intel and Apple Silicon Mac repairs with genuine Apple parts when available.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};