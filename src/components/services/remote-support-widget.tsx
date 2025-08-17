"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Monitor, Clock, Shield, Phone } from "lucide-react";

interface RemoteSupportWidgetProps {
  title?: string;
  embedded?: boolean;
}

export function RemoteSupportWidget({
  title = "Request Remote Support",
  embedded = false
}: RemoteSupportWidgetProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    urgency: "",
    issue: "",
    operatingSystem: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would submit to your backend
    console.log("Remote support request:", formData);
    alert("Support request submitted! We'll contact you within the specified timeframe.");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const containerClass = embedded 
    ? "bg-va-neutral-50 p-6 rounded-lg"
    : "py-16 bg-va-neutral-50";

  return (
    <section className={containerClass}>
      <div className={embedded ? "" : "va-container"}>
        {!embedded && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              {title}
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              Get immediate help through our secure remote connection service
            </p>
          </div>
        )}

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Benefits */}
          <div className="space-y-6">
            {embedded && (
              <h3 className="text-2xl font-montserrat font-bold text-va-text-primary mb-4">
                {title}
              </h3>
            )}
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-va-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-va-primary" />
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold text-va-text-primary">
                    Faster Resolution
                  </h4>
                  <p className="text-sm text-va-text-secondary font-roboto">
                    Most issues resolved in under 30 minutes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-va-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-va-primary" />
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold text-va-text-primary">
                    100% Secure
                  </h4>
                  <p className="text-sm text-va-text-secondary font-roboto">
                    Encrypted connection with your explicit permission
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-va-primary/10 rounded-lg flex items-center justify-center">
                  <Monitor className="h-5 w-5 text-va-primary" />
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold text-va-text-primary">
                    No Travel Required
                  </h4>
                  <p className="text-sm text-va-text-secondary font-roboto">
                    Support from the comfort of your home or office
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg va-card">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-va-primary" />
                <span className="font-montserrat font-semibold text-va-text-primary">
                  Prefer to call?
                </span>
              </div>
              <p className="text-sm text-va-text-secondary font-roboto mb-3">
                Our technicians are standing by to help
              </p>
              <Button variant="outline" size="sm" asChild className="w-full">
                <a href="tel:(757)375-6764">(757) 375-6764</a>
              </Button>
            </div>
          </div>

          {/* Form */}
          <Card className="va-card">
            <CardHeader>
              <CardTitle className="font-montserrat text-va-text-primary">
                Submit Support Request
              </CardTitle>
              <CardDescription className="font-roboto">
                Fill out the form below and we&apos;ll connect with you shortly
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="urgency">Urgency Level *</Label>
                    <Select onValueChange={(value) => handleInputChange("urgency", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">
                          <div className="flex items-center gap-2">
                            <Badge variant="destructive" className="text-xs">Emergency</Badge>
                            <span>Within 1 hour</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="urgent">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-orange-500 text-xs">Urgent</Badge>
                            <span>Same day</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="soon">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Soon</Badge>
                            <span>Next business day</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="os">Operating System</Label>
                    <Select onValueChange={(value) => handleInputChange("operatingSystem", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select OS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="windows-11">Windows 11</SelectItem>
                        <SelectItem value="windows-10">Windows 10</SelectItem>
                        <SelectItem value="windows-older">Windows (Older)</SelectItem>
                        <SelectItem value="mac-latest">macOS (Latest)</SelectItem>
                        <SelectItem value="mac-older">macOS (Older)</SelectItem>
                        <SelectItem value="other">Other/Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="issue">Describe Your Issue *</Label>
                  <Textarea
                    id="issue"
                    placeholder="Please describe what's happening with your computer..."
                    value={formData.issue}
                    onChange={(e) => handleInputChange("issue", e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full va-btn-primary">
                  Submit Support Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}