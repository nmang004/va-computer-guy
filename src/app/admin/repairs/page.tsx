"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Plus, 
  Search, 
  Phone, 
  User, 
  Monitor,
  Laptop,
  Smartphone,
  RefreshCw,
  Eye,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import type { RepairTicket } from "@/lib/supabase/types";

// Force dynamic rendering to avoid build-time Supabase initialization
export const dynamic = 'force-dynamic';

const deviceIcons = {
  desktop: Monitor,
  laptop: Laptop,
  phone: Smartphone,
  mac: Monitor,
  tablet: Smartphone
} as const;

export default function AdminRepairsPage() {
  const [tickets, setTickets] = useState<RepairTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const handleAuth = () => {
    // Simple password protection - in production, use proper authentication
    if (password === 'vacomputer2025') {
      setIsAuthenticated(true);
      setAuthError('');
      loadTickets();
    } else {
      setAuthError('Invalid password');
    }
  };

  const loadTickets = async () => {
    setIsLoading(true);
    try {
      // Dynamic import to avoid build-time issues
      const { repairQueries } = await import("@/lib/supabase/queries");
      const ticketData = await repairQueries.getAllTickets();
      setTickets(ticketData);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setIsLoading(false);
    }
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

  const filteredTickets = tickets.filter(ticket =>
    ticket.ticket_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customer_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customer_last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.device_brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.device_model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="va-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-montserrat text-va-text-primary">
                <Settings className="h-5 w-5 text-va-primary" />
                Admin Access
              </CardTitle>
              <CardDescription className="font-roboto text-va-text-secondary">
                Enter the admin password to access the repair management system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="font-montserrat text-va-text-primary">
                  Admin Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                  placeholder="Enter admin password"
                />
                {authError && (
                  <p className="text-sm text-red-600 font-roboto">{authError}</p>
                )}
              </div>
              <Button onClick={handleAuth} className="va-btn-primary w-full">
                Access Admin Panel
              </Button>
              <div className="text-center">
                <Button variant="ghost" asChild>
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-va-text-primary">
            Repair Management
          </h1>
          <p className="text-va-text-secondary font-roboto">
            Manage all repair tickets and update statuses
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={loadTickets} variant="outline" disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button className="va-btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="va-card mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-va-text-muted" />
                <Input
                  placeholder="Search by ticket number, customer name, or device..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Badge variant="outline" className="font-roboto">
              {filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {isLoading ? (
          <Card className="va-card">
            <CardContent className="p-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-va-primary" />
              <p className="text-va-text-secondary font-roboto">Loading tickets...</p>
            </CardContent>
          </Card>
        ) : filteredTickets.length === 0 ? (
          <Card className="va-card">
            <CardContent className="p-8 text-center">
              <Search className="h-8 w-8 mx-auto mb-4 text-va-text-muted" />
              <p className="text-va-text-secondary font-roboto">
                {searchTerm ? 'No tickets match your search' : 'No repair tickets found'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTickets.map((ticket) => {
            const DeviceIcon = deviceIcons[ticket.device_type as keyof typeof deviceIcons] || Monitor;
            
            return (
              <Card key={ticket.id} className="va-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <DeviceIcon className="h-8 w-8 text-va-primary" />
                      <div>
                        <h3 className="font-montserrat font-semibold text-va-text-primary">
                          {ticket.ticket_number}
                        </h3>
                        <p className="text-sm text-va-text-secondary font-roboto">
                          {ticket.device_brand} {ticket.device_model}
                        </p>
                      </div>
                    </div>
                    <Badge className={`${getStatusBadgeColor(ticket.status)} font-montserrat`}>
                      {ticket.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-va-primary" />
                      <span className="text-sm font-roboto text-va-text-secondary">
                        {ticket.customer_first_name} {ticket.customer_last_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-va-primary" />
                      <a 
                        href={`tel:${ticket.customer_phone}`}
                        className="text-sm font-roboto text-va-primary hover:text-va-secondary"
                      >
                        {ticket.customer_phone}
                      </a>
                    </div>
                    <div className="text-sm font-roboto text-va-text-muted">
                      Created: {new Date(ticket.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-roboto text-va-text-secondary bg-va-neutral-100 p-3 rounded">
                      {ticket.issue_description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      {ticket.estimated_completion && (
                        <span className="font-roboto text-va-text-muted">
                          Est: {new Date(ticket.estimated_completion).toLocaleDateString()}
                        </span>
                      )}
                      {ticket.total_cost && (
                        <span className="font-roboto text-va-text-primary font-medium">
                          ${ticket.total_cost.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="va-btn-secondary"
                        asChild
                      >
                        <Link href={`/repair-status?ticket=${ticket.ticket_number}&demo=true`}>
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Link>
                      </Button>
                      <Button size="sm" className="va-btn-primary">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}