import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Clock, Users, ThumbsUp, ThumbsDown, MessageCircle, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";

// Article content data
const articleContent: Record<string, any> = {
  'how-to-book-service': {
    title: 'How to Book a Service Appointment',
    category: 'getting-started',
    categoryName: 'Getting Started',
    readTime: '3 min read',
    difficulty: 'Beginner',
    lastUpdated: '2025-01-15',
    content: `
## Booking Your Service Appointment

Scheduling a service appointment with VA Computer Guy is quick and easy. Follow these simple steps to get your computer repair scheduled.

### Step 1: Visit Our Booking Page

Navigate to our [booking page](/booking) from the main menu or click the "Book Service" button on our homepage.

### Step 2: Select Your Service Type

Choose from our available service options:
- **Home Service**: We come to you
- **Drop-off Service**: Bring your device to our location
- **Remote Support**: For software issues that can be resolved remotely

### Step 3: Choose Your Date and Time

Select an available date and time slot that works for your schedule. We offer:
- Weekday appointments: 9:00 AM - 7:00 PM
- Saturday appointments: 10:00 AM - 4:00 PM
- Emergency services available with advance notice

### Step 4: Provide Device Information

Tell us about your device and the issue you're experiencing:
- Device type (PC, Mac, laptop, etc.)
- Brand and model
- Description of the problem
- Any error messages you're seeing

### Step 5: Contact Information

Provide your contact details so we can reach you:
- Full name
- Phone number
- Email address
- Service address (for home services)

### Step 6: Confirm Your Appointment

Review all the details and confirm your appointment. You'll receive:
- Email confirmation with appointment details
- SMS reminder 24 hours before your appointment
- Text with technician's arrival window (for home services)

## What to Expect Next

After booking your appointment:

1. **Confirmation**: You'll receive immediate email confirmation
2. **Preparation**: We'll send you a preparation checklist if needed
3. **Reminder**: 24-hour reminder via email and SMS
4. **Service Day**: Our technician will arrive during your scheduled window

## Rescheduling or Cancelling

Need to change your appointment? No problem:
- **Online**: Use the link in your confirmation email
- **Phone**: Call us at (757) 375-6764
- **Chat**: Use the live chat feature on our website

Please provide at least 24 hours notice for changes when possible.

## Protection Plan Members

If you have a protection plan with us, you get priority scheduling:
- Earlier available time slots
- Same-day emergency service options
- Extended evening hours when needed

Ready to schedule your appointment? [Book now](/booking) or call us at (757) 375-6764.
    `
  },
  'computer-wont-start': {
    title: 'Computer Won\'t Start - Basic Steps',
    category: 'troubleshooting',
    categoryName: 'Troubleshooting',
    readTime: '6 min read',
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-14',
    content: `
## When Your Computer Won't Start

A computer that won't turn on can be frustrating, but there are several basic steps you can try before bringing it in for professional repair.

### Step 1: Check Power Connections

Before anything else, verify all power connections:

**For Desktop Computers:**
- Ensure the power cord is firmly connected to both the computer and wall outlet
- Check that the power strip or surge protector is on and working
- Try a different power outlet
- Verify the power supply switch on the back of the computer is in the "ON" position

**For Laptops:**
- Connect the power adapter and check for charging indicator lights
- Try a different power outlet
- If possible, try a different power adapter
- Remove the battery (if removable) and try powering on with just the adapter

### Step 2: Check for Signs of Life

Look for any indicators that power is reaching your computer:
- LED lights on the case or power button
- Fan noise from inside the computer
- Hard drive activity lights
- Any beeping sounds during startup

### Step 3: Perform a Hard Reset

**For Desktops:**
1. Unplug the power cord
2. Hold the power button for 15-20 seconds
3. Reconnect the power cord
4. Try turning on the computer

**For Laptops:**
1. Remove the power adapter and battery (if removable)
2. Hold the power button for 15-20 seconds
3. Reconnect the battery and power adapter
4. Try turning on the laptop

### Step 4: Check External Devices

Disconnect all non-essential devices:
- USB devices (mouse, keyboard, external drives)
- External monitors
- Printers and other peripherals
- Network cables

Try starting the computer with only the essential connections.

### Step 5: Listen for Beep Codes

If your computer attempts to start but fails, listen for beep patterns:
- **One short beep**: Usually normal startup
- **Continuous beeping**: Memory or power issue
- **Long beeps followed by short beeps**: Specific hardware problem

Document any beep patterns to share with our technicians.

## When to Call for Professional Help

Contact VA Computer Guy if:
- None of the above steps work
- You hear unusual noises (grinding, clicking)
- You smell burning or see smoke
- The computer randomly shuts off after starting
- You're not comfortable performing these steps

## What Our Technicians Will Check

When you bring your computer to us, we'll perform comprehensive diagnostics:
- Power supply testing
- RAM and motherboard inspection
- Hard drive health assessment
- Component connection verification
- BIOS/UEFI troubleshooting

## Prevention Tips

To avoid startup issues in the future:
- Use a quality surge protector
- Keep your computer clean and dust-free
- Don't force power buttons or connections
- Schedule regular maintenance with our protection plans

Need help with a computer that won't start? [Book a diagnostic appointment](/booking) or call us at (757) 375-6764.
    `
  },
  'residential-protection': {
    title: 'Residential Protection Plan Benefits',
    category: 'protection-plans',
    categoryName: 'Protection Plans',
    readTime: '5 min read',
    difficulty: 'Beginner',
    lastUpdated: '2025-01-12',
    content: `
## Residential Protection Plan Overview

Our Residential Protection Plan provides comprehensive computer support and maintenance for just $19.99/month, giving you peace of mind and keeping your technology running smoothly.

### What's Included

**24/7 Remote Monitoring**
- Continuous monitoring of system health
- Automatic detection of potential issues
- Proactive alerts before problems become serious
- Performance optimization recommendations

**Automatic Security Updates**
- Operating system updates
- Security patch installation
- Software updates for critical applications
- Vulnerability assessments

**Monthly System Tune-ups**
- Registry cleaning and optimization
- Temporary file removal
- Startup program management
- Performance benchmarking

**Priority Technical Support**
- Jump to the front of the support queue
- Direct access to senior technicians
- Extended support hours
- Same-day response for urgent issues

**Antivirus Protection**
- Enterprise-grade antivirus software
- Real-time threat detection
- Automatic virus definition updates
- Regular system scans

**Basic Data Backup (5GB)**
- Automatic backup of critical files
- Cloud storage for document safety
- Easy file recovery options
- Backup verification reports

**20% Discount on Repairs**
- Significant savings on all repair services
- Includes both parts and labor
- Diagnostic fees waived
- Priority scheduling for repairs

### How It Works

**Setup Process:**
1. Sign up for the protection plan
2. Schedule initial system assessment
3. Install monitoring and security software
4. Configure automated maintenance tasks

**Monthly Maintenance:**
- Automated tune-up on scheduled date
- Performance report delivered via email
- Recommendations for improvements
- Option to schedule additional services

**Support Access:**
- Call our priority support line
- Use live chat with protection plan queue
- Submit tickets through member portal
- Remote assistance when possible

### Member Benefits

**Exclusive Perks:**
- Free annual computer cleaning
- Complimentary software installation (up to 3 programs)
- Extended warranty on repairs
- Access to member-only support portal

**Emergency Support:**
- Same-day emergency service (when available)
- After-hours support for critical issues
- Remote troubleshooting included
- No additional diagnostic fees

### Is This Right for You?

The Residential Protection Plan is perfect if you:
- Use your computer daily for work or personal tasks
- Want to prevent problems before they occur
- Value having professional support available
- Prefer predictable monthly costs over surprise repair bills

**Not Included:**
- Hardware replacement costs
- Major software licensing fees
- Issues caused by physical damage
- Data recovery from failed hard drives

### Getting Started

Ready to protect your computer? Here's how to sign up:

1. **Call us** at (757) 375-6764 to discuss your needs
2. **Schedule** an initial assessment appointment
3. **Set up** automatic monthly billing
4. **Enjoy** peace of mind knowing your computer is protected

### Frequently Asked Questions

**Can I cancel anytime?**
Yes, you can cancel with 30 days notice. No cancellation fees.

**What if I need more storage?**
Additional backup storage is available for $5/month per 5GB.

**Do you support Macs?**
Yes, our protection plan covers both Windows PCs and Macs.

**What about multiple computers?**
Each computer requires its own protection plan for full coverage.

Ready to get protected? [Contact us today](/support) or call (757) 375-6764 to learn more.
    `
  }
  // Add more articles as needed
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface ArticlePageProps {
  params: Promise<{ category: string; article: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, article } = await params;
  
  const articleData = articleContent[article];
  
  if (!articleData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href={`/support/${category}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {articleData.categoryName}
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{articleData.categoryName}</Badge>
            <Badge 
              variant="secondary" 
              className={getDifficultyColor(articleData.difficulty)}
            >
              {articleData.difficulty}
            </Badge>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{articleData.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {articleData.readTime}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Updated {new Date(articleData.lastUpdated).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: articleData.content
                  .replace(/\n### /g, '\n<h3>')
                  .replace(/\n## /g, '\n<h2>')
                  .replace(/\n# /g, '\n<h1>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/\n- /g, '\n<li>')
                  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
                  .replace(/^/, '<p>')
                  .replace(/$/, '</p>')
                  .replace(/<p><h/g, '<h')
                  .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
                  .replace(/<p>\n<li>/g, '<ul><li>')
                  .replace(/<\/li>\n<\/p>/g, '</li></ul>')
                  .replace(/<\/li>\n<li>/g, '</li><li>')
              }}
            />
          </CardContent>
        </Card>

        {/* Article Feedback */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Was this article helpful?</h3>
            <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Yes, helpful
              </Button>
              <Button variant="outline" size="sm">
                <ThumbsDown className="mr-2 h-4 w-4" />
                Not helpful
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Still need help? Our support team is here to assist you.
            </p>
            <div className="flex gap-2">
              <Button 
                size="sm"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).Tawk_API) {
                    (window as any).Tawk_API.maximize();
                  }
                }}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Live Chat
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="tel:(757)375-6764">
                  Call Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/support/getting-started/understanding-repair-process"
              className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Understanding Our Repair Process</div>
                <div className="text-sm text-muted-foreground">Getting Started</div>
              </div>
            </Link>
            <Link
              href="/support/troubleshooting/slow-performance"
              className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Slow Computer Performance</div>
                <div className="text-sm text-muted-foreground">Troubleshooting</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href={`/support/${category}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {articleData.categoryName}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/support">
              View All Categories
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}