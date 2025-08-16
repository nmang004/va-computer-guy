import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Phone, Calendar, MapPin, Clock, CheckCircle } from "lucide-react";

interface BookingPageProps {
  searchParams: Promise<{
    device?: string;
    issue?: string;
    urgency?: string;
  }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const { device, issue, urgency } = await searchParams;
  
  // Display friendly names for the parameters
  const getDisplayName = (type: string, value: string) => {
    const mappings = {
      device: {
        desktop: 'Desktop PC',
        laptop: 'Laptop/Notebook', 
        mac: 'Mac (Desktop/Laptop)',
        phone: 'Smartphone/Tablet'
      },
      issue: {
        software: 'Software Issues',
        virus: 'Virus/Malware Removal',
        hardware: 'Hardware Problems',
        data: 'Data Recovery'
      },
      urgency: {
        emergency: 'Emergency Service',
        standard: 'Standard Service', 
        economy: 'Economy Service'
      }
    } as const;
    
    type MappingType = keyof typeof mappings;
    const mapping = mappings[type as MappingType];
    if (mapping && value in mapping) {
      return mapping[value as keyof typeof mapping];
    }
    return value;
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

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-va-secondary text-va-neutral-50 font-montserrat">
            Appointment Booking
          </Badge>
          <h1 className="text-4xl font-bold mb-4 font-montserrat text-va-text-primary">
            Schedule Your Service
          </h1>
          <p className="text-lg text-va-text-secondary font-roboto">
            Book your computer repair or IT support appointment online or give us a call
          </p>
        </div>

        {/* Quote Information Display */}
        {(device || issue || urgency) && (
          <Card className="va-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-montserrat text-va-text-primary">
                <CheckCircle className="h-5 w-5 text-va-success" />
                Your Quote Information
              </CardTitle>
              <CardDescription className="font-roboto text-va-text-secondary">
                Based on your previous selections, we&apos;ll prioritize your booking for these services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-3">
                {device && (
                  <div className="flex items-center gap-2 p-3 bg-va-primary/5 rounded-lg">
                    <span className="text-sm font-medium text-va-text-secondary font-roboto">Device:</span>
                    <span className="text-sm font-semibold text-va-text-primary font-montserrat">
                      {getDisplayName('device', device)}
                    </span>
                  </div>
                )}
                {issue && (
                  <div className="flex items-center gap-2 p-3 bg-va-accent/5 rounded-lg">
                    <span className="text-sm font-medium text-va-text-secondary font-roboto">Issue:</span>
                    <span className="text-sm font-semibold text-va-text-primary font-montserrat">
                      {getDisplayName('issue', issue)}
                    </span>
                  </div>
                )}
                {urgency && (
                  <div className="flex items-center gap-2 p-3 bg-va-secondary/5 rounded-lg">
                    <span className="text-sm font-medium text-va-text-secondary font-roboto">Priority:</span>
                    <span className="text-sm font-semibold text-va-text-primary font-montserrat">
                      {getDisplayName('urgency', urgency)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="va-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-montserrat text-va-text-primary">
                <Phone className="h-5 w-5 text-va-primary" />
                Call to Schedule
              </CardTitle>
              <CardDescription className="font-roboto text-va-text-secondary">
                Speak directly with our team for immediate scheduling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-6">
                  <div className="text-3xl font-bold mb-2 font-montserrat text-va-text-primary">(757) 375-6764</div>
                  <p className="text-va-text-secondary mb-4 font-roboto">Call or text us anytime</p>
                  <Button size="lg" asChild className="va-btn-primary">
                    <Link href="tel:(757)375-6764">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </Link>
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-va-primary" />
                    <span className="font-roboto text-va-text-secondary">Monday-Friday: 9AM-5PM (Tue/Thu till 7PM)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-va-primary" />
                    <span className="font-roboto text-va-text-secondary">Saturday: 10AM-4PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-va-primary" />
                    <span className="font-roboto text-va-text-secondary">Sunday: Closed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="va-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-montserrat text-va-text-primary">
                <Calendar className="h-5 w-5 text-va-primary" />
                Online Scheduling
              </CardTitle>
              <CardDescription className="font-roboto text-va-text-secondary">
                Book your appointment 24/7 through our online system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <Calendar className="h-16 w-16 mx-auto text-va-text-muted mb-4" />
                <p className="text-va-text-secondary mb-6 font-roboto">
                  Online booking system coming soon! For now, please call us to schedule your appointment.
                </p>
                <Button variant="outline" asChild className="va-btn-secondary">
                  <Link href="tel:(757)375-6764">
                    Call to Schedule
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-6 font-montserrat text-va-text-primary">Service Options</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="va-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-montserrat text-va-text-primary">
                  <MapPin className="h-5 w-5 text-va-primary" />
                  In-Store Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium font-montserrat text-va-text-primary">355 Independence Blvd.</p>
                  <p className="text-va-text-secondary font-roboto">Virginia Beach, VA 23462</p>
                  <p className="text-va-text-secondary font-roboto">Drop off your device for repair</p>
                </div>
              </CardContent>
            </Card>

            <Card className="va-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-montserrat text-va-text-primary">
                  <MapPin className="h-5 w-5 text-va-primary" />
                  On-Site Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium font-montserrat text-va-text-primary">We Come to You</p>
                  <p className="text-va-text-secondary font-roboto">Virginia Beach & Hampton Roads</p>
                  <p className="text-va-text-secondary font-roboto">Convenient at-home or office service</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 font-montserrat text-va-text-primary">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="w-8 h-8 bg-va-primary text-va-neutral-50 rounded-full flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h3 className="font-semibold mb-2 font-montserrat text-va-text-primary">Free Diagnosis</h3>
              <p className="text-sm text-va-text-secondary font-roboto">
                We&apos;ll assess your device and provide a detailed explanation of the issue and repair options.
              </p>
            </div>
            <div>
              <div className="w-8 h-8 bg-va-primary text-va-neutral-50 rounded-full flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h3 className="font-semibold mb-2 font-montserrat text-va-text-primary">Transparent Pricing</h3>
              <p className="text-sm text-va-text-secondary font-roboto">
                You&apos;ll receive a clear quote before any work begins. No surprises or hidden fees.
              </p>
            </div>
            <div>
              <div className="w-8 h-8 bg-va-primary text-va-neutral-50 rounded-full flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h3 className="font-semibold mb-2 font-montserrat text-va-text-primary">Quality Repair</h3>
              <p className="text-sm text-va-text-secondary font-roboto">
                Professional repair with genuine parts and a 30-day warranty on all work performed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}