import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-va-neutral-100 mt-auto">
      <div className="va-container">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-va-primary rounded flex items-center justify-center">
                <span className="text-va-neutral-50 font-montserrat font-bold text-sm">VA</span>
              </div>
              <span className="font-montserrat font-bold text-xl text-va-text-primary">Computer Guy</span>
            </Link>
            <p className="text-sm text-va-text-secondary font-roboto">
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
            <h3 className="font-montserrat font-semibold text-lg text-va-text-primary">Services</h3>
            <nav className="space-y-2">
              <Link href="/services/home-services" className="block text-sm text-va-text-secondary hover:text-va-primary transition-colors font-roboto">
                Home Services
              </Link>
              <Link href="/services/business-services" className="block text-sm text-va-text-secondary hover:text-va-primary transition-colors font-roboto">
                Business Services
              </Link>
              <Link href="/protection-plans" className="block text-sm text-va-text-secondary hover:text-va-primary transition-colors font-roboto">
                Protection Plans
              </Link>
              <Link href="/repair-status" className="block text-sm text-va-text-secondary hover:text-va-primary transition-colors font-roboto">
                Check Repair Status
              </Link>
            </nav>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-lg text-va-text-primary">Quick Links</h3>
            <nav className="space-y-2">
              <Link href="/about" className="block text-sm text-va-text-secondary hover:text-va-primary transition-colors font-roboto">
                About Us
              </Link>
              <Link href="/blog" className="block text-sm text-va-text-secondary hover:text-va-primary transition-colors font-roboto">
                Tech Tips Blog
              </Link>
              <Link href="/booking" className="block text-sm text-va-text-secondary hover:text-va-primary transition-colors font-roboto">
                Book Appointment
              </Link>
              <Link href="/contact" className="block text-sm text-va-text-secondary hover:text-va-primary transition-colors font-roboto">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-lg text-va-text-primary">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 text-va-primary" />
                <div>
                  <p className="text-sm font-medium font-roboto text-va-text-primary">(757) 375-6764</p>
                  <p className="text-xs text-va-text-muted font-roboto">Call or Text</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 text-va-primary" />
                <div>
                  <p className="text-sm font-medium font-roboto text-va-text-primary">info@vacomputerguy.com</p>
                  <p className="text-xs text-va-text-muted font-roboto">Email Support</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-va-primary" />
                <div>
                  <p className="text-sm font-medium font-roboto text-va-text-primary">355 Independence Blvd.</p>
                  <p className="text-xs text-va-text-muted font-roboto">Virginia Beach, VA 23462</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-0.5 text-va-primary" />
                <div>
                  <p className="text-sm font-medium font-roboto text-va-text-primary">Mon-Fri: 9AM-5PM*</p>
                  <p className="text-xs text-va-text-muted font-roboto">Sat: 10AM-4PM | *Tue/Thu till 7PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-va-neutral-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-va-text-muted font-roboto">
              © 2025 VA Computer Guy. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-va-text-secondary hover:text-va-primary transition-colors font-roboto">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-va-text-secondary hover:text-va-primary transition-colors font-roboto">
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