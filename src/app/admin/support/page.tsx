import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Clock, User, AlertTriangle, CheckCircle, Users, Wrench, CreditCard, HelpCircle } from "lucide-react";
import SupportDashboard from "@/components/admin/support-dashboard";

export default function AdminSupportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Link>
        </Button>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Support Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Manage customer support tickets, live chat, and knowledge base
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8m</div>
              <p className="text-xs text-muted-foreground">
                -2m from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Currently online
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96%</div>
              <p className="text-xs text-muted-foreground">
                +1% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Live Chat
              </CardTitle>
              <CardDescription>
                Monitor active chat conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Active conversations</span>
                  <Badge variant="secondary">4</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Waiting for response</span>
                  <Badge variant="destructive">2</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Today's chats</span>
                  <Badge variant="outline">28</Badge>
                </div>
              </div>
              <Button className="w-full">
                Open Chat Interface
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Urgent Tickets
              </CardTitle>
              <CardDescription>
                High priority support tickets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Urgent</span>
                  <Badge variant="destructive">1</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>High priority</span>
                  <Badge className="bg-orange-500">3</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Overdue</span>
                  <Badge variant="destructive">0</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View All Tickets
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Knowledge Base
              </CardTitle>
              <CardDescription>
                Manage support articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Published articles</span>
                  <Badge variant="outline">45</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Needs review</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Most viewed today</span>
                  <Badge variant="outline">12</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/support">
                  View Knowledge Base
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Component */}
        <SupportDashboard />
      </div>
    </div>
  );
}