import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Phone, Calendar, MapPin, Clock } from "lucide-react";

export default function BookingPage() {
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

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Appointment Booking</Badge>
          <h1 className="text-4xl font-bold mb-4">Schedule Your Service</h1>
          <p className="text-lg text-muted-foreground">
            Book your computer repair or IT support appointment online or give us a call
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call to Schedule
              </CardTitle>
              <CardDescription>Speak directly with our team for immediate scheduling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-6">
                  <div className="text-3xl font-bold mb-2">(757) 375-6764</div>
                  <p className="text-muted-foreground mb-4">Call or text us anytime</p>
                  <Button size="lg" asChild>
                    <Link href="tel:(757)375-6764">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </Link>
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Monday-Friday: 9AM-5PM (Tue/Thu till 7PM)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Saturday: 10AM-4PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Sunday: Closed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Online Scheduling
              </CardTitle>
              <CardDescription>Book your appointment 24/7 through our online system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6">
                  Online booking system coming soon! For now, please call us to schedule your appointment.
                </p>
                <Button variant="outline" asChild>
                  <Link href="tel:(757)375-6764">
                    Call to Schedule
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-6">Service Options</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  In-Store Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">355 Independence Blvd.</p>
                  <p className="text-muted-foreground">Virginia Beach, VA 23462</p>
                  <p className="text-muted-foreground">Drop off your device for repair</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  On-Site Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">We Come to You</p>
                  <p className="text-muted-foreground">Virginia Beach & Hampton Roads</p>
                  <p className="text-muted-foreground">Convenient at-home or office service</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h3 className="font-semibold mb-2">Free Diagnosis</h3>
              <p className="text-sm text-muted-foreground">
                We&apos;ll assess your device and provide a detailed explanation of the issue and repair options.
              </p>
            </div>
            <div>
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h3 className="font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-sm text-muted-foreground">
                You&apos;ll receive a clear quote before any work begins. No surprises or hidden fees.
              </p>
            </div>
            <div>
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h3 className="font-semibold mb-2">Quality Repair</h3>
              <p className="text-sm text-muted-foreground">
                Professional repair with genuine parts and a 30-day warranty on all work performed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}