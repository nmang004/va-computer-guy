"use client";

import React from 'react';
import { CheckCircle, Circle, Clock, User, MessageSquare } from "lucide-react";
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

  return (
    <div className="space-y-6">
      {/* Current Status Banner */}
      <div className={`p-4 rounded-lg border-2 ${
        currentStatus === 'ready-pickup' || currentStatus === 'completed'
          ? 'bg-va-accent/10 border-va-accent/30'
          : 'bg-va-primary/10 border-va-primary/30'
      }`}>
        <div className="flex items-center gap-3">
          {React.createElement(statusConfig[currentStatus].icon, {
            className: `h-6 w-6 ${statusConfig[currentStatus].color}`
          })}
          <div>
            <h3 className="font-montserrat font-semibold text-va-text-primary">
              Current Status: {statusConfig[currentStatus].label}
            </h3>
            <p className="text-va-text-secondary font-roboto">
              {statusConfig[currentStatus].description}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative">
        {statusOrder.map((status, index) => {
          const stepStatus = getStepStatus(index);
          const timelineEntry = getTimelineEntry(status);
          const config = statusConfig[status];
          
          // Skip awaiting-approval if not in timeline (optional step)
          if (status === 'awaiting-approval' && !timelineEntry && stepStatus === 'pending') {
            return null;
          }

          return (
            <div key={status} className="relative flex items-start gap-4 pb-8 last:pb-0">
              {/* Timeline line */}
              {index < statusOrder.length - 1 && (
                <div 
                  className={`absolute left-4 top-8 w-0.5 h-8 ${
                    stepStatus === 'completed' ? 'bg-va-accent' : 'bg-va-neutral-200'
                  }`}
                />
              )}
              
              {/* Status icon */}
              <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                stepStatus === 'completed' 
                  ? 'bg-va-accent text-white'
                  : stepStatus === 'current'
                  ? `${config.bgColor} text-white`
                  : 'bg-va-neutral-200 text-va-text-muted'
              }`}>
                {stepStatus === 'completed' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : stepStatus === 'current' ? (
                  <Circle className="h-5 w-5 fill-current" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </div>

              {/* Status content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-montserrat font-medium ${
                    stepStatus === 'completed' || stepStatus === 'current'
                      ? 'text-va-text-primary'
                      : 'text-va-text-muted'
                  }`}>
                    {config.label}
                  </h4>
                  {timelineEntry && (
                    <div className="text-xs text-va-text-muted font-roboto">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimestamp(timelineEntry.timestamp).date}
                      </div>
                    </div>
                  )}
                </div>
                
                <p className={`text-sm font-roboto mb-2 ${
                  stepStatus === 'completed' || stepStatus === 'current'
                    ? 'text-va-text-secondary'
                    : 'text-va-text-muted'
                }`}>
                  {config.description}
                </p>

                {timelineEntry && (
                  <div className="space-y-2">
                    {timelineEntry.timestamp && (
                      <div className="text-xs text-va-text-muted font-roboto">
                        {formatTimestamp(timelineEntry.timestamp).time}
                      </div>
                    )}
                    
                    {timelineEntry.technician_name && (
                      <div className="flex items-center gap-1 text-xs text-va-text-muted font-roboto">
                        <User className="h-3 w-3" />
                        {timelineEntry.technician_name}
                      </div>
                    )}
                    
                    {timelineEntry.notes && (
                      <div className="bg-va-neutral-100 p-3 rounded border-l-4 border-va-primary/30">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 text-va-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-va-text-secondary font-roboto">
                            {timelineEntry.notes}
                          </p>
                        </div>
                      </div>
                    )}
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