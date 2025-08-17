import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone, CheckCircle, Star } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { servicesByCategoryQuery, serviceCategoriesQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export default function HomeServicesPage() {
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
          <Badge variant="secondary" className="mb-4">Home Services</Badge>
          <h1 className="text-4xl font-bold mb-4">Computer Repair for Home & Family</h1>
          <p className="text-lg text-muted-foreground">
            Professional computer repair and tech support services designed for families and individuals
          </p>
        </div>

        <div className="grid gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>PC & Mac Repair</CardTitle>
              <CardDescription>Complete hardware and software solutions for all computers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                From slow performance to hardware failures, we diagnose and fix all types of computer issues.
              </p>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Hardware replacement & upgrades</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Operating system reinstalls</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Performance optimization</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Virus & Malware Removal</CardTitle>
              <CardDescription>Complete security cleanup and protection setup</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Infected computer? We&apos;ll remove all threats and secure your system against future attacks.
              </p>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Complete virus & malware removal</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Security software installation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Prevention education</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Recovery</CardTitle>
              <CardDescription>Recover lost files and photos from damaged devices</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Lost important files? Our data recovery specialists can help retrieve your precious data.
              </p>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Hard drive recovery</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">SSD & flash drive recovery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Photo & document recovery</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>In-Home Setup & Support</CardTitle>
              <CardDescription>Convenient on-site service at your location</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We come to you! Complete setup and support services in the comfort of your home.
              </p>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">New computer setup</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Network & Wi-Fi setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Software training</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Contact us today for fast, reliable computer repair services
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