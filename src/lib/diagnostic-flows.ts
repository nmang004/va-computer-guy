export interface FlowStep {
  id: string;
  type: 'category' | 'question' | 'diagnostic' | 'solution' | 'service';
  title: string;
  content: string;
  choices?: FlowChoice[];
  serviceRecommendation?: string;
  nextStep?: string;
}

export interface FlowChoice {
  id: string;
  text: string;
  nextStep: string;
}

export const diagnosticFlows: Record<string, FlowStep> = {
  // Start - Main Categories
  start: {
    id: 'start',
    type: 'category',
    title: 'Computer Issue Diagnosis',
    content: 'What type of computer issue are you experiencing?',
    choices: [
      { id: 'wont-start', text: 'Computer Won\'t Start', nextStep: 'wont-start-main' },
      { id: 'slow-performance', text: 'Slow Performance', nextStep: 'slow-main' },
      { id: 'virus-malware', text: 'Virus/Malware Concerns', nextStep: 'virus-main' },
      { id: 'internet-issues', text: 'Internet/Network Problems', nextStep: 'internet-main' },
      { id: 'hardware-issues', text: 'Hardware Problems', nextStep: 'hardware-main' },
      { id: 'data-recovery', text: 'Data Recovery/Lost Files', nextStep: 'data-main' },
      { id: 'get-quote', text: 'Get Service Quote', nextStep: 'quote-service' },
      { id: 'speak-tech', text: 'Speak to Technician', nextStep: 'contact-service' }
    ]
  },

  // Computer Won't Start Flow
  'wont-start-main': {
    id: 'wont-start-main',
    type: 'question',
    title: 'Computer Won\'t Start',
    content: 'When you press the power button, what happens?',
    choices: [
      { id: 'no-power', text: 'Nothing - No lights or sounds', nextStep: 'wont-start-no-power' },
      { id: 'fans-lights', text: 'Fans spin, lights come on', nextStep: 'wont-start-power-no-display' },
      { id: 'beeping', text: 'Beeping sounds', nextStep: 'wont-start-beeping' },
      { id: 'starts-shuts-down', text: 'Starts then shuts down', nextStep: 'wont-start-shutdown' }
    ]
  },

  'wont-start-no-power': {
    id: 'wont-start-no-power',
    type: 'diagnostic',
    title: 'No Power Detected',
    content: 'Is the power cable firmly connected to both the computer and wall outlet?',
    choices: [
      { id: 'cable-connected', text: 'Yes, cable is secure', nextStep: 'wont-start-power-supply' },
      { id: 'cable-loose', text: 'Cable was loose/disconnected', nextStep: 'wont-start-try-power' }
    ]
  },

  'wont-start-try-power': {
    id: 'wont-start-try-power',
    type: 'solution',
    title: 'Try Starting Now',
    content: 'Please reconnect the power cable firmly and try starting your computer again.',
    choices: [
      { id: 'works-now', text: 'It works now!', nextStep: 'success-power-cable' },
      { id: 'still-no-power', text: 'Still no power', nextStep: 'wont-start-power-supply' }
    ]
  },

  'wont-start-power-supply': {
    id: 'wont-start-power-supply',
    type: 'service',
    title: 'Power Supply Issue',
    content: 'This appears to be a power supply or motherboard issue. This requires professional diagnosis and repair.',
    serviceRecommendation: 'Our technicians can diagnose power issues for $75 and provide a repair quote. We offer same-day service in Hampton Roads.',
    choices: [
      { id: 'book-diagnosis', text: 'Book Diagnosis Service', nextStep: 'book-service' },
      { id: 'get-quote', text: 'Get Quote First', nextStep: 'quote-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Slow Performance Flow
  'slow-main': {
    id: 'slow-main',
    type: 'question',
    title: 'Slow Performance',
    content: 'When did you first notice the slowdown?',
    choices: [
      { id: 'recent-slow', text: 'Started recently (last few days)', nextStep: 'slow-recent' },
      { id: 'gradual-slow', text: 'Gradually getting slower', nextStep: 'slow-gradual' },
      { id: 'always-slow', text: 'Always been slow', nextStep: 'slow-always' },
      { id: 'specific-programs', text: 'Only with specific programs', nextStep: 'slow-programs' }
    ]
  },

  'slow-recent': {
    id: 'slow-recent',
    type: 'diagnostic',
    title: 'Recent Slowdown',
    content: 'Have you installed any new software or noticed any pop-ups recently?',
    choices: [
      { id: 'new-software', text: 'Yes, installed new software', nextStep: 'slow-new-software' },
      { id: 'popups-ads', text: 'Yes, seeing pop-ups/ads', nextStep: 'virus-main' },
      { id: 'no-changes', text: 'No, nothing new', nextStep: 'slow-system-check' }
    ]
  },

  // Virus/Malware Flow
  'virus-main': {
    id: 'virus-main',
    type: 'question',
    title: 'Virus/Malware Concerns',
    content: 'What symptoms are you experiencing?',
    choices: [
      { id: 'popup-ads', text: 'Pop-up ads everywhere', nextStep: 'virus-adware' },
      { id: 'slow-virus', text: 'Computer very slow', nextStep: 'virus-performance' },
      { id: 'strange-programs', text: 'Unknown programs running', nextStep: 'virus-unknown-programs' },
      { id: 'browser-hijacked', text: 'Browser homepage changed', nextStep: 'virus-browser' },
      { id: 'prevention', text: 'Just want protection advice', nextStep: 'virus-prevention' }
    ]
  },

  'virus-adware': {
    id: 'virus-adware',
    type: 'service',
    title: 'Adware Infection',
    content: 'You likely have adware or potentially unwanted programs (PUPs) installed. This requires professional removal to ensure complete cleaning.',
    serviceRecommendation: 'Our virus removal service is $99 flat rate and includes complete system cleaning, security software installation, and protection setup.',
    choices: [
      { id: 'book-virus-removal', text: 'Book Virus Removal', nextStep: 'book-service' },
      { id: 'emergency-tips', text: 'Emergency Tips', nextStep: 'virus-emergency-tips' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Service Outcomes
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

  // Redirect actions (handled in UI)
  'redirect-quote': {
    id: 'redirect-quote',
    type: 'service',
    title: 'Redirecting to Quote Generator',
    content: 'Taking you to our online quote generator...',
    serviceRecommendation: '',
  },

  'redirect-booking': {
    id: 'redirect-booking',
    type: 'service',
    title: 'Redirecting to Booking',
    content: 'Taking you to our booking system...',
    serviceRecommendation: '',
  },

  'redirect-call': {
    id: 'redirect-call',
    type: 'service',
    title: 'Calling VA Computer Guy',
    content: 'Connecting you to (757) 375-6764...',
    serviceRecommendation: '',
  },

  // Additional diagnostic steps (abbreviated for space)
  'success-power-cable': {
    id: 'success-power-cable',
    type: 'solution',
    title: 'Problem Solved!',
    content: 'Great! Your computer is working again. The issue was a loose power connection.',
    choices: [
      { id: 'prevention-tips', text: 'Get Prevention Tips', nextStep: 'power-prevention' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'virus-prevention': {
    id: 'virus-prevention',
    type: 'solution',
    title: 'Virus Prevention Tips',
    content: 'Keep your computer safe with these essential security practices:\n\n- Keep Windows and software updated\n- Use reputable antivirus software\n- Don\'t click suspicious links or email attachments\n- Only download software from official websites\n- Regular system backups',
    serviceRecommendation: 'Our Protection Plans include 24/7 monitoring and automatic updates starting at $19.99/month.',
    choices: [
      { id: 'protection-plans', text: 'Learn About Protection Plans', nextStep: 'redirect-protection' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  }
};

export function getFlowStep(stepId: string): FlowStep | null {
  return diagnosticFlows[stepId] || null;
}

export function getInitialStep(): FlowStep {
  return diagnosticFlows.start;
}