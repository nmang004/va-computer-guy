import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Phone, CheckCircle, X, Shield } from "lucide-react";

export default function ProtectionPlansPage() {
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

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Protection Plans</Badge>
          <h1 className="text-4xl font-bold mb-4">Stay Protected Year-Round</h1>
          <p className="text-lg text-muted-foreground">
            Proactive monitoring, regular maintenance, and priority support to keep your technology running smoothly
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Residential Plan */}
          <Card className="relative">
            <CardHeader className="text-center">
              <Badge variant="outline" className="w-fit mx-auto mb-2">Most Popular</Badge>
              <CardTitle className="text-2xl">Residential Protection</CardTitle>
              <CardDescription>Perfect for families and home users</CardDescription>
              <div className="text-3xl font-bold mt-4">
                $19.99<span className="text-lg text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">24/7 Remote Monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Automatic Security Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Monthly System Tune-ups</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Priority Technical Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Antivirus Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Basic Data Backup (5GB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">20% Discount on Repairs</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Network Monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Server Management</span>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link href="tel:(757)375-6764">
                  <Shield className="mr-2 h-4 w-4" />
                  Get Protected Now
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Business Plan */}
          <Card className="relative border-primary">
            <CardHeader className="text-center">
              <Badge className="w-fit mx-auto mb-2">Business</Badge>
              <CardTitle className="text-2xl">Business Protection</CardTitle>
              <CardDescription>Comprehensive IT protection for businesses</CardDescription>
              <div className="text-3xl font-bold mt-4">
                $99.99<span className="text-lg text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">24/7 Remote Monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Automatic Security Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Weekly System Maintenance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Priority Technical Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Enterprise Antivirus Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Automated Data Backup (Unlimited)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">30% Discount on Repairs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Network Monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Server Management</span>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link href="tel:(757)375-6764">
                  <Shield className="mr-2 h-4 w-4" />
                  Protect Your Business
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-6">Why Choose Protection Plans?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prevent Problems</h3>
              <p className="text-muted-foreground">
                Proactive monitoring catches issues before they become major problems, saving you time and money.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Peace of Mind</h3>
              <p className="text-muted-foreground">
                Sleep better knowing your technology is being monitored and maintained by professionals.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Priority Support</h3>
              <p className="text-muted-foreground">
                Get faster response times and priority scheduling when you need help most.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Get Protected?</h2>
          <p className="text-muted-foreground mb-6">
            Contact us today to learn more about our protection plans and get started
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="tel:(757)375-6764">
                <Phone className="mr-2 h-4 w-4" />
                Call (757) 375-6764
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/booking">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}