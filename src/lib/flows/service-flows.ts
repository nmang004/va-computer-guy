import { FlowStep } from '../diagnostic-flows';

export const serviceFlows: Record<string, FlowStep> = {
  // Service Quote Flows
  'quote-service': {
    id: 'quote-service',
    type: 'service',
    title: 'Get Free Quote',
    content: 'Get a free estimate for your computer repair needs.',
    serviceRecommendation: 'Visit our quote generator for instant pricing, or call (757) 375-6764 to speak with a technician.',
    choices: [
      { id: 'online-quote', text: 'Get Online Quote', nextStep: 'redirect-quote' },
      { id: 'call-quote', text: 'Call for Quote', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Booking Service Flows
  'book-service': {
    id: 'book-service',
    type: 'service',
    title: 'Book Service',
    content: 'Schedule your computer repair service.',
    serviceRecommendation: 'Use our online booking system or call (757) 375-6764. We offer same-day service in Hampton Roads.',
    choices: [
      { id: 'book-online', text: 'Book Online', nextStep: 'redirect-booking' },
      { id: 'call-booking', text: 'Call to Book', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Contact/Emergency Service
  'contact-service': {
    id: 'contact-service',
    type: 'service',
    title: 'Speak to Technician',
    content: 'Get immediate help from our technical support team.',
    serviceRecommendation: 'Call (757) 375-6764 now. We\'re open Monday-Friday 9AM-5PM, Tuesday & Thursday until 7PM, Saturday 10AM-4PM.',
    choices: [
      { id: 'call-now', text: 'Call (757) 375-6764', nextStep: 'redirect-call' },
      { id: 'check-hours', text: 'Check Business Hours', nextStep: 'business-hours' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Emergency Service (High Priority)
  'emergency-service': {
    id: 'emergency-service',
    type: 'service',
    title: 'Emergency Computer Service',
    content: 'Your issue requires immediate attention. We provide same-day emergency service for critical problems.',
    serviceRecommendation: 'URGENT: Call (757) 375-6764 immediately. We prioritize emergency calls and offer same-day service for critical issues like data loss or business system failures.',
    urgencyLevel: 'emergency',
    choices: [
      { id: 'call-emergency', text: 'Call Emergency Line', nextStep: 'redirect-call' },
      { id: 'emergency-tips', text: 'Emergency Steps to Take Now', nextStep: 'emergency-first-aid' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Diagnosis Service
  'diagnosis-service': {
    id: 'diagnosis-service',
    type: 'service',
    title: 'Professional Diagnosis Service',
    content: 'Our technicians will thoroughly diagnose your computer to identify the exact problem.',
    serviceRecommendation: 'Our comprehensive diagnosis service is $75 and includes a detailed report of all issues found, plus a quote for any needed repairs. Diagnosis fee is applied toward repairs if you proceed.',
    choices: [
      { id: 'book-diagnosis', text: 'Book Diagnosis ($75)', nextStep: 'book-service' },
      { id: 'learn-more-diagnosis', text: 'What\'s Included?', nextStep: 'diagnosis-details' },
      { id: 'call-questions', text: 'Call with Questions', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Virus Removal Service
  'virus-removal-service': {
    id: 'virus-removal-service',
    type: 'service',
    title: 'Virus & Malware Removal',
    content: 'Complete virus and malware removal with security setup to prevent future infections.',
    serviceRecommendation: 'Our virus removal service is $99 flat rate and includes complete system cleaning, malware removal, security software installation, and prevention setup. Typically completed same day.',
    choices: [
      { id: 'book-virus-removal', text: 'Book Virus Removal ($99)', nextStep: 'book-service' },
      { id: 'emergency-virus-tips', text: 'Emergency Virus Tips', nextStep: 'virus-emergency-steps' },
      { id: 'call-virus-help', text: 'Call for Immediate Help', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Data Recovery Service
  'data-recovery-service': {
    id: 'data-recovery-service',
    type: 'service',
    title: 'Data Recovery Service',
    content: 'Professional data recovery from failed drives, corrupted files, or accidentally deleted data.',
    serviceRecommendation: 'Data recovery pricing: $150 for logical recovery (deleted files, corruption), $300 for physical drive failures. Free evaluation included. Success rate over 90%.',
    choices: [
      { id: 'book-data-recovery', text: 'Book Data Recovery', nextStep: 'data-recovery-intake' },
      { id: 'data-recovery-pricing', text: 'Pricing Details', nextStep: 'data-recovery-pricing' },
      { id: 'emergency-data-tips', text: 'Emergency Data Tips', nextStep: 'data-emergency-steps' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // In-Home Service
  'inhome-service': {
    id: 'inhome-service',
    type: 'service',
    title: 'In-Home Computer Service',
    content: 'We come to you! On-site computer repair and setup at your home or office.',
    serviceRecommendation: 'In-home service is $85/hour with a 1-hour minimum. We bring all necessary tools and parts. Perfect for setup, training, or complex troubleshooting.',
    choices: [
      { id: 'book-inhome', text: 'Book In-Home Service', nextStep: 'book-service' },
      { id: 'inhome-details', text: 'What\'s Included?', nextStep: 'inhome-service-details' },
      { id: 'call-inhome', text: 'Call to Schedule', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Protection Plans
  'protection-plans': {
    id: 'protection-plans',
    type: 'service',
    title: 'Computer Protection Plans',
    content: 'Prevent problems before they happen with our comprehensive protection plans.',
    serviceRecommendation: 'Residential Protection: $19.99/month includes antivirus, automatic updates, and monthly checkups. Business Protection: $99.99/month includes managed IT support.',
    choices: [
      { id: 'residential-plan', text: 'Residential Plan ($19.99/mo)', nextStep: 'residential-protection' },
      { id: 'business-plan', text: 'Business Plan ($99.99/mo)', nextStep: 'business-protection' },
      { id: 'compare-plans', text: 'Compare Plans', nextStep: 'protection-comparison' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Redirect Actions
  'redirect-quote': {
    id: 'redirect-quote',
    type: 'service',
    title: 'Redirecting to Quote Generator',
    content: 'Taking you to our online quote generator...',
    serviceRecommendation: ''
  },

  'redirect-booking': {
    id: 'redirect-booking',
    type: 'service',
    title: 'Redirecting to Booking',
    content: 'Taking you to our booking system...',
    serviceRecommendation: ''
  },

  'redirect-call': {
    id: 'redirect-call',
    type: 'service',
    title: 'Calling VA Computer Guy',
    content: 'Connecting you to (757) 375-6764...',
    serviceRecommendation: ''
  },

  'redirect-protection': {
    id: 'redirect-protection',
    type: 'service',
    title: 'Redirecting to Protection Plans',
    content: 'Taking you to our protection plans page...',
    serviceRecommendation: ''
  },

  // Business Hours Information
  'business-hours': {
    id: 'business-hours',
    type: 'solution',
    title: 'Business Hours',
    content: 'VA Computer Guy Business Hours:\n\nMonday: 9:00 AM - 5:00 PM\nTuesday: 9:00 AM - 7:00 PM\nWednesday: 9:00 AM - 5:00 PM\nThursday: 9:00 AM - 7:00 PM\nFriday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed\n\nFor emergencies, leave a voicemail and we\'ll respond ASAP.',
    choices: [
      { id: 'call-now-hours', text: 'Call (757) 375-6764', nextStep: 'redirect-call' },
      { id: 'schedule-callback', text: 'Schedule Callback', nextStep: 'book-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Service Detail Pages
  'diagnosis-details': {
    id: 'diagnosis-details',
    type: 'solution',
    title: 'Diagnosis Service Details',
    content: 'Our $75 diagnosis includes:\n\n• Complete hardware testing\n• Software and driver analysis\n• Virus and malware scan\n• Performance benchmarking\n• Detailed written report\n• Repair recommendations with pricing\n\nDiagnosis fee is credited toward repairs if you proceed.',
    choices: [
      { id: 'book-diagnosis-now', text: 'Book Diagnosis Service', nextStep: 'book-service' },
      { id: 'call-diagnosis-questions', text: 'Call with Questions', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'inhome-service-details': {
    id: 'inhome-service-details',
    type: 'solution',
    title: 'In-Home Service Details',
    content: 'Our in-home service ($85/hour) includes:\n\n• On-site diagnosis and repair\n• Computer setup and configuration\n• Software installation and training\n• Network and WiFi setup\n• Data transfer and backup\n• Senior-friendly computer training\n\nWe bring all tools and common parts.',
    choices: [
      { id: 'book-inhome-now', text: 'Book In-Home Service', nextStep: 'book-service' },
      { id: 'call-inhome-questions', text: 'Call with Questions', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'data-recovery-pricing': {
    id: 'data-recovery-pricing',
    type: 'solution',
    title: 'Data Recovery Pricing',
    content: 'Data Recovery Service Pricing:\n\n• Free evaluation and diagnosis\n• Logical recovery (deleted files): $150\n• Physical recovery (drive failure): $300\n• Emergency same-day service: +$50\n• No data recovered = no charge\n\nSuccess rate: Over 90% for most cases',
    choices: [
      { id: 'book-data-eval', text: 'Book Free Evaluation', nextStep: 'book-service' },
      { id: 'emergency-data-recovery', text: 'Emergency Service', nextStep: 'emergency-service' },
      { id: 'call-data-questions', text: 'Call with Questions', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Protection Plan Details
  'residential-protection': {
    id: 'residential-protection',
    type: 'service',
    title: 'Residential Protection Plan',
    content: 'Residential Protection Plan - $19.99/month:\n\n• Premium antivirus protection\n• Automatic security updates\n• Monthly system optimization\n• Remote support included\n• 24/7 phone support\n• Annual in-home checkup',
    serviceRecommendation: 'Sign up today and get your first month free! Protect your computer and family from viruses, scams, and data loss.',
    choices: [
      { id: 'signup-residential', text: 'Sign Up ($19.99/mo)', nextStep: 'redirect-protection' },
      { id: 'compare-business', text: 'Compare Business Plan', nextStep: 'business-protection' },
      { id: 'call-protection', text: 'Call with Questions', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'business-protection': {
    id: 'business-protection',
    type: 'service',
    title: 'Business Protection Plan',
    content: 'Business Protection Plan - $99.99/month:\n\n• Managed IT support\n• Enterprise-grade security\n• Automatic backups\n• Network monitoring\n• Priority support\n• Monthly on-site visits\n• Compliance assistance',
    serviceRecommendation: 'Protect your business with comprehensive IT support. Includes everything in residential plan plus business-grade features.',
    choices: [
      { id: 'signup-business', text: 'Sign Up ($99.99/mo)', nextStep: 'redirect-protection' },
      { id: 'custom-business', text: 'Custom Business Quote', nextStep: 'quote-service' },
      { id: 'call-business', text: 'Call for Consultation', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'protection-comparison': {
    id: 'protection-comparison',
    type: 'solution',
    title: 'Protection Plans Comparison',
    content: 'Residential ($19.99/mo):\n• Antivirus & updates\n• Monthly optimization\n• Remote support\n• Annual checkup\n\nBusiness ($99.99/mo):\n• Everything in Residential\n• Managed IT support\n• Network monitoring\n• Priority support\n• Monthly on-site visits\n• Compliance help',
    choices: [
      { id: 'choose-residential', text: 'Choose Residential', nextStep: 'residential-protection' },
      { id: 'choose-business', text: 'Choose Business', nextStep: 'business-protection' },
      { id: 'call-help-choose', text: 'Help Me Choose', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Emergency First Aid Steps
  'emergency-first-aid': {
    id: 'emergency-first-aid',
    type: 'solution',
    title: 'Emergency Computer First Aid',
    content: 'IMMEDIATE STEPS for critical issues:\n\n1. POWER OFF your computer immediately\n2. Unplug from power and network\n3. Do NOT restart or try to "fix" anything\n4. Write down exactly what happened\n5. Call (757) 375-6764 for emergency service\n\nThese steps prevent further damage while help is on the way.',
    urgencyLevel: 'emergency',
    choices: [
      { id: 'call-emergency-now', text: 'Call Emergency Line', nextStep: 'redirect-call' },
      { id: 'power-off-done', text: 'I\'ve Powered Off - What Next?', nextStep: 'emergency-next-steps' },
      { id: 'cant-power-off', text: 'Can\'t Power Off', nextStep: 'emergency-force-shutdown' }
    ]
  },

  'emergency-next-steps': {
    id: 'emergency-next-steps',
    type: 'solution',
    title: 'Emergency Next Steps',
    content: 'Good! You\'ve powered off safely. Next steps:\n\n1. Keep computer unplugged\n2. Don\'t attempt any repairs\n3. Gather your emergency contact info\n4. Note the time this happened\n5. Call us immediately for same-day service\n\nWe prioritize emergency calls and can often provide same-day service.',
    urgencyLevel: 'emergency',
    choices: [
      { id: 'call-emergency-service', text: 'Call Emergency Service', nextStep: 'redirect-call' },
      { id: 'book-emergency', text: 'Book Emergency Appointment', nextStep: 'book-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'emergency-force-shutdown': {
    id: 'emergency-force-shutdown',
    type: 'solution',
    title: 'Force Emergency Shutdown',
    content: 'If you can\'t power off normally:\n\n1. Hold the power button for 10 seconds (force shutdown)\n2. Unplug power cable immediately\n3. Remove battery if it\'s a laptop\n4. Call (757) 375-6764 immediately\n\nThis is a forced shutdown - it may cause data loss but prevents hardware damage.',
    urgencyLevel: 'emergency',
    choices: [
      { id: 'forced-shutdown-done', text: 'Done - Call Emergency Line', nextStep: 'redirect-call' },
      { id: 'still-wont-shutdown', text: 'Still Won\'t Shut Down', nextStep: 'hardware-emergency' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'hardware-emergency': {
    id: 'hardware-emergency',
    type: 'service',
    title: 'Critical Hardware Emergency',
    content: 'This appears to be a critical hardware failure requiring immediate professional attention.',
    serviceRecommendation: 'EMERGENCY CALL REQUIRED: (757) 375-6764. Unplug everything and stop using the computer immediately. We provide same-day emergency service for critical hardware failures.',
    urgencyLevel: 'emergency',
    choices: [
      { id: 'call-critical-emergency', text: 'Call Critical Emergency Line', nextStep: 'redirect-call' },
      { id: 'emergency-consultation', text: 'Emergency Consultation', nextStep: 'emergency-service' }
    ]
  },

  // Data Recovery Intake
  'data-recovery-intake': {
    id: 'data-recovery-intake',
    type: 'question',
    title: 'Data Recovery Intake',
    content: 'To better help you, what type of data loss are you experiencing?',
    choices: [
      { id: 'accidentally-deleted', text: 'Accidentally deleted files', nextStep: 'data-deleted-files' },
      { id: 'drive-not-working', text: 'Hard drive not working', nextStep: 'data-drive-failure' },
      { id: 'corrupted-files', text: 'Files corrupted/won\'t open', nextStep: 'data-file-corruption' },
      { id: 'formatted-drive', text: 'Accidentally formatted drive', nextStep: 'data-formatted-drive' },
      { id: 'virus-damaged', text: 'Virus destroyed files', nextStep: 'data-virus-damage' }
    ]
  }
};