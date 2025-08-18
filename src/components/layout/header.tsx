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
import { Menu, Phone, ChevronRight } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [homeServicesOpen, setHomeServicesOpen] = useState(false);
  const [businessServicesOpen, setBusinessServicesOpen] = useState(false);
  const [remoteServicesOpen, setRemoteServicesOpen] = useState(false);
  const [otherServicesOpen, setOtherServicesOpen] = useState(false);

  const homeServices = [
    { title: "PC & Mac Repair", href: "/services/home-services/pc-mac-repair" },
    { title: "Virus & Malware Removal", href: "/services/home-services/virus-removal" },
    { title: "Data Recovery", href: "/services/home-services/data-recovery" },
    { title: "In-Home Setup & Support", href: "/services/home-services/in-home-support" },
    { title: "Computer Setup", href: "/services/home-services/computer-setup" },
    { title: "Remote Support", href: "/services/home-services/remote-support" },
  ];

  const businessServices = [
    { title: "Managed IT Support", href: "/services/business-services/managed-it" },
    { title: "Network Solutions", href: "/services/business-services/network-solutions" },
    { title: "Server Solutions", href: "/services/business-services/server-solutions" },
    { title: "Data Backup & Security", href: "/services/business-services/data-security" },
    { title: "Business Consulting", href: "/services/business-services/consulting" },
  ];

  const remoteServices = [
    { title: "Quick Fixes", href: "/services/remote-services/quick-fixes" },
    { title: "Software Support", href: "/services/remote-services/software-support" },
    { title: "Virus Removal", href: "/services/remote-services/virus-removal" },
    { title: "Performance Optimization", href: "/services/remote-services/performance-optimization" },
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
                  <NavigationMenuTrigger className="hover:bg-va-primary/10 hover:text-va-primary focus:bg-va-primary/10 focus:text-va-primary data-[state=open]:bg-va-primary/10 data-[state=open]:text-va-primary">Home Services</NavigationMenuTrigger>
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
                  <NavigationMenuTrigger className="hover:bg-va-primary/10 hover:text-va-primary focus:bg-va-primary/10 focus:text-va-primary data-[state=open]:bg-va-primary/10 data-[state=open]:text-va-primary">Business Services</NavigationMenuTrigger>
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
                  <NavigationMenuTrigger className="hover:bg-va-primary/10 hover:text-va-primary focus:bg-va-primary/10 focus:text-va-primary data-[state=open]:bg-va-primary/10 data-[state=open]:text-va-primary">Remote Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {remoteServices.map((service) => (
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
                  <Link href="/repair-status" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-va-primary/10 hover:text-va-primary focus:bg-va-primary/10 focus:text-va-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-va-primary/10">
                      Check Repair Status
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:bg-va-primary/10 hover:text-va-primary focus:bg-va-primary/10 focus:text-va-primary data-[state=open]:bg-va-primary/10 data-[state=open]:text-va-primary">About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[300px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/about"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-va-primary/10 hover:text-va-primary focus:bg-va-primary/10 focus:text-va-primary"
                          >
                            <div className="text-sm font-medium leading-none">About Us</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              Learn about our team and mission
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/protection-plans"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-va-primary/10 hover:text-va-primary focus:bg-va-primary/10 focus:text-va-primary"
                          >
                            <div className="text-sm font-medium leading-none">Protection Plans</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              Comprehensive coverage for your devices
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/support"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-va-primary/10 hover:text-va-primary focus:bg-va-primary/10 focus:text-va-primary"
                          >
                            <div className="text-sm font-medium leading-none">Support</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              Get help and technical assistance
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
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
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6">
              <nav className="flex flex-col h-full">
                {/* Header with Logo */}
                <div className="flex items-center pb-4 border-b border-va-neutral-200 mb-6 -mx-6 px-6">
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

                {/* Navigation List */}
                <div className="flex-1 overflow-y-auto space-y-4">
                  {/* Home Services Section */}
                  <div>
                    <button
                      onClick={() => setHomeServicesOpen(!homeServicesOpen)}
                      className="flex items-center justify-between w-full font-montserrat font-semibold text-base text-va-primary pb-2 border-b border-va-primary/20 transition-colors hover:text-va-primary/80"
                    >
                      <span>Home Services</span>
                      <ChevronRight 
                        className={`h-4 w-4 transition-transform duration-200 ${homeServicesOpen ? 'rotate-90' : ''}`}
                      />
                    </button>
                    {homeServicesOpen && (
                      <ul className="space-y-0 mt-3">
                        {homeServices.map((service) => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              className="block py-3 pl-0 pr-2 text-va-text-secondary font-roboto text-sm transition-all duration-200 hover:bg-va-primary/10 hover:text-va-primary hover:pl-3 border-l-3 border-transparent hover:border-va-primary"
                              onClick={() => setIsOpen(false)}
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Business Services Section */}
                  <div>
                    <button
                      onClick={() => setBusinessServicesOpen(!businessServicesOpen)}
                      className="flex items-center justify-between w-full font-montserrat font-semibold text-base text-va-secondary pb-2 border-b border-va-secondary/20 transition-colors hover:text-va-secondary/80"
                    >
                      <span>Business Services</span>
                      <ChevronRight 
                        className={`h-4 w-4 transition-transform duration-200 ${businessServicesOpen ? 'rotate-90' : ''}`}
                      />
                    </button>
                    {businessServicesOpen && (
                      <ul className="space-y-0 mt-3">
                        {businessServices.map((service) => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              className="block py-3 pl-0 pr-2 text-va-text-secondary font-roboto text-sm transition-all duration-200 hover:bg-va-secondary/10 hover:text-va-secondary hover:pl-3 border-l-3 border-transparent hover:border-va-secondary"
                              onClick={() => setIsOpen(false)}
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Remote Services Section */}
                  <div>
                    <button
                      onClick={() => setRemoteServicesOpen(!remoteServicesOpen)}
                      className="flex items-center justify-between w-full font-montserrat font-semibold text-base text-orange-600 pb-2 border-b border-orange-600/20 transition-colors hover:text-orange-600/80"
                    >
                      <span>Remote Services</span>
                      <ChevronRight 
                        className={`h-4 w-4 transition-transform duration-200 ${remoteServicesOpen ? 'rotate-90' : ''}`}
                      />
                    </button>
                    {remoteServicesOpen && (
                      <ul className="space-y-0 mt-3">
                        {remoteServices.map((service) => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              className="block py-3 pl-0 pr-2 text-va-text-secondary font-roboto text-sm transition-all duration-200 hover:bg-orange-100 hover:text-orange-600 hover:pl-3 border-l-3 border-transparent hover:border-orange-600"
                              onClick={() => setIsOpen(false)}
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Check Repair Status */}
                  <div>
                    <Link
                      href="/repair-status"
                      className="flex items-center w-full font-montserrat font-semibold text-base text-va-text-primary pb-2 border-b border-va-neutral-300 transition-colors hover:text-va-text-primary/80"
                      onClick={() => setIsOpen(false)}
                    >
                      Check Repair Status
                    </Link>
                  </div>

                  {/* About Section */}
                  <div>
                    <button
                      onClick={() => setOtherServicesOpen(!otherServicesOpen)}
                      className="flex items-center justify-between w-full font-montserrat font-semibold text-base text-va-text-primary pb-2 border-b border-va-neutral-300 transition-colors hover:text-va-text-primary/80"
                    >
                      <span>About</span>
                      <ChevronRight 
                        className={`h-4 w-4 transition-transform duration-200 ${otherServicesOpen ? 'rotate-90' : ''}`}
                      />
                    </button>
                    {otherServicesOpen && (
                      <ul className="space-y-0 mt-3">
                        <li>
                          <Link
                            href="/about"
                            className="block py-3 pl-0 pr-2 text-va-text-secondary font-roboto text-sm transition-all duration-200 hover:bg-va-neutral-100 hover:text-va-text-primary hover:pl-3 border-l-3 border-transparent hover:border-va-neutral-400"
                            onClick={() => setIsOpen(false)}
                          >
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/protection-plans"
                            className="block py-3 pl-0 pr-2 text-va-text-secondary font-roboto text-sm transition-all duration-200 hover:bg-va-accent/10 hover:text-va-accent hover:pl-3 border-l-3 border-transparent hover:border-va-accent"
                            onClick={() => setIsOpen(false)}
                          >
                            Protection Plans
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/support"
                            className="block py-3 pl-0 pr-2 text-va-text-secondary font-roboto text-sm transition-all duration-200 hover:bg-va-neutral-100 hover:text-va-text-primary hover:pl-3 border-l-3 border-transparent hover:border-va-neutral-400"
                            onClick={() => setIsOpen(false)}
                          >
                            Support
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-6 border-t border-va-neutral-200 space-y-4 -mx-6 px-6">
                  <div className="flex items-center space-x-2 text-sm text-va-text-secondary">
                    <Phone className="h-4 w-4 text-va-primary" />
                    <span className="font-roboto">(757) 375-6764</span>
                  </div>
                  <Button asChild className="w-full va-btn-primary">
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