import { FlowStep } from '../diagnostic-flows';

export const computerStartupFlows: Record<string, FlowStep> = {
  // Main Computer Won't Start Flow
  'wont-start-main': {
    id: 'wont-start-main',
    type: 'question',
    title: 'Computer Won\'t Start',
    content: 'When you press the power button, what happens?',
    choices: [
      { id: 'no-power', text: 'Nothing - No lights or sounds', nextStep: 'wont-start-no-power' },
      { id: 'fans-lights', text: 'Fans spin, lights come on', nextStep: 'wont-start-power-no-display' },
      { id: 'beeping', text: 'Beeping sounds', nextStep: 'wont-start-beeping' },
      { id: 'starts-shuts-down', text: 'Starts then shuts down', nextStep: 'wont-start-shutdown' },
      { id: 'blue-screen', text: 'Blue screen or error message', nextStep: 'wont-start-blue-screen' },
      { id: 'strange-noises', text: 'Strange noises (clicking, grinding)', nextStep: 'wont-start-noises' }
    ]
  },

  // No Power Branch
  'wont-start-no-power': {
    id: 'wont-start-no-power',
    type: 'diagnostic',
    title: 'No Power Detected',
    content: 'Let\'s check the power connection. Is the power cable firmly connected to both the computer and wall outlet?',
    choices: [
      { id: 'cable-connected', text: 'Yes, cable is secure', nextStep: 'wont-start-outlet-test' },
      { id: 'cable-loose', text: 'Cable was loose/disconnected', nextStep: 'wont-start-try-power' }
    ]
  },

  'wont-start-outlet-test': {
    id: 'wont-start-outlet-test',
    type: 'diagnostic',
    title: 'Power Outlet Test',
    content: 'Let\'s test the outlet. Try plugging a lamp or phone charger into the same outlet.',
    choices: [
      { id: 'outlet-works', text: 'Outlet works fine', nextStep: 'wont-start-power-strip' },
      { id: 'outlet-dead', text: 'Outlet doesn\'t work', nextStep: 'wont-start-outlet-fix' }
    ]
  },

  'wont-start-outlet-fix': {
    id: 'wont-start-outlet-fix',
    type: 'solution',
    title: 'Outlet Issue Found',
    content: 'The problem is with your electrical outlet. Try a different outlet or check your circuit breaker.',
    choices: [
      { id: 'try-different-outlet', text: 'I\'ll try another outlet', nextStep: 'wont-start-try-power' },
      { id: 'need-electrician', text: 'Need electrical help', nextStep: 'electrical-referral' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'wont-start-power-strip': {
    id: 'wont-start-power-strip',
    type: 'diagnostic',
    title: 'Power Strip Check',
    content: 'Are you using a power strip or surge protector? If so, try plugging directly into the wall outlet.',
    choices: [
      { id: 'was-power-strip', text: 'Yes, was using power strip', nextStep: 'wont-start-try-power' },
      { id: 'direct-to-wall', text: 'Already plugged into wall', nextStep: 'wont-start-power-cable' }
    ]
  },

  'wont-start-power-cable': {
    id: 'wont-start-power-cable',
    type: 'diagnostic',
    title: 'Power Cable Test',
    content: 'Do you have another power cable you can try, or can you test your cable with another device?',
    choices: [
      { id: 'different-cable-works', text: 'Different cable works!', nextStep: 'success-power-cable' },
      { id: 'different-cable-fails', text: 'Different cable doesn\'t work', nextStep: 'wont-start-power-supply' },
      { id: 'no-spare-cable', text: 'Don\'t have spare cable', nextStep: 'wont-start-power-supply' }
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
    serviceRecommendation: 'Our technicians can diagnose power issues for $75 and provide a repair quote. Power supply replacement typically costs $150-250 including parts and labor.',
    urgencyLevel: 'medium',
    choices: [
      { id: 'book-diagnosis', text: 'Book Diagnosis Service', nextStep: 'diagnosis-service' },
      { id: 'get-quote', text: 'Get Quote First', nextStep: 'quote-service' },
      { id: 'call-power-help', text: 'Call for Help', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Power but No Display Branch
  'wont-start-power-no-display': {
    id: 'wont-start-power-no-display',
    type: 'diagnostic',
    title: 'Power But No Display',
    content: 'The computer has power but no display. Is your monitor turned on and showing any message?',
    choices: [
      { id: 'monitor-off', text: 'Monitor was off', nextStep: 'wont-start-monitor-test' },
      { id: 'monitor-on-no-signal', text: 'Monitor on, says "No Signal"', nextStep: 'wont-start-cable-check' },
      { id: 'monitor-on-black', text: 'Monitor on but completely black', nextStep: 'wont-start-cable-check' },
      { id: 'monitor-working-fine', text: 'Monitor seems fine', nextStep: 'wont-start-graphics-issue' }
    ]
  },

  'wont-start-monitor-test': {
    id: 'wont-start-monitor-test',
    type: 'solution',
    title: 'Turn On Monitor',
    content: 'Please turn on your monitor and check if you now see a display.',
    choices: [
      { id: 'monitor-works-now', text: 'Yes! Display is working', nextStep: 'success-monitor' },
      { id: 'monitor-still-blank', text: 'Still no display', nextStep: 'wont-start-cable-check' }
    ]
  },

  'wont-start-cable-check': {
    id: 'wont-start-cable-check',
    type: 'diagnostic',
    title: 'Display Cable Check',
    content: 'Let\'s check the video cable. Is the cable between your computer and monitor firmly connected on both ends?',
    choices: [
      { id: 'cable-loose', text: 'Cable was loose', nextStep: 'wont-start-reconnect-cable' },
      { id: 'cable-secure', text: 'Cable is secure', nextStep: 'wont-start-different-cable' }
    ]
  },

  'wont-start-reconnect-cable': {
    id: 'wont-start-reconnect-cable',
    type: 'solution',
    title: 'Reconnect Display Cable',
    content: 'Please firmly reconnect the display cable and try again.',
    choices: [
      { id: 'cable-fix-works', text: 'Display works now!', nextStep: 'success-display-cable' },
      { id: 'cable-fix-fails', text: 'Still no display', nextStep: 'wont-start-different-cable' }
    ]
  },

  'wont-start-different-cable': {
    id: 'wont-start-different-cable',
    type: 'diagnostic',
    title: 'Try Different Cable',
    content: 'Do you have a different video cable (HDMI, VGA, DVI) to try?',
    choices: [
      { id: 'different-cable-works', text: 'Different cable works!', nextStep: 'success-display-cable' },
      { id: 'different-cable-fails', text: 'Different cable doesn\'t work', nextStep: 'wont-start-graphics-ports' },
      { id: 'no-spare-cable', text: 'Don\'t have spare cable', nextStep: 'wont-start-graphics-ports' }
    ]
  },

  'wont-start-graphics-ports': {
    id: 'wont-start-graphics-ports',
    type: 'diagnostic',
    title: 'Graphics Port Check',
    content: 'Does your computer have multiple video ports? Try connecting to a different port (top vs bottom of computer).',
    choices: [
      { id: 'different-port-works', text: 'Different port works!', nextStep: 'success-graphics-port' },
      { id: 'different-port-fails', text: 'No other ports or doesn\'t work', nextStep: 'wont-start-graphics-issue' },
      { id: 'only-one-port', text: 'Only one video port', nextStep: 'wont-start-graphics-issue' }
    ]
  },

  'wont-start-graphics-issue': {
    id: 'wont-start-graphics-issue',
    type: 'service',
    title: 'Graphics Card Issue',
    content: 'This appears to be a graphics card or motherboard display issue. Professional diagnosis is needed.',
    serviceRecommendation: 'Graphics card problems require professional diagnosis ($75). Graphics card replacement typically costs $200-500 depending on your needs.',
    urgencyLevel: 'medium',
    choices: [
      { id: 'book-graphics-diagnosis', text: 'Book Diagnosis Service', nextStep: 'diagnosis-service' },
      { id: 'emergency-graphics', text: 'Need Computer Today', nextStep: 'emergency-service' },
      { id: 'call-graphics-help', text: 'Call for Help', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Beeping Sounds Branch
  'wont-start-beeping': {
    id: 'wont-start-beeping',
    type: 'diagnostic',
    title: 'Computer Beeping',
    content: 'Beeping sounds indicate hardware issues. How many beeps do you hear?',
    choices: [
      { id: 'one-beep', text: '1 beep (normal startup)', nextStep: 'wont-start-one-beep' },
      { id: 'two-beeps', text: '2 beeps', nextStep: 'wont-start-memory-issue' },
      { id: 'three-beeps', text: '3 beeps', nextStep: 'wont-start-memory-issue' },
      { id: 'continuous-beeps', text: 'Continuous beeping', nextStep: 'wont-start-continuous-beep' },
      { id: 'many-beeps', text: 'Many beeps (4 or more)', nextStep: 'wont-start-hardware-beep' }
    ]
  },

  'wont-start-one-beep': {
    id: 'wont-start-one-beep',
    type: 'diagnostic',
    title: 'Single Beep (Normal)',
    content: 'One beep is usually normal. Do you see anything on the screen after the beep?',
    choices: [
      { id: 'screen-after-beep', text: 'Yes, screen shows something', nextStep: 'wont-start-post-screen' },
      { id: 'no-screen-after-beep', text: 'No, screen stays blank', nextStep: 'wont-start-graphics-issue' }
    ]
  },

  'wont-start-post-screen': {
    id: 'wont-start-post-screen',
    type: 'diagnostic',
    title: 'Startup Screen Check',
    content: 'What do you see on the screen? Does it get to Windows or stop somewhere?',
    choices: [
      { id: 'gets-to-windows', text: 'Gets to Windows login', nextStep: 'success-startup-normal' },
      { id: 'stops-at-logo', text: 'Stops at manufacturer logo', nextStep: 'wont-start-bios-issue' },
      { id: 'error-message', text: 'Shows error message', nextStep: 'wont-start-boot-error' },
      { id: 'blue-screen-beep', text: 'Blue screen appears', nextStep: 'wont-start-blue-screen' }
    ]
  },

  'wont-start-memory-issue': {
    id: 'wont-start-memory-issue',
    type: 'service',
    title: 'Memory (RAM) Issue',
    content: 'Multiple beeps usually indicate memory (RAM) problems. This requires professional diagnosis.',
    serviceRecommendation: 'Memory issues require diagnosis ($75) to determine if RAM needs replacement. RAM replacement typically costs $100-200 including installation.',
    urgencyLevel: 'medium',
    choices: [
      { id: 'book-memory-diagnosis', text: 'Book Diagnosis Service', nextStep: 'diagnosis-service' },
      { id: 'memory-diy-tips', text: 'Any DIY Steps?', nextStep: 'memory-diy-check' },
      { id: 'call-memory-help', text: 'Call for Help', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'memory-diy-check': {
    id: 'memory-diy-check',
    type: 'solution',
    title: 'Memory DIY Check',
    content: 'ADVANCED USERS ONLY: If comfortable opening your computer, you can try reseating the RAM sticks (remove and firmly reinstall). Otherwise, professional service is recommended.',
    choices: [
      { id: 'try-reseat-ram', text: 'I\'ll try reseating RAM', nextStep: 'ram-reseat-success' },
      { id: 'not-comfortable', text: 'Not comfortable with that', nextStep: 'diagnosis-service' },
      { id: 'call-ram-help', text: 'Call for Guidance', nextStep: 'contact-service' }
    ]
  },

  'ram-reseat-success': {
    id: 'ram-reseat-success',
    type: 'diagnostic',
    title: 'RAM Reseating Result',
    content: 'After reseating the RAM, try starting your computer. Does it start normally now?',
    choices: [
      { id: 'ram-reseat-worked', text: 'Yes! Computer starts now', nextStep: 'success-ram-reseat' },
      { id: 'ram-reseat-failed', text: 'Still having the same issue', nextStep: 'diagnosis-service' },
      { id: 'made-it-worse', text: 'Now it won\'t start at all', nextStep: 'emergency-service' }
    ]
  },

  'wont-start-continuous-beep': {
    id: 'wont-start-continuous-beep',
    type: 'service',
    title: 'Continuous Beeping',
    content: 'Continuous beeping indicates a serious hardware failure, typically memory or motherboard.',
    serviceRecommendation: 'Continuous beeping requires immediate professional diagnosis ($75). This could indicate failing memory, motherboard, or power supply issues.',
    urgencyLevel: 'high',
    choices: [
      { id: 'emergency-beeping', text: 'Emergency Service', nextStep: 'emergency-service' },
      { id: 'book-beeping-diagnosis', text: 'Book Diagnosis', nextStep: 'diagnosis-service' },
      { id: 'call-beeping-help', text: 'Call Immediately', nextStep: 'contact-service' }
    ]
  },

  'wont-start-hardware-beep': {
    id: 'wont-start-hardware-beep',
    type: 'service',
    title: 'Multiple Beep Error',
    content: 'Multiple beeps indicate specific hardware failures. The exact pattern helps identify the problem.',
    serviceRecommendation: 'Multiple beep codes require professional interpretation and diagnosis ($75). Common causes include graphics card, memory, or CPU issues.',
    urgencyLevel: 'medium',
    choices: [
      { id: 'book-beep-diagnosis', text: 'Book Diagnosis Service', nextStep: 'diagnosis-service' },
      { id: 'beep-pattern-help', text: 'Help Identify Beep Pattern', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Starts Then Shuts Down Branch
  'wont-start-shutdown': {
    id: 'wont-start-shutdown',
    type: 'diagnostic',
    title: 'Starts Then Shuts Down',
    content: 'How long does the computer run before shutting down?',
    choices: [
      { id: 'immediate-shutdown', text: 'Shuts down immediately (1-2 seconds)', nextStep: 'wont-start-immediate-shutdown' },
      { id: 'few-seconds', text: 'Runs for 10-30 seconds', nextStep: 'wont-start-overheating' },
      { id: 'minute-or-two', text: 'Runs for 1-2 minutes', nextStep: 'wont-start-thermal-shutdown' },
      { id: 'random-shutdown', text: 'Random timing', nextStep: 'wont-start-power-instability' }
    ]
  },

  'wont-start-immediate-shutdown': {
    id: 'wont-start-immediate-shutdown',
    type: 'diagnostic',
    title: 'Immediate Shutdown',
    content: 'Immediate shutdown often indicates a power supply or motherboard protection circuit. Have you recently installed new hardware?',
    choices: [
      { id: 'new-hardware-yes', text: 'Yes, installed new hardware', nextStep: 'wont-start-hardware-conflict' },
      { id: 'new-hardware-no', text: 'No new hardware', nextStep: 'wont-start-power-failure' }
    ]
  },

  'wont-start-hardware-conflict': {
    id: 'wont-start-hardware-conflict',
    type: 'solution',
    title: 'Hardware Conflict',
    content: 'New hardware may be causing a power conflict. Try removing the new hardware and starting the computer.',
    choices: [
      { id: 'remove-hardware-works', text: 'Works without new hardware', nextStep: 'success-hardware-conflict' },
      { id: 'remove-hardware-fails', text: 'Still shuts down immediately', nextStep: 'wont-start-power-failure' },
      { id: 'cant-remove-hardware', text: 'Can\'t remove hardware myself', nextStep: 'inhome-service' }
    ]
  },

  'wont-start-power-failure': {
    id: 'wont-start-power-failure',
    type: 'service',
    title: 'Power System Failure',
    content: 'Immediate shutdown indicates power supply or motherboard failure requiring professional diagnosis.',
    serviceRecommendation: 'Power system failures require immediate diagnosis ($75). Power supply replacement costs $150-250, motherboard issues may cost $300-500.',
    urgencyLevel: 'high',
    choices: [
      { id: 'emergency-power-failure', text: 'Emergency Service', nextStep: 'emergency-service' },
      { id: 'book-power-diagnosis', text: 'Book Diagnosis', nextStep: 'diagnosis-service' },
      { id: 'call-power-emergency', text: 'Call for Help', nextStep: 'contact-service' }
    ]
  },

  'wont-start-overheating': {
    id: 'wont-start-overheating',
    type: 'diagnostic',
    title: 'Possible Overheating',
    content: 'Running for 10-30 seconds then shutting down suggests overheating. Are the computer fans running loudly or not at all?',
    choices: [
      { id: 'fans-loud', text: 'Fans running very loudly', nextStep: 'wont-start-overheating-confirmed' },
      { id: 'fans-not-running', text: 'Fans not running at all', nextStep: 'wont-start-fan-failure' },
      { id: 'fans-normal', text: 'Fans seem normal', nextStep: 'wont-start-thermal-issue' }
    ]
  },

  'wont-start-overheating-confirmed': {
    id: 'wont-start-overheating-confirmed',
    type: 'service',
    title: 'Overheating Issue',
    content: 'Your computer is overheating and shutting down for protection. This requires professional cleaning and possible component replacement.',
    serviceRecommendation: 'Overheating repair includes diagnosis ($75), professional cleaning ($50), and thermal paste replacement. Total typically $125-175.',
    urgencyLevel: 'medium',
    choices: [
      { id: 'book-overheating-service', text: 'Book Cleaning Service', nextStep: 'book-service' },
      { id: 'overheating-diy', text: 'Any DIY Steps?', nextStep: 'overheating-diy-tips' },
      { id: 'call-overheating-help', text: 'Call for Help', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'wont-start-fan-failure': {
    id: 'wont-start-fan-failure',
    type: 'service',
    title: 'Fan Failure',
    content: 'Non-functioning fans cause immediate overheating and shutdown. This is a critical issue requiring immediate service.',
    serviceRecommendation: 'Fan replacement is urgent to prevent permanent damage. Emergency service includes diagnosis and fan replacement, typically $150-250 total.',
    urgencyLevel: 'high',
    choices: [
      { id: 'emergency-fan-service', text: 'Emergency Fan Service', nextStep: 'emergency-service' },
      { id: 'book-fan-replacement', text: 'Book Fan Replacement', nextStep: 'book-service' },
      { id: 'call-fan-emergency', text: 'Call Immediately', nextStep: 'contact-service' }
    ]
  },

  // Blue Screen Branch
  'wont-start-blue-screen': {
    id: 'wont-start-blue-screen',
    type: 'diagnostic',
    title: 'Blue Screen Error',
    content: 'Blue screens indicate software or hardware problems. Does the blue screen happen immediately or after Windows starts loading?',
    choices: [
      { id: 'blue-screen-immediate', text: 'Immediately on startup', nextStep: 'wont-start-hardware-bsod' },
      { id: 'blue-screen-loading', text: 'While Windows is loading', nextStep: 'wont-start-driver-bsod' },
      { id: 'blue-screen-random', text: 'At random times', nextStep: 'wont-start-system-bsod' },
      { id: 'can-read-error', text: 'I can read the error message', nextStep: 'wont-start-bsod-message' }
    ]
  },

  'wont-start-bsod-message': {
    id: 'wont-start-bsod-message',
    type: 'diagnostic',
    title: 'Blue Screen Error Message',
    content: 'Can you tell us what the error message says? Look for words like "MEMORY_MANAGEMENT" or "SYSTEM_SERVICE_EXCEPTION".',
    choices: [
      { id: 'memory-error', text: 'Something about MEMORY', nextStep: 'wont-start-memory-bsod' },
      { id: 'driver-error', text: 'Something about DRIVER or SERVICE', nextStep: 'wont-start-driver-bsod' },
      { id: 'hardware-error', text: 'Something about HARDWARE', nextStep: 'wont-start-hardware-bsod' },
      { id: 'cant-read-bsod', text: 'Too fast to read/unclear', nextStep: 'wont-start-system-bsod' }
    ]
  },

  'wont-start-memory-bsod': {
    id: 'wont-start-memory-bsod',
    type: 'service',
    title: 'Memory-Related Blue Screen',
    content: 'Memory-related blue screens indicate RAM problems or memory corruption issues.',
    serviceRecommendation: 'Memory diagnosis ($75) includes RAM testing and system analysis. RAM replacement typically costs $100-200 if needed.',
    urgencyLevel: 'medium',
    choices: [
      { id: 'book-memory-bsod', text: 'Book Memory Diagnosis', nextStep: 'diagnosis-service' },
      { id: 'memory-safe-mode', text: 'Try Safe Mode?', nextStep: 'safe-mode-attempt' },
      { id: 'call-memory-bsod', text: 'Call for Help', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'wont-start-driver-bsod': {
    id: 'wont-start-driver-bsod',
    type: 'diagnostic',
    title: 'Driver-Related Blue Screen',
    content: 'Driver errors often occur after Windows updates or new hardware installation. Have you recently updated Windows or installed new hardware?',
    choices: [
      { id: 'recent-update', text: 'Yes, recent Windows update', nextStep: 'wont-start-update-rollback' },
      { id: 'recent-hardware', text: 'Yes, new hardware', nextStep: 'wont-start-hardware-conflict' },
      { id: 'no-recent-changes', text: 'No recent changes', nextStep: 'wont-start-driver-corruption' }
    ]
  },

  'wont-start-update-rollback': {
    id: 'wont-start-update-rollback',
    type: 'solution',
    title: 'Windows Update Issue',
    content: 'Recent Windows updates can cause driver conflicts. Try starting in Safe Mode to roll back the update.',
    choices: [
      { id: 'try-safe-mode', text: 'Try Safe Mode', nextStep: 'safe-mode-attempt' },
      { id: 'need-help-safe-mode', text: 'Need help with Safe Mode', nextStep: 'contact-service' },
      { id: 'skip-safe-mode', text: 'Skip to professional help', nextStep: 'diagnosis-service' }
    ]
  },

  'safe-mode-attempt': {
    id: 'safe-mode-attempt',
    type: 'solution',
    title: 'Safe Mode Instructions',
    content: 'To access Safe Mode:\n1. Turn off computer completely\n2. Turn on and immediately press F8 repeatedly\n3. Select "Safe Mode" from menu\n\nDoes your computer start in Safe Mode?',
    choices: [
      { id: 'safe-mode-works', text: 'Yes! Safe Mode works', nextStep: 'safe-mode-success' },
      { id: 'safe-mode-fails', text: 'No, still blue screen', nextStep: 'diagnosis-service' },
      { id: 'cant-get-safe-mode', text: 'Can\'t get to Safe Mode menu', nextStep: 'contact-service' }
    ]
  },

  'safe-mode-success': {
    id: 'safe-mode-success',
    type: 'solution',
    title: 'Safe Mode Success',
    content: 'Great! Since Safe Mode works, this is likely a driver or software issue that can be repaired.',
    serviceRecommendation: 'Software repair service is $99 and includes driver updates, system file repair, and optimization. Usually completed same day.',
    choices: [
      { id: 'book-software-repair', text: 'Book Software Repair ($99)', nextStep: 'book-service' },
      { id: 'try-system-restore', text: 'Try System Restore?', nextStep: 'system-restore-attempt' },
      { id: 'call-safe-mode-help', text: 'Call for Guidance', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Strange Noises Branch
  'wont-start-noises': {
    id: 'wont-start-noises',
    type: 'diagnostic',
    title: 'Strange Computer Noises',
    content: 'Strange noises can indicate hardware failure. What type of noise do you hear?',
    urgencyLevel: 'medium',
    choices: [
      { id: 'clicking-noise', text: 'Clicking or ticking sounds', nextStep: 'wont-start-hdd-clicking' },
      { id: 'grinding-noise', text: 'Grinding or scraping sounds', nextStep: 'wont-start-fan-grinding' },
      { id: 'high-pitch-whine', text: 'High-pitched whining', nextStep: 'wont-start-coil-whine' },
      { id: 'loud-fan-noise', text: 'Extremely loud fan noise', nextStep: 'wont-start-overheating-confirmed' },
      { id: 'intermittent-noise', text: 'Intermittent beeping/chirping', nextStep: 'wont-start-hardware-beep' }
    ]
  },

  'wont-start-hdd-clicking': {
    id: 'wont-start-hdd-clicking',
    type: 'service',
    title: 'Hard Drive Failure',
    content: 'Clicking sounds from the hard drive indicate imminent drive failure. This is a data emergency.',
    serviceRecommendation: 'URGENT: Stop using computer immediately. Emergency data backup service $150-300. Hard drive replacement with data recovery $250-500.',
    urgencyLevel: 'emergency',
    choices: [
      { id: 'emergency-data-service', text: 'Emergency Data Service', nextStep: 'emergency-service' },
      { id: 'data-recovery-service', text: 'Data Recovery Service', nextStep: 'data-recovery-service' },
      { id: 'call-data-emergency', text: 'Call Data Emergency Line', nextStep: 'contact-service' }
    ]
  },

  'wont-start-fan-grinding': {
    id: 'wont-start-fan-grinding',
    type: 'service',
    title: 'Fan Bearing Failure',
    content: 'Grinding sounds indicate fan bearing failure. Continued use may cause overheating damage.',
    serviceRecommendation: 'Fan replacement service $150-200 including diagnosis. Critical to prevent overheating damage to other components.',
    urgencyLevel: 'high',
    choices: [
      { id: 'emergency-fan-grinding', text: 'Emergency Fan Service', nextStep: 'emergency-service' },
      { id: 'book-fan-grinding', text: 'Book Fan Replacement', nextStep: 'book-service' },
      { id: 'call-fan-grinding', text: 'Call for Help', nextStep: 'contact-service' }
    ]
  },

  'wont-start-coil-whine': {
    id: 'wont-start-coil-whine',
    type: 'service',
    title: 'Power Supply Coil Whine',
    content: 'High-pitched whining usually indicates power supply stress or failure.',
    serviceRecommendation: 'Power supply diagnosis ($75) to determine if replacement is needed. Power supply replacement typically $150-250.',
    urgencyLevel: 'medium',
    choices: [
      { id: 'book-psu-diagnosis', text: 'Book Power Supply Check', nextStep: 'diagnosis-service' },
      { id: 'psu-emergency', text: 'Noise Getting Worse', nextStep: 'emergency-service' },
      { id: 'call-psu-help', text: 'Call for Help', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Success States
  'success-power-cable': {
    id: 'success-power-cable',
    type: 'solution',
    title: 'Problem Solved!',
    content: 'Great! Your computer is working again. The issue was a loose power connection.',
    choices: [
      { id: 'prevention-tips', text: 'Get Prevention Tips', nextStep: 'power-prevention' },
      { id: 'protection-plan', text: 'Prevent Future Issues', nextStep: 'protection-plans' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'success-monitor': {
    id: 'success-monitor',
    type: 'solution',
    title: 'Display Fixed!',
    content: 'Excellent! Your display is working. The monitor was simply turned off.',
    choices: [
      { id: 'monitor-tips', text: 'Monitor Care Tips', nextStep: 'monitor-prevention' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'success-display-cable': {
    id: 'success-display-cable',
    type: 'solution',
    title: 'Display Cable Fixed!',
    content: 'Perfect! Your display is working. The issue was with the video cable connection.',
    choices: [
      { id: 'cable-care-tips', text: 'Cable Care Tips', nextStep: 'cable-prevention' },
      { id: 'backup-cable', text: 'Should I Get Backup Cable?', nextStep: 'cable-backup-advice' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'success-graphics-port': {
    id: 'success-graphics-port',
    type: 'solution',
    title: 'Graphics Port Fixed!',
    content: 'Great! Using a different video port solved the problem. The original port may be failing.',
    choices: [
      { id: 'port-repair', text: 'Should I Fix the Bad Port?', nextStep: 'graphics-port-repair' },
      { id: 'keep-using-good-port', text: 'Keep Using This Port', nextStep: 'graphics-port-advice' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'success-hardware-conflict': {
    id: 'success-hardware-conflict',
    type: 'solution',
    title: 'Hardware Conflict Resolved!',
    content: 'The new hardware was causing a power conflict. Your computer works without it.',
    serviceRecommendation: 'Our technicians can help install the new hardware properly and resolve compatibility issues. In-home service $85/hour.',
    choices: [
      { id: 'install-hardware-service', text: 'Get Help Installing Hardware', nextStep: 'inhome-service' },
      { id: 'return-hardware', text: 'I\'ll Return the Hardware', nextStep: 'hardware-return-advice' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'success-ram-reseat': {
    id: 'success-ram-reseat',
    type: 'solution',
    title: 'RAM Reseating Success!',
    content: 'Excellent! Reseating the RAM fixed the issue. The memory modules just needed to be properly connected.',
    choices: [
      { id: 'ram-maintenance', text: 'RAM Maintenance Tips', nextStep: 'ram-maintenance-tips' },
      { id: 'system-checkup', text: 'Should I Get System Checkup?', nextStep: 'protection-plans' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'success-startup-normal': {
    id: 'success-startup-normal',
    type: 'solution',
    title: 'Startup Working Normally!',
    content: 'Great! Your computer is starting up normally. The single beep you heard is normal startup confirmation.',
    choices: [
      { id: 'system-optimization', text: 'Optimize Startup Speed?', nextStep: 'startup-optimization' },
      { id: 'preventive-maintenance', text: 'Preventive Maintenance', nextStep: 'protection-plans' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Additional Support Flows
  'electrical-referral': {
    id: 'electrical-referral',
    type: 'solution',
    title: 'Electrical Issue',
    content: 'This appears to be an electrical problem with your outlet or circuit. You\'ll need an electrician for this issue.',
    choices: [
      { id: 'electrician-referral', text: 'Get Electrician Referral', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'system-restore-attempt': {
    id: 'system-restore-attempt',
    type: 'solution',
    title: 'System Restore Instructions',
    content: 'In Safe Mode, try System Restore:\n1. Type "System Restore" in Start menu\n2. Choose restore point before problem started\n3. Follow prompts to restore\n\nDid System Restore work?',
    choices: [
      { id: 'restore-worked', text: 'Yes! Computer works normally', nextStep: 'success-system-restore' },
      { id: 'restore-failed', text: 'No, still having issues', nextStep: 'diagnosis-service' },
      { id: 'need-restore-help', text: 'Need help with restore', nextStep: 'contact-service' }
    ]
  },

  'success-system-restore': {
    id: 'success-system-restore',
    type: 'solution',
    title: 'System Restore Success!',
    content: 'Excellent! System Restore fixed the problem by reverting to a previous working state.',
    serviceRecommendation: 'Consider our Protection Plan ($19.99/month) to prevent future issues and get automatic backup protection.',
    choices: [
      { id: 'protection-after-restore', text: 'Learn About Protection', nextStep: 'protection-plans' },
      { id: 'backup-advice', text: 'Backup Advice', nextStep: 'backup-guidance' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  }
};