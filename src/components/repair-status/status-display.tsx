"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Phone, 
  Calendar, 
  DollarSign, 
  Smartphone, 
  Monitor, 
  Laptop, 
  User,
  RefreshCw
} from "lucide-react";
import { RepairTimeline } from "./repair-timeline";
import type { RepairTicketWithTimeline } from "@/lib/supabase/types";

interface StatusDisplayProps {
  ticket: RepairTicketWithTimeline;
  onBack: () => void;
}

const deviceIcons = {
  desktop: Monitor,
  laptop: Laptop,
  phone: Smartphone,
  mac: Monitor,
  tablet: Smartphone
} as const;

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ ticket: initialTicket, onBack }) => {
  const [ticket, setTicket] = useState(initialTicket);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const DeviceIcon = deviceIcons[ticket.device_type as keyof typeof deviceIcons] || Monitor;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'received':
      case 'diagnosing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'awaiting-approval':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'in-repair':
      case 'testing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ready-pickup':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const refreshStatus = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const { repairQueries } = await import("@/lib/supabase/queries");
      const updatedTicket = await repairQueries.findTicketByNumberAndName(
        ticket.ticket_number,
        ticket.customer_last_name
      );
      if (updatedTicket) {
        setTicket(updatedTicket);
      }
    } catch (error) {
      console.error('Error refreshing status:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [ticket.ticket_number, ticket.customer_last_name]);

  // Set up real-time subscription
  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;
    
    const setupSubscription = async () => {
      try {
        const { repairQueries } = await import("@/lib/supabase/queries");
        subscription = repairQueries.subscribeToTicket(ticket.id, (payload) => {
          console.log('Real-time update:', payload);
          // Refresh the ticket data when changes occur
          refreshStatus();
        });
      } catch (error) {
        console.error('Error setting up subscription:', error);
      }
    };

    setupSubscription();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [ticket.id, refreshStatus]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="va-btn-secondary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Search Again
        </Button>
        <Button 
          variant="outline" 
          onClick={refreshStatus}
          disabled={isRefreshing}
          className="va-btn-secondary"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Ticket Summary Card */}
      <Card className="va-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <DeviceIcon className="h-8 w-8 text-va-primary" />
              <div>
                <CardTitle className="font-montserrat text-va-text-primary">
                  Repair #{ticket.ticket_number}
                </CardTitle>
                <CardDescription className="font-roboto text-va-text-secondary">
                  {ticket.device_brand} {ticket.device_model}
                </CardDescription>
              </div>
            </div>
            <Badge className={`${getStatusBadgeColor(ticket.status)} font-montserrat`}>
              {ticket.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Customer and Device Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-montserrat font-semibold text-va-text-primary mb-2">
                  Customer Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-va-primary" />
                    <span className="font-roboto text-va-text-secondary">
                      {ticket.customer_first_name} {ticket.customer_last_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-va-primary" />
                    <a 
                      href={`tel:${ticket.customer_phone}`}
                      className="font-roboto text-va-primary hover:text-va-secondary"
                    >
                      {ticket.customer_phone}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-montserrat font-semibold text-va-text-primary mb-2">
                  Device Details
                </h4>
                <div className="space-y-1 text-sm font-roboto text-va-text-secondary">
                  <p><span className="font-medium">Type:</span> {ticket.device_type}</p>
                  <p><span className="font-medium">Brand:</span> {ticket.device_brand}</p>
                  <p><span className="font-medium">Model:</span> {ticket.device_model}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-montserrat font-semibold text-va-text-primary mb-2">
                  Issue Description
                </h4>
                <p className="text-sm font-roboto text-va-text-secondary bg-va-neutral-100 p-3 rounded">
                  {ticket.issue_description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {ticket.estimated_completion && (
                  <div>
                    <h5 className="font-montserrat font-medium text-va-text-primary mb-1 flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-va-primary" />
                      Est. Completion
                    </h5>
                    <p className="text-sm font-roboto text-va-text-secondary">
                      {formatDate(ticket.estimated_completion)}
                    </p>
                  </div>
                )}

                {ticket.total_cost && (
                  <div>
                    <h5 className="font-montserrat font-medium text-va-text-primary mb-1 flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-va-primary" />
                      Total Cost
                    </h5>
                    <p className="text-sm font-roboto text-va-text-secondary font-medium">
                      {formatCurrency(ticket.total_cost)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Card */}
      <Card className="va-card">
        <CardHeader>
          <CardTitle className="font-montserrat text-va-text-primary">
            Repair Timeline
          </CardTitle>
          <CardDescription className="font-roboto text-va-text-secondary">
            Track the progress of your repair from start to finish
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RepairTimeline 
            currentStatus={ticket.status} 
            timeline={ticket.status_timeline} 
          />
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="va-card">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="font-montserrat font-semibold text-va-text-primary mb-2">
              Questions About Your Repair?
            </h3>
            <p className="text-va-text-secondary font-roboto mb-4">
              Our team is here to help with any questions about your repair
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="va-btn-primary">
                <a href="tel:(757)375-6764">
                  <Phone className="mr-2 h-4 w-4" />
                  Call (757) 375-6764
                </a>
              </Button>
              <Button variant="outline" asChild className="va-btn-secondary">
                <a href="mailto:info@vacomputerguy.com">
                  Email Us
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};