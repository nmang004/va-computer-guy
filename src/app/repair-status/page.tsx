import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Search, Phone, Clock } from "lucide-react";

export default function RepairStatusPage() {
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

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Repair Status</Badge>
          <h1 className="text-4xl font-bold mb-4">Check Your Repair Status</h1>
          <p className="text-lg text-muted-foreground">
            Enter your ticket information below to see the current status of your repair
          </p>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Status Lookup
            </CardTitle>
            <CardDescription>
              Enter your ticket number and last name to check your repair status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ticket">Ticket Number</Label>
              <Input 
                id="ticket" 
                placeholder="e.g., VCG-2025-001" 
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input 
                id="lastname" 
                placeholder="Enter your last name" 
                disabled
              />
            </div>
            <div className="text-center pt-4">
              <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-6">
                Online status tracking coming soon! For now, please call us to check on your repair.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="tel:(757)375-6764">
                    <Phone className="mr-2 h-4 w-4" />
                    Call (757) 375-6764
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/booking">Schedule New Repair</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-6">Typical Repair Process</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Received</h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;ve received your device and it&apos;s in the queue for diagnosis
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div className="text-left">
                <h3 className="font-semibold">In Diagnosis</h3>
                <p className="text-sm text-muted-foreground">
                  Our technician is currently diagnosing the issue
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div className="text-left">
                <h3 className="font-semibold">In Repair</h3>
                <p className="text-sm text-muted-foreground">
                  Your device is actively being repaired
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Quality Check</h3>
                <p className="text-sm text-muted-foreground">
                  The repair is complete and is undergoing final testing
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-green-50">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                5
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-green-700">Ready for Pickup</h3>
                <p className="text-sm text-green-600">
                  Your device is ready for pickup! We&apos;ll contact you.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Questions About Your Repair?</h2>
          <p className="text-muted-foreground mb-6">
            Our team is here to help with any questions about your repair status
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Monday-Friday: 9AM-5PM (Tue/Thu till 7PM)</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Saturday: 10AM-4PM | Sunday: Closed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}