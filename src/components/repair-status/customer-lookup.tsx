"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Loader2, AlertCircle } from "lucide-react";
import type { RepairTicketWithTimeline } from "@/lib/supabase/types";

interface CustomerLookupProps {
  onTicketFound: (ticket: RepairTicketWithTimeline) => void;
}

export const CustomerLookup: React.FC<CustomerLookupProps> = ({ onTicketFound }) => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ticketNumber.trim() || !lastName.trim()) {
      setError('Please enter both ticket number and last name');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/repairs/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketNumber: ticketNumber.trim(),
          lastName: lastName.trim()
        })
      });

      const data = await response.json();

      if (response.ok && data.ticket) {
        onTicketFound(data.ticket);
      } else {
        setError(data.error || 'No repair found with that ticket number and last name. Please check your information and try again.');
      }
    } catch (err) {
      console.error('Lookup error:', err);
      setError('Unable to search for your repair at this time. Please try again or call us at (757) 375-6764.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTicketNumber = (value: string) => {
    // Remove any existing formatting and convert to uppercase
    let formatted = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    // Apply VCG-YYYY-XXX format
    if (formatted.length > 3) {
      formatted = formatted.slice(0, 3) + '-' + formatted.slice(3);
    }
    if (formatted.length > 8) {
      formatted = formatted.slice(0, 8) + '-' + formatted.slice(8, 11);
    }
    
    return formatted;
  };

  const handleTicketNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatTicketNumber(value);
    setTicketNumber(formatted);
    
    if (error) setError(null);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    if (error) setError(null);
  };

  return (
    <Card className="va-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-montserrat text-va-text-primary">
          <Search className="h-5 w-5 text-va-primary" />
          Check Your Repair Status
        </CardTitle>
        <CardDescription className="font-roboto text-va-text-secondary">
          Enter your ticket number and last name to view your repair progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ticket" className="font-montserrat text-va-text-primary">
                Ticket Number
              </Label>
              <Input
                id="ticket"
                type="text"
                placeholder="VCG-2025-001"
                value={ticketNumber}
                onChange={handleTicketNumberChange}
                maxLength={11}
                className="font-mono text-center tracking-wider"
                disabled={isLoading}
                aria-describedby="ticket-help"
              />
              <p id="ticket-help" className="text-xs text-va-text-muted font-roboto">
                Format: VCG-YYYY-XXX (found on your receipt or email confirmation)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastname" className="font-montserrat text-va-text-primary">
                Last Name
              </Label>
              <Input
                id="lastname"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={handleLastNameChange}
                disabled={isLoading}
                aria-describedby="lastname-help"
              />
              <p id="lastname-help" className="text-xs text-va-text-muted font-roboto">
                Enter the last name used when the repair was scheduled
              </p>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800 font-montserrat">
                  Repair Not Found
                </p>
                <p className="text-sm text-red-700 font-roboto mt-1">
                  {error}
                </p>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="va-btn-primary w-full"
            size="lg"
            disabled={isLoading || !ticketNumber.trim() || !lastName.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Check Status
              </>
            )}
          </Button>

          <div className="text-center pt-2">
            <p className="text-sm text-va-text-muted font-roboto">
              Can&apos;t find your ticket number?{' '}
              <a 
                href="tel:(757)375-6764" 
                className="text-va-primary hover:text-va-secondary font-medium"
              >
                Call us at (757) 375-6764
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};