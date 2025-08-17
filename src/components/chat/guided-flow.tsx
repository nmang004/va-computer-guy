'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  MessageCircle, 
  Phone, 
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Wrench
} from 'lucide-react';
import { getFlowStep, getInitialStep, FlowStep } from '@/lib/diagnostic-flows';

interface GuidedFlowProps {
  onClose: () => void;
}

export default function GuidedFlow({ onClose }: GuidedFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>(getInitialStep());
  const [history, setHistory] = useState<FlowStep[]>([]);

  const handleChoice = (nextStepId: string) => {
    // Handle special redirect cases
    if (nextStepId.startsWith('redirect-')) {
      handleRedirect(nextStepId);
      return;
    }

    const nextStep = getFlowStep(nextStepId);
    if (nextStep) {
      setHistory([...history, currentStep]);
      setCurrentStep(nextStep);
    }
  };

  const handleRedirect = (redirectType: string) => {
    switch (redirectType) {
      case 'redirect-quote':
        window.location.href = '/#quote-generator';
        break;
      case 'redirect-booking':
        window.location.href = '/booking';
        break;
      case 'redirect-call':
        window.location.href = 'tel:7573756764';
        break;
      case 'redirect-protection':
        window.location.href = '/protection-plans';
        break;
      default:
        break;
    }
    onClose();
  };

  const goBack = () => {
    if (history.length > 0) {
      const previousStep = history[history.length - 1];
      setCurrentStep(previousStep);
      setHistory(history.slice(0, -1));
    }
  };

  const resetFlow = () => {
    setCurrentStep(getInitialStep());
    setHistory([]);
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'category':
        return <MessageCircle className="w-5 h-5 text-va-primary" />;
      case 'question':
        return <AlertTriangle className="w-5 h-5 text-blue-500" />;
      case 'diagnostic':
        return <Wrench className="w-5 h-5 text-orange-500" />;
      case 'solution':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'service':
        return <Phone className="w-5 h-5 text-va-primary" />;
      default:
        return <MessageCircle className="w-5 h-5 text-va-primary" />;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'category':
        return 'border-va-primary bg-va-primary/5';
      case 'question':
        return 'border-blue-500 bg-blue-50';
      case 'diagnostic':
        return 'border-orange-500 bg-orange-50';
      case 'solution':
        return 'border-green-500 bg-green-50';
      case 'service':
        return 'border-va-primary bg-va-primary/5';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="flex flex-col h-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-va-neutral-200 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {getStepIcon(currentStep.type)}
          <h3 className="font-semibold text-va-text-primary text-sm truncate">{currentStep.title}</h3>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {history.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="text-va-text-muted hover:text-va-text-primary p-1 h-auto"
            >
              <ArrowLeft className="w-3 h-3" />
            </Button>
          )}
          {currentStep.id !== 'start' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFlow}
              className="text-xs text-va-text-muted hover:text-va-text-primary px-2 py-1 h-auto"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 overflow-y-auto min-h-0">
        <div className={`p-3 rounded-lg border-2 ${getStepColor(currentStep.type)} mb-3`}>
          <div className="text-va-text-primary text-sm whitespace-pre-line break-words">
            {currentStep.content}
          </div>
          
          {currentStep.serviceRecommendation && (
            <div className="mt-3 p-2 bg-va-primary/10 rounded-lg border border-va-primary/20">
              <div className="flex items-start gap-2">
                <Phone className="w-3 h-3 text-va-primary mt-0.5 flex-shrink-0" />
                <div className="text-xs text-va-text-primary break-words">
                  {currentStep.serviceRecommendation}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Choices */}
        {currentStep.choices && currentStep.choices.length > 0 && (
          <div className="space-y-2">
            {currentStep.choices.map((choice) => (
              <Button
                key={choice.id}
                variant="outline"
                className="w-full justify-start text-left h-auto p-2 text-sm hover:bg-va-primary/5 hover:border-va-primary break-words"
                onClick={() => handleChoice(choice.nextStep)}
              >
                <div className="flex items-center gap-2 w-full min-w-0">
                  {choice.nextStep.startsWith('redirect-') && (
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  )}
                  <span className="break-words text-left">{choice.text}</span>
                </div>
              </Button>
            ))}
          </div>
        )}

        {/* Emergency Contact */}
        <div className="mt-4 p-3 bg-va-neutral-100 rounded-lg">
          <div className="text-center">
            <div className="text-xs text-va-text-muted mb-2">
              Need immediate help?
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = 'tel:7573756764'}
              className="bg-white text-xs px-3 py-1"
            >
              <Phone className="w-3 h-3 mr-1" />
              Call (757) 375-6764
            </Button>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="px-3 py-2 border-t border-va-neutral-200 bg-va-neutral-50 flex-shrink-0">
        <div className="text-xs text-va-text-muted text-center">
          Step {history.length + 1} • {currentStep.type.charAt(0).toUpperCase() + currentStep.type.slice(1)}
        </div>
      </div>
    </div>
  );
}