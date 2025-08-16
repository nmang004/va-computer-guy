import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">VA</span>
              </div>
              <span className="font-bold text-xl">Computer Guy</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted local computer repair and IT support specialists serving Virginia Beach and Hampton Roads area since 2010.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <nav className="space-y-2">
              <Link href="/services/home-services" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Home Services
              </Link>
              <Link href="/services/business-services" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Business Services
              </Link>
              <Link href="/protection-plans" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Protection Plans
              </Link>
              <Link href="/repair-status" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Check Repair Status
              </Link>
            </nav>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/blog" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Tech Tips Blog
              </Link>
              <Link href="/booking" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Book Appointment
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <p className="text-sm font-medium">(757) 375-6764</p>
                  <p className="text-xs text-muted-foreground">Call or Text</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <p className="text-sm font-medium">info@vacomputerguy.com</p>
                  <p className="text-xs text-muted-foreground">Email Support</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <p className="text-sm font-medium">355 Independence Blvd.</p>
                  <p className="text-xs text-muted-foreground">Virginia Beach, VA 23462</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Mon-Fri: 9AM-5PM*</p>
                  <p className="text-xs text-muted-foreground">Sat: 10AM-4PM | *Tue/Thu till 7PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 VA Computer Guy. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;