"use client";

import { useState } from "react";
import Link from "next/link";
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
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">VA</span>
            </div>
            <span className="font-bold text-xl">Computer Guy</span>
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
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Protection Plans
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/repair-status" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Check Repair Status
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>(757) 375-6764</span>
            </div>
            <Button asChild>
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
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2 pb-4 border-b"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">VA</span>
                  </div>
                  <span className="font-bold text-xl">Computer Guy</span>
                </Link>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Home Services</h3>
                    <div className="space-y-2 pl-4">
                      {homeServices.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="block py-2 text-sm hover:text-primary"
                          onClick={() => setIsOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-lg mb-2">Business Services</h3>
                    <div className="space-y-2 pl-4">
                      {businessServices.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="block py-2 text-sm hover:text-primary"
                          onClick={() => setIsOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/protection-plans"
                    className="block py-2 font-medium hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Protection Plans
                  </Link>

                  <Link
                    href="/repair-status"
                    className="block py-2 font-medium hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Check Repair Status
                  </Link>

                  <Link
                    href="/about"
                    className="block py-2 font-medium hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>(757) 375-6764</span>
                  </div>
                  <Button asChild className="w-full">
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