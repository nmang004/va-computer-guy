"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Phone } from "lucide-react";
import Link from "next/link";

export interface QuoteFormData {
  deviceType: string;
  issueCategory: string;
  urgencyLevel: string;
  deviceAge?: string;
  hasBackup?: boolean;
}

interface QuoteStepProps {
  formData: QuoteFormData;
  setFormData: (data: Partial<QuoteFormData>) => void;
  onNext: () => void;
  onPrev?: () => void;
}

// Step 1: Device Type Selection
const DeviceStep: React.FC<QuoteStepProps> = ({ formData, setFormData, onNext }) => {
  const deviceTypes = [
    { id: 'desktop', name: 'Desktop PC', description: 'Windows desktop computer' },
    { id: 'laptop', name: 'Laptop/Notebook', description: 'Portable Windows laptop' },
    { id: 'mac', name: 'Mac (Desktop/Laptop)', description: 'Apple computer system' },
    { id: 'phone', name: 'Smartphone/Tablet', description: 'Mobile device repair' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-montserrat font-semibold text-va-text-primary mb-2">
          What type of device needs repair?
        </h3>
        <p className="text-va-text-secondary font-roboto">
          Select the device category that best matches your repair needs
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {deviceTypes.map((device) => (
          <button
            key={device.id}
            onClick={() => {
              setFormData({ deviceType: device.id });
              onNext();
            }}
            className={`p-4 border-2 rounded-lg text-left transition-all hover:border-va-primary hover:bg-va-primary/5 ${
              formData.deviceType === device.id
                ? 'border-va-primary bg-va-primary/10'
                : 'border-va-neutral-200'
            }`}
          >
            <h4 className="font-montserrat font-medium text-va-text-primary mb-1">
              {device.name}
            </h4>
            <p className="text-sm text-va-text-secondary font-roboto">
              {device.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

// Step 2: Issue Category Selection  
const IssueStep: React.FC<QuoteStepProps> = ({ formData, setFormData, onNext, onPrev }) => {
  const issueCategories = [
    { 
      id: 'software', 
      name: 'Software Issues', 
      description: 'Slow performance, crashes, errors',
      basePrice: 75
    },
    { 
      id: 'virus', 
      name: 'Virus/Malware Removal', 
      description: 'Suspicious activity, pop-ups, infections',
      basePrice: 125
    },
    { 
      id: 'hardware', 
      name: 'Hardware Problems', 
      description: 'Won&apos;t turn on, broken screen, overheating',
      basePrice: 150
    },
    { 
      id: 'data', 
      name: 'Data Recovery', 
      description: 'Lost files, corrupted drive, backup needed',
      basePrice: 200
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-montserrat font-semibold text-va-text-primary mb-2">
          What type of problem are you experiencing?
        </h3>
        <p className="text-va-text-secondary font-roboto">
          Choose the category that best describes your issue
        </p>
      </div>
      
      <div className="grid gap-4">
        {issueCategories.map((issue) => (
          <button
            key={issue.id}
            onClick={() => {
              setFormData({ issueCategory: issue.id });
              onNext();
            }}
            className={`p-4 border-2 rounded-lg text-left transition-all hover:border-va-primary hover:bg-va-primary/5 ${
              formData.issueCategory === issue.id
                ? 'border-va-primary bg-va-primary/10'
                : 'border-va-neutral-200'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-montserrat font-medium text-va-text-primary">
                {issue.name}
              </h4>
              <span className="text-sm font-medium text-va-primary">
                Starting at ${issue.basePrice}
              </span>
            </div>
            <p className="text-sm text-va-text-secondary font-roboto">
              {issue.description}
            </p>
          </button>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="va-btn-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    </div>
  );
};

// Step 3: Urgency Level Selection
const UrgencyStep: React.FC<QuoteStepProps> = ({ formData, setFormData, onNext, onPrev }) => {
  const urgencyLevels = [
    { 
      id: 'emergency', 
      name: 'Emergency Service', 
      description: 'Same-day or ASAP repair needed',
      multiplier: 1.5,
      timeline: 'Same day'
    },
    { 
      id: 'standard', 
      name: 'Standard Service', 
      description: 'Normal priority, 1-3 business days',
      multiplier: 1,
      timeline: '1-3 days'
    },
    { 
      id: 'economy', 
      name: 'Economy Service', 
      description: 'Can wait, lowest cost option',
      multiplier: 0.8,
      timeline: '3-5 days'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-montserrat font-semibold text-va-text-primary mb-2">
          How urgent is your repair?
        </h3>
        <p className="text-va-text-secondary font-roboto">
          Choose your preferred service timeline
        </p>
      </div>
      
      <div className="grid gap-4">
        {urgencyLevels.map((urgency) => (
          <button
            key={urgency.id}
            onClick={() => {
              setFormData({ urgencyLevel: urgency.id });
              onNext();
            }}
            className={`p-4 border-2 rounded-lg text-left transition-all hover:border-va-primary hover:bg-va-primary/5 ${
              formData.urgencyLevel === urgency.id
                ? 'border-va-primary bg-va-primary/10'
                : 'border-va-neutral-200'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-montserrat font-medium text-va-text-primary">
                {urgency.name}
              </h4>
              <span className="text-sm font-medium text-va-secondary">
                {urgency.timeline}
              </span>
            </div>
            <p className="text-sm text-va-text-secondary font-roboto">
              {urgency.description}
            </p>
            {urgency.multiplier !== 1 && (
              <p className="text-xs text-va-primary font-medium mt-1">
                {urgency.multiplier > 1 ? '+' : ''}{((urgency.multiplier - 1) * 100).toFixed(0)}% pricing adjustment
              </p>
            )}
          </button>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="va-btn-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    </div>
  );
};

// Step 4: Quote Results Display
const QuoteResults: React.FC<QuoteStepProps & { onReset: () => void }> = ({ 
  formData, 
  onPrev, 
  onReset 
}) => {
  // Calculate estimated price based on selections
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
    
    const basePrice = basePrices[formData.issueCategory as keyof typeof basePrices] || 100;
    const urgencyMultiplier = urgencyMultipliers[formData.urgencyLevel as keyof typeof urgencyMultipliers] || 1;
    const deviceMultiplier = deviceMultipliers[formData.deviceType as keyof typeof deviceMultipliers] || 1;
    
    const total = basePrice * urgencyMultiplier * deviceMultiplier;
    return {
      low: Math.round(total * 0.8),
      high: Math.round(total * 1.2)
    };
  };

  const quote = calculateQuote();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-montserrat font-bold text-va-text-primary mb-2">
          Your Estimated Quote
        </h3>
        <p className="text-va-text-secondary font-roboto">
          Based on your selections, here&apos;s your estimated repair cost
        </p>
      </div>
      
      <div className="bg-va-primary/5 border border-va-primary/20 rounded-lg p-6 text-center">
        <div className="text-4xl font-bold text-va-primary mb-2">
          ${quote.low} - ${quote.high}
        </div>
        <p className="text-va-text-secondary font-roboto">
          Final price determined after free diagnosis
        </p>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center py-2 border-b border-va-neutral-200">
          <span className="text-va-text-secondary font-roboto">Device Type:</span>
          <span className="font-medium text-va-text-primary capitalize">{formData.deviceType}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-va-neutral-200">
          <span className="text-va-text-secondary font-roboto">Issue Category:</span>
          <span className="font-medium text-va-text-primary capitalize">{formData.issueCategory}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-va-neutral-200">
          <span className="text-va-text-secondary font-roboto">Service Level:</span>
          <span className="font-medium text-va-text-primary capitalize">{formData.urgencyLevel}</span>
        </div>
      </div>

      <div className="bg-va-accent/5 border border-va-accent/20 rounded-lg p-4">
        <h4 className="font-montserrat font-semibold text-va-text-primary mb-2">
          What&apos;s Included:
        </h4>
        <ul className="text-sm text-va-text-secondary font-roboto space-y-1">
          <li>• Free comprehensive diagnosis</li>
          <li>• Transparent pricing before work begins</li>
          <li>• 30-day warranty on all repairs</li>
          <li>• No fix, no fee guarantee</li>
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          asChild 
          className="va-btn-primary flex-1"
        >
          <Link href={`/booking?device=${formData.deviceType}&issue=${formData.issueCategory}&urgency=${formData.urgencyLevel}`}>
            <Phone className="mr-2 h-4 w-4" />
            Book Repair Now
          </Link>
        </Button>
        <Button 
          variant="outline" 
          onClick={onReset}
          className="va-btn-secondary"
        >
          Start Over
        </Button>
      </div>
      
      <div className="flex justify-center">
        <Button 
          variant="ghost" 
          onClick={onPrev}
          className="text-va-text-muted"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Previous Step
        </Button>
      </div>
    </div>
  );
};

// Main Quote Generator Component
export const QuoteGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>({
    deviceType: '',
    issueCategory: '',
    urgencyLevel: ''
  });

  const updateFormData = (data: Partial<QuoteFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const resetForm = () => {
    setCurrentStep(0);
    setFormData({
      deviceType: '',
      issueCategory: '',
      urgencyLevel: ''
    });
  };

  const steps = [
    <DeviceStep 
      key="device"
      formData={formData} 
      setFormData={updateFormData} 
      onNext={nextStep} 
    />,
    <IssueStep 
      key="issue"
      formData={formData} 
      setFormData={updateFormData} 
      onNext={nextStep} 
      onPrev={prevStep} 
    />,
    <UrgencyStep 
      key="urgency"
      formData={formData} 
      setFormData={updateFormData} 
      onNext={nextStep} 
      onPrev={prevStep} 
    />,
    <QuoteResults 
      key="results"
      formData={formData} 
      setFormData={updateFormData} 
      onNext={nextStep} 
      onPrev={prevStep} 
      onReset={resetForm}
    />
  ];

  return (
    <Card className="va-card max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-montserrat text-va-text-primary">
              Instant Quote Generator
            </CardTitle>
            <CardDescription className="font-roboto text-va-text-secondary">
              Get an estimated price for your repair in under 60 seconds
            </CardDescription>
          </div>
          <div className="text-sm text-va-text-muted font-roboto">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="flex space-x-2 mt-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded ${
                index <= currentStep ? 'bg-va-primary' : 'bg-va-neutral-200'
              }`}
            />
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="min-h-[400px]">
        {steps[currentStep]}
      </CardContent>
    </Card>
  );
};