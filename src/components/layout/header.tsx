"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, Phone } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const homeServices = [
    { title: "PC & Mac Repair", href: "/services/home-services/pc-mac-repair" },
    { title: "Virus & Malware Removal", href: "/services/home-services/virus-removal" },
    { title: "Data Recovery", href: "/services/home-services/data-recovery" },
    { title: "In-Home Setup & Support", href: "/services/home-services/in-home-support" },
  ];

  const businessServices = [
    { title: "Managed IT Support", href: "/services/business-services/managed-it" },
    { title: "Network & Server Solutions", href: "/services/business-services/network-solutions" },
    { title: "Data Backup & Security", href: "/services/business-services/data-security" },
    { title: "Business Consulting", href: "/services/business-services/consulting" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/computer-guy-logo.png"
              alt="Computer Guy - Helping Good People With Bad Computers"
              width={200}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Home Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {homeServices.map((service) => (
                        <li key={service.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={service.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-va-primary/10 hover:text-va-primary focus:bg-va-primary/10 focus:text-va-primary"
                            >
                              <div className="text-sm font-medium leading-none">{service.title}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Business Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {businessServices.map((service) => (
                        <li key={service.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={service.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-va-primary/10 hover:text-va-primary focus:bg-va-primary/10 focus:text-va-primary"
                            >
                              <div className="text-sm font-medium leading-none">{service.title}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/protection-plans" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-va-primary/10 hover:text-va-primary focus:bg-va-primary/10 focus:text-va-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-va-primary/10">
                      Protection Plans
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/repair-status" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-va-primary/10 hover:text-va-primary focus:bg-va-primary/10 focus:text-va-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-va-primary/10">
                      Check Repair Status
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/support" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-va-primary/10 hover:text-va-primary focus:bg-va-primary/10 focus:text-va-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-va-primary/10">
                      Support
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-va-primary/10 hover:text-va-primary focus:bg-va-primary/10 focus:text-va-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-va-primary/10">
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-va-text-secondary">
              <Phone className="h-4 w-4 text-va-primary" />
              <span className="font-roboto">(757) 375-6764</span>
            </div>
            <Button asChild className="va-btn-primary">
              <Link href="/booking">Book Appointment</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <nav className="flex flex-col h-full">
                {/* Header with Logo */}
                <div className="p-6 border-b border-va-neutral-200 bg-gradient-to-r from-va-neutral-50 to-va-neutral-100">
                  <Link
                    href="/"
                    className="flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      src="/images/computer-guy-logo.png"
                      alt="Computer Guy - Helping Good People With Bad Computers"
                      width={180}
                      height={45}
                      className="h-8 w-auto"
                    />
                  </Link>
                </div>

                {/* Navigation Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {/* Home Services Card */}
                  <div className="va-card border-l-4 border-l-va-primary">
                    <h3 className="font-montserrat font-semibold text-lg text-va-primary mb-4">
                      Home Services
                    </h3>
                    <div className="space-y-2">
                      {homeServices.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="block py-3 px-4 text-va-text-secondary font-roboto text-sm rounded-md transition-all duration-200 hover:bg-va-primary/10 hover:text-va-primary hover:translate-x-1 active:scale-98"
                          onClick={() => setIsOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Business Services Card */}
                  <div className="va-card border-l-4 border-l-va-secondary">
                    <h3 className="font-montserrat font-semibold text-lg text-va-secondary mb-4">
                      Business Services
                    </h3>
                    <div className="space-y-2">
                      {businessServices.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="block py-3 px-4 text-va-text-secondary font-roboto text-sm rounded-md transition-all duration-200 hover:bg-va-secondary/10 hover:text-va-secondary hover:translate-x-1 active:scale-98"
                          onClick={() => setIsOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Other Services */}
                  <div className="space-y-3">
                    <Link
                      href="/protection-plans"
                      className="block p-4 rounded-lg bg-gradient-to-r from-va-accent/5 to-va-accent/10 border border-va-accent/20 transition-all duration-200 hover:from-va-accent/10 hover:to-va-accent/20 hover:border-va-accent/30 hover:shadow-md active:scale-98"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-montserrat font-medium text-va-accent text-base">
                        Protection Plans
                      </span>
                      <p className="text-va-text-muted text-xs mt-1 font-roboto">
                        Comprehensive coverage for your devices
                      </p>
                    </Link>

                    <Link
                      href="/repair-status"
                      className="block p-4 rounded-lg bg-va-neutral-100/50 border border-va-neutral-200 transition-all duration-200 hover:bg-va-neutral-100 hover:border-va-neutral-300 hover:shadow-md active:scale-98"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-montserrat font-medium text-va-text-primary text-base">
                        Check Repair Status
                      </span>
                      <p className="text-va-text-muted text-xs mt-1 font-roboto">
                        Track your device repair progress
                      </p>
                    </Link>

                    <Link
                      href="/support"
                      className="block p-4 rounded-lg bg-va-neutral-100/50 border border-va-neutral-200 transition-all duration-200 hover:bg-va-neutral-100 hover:border-va-neutral-300 hover:shadow-md active:scale-98"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-montserrat font-medium text-va-text-primary text-base">
                        Support
                      </span>
                      <p className="text-va-text-muted text-xs mt-1 font-roboto">
                        Get help and technical assistance
                      </p>
                    </Link>

                    <Link
                      href="/about"
                      className="block p-4 rounded-lg bg-va-neutral-100/50 border border-va-neutral-200 transition-all duration-200 hover:bg-va-neutral-100 hover:border-va-neutral-300 hover:shadow-md active:scale-98"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-montserrat font-medium text-va-text-primary text-base">
                        About Us
                      </span>
                      <p className="text-va-text-muted text-xs mt-1 font-roboto">
                        Learn about our team and mission
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="p-6 border-t border-va-neutral-200 bg-gradient-to-r from-va-neutral-50 to-va-neutral-100 space-y-4">
                  <div className="flex items-center justify-center space-x-3 p-3 rounded-lg bg-white/80 border border-va-neutral-200">
                    <Phone className="h-5 w-5 text-va-primary" />
                    <span className="font-montserrat font-medium text-va-text-primary">
                      (757) 375-6764
                    </span>
                  </div>
                  <Button asChild className="w-full va-btn-primary h-12 text-base font-medium shadow-lg">
                    <Link href="/booking" onClick={() => setIsOpen(false)}>
                      Book Appointment
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;