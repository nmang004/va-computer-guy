import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SquareBooking } from "@/components/booking/square-booking";
import { BookingInstructions } from "@/components/booking/booking-instructions";
import { ServiceSummary } from "@/components/booking/service-summary";
import Link from "next/link";
import { ArrowLeft, Phone, MapPin, Clock } from "lucide-react";

interface BookingPageProps {
  searchParams: Promise<{
    device?: string;
    issue?: string;
    urgency?: string;
  }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const { device, issue, urgency } = await searchParams;
  
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

        {/* Service Summary - Show when coming from quote generator */}
        {(device || issue || urgency) && (
          <div className="mb-8">
            <ServiceSummary quoteData={{ device, issue, urgency }} />
          </div>
        )}

        {/* Main booking options - responsive layout */}
        <div className="space-y-8 mb-12">
          {/* Square Online Booking - Full width for better mobile experience */}
          <SquareBooking quoteData={{ device, issue, urgency }} />
          
          {/* Booking Instructions */}
          <BookingInstructions urgency={urgency} />
        </div>

        {/* Alternative booking methods */}
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
                <MapPin className="h-5 w-5 text-va-primary" />
                Visit Our Store
              </CardTitle>
              <CardDescription className="font-roboto text-va-text-secondary">
                Drop off your device at our Virginia Beach location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-6">
                  <div className="space-y-2">
                    <p className="font-semibold font-montserrat text-va-text-primary">355 Independence Blvd.</p>
                    <p className="text-va-text-secondary font-roboto">Virginia Beach, VA 23462</p>
                  </div>
                  <Button size="lg" variant="outline" asChild className="va-btn-secondary mt-4">
                    <Link href="https://maps.google.com/?q=355+Independence+Blvd,+Virginia+Beach,+VA+23462" target="_blank">
                      <MapPin className="mr-2 h-4 w-4" />
                      Get Directions
                    </Link>
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-va-primary" />
                    <span className="font-roboto text-va-text-secondary">Walk-ins welcome</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-va-primary" />
                    <span className="font-roboto text-va-text-secondary">Free diagnosis on-site</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-va-primary" />
                    <span className="font-roboto text-va-text-secondary">Same-day service available</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Service Information */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6 font-montserrat text-va-text-primary">
            We Also Offer On-Site Service
          </h2>
          <Card className="va-card max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <MapPin className="h-8 w-8 text-va-primary" />
                <div className="text-center">
                  <p className="font-semibold font-montserrat text-va-text-primary">On-Site Repairs Available</p>
                  <p className="text-sm text-va-text-secondary font-roboto">Virginia Beach & Hampton Roads area</p>
                </div>
              </div>
              <p className="text-va-text-secondary font-roboto mb-4">
                Can&apos;t make it to our store? We offer convenient on-site service for businesses and homes 
                throughout the Hampton Roads area. Perfect for network setups, multiple device repairs, 
                and when you can&apos;t transport your equipment.
              </p>
              <Button asChild className="va-btn-primary">
                <Link href="tel:(757)375-6764">
                  <Phone className="mr-2 h-4 w-4" />
                  Call for On-Site Service
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}