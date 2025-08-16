import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Phone, Award, Users, Clock, MapPin } from "lucide-react";

export default function AboutPage() {
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
          <Badge variant="secondary" className="mb-4">About Us</Badge>
          <h1 className="text-4xl font-bold mb-4">Your Local Technology Experts</h1>
          <p className="text-lg text-muted-foreground">
            Serving Virginia Beach and Hampton Roads with professional computer repair and IT support since 2010
          </p>
        </div>

        <div className="grid gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Our Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                VA Computer Guy was founded in 2010 with a simple mission: to provide honest, reliable, and 
                professional computer repair services to our local community. What started as a small operation 
                has grown into the most trusted technology service provider in the Virginia Beach and Hampton Roads area.
              </p>
              <p className="text-muted-foreground">
                We believe that technology should work for you, not against you. That&apos;s why we&apos;ve built our 
                reputation on transparent pricing, quality workmanship, and exceptional customer service. From 
                simple virus removals to complex network installations, we treat every customer like family.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide fast, reliable, and affordable technology solutions that help our customers 
                  stay connected, productive, and secure in an increasingly digital world.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Honesty and transparency in all interactions</li>
                  <li>• Quality workmanship with attention to detail</li>
                  <li>• Respect for our customers&apos; time and budget</li>
                  <li>• Continuous learning and improvement</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Why Choose VA Computer Guy?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Clock className="h-12 w-12 mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">15+ Years Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Over a decade of experience fixing computers and solving IT challenges
                  </p>
                </div>
                <div className="text-center">
                  <Award className="h-12 w-12 mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Certified Technicians</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team holds industry certifications and stays current with technology
                  </p>
                </div>
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Local & Trusted</h3>
                  <p className="text-sm text-muted-foreground">
                    Proudly serving our local community with personalized service
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Certifications & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Certifications</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• CompTIA A+ Certified</li>
                    <li>• Microsoft Certified Professional</li>
                    <li>• Apple Certified Mac Technician</li>
                    <li>• Network+ Certified</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Specializations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Windows & macOS Systems</li>
                    <li>• Network Administration</li>
                    <li>• Data Recovery & Security</li>
                    <li>• Business IT Solutions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of satisfied customers who trust VA Computer Guy with their technology needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="tel:(757)375-6764">
                <Phone className="mr-2 h-4 w-4" />
                Call (757) 375-6764
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/booking">Schedule Service</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}