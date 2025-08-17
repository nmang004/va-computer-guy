"use client";

import React from 'react';
import { CheckCircle, Circle, Clock, User, MessageSquare, ChevronRight } from "lucide-react";
import type { StatusTimeline, RepairStatus } from "@/lib/supabase/types";

interface RepairTimelineProps {
  currentStatus: RepairStatus;
  timeline: StatusTimeline[];
}

const statusConfig = {
  received: {
    label: 'Received',
    description: 'Device received and logged into our system',
    icon: Circle,
    color: 'text-va-primary',
    bgColor: 'bg-va-primary'
  },
  diagnosing: {
    label: 'Diagnosis',
    description: 'Our technician is analyzing the issue',
    icon: Circle,
    color: 'text-va-primary',
    bgColor: 'bg-va-primary'
  },
  'awaiting-approval': {
    label: 'Awaiting Approval',
    description: 'Quote sent - waiting for repair authorization',
    icon: Circle,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500'
  },
  'in-repair': {
    label: 'In Repair',
    description: 'Your device is actively being repaired',
    icon: Circle,
    color: 'text-va-secondary',
    bgColor: 'bg-va-secondary'
  },
  testing: {
    label: 'Quality Testing',
    description: 'Repair complete - performing final quality checks',
    icon: Circle,
    color: 'text-va-secondary',
    bgColor: 'bg-va-secondary'
  },
  'ready-pickup': {
    label: 'Ready for Pickup',
    description: 'Repair complete! Ready for pickup or delivery',
    icon: CheckCircle,
    color: 'text-va-accent',
    bgColor: 'bg-va-accent'
  },
  completed: {
    label: 'Completed',
    description: 'Device picked up - repair service complete',
    icon: CheckCircle,
    color: 'text-va-accent',
    bgColor: 'bg-va-accent'
  }
} as const;

const statusOrder = [
  'received',
  'diagnosing', 
  'awaiting-approval',
  'in-repair',
  'testing',
  'ready-pickup',
  'completed'
] as const;

export const RepairTimeline: React.FC<RepairTimelineProps> = ({ currentStatus, timeline }) => {
  const getCurrentStatusIndex = () => {
    return statusOrder.indexOf(currentStatus);
  };

  const getStepStatus = (stepIndex: number) => {
    const currentIndex = getCurrentStatusIndex();
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const getTimelineEntry = (status: RepairStatus) => {
    return timeline.find(entry => entry.status === status);
  };

  const visibleSteps = statusOrder.filter((status, index) => {
    const timelineEntry = getTimelineEntry(status);
    const stepStatus = getStepStatus(index);
    
    // Always show received, current, and completed steps
    if (stepStatus === 'completed' || stepStatus === 'current') return true;
    
    // Skip awaiting-approval if not in timeline (optional step)
    if (status === 'awaiting-approval' && !timelineEntry) return false;
    
    // Show next immediate step only
    if (stepStatus === 'pending' && index === getCurrentStatusIndex() + 1) return true;
    
    return false;
  });

  const getProgressPercentage = () => {
    const currentIndex = getCurrentStatusIndex();
    const totalSteps = statusOrder.length - 1; // Don't count 'completed' as active step
    return Math.round((currentIndex / totalSteps) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-va-primary/5 to-va-secondary/5 rounded-xl p-6 border border-va-primary/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-montserrat font-semibold text-va-text-primary">
              Repair Progress
            </h3>
            <p className="text-sm text-va-text-secondary font-roboto">
              {statusConfig[currentStatus].label} • {getProgressPercentage()}% Complete
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentStatus === 'ready-pickup' || currentStatus === 'completed'
                ? 'bg-va-accent/20 text-va-accent'
                : 'bg-va-primary/20 text-va-primary'
            }`}>
              {currentStatus === 'completed' ? 'COMPLETE' : 'IN PROGRESS'}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-va-neutral-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-va-primary to-va-secondary h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative">
        {/* Continuous Background Line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-va-accent via-va-primary to-va-neutral-200 opacity-20" />
        
        {visibleSteps.map((status, index) => {
          const stepStatus = getStepStatus(statusOrder.indexOf(status));
          const timelineEntry = getTimelineEntry(status);
          const config = statusConfig[status];
          const isLast = index === visibleSteps.length - 1;
          
          return (
            <div key={status} className={`relative ${!isLast ? 'pb-6' : ''}`}>
              {/* Step Card */}
              <div className={`relative ml-2 pl-10 ${
                stepStatus === 'current' 
                  ? 'bg-white border-2 border-va-primary/20 shadow-lg shadow-va-primary/10' 
                  : stepStatus === 'completed'
                  ? 'bg-va-accent/5 border border-va-accent/20'
                  : 'bg-va-neutral-50 border border-va-neutral-200'
              } rounded-lg p-4 transition-all duration-300`}>
                
                {/* Status Icon */}
                <div className={`absolute left-4 top-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  stepStatus === 'completed' 
                    ? 'bg-va-accent text-white transform scale-100' 
                    : stepStatus === 'current'
                    ? `${config.bgColor} text-white animate-pulse transform scale-110`
                    : 'bg-white border-2 border-va-neutral-300 text-va-text-muted'
                }`}>
                  {stepStatus === 'completed' ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : stepStatus === 'current' ? (
                    <div className="relative">
                      <Circle className="h-6 w-6 fill-current" />
                      <div className="absolute inset-0 rounded-full border-2 border-white animate-ping" />
                    </div>
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-montserrat font-semibold ${
                      stepStatus === 'completed' || stepStatus === 'current'
                        ? 'text-va-text-primary text-base'
                        : 'text-va-text-muted'
                    }`}>
                      {config.label}
                      {stepStatus === 'current' && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-medium bg-va-primary/10 text-va-primary rounded-full">
                          <div className="w-1.5 h-1.5 bg-va-primary rounded-full mr-1 animate-pulse" />
                          Active
                        </span>
                      )}
                    </h4>
                    
                    {timelineEntry && (
                      <div className="flex items-center gap-1 text-xs text-va-text-muted bg-va-neutral-100 px-2 py-1 rounded-full">
                        <Clock className="h-3 w-3" />
                        {formatTimestamp(timelineEntry.timestamp).date}
                      </div>
                    )}
                  </div>
                  
                  <p className={`text-sm font-roboto ${
                    stepStatus === 'completed' || stepStatus === 'current'
                      ? 'text-va-text-secondary'
                      : 'text-va-text-muted'
                  }`}>
                    {config.description}
                  </p>

                  {/* Timeline Details */}
                  {timelineEntry && (
                    <div className="space-y-3 pt-2 border-t border-va-neutral-200">
                      <div className="flex items-center justify-between text-xs">
                        {timelineEntry.timestamp && (
                          <span className="text-va-text-muted font-roboto">
                            {formatTimestamp(timelineEntry.timestamp).time}
                          </span>
                        )}
                        
                        {timelineEntry.technician_name && (
                          <div className="flex items-center gap-1 text-va-text-muted">
                            <User className="h-3 w-3" />
                            <span>{timelineEntry.technician_name}</span>
                          </div>
                        )}
                      </div>
                      
                      {timelineEntry.notes && (
                        <div className="bg-white border border-va-primary/20 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 text-va-primary flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-va-text-secondary font-roboto leading-relaxed">
                              {timelineEntry.notes}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Next Step Indicator */}
                {stepStatus === 'current' && index < visibleSteps.length - 1 && (
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-va-primary text-white rounded-full p-1 shadow-lg">
                      <ChevronRight className="h-3 w-3 transform rotate-90" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};