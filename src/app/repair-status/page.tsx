"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CustomerLookup } from "@/components/repair-status/customer-lookup";
import { StatusDisplay } from "@/components/repair-status/status-display";
import type { RepairTicketWithTimeline } from "@/lib/supabase/types";

// Force dynamic rendering to avoid build-time Supabase initialization
export const dynamic = 'force-dynamic';

export default function RepairStatusPage() {
  const [foundTicket, setFoundTicket] = useState<RepairTicketWithTimeline | null>(null);

  const handleTicketFound = (ticket: RepairTicketWithTimeline) => {
    setFoundTicket(ticket);
  };

  const handleBack = () => {
    setFoundTicket(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      {!foundTicket ? (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-va-secondary text-va-neutral-50 font-montserrat">
              Repair Status
            </Badge>
            <h1 className="text-4xl font-bold mb-4 font-montserrat text-va-text-primary">
              Track Your Repair
            </h1>
            <p className="text-lg text-va-text-secondary font-roboto">
              Enter your ticket information below to see the real-time status of your repair
            </p>
          </div>

          <CustomerLookup onTicketFound={handleTicketFound} />
        </div>
      ) : (
        <StatusDisplay ticket={foundTicket} onBack={handleBack} />
      )}
    </div>
  );
}