'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MessageCircle, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  AlertTriangle, 
  CheckCircle, 
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  MessageSquare,
  UserCheck,
  Calendar,
  Tag,
  Link as LinkIcon
} from "lucide-react";

// Mock data - in real app this would come from Supabase
const mockTickets = [
  {
    id: '1',
    customer_name: 'John Smith',
    customer_email: 'john@email.com',
    subject: 'Computer won\'t start after power outage',
    description: 'My computer won\'t turn on after the power went out yesterday. No lights or sounds when I press the power button.',
    status: 'open' as const,
    priority: 'high' as const,
    category: 'technical' as const,
    created_at: '2025-01-17T10:30:00Z',
    updated_at: '2025-01-17T10:30:00Z',
    assigned_to: null,
    related_repair_ticket: 'VCG-2025-001'
  },
  {
    id: '2',
    customer_name: 'Sarah Johnson',
    customer_email: 'sarah@email.com',
    subject: 'Question about protection plan billing',
    description: 'I was charged twice for my protection plan this month. Can you help me understand what happened?',
    status: 'in-progress' as const,
    priority: 'medium' as const,
    category: 'billing' as const,
    created_at: '2025-01-17T09:15:00Z',
    updated_at: '2025-01-17T11:45:00Z',
    assigned_to: 'Mike Chen',
    related_repair_ticket: null
  },
  {
    id: '3',
    customer_name: 'Robert Davis',
    customer_email: 'robert@email.com',
    subject: 'Slow laptop performance',
    description: 'My laptop has been running very slowly lately. Takes forever to start up and programs are sluggish.',
    status: 'waiting-customer' as const,
    priority: 'low' as const,
    category: 'technical' as const,
    created_at: '2025-01-16T14:20:00Z',
    updated_at: '2025-01-17T08:30:00Z',
    assigned_to: 'Lisa Park',
    related_repair_ticket: null
  },
  {
    id: '4',
    customer_name: 'Emily Wilson',
    customer_email: 'emily@email.com',
    subject: 'Need help booking service appointment',
    description: 'I\'m trying to book a service appointment but the calendar isn\'t showing any available times.',
    status: 'open' as const,
    priority: 'medium' as const,
    category: 'general' as const,
    created_at: '2025-01-17T13:45:00Z',
    updated_at: '2025-01-17T13:45:00Z',
    assigned_to: null,
    related_repair_ticket: null
  }
];

const mockChatSessions = [
  {
    id: '1',
    customer_name: 'Alex Thompson',
    customer_email: 'alex@email.com',
    status: 'active',
    last_message: 'Hi, I need help with my virus removal service',
    last_activity: '2025-01-17T14:30:00Z',
    wait_time: '2m'
  },
  {
    id: '2',
    customer_name: 'Maria Garcia',
    customer_email: 'maria@email.com',
    status: 'waiting',
    last_message: 'Is anyone there? I have an urgent computer issue',
    last_activity: '2025-01-17T14:25:00Z',
    wait_time: '7m'
  },
  {
    id: '3',
    customer_name: 'David Brown',
    customer_email: 'david@email.com',
    status: 'active',
    last_message: 'Thank you for the help!',
    last_activity: '2025-01-17T14:32:00Z',
    wait_time: '0m'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'bg-blue-100 text-blue-800';
    case 'in-progress': return 'bg-yellow-100 text-yellow-800';
    case 'waiting-customer': return 'bg-orange-100 text-orange-800';
    case 'resolved': return 'bg-green-100 text-green-800';
    case 'closed': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'bg-red-100 text-red-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'technical': return <AlertTriangle className="h-4 w-4" />;
    case 'billing': return <Tag className="h-4 w-4" />;
    case 'repair-status': return <Clock className="h-4 w-4" />;
    case 'protection-plan': return <CheckCircle className="h-4 w-4" />;
    default: return <MessageCircle className="h-4 w-4" />;
  }
};

export default function SupportDashboard() {
  const [tickets, setTickets] = useState(mockTickets);
  const [chatSessions, setChatSessions] = useState(mockChatSessions);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer_email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="chat">Live Chat</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          {/* Tickets Header */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="waiting-customer">Waiting</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <MessageCircle className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(ticket.category)}
                        <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status.replace('-', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {ticket.customer_name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {ticket.customer_email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatRelativeTime(ticket.created_at)}
                        </span>
                        {ticket.related_repair_ticket && (
                          <span className="flex items-center gap-1">
                            <LinkIcon className="h-3 w-3" />
                            {ticket.related_repair_ticket}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{ticket.subject}</DialogTitle>
                          <DialogDescription>
                            Ticket from {ticket.customer_name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Customer</Label>
                              <p className="text-sm">{ticket.customer_name}</p>
                              <p className="text-xs text-muted-foreground">{ticket.customer_email}</p>
                            </div>
                            <div>
                              <Label>Status & Priority</Label>
                              <div className="flex gap-2 mt-1">
                                <Badge className={getStatusColor(ticket.status)}>
                                  {ticket.status.replace('-', ' ')}
                                </Badge>
                                <Badge className={getPriorityColor(ticket.priority)}>
                                  {ticket.priority}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                              {ticket.description}
                            </p>
                          </div>
                          {ticket.assigned_to && (
                            <div>
                              <Label>Assigned To</Label>
                              <p className="text-sm">{ticket.assigned_to}</p>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button size="sm">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Reply
                            </Button>
                            <Button size="sm" variant="outline">
                              <UserCheck className="mr-2 h-4 w-4" />
                              Assign
                            </Button>
                            <Select>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Update Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="waiting-customer">Waiting Customer</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {ticket.description}
                  </p>
                  {ticket.assigned_to && (
                    <div className="flex items-center gap-1 mt-2">
                      <UserCheck className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Assigned to {ticket.assigned_to}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          {/* Chat Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Active Chat Sessions</CardTitle>
              <CardDescription>
                Monitor and manage live customer conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chatSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        session.status === 'active' ? 'bg-green-500' : 'bg-orange-500'
                      }`} />
                      <div>
                        <div className="font-medium">{session.customer_name}</div>
                        <div className="text-sm text-muted-foreground">{session.customer_email}</div>
                        <div className="text-sm text-muted-foreground">
                          "{session.last_message}"
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        Wait: {session.wait_time}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatRelativeTime(session.last_activity)}
                      </div>
                      <Button size="sm" className="mt-2">
                        Join Chat
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* Analytics Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Volume</CardTitle>
                <CardDescription>Support tickets over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-center justify-center text-muted-foreground">
                  Chart placeholder - Ticket volume over time
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
                <CardDescription>Average response times by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-center justify-center text-muted-foreground">
                  Chart placeholder - Response times
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Support requests by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Technical</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">General</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Billing</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Protection Plans</span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
                <CardDescription>Recent feedback scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-center justify-center text-muted-foreground">
                  Chart placeholder - Satisfaction scores
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}