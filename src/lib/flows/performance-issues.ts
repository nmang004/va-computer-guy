import { FlowStep } from '../diagnostic-flows';

export const performanceIssuesFlows: Record<string, FlowStep> = {
  // Main Slow Performance Flow
  'slow-main': {
    id: 'slow-main',
    type: 'question',
    title: 'Slow Performance',
    content: 'When did you first notice the slowdown?',
    choices: [
      { id: 'recent-slow', text: 'Started recently (last few days)', nextStep: 'slow-recent' },
      { id: 'gradual-slow', text: 'Gradually getting slower', nextStep: 'slow-gradual' },
      { id: 'always-slow', text: 'Always been slow', nextStep: 'slow-always' },
      { id: 'specific-programs', text: 'Only with specific programs', nextStep: 'slow-programs' },
      { id: 'startup-slow', text: 'Slow to start up', nextStep: 'slow-startup' },
      { id: 'browser-slow', text: 'Internet/browser is slow', nextStep: 'slow-browser' }
    ]
  },

  // Recent Slowdown Branch
  'slow-recent': {
    id: 'slow-recent',
    type: 'diagnostic',
    title: 'Recent Slowdown',
    content: 'Have you installed any new software, updates, or noticed any pop-ups recently?',
    choices: [
      { id: 'new-software', text: 'Yes, installed new software', nextStep: 'slow-new-software' },
      { id: 'windows-update', text: 'Yes, Windows updated recently', nextStep: 'slow-windows-update' },
      { id: 'popups-ads', text: 'Yes, seeing pop-ups/ads', nextStep: 'virus-main' },
      { id: 'no-changes', text: 'No, nothing new', nextStep: 'slow-system-check' }
    ]
  },

  'slow-new-software': {
    id: 'slow-new-software',
    type: 'diagnostic',
    title: 'New Software Impact',
    content: 'What type of software did you recently install?',
    choices: [
      { id: 'antivirus-software', text: 'Antivirus or security software', nextStep: 'slow-antivirus-conflict' },
      { id: 'media-software', text: 'Video/photo editing software', nextStep: 'slow-resource-heavy' },
      { id: 'games-software', text: 'Games or entertainment software', nextStep: 'slow-resource-heavy' },
      { id: 'utility-software', text: 'Utility or system tools', nextStep: 'slow-utility-conflict' },
      { id: 'unknown-software', text: 'Not sure what it was', nextStep: 'slow-unknown-software' }
    ]
  },

  'slow-antivirus-conflict': {
    id: 'slow-antivirus-conflict',
    type: 'diagnostic',
    title: 'Antivirus Software Check',
    content: 'Multiple antivirus programs can conflict and slow your computer. Do you have more than one antivirus program installed?',
    choices: [
      { id: 'multiple-antivirus', text: 'Yes, I have multiple antivirus', nextStep: 'slow-multiple-av' },
      { id: 'single-antivirus', text: 'No, just one antivirus', nextStep: 'slow-av-settings' },
      { id: 'not-sure-av', text: 'Not sure how many I have', nextStep: 'slow-av-check' }
    ]
  },

  'slow-multiple-av': {
    id: 'slow-multiple-av',
    type: 'solution',
    title: 'Multiple Antivirus Conflict',
    content: 'Multiple antivirus programs cause severe slowdowns and conflicts. You should only have one antivirus program installed.',
    serviceRecommendation: 'Our security optimization service ($99) includes removing conflicting software, installing proper protection, and optimizing performance.',
    choices: [
      { id: 'remove-extra-av', text: 'Help Me Remove Extra Antivirus', nextStep: 'virus-removal-service' },
      { id: 'which-av-keep', text: 'Which One Should I Keep?', nextStep: 'contact-service' },
      { id: 'full-security-setup', text: 'Complete Security Setup', nextStep: 'virus-removal-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'slow-resource-heavy': {
    id: 'slow-resource-heavy',
    type: 'diagnostic',
    title: 'Resource-Heavy Software',
    content: 'Video editing, games, and similar software require significant computer resources. When do you notice the slowdown?',
    choices: [
      { id: 'slow-only-when-running', text: 'Only when running the new software', nextStep: 'slow-hardware-upgrade' },
      { id: 'slow-all-the-time', text: 'All the time, even when not using it', nextStep: 'slow-background-programs' },
      { id: 'slow-after-using', text: 'After using the software', nextStep: 'slow-memory-leak' }
    ]
  },

  'slow-hardware-upgrade': {
    id: 'slow-hardware-upgrade',
    type: 'service',
    title: 'Hardware Upgrade Needed',
    content: 'Your computer may not have enough RAM or processing power for the new software.',
    serviceRecommendation: 'Hardware assessment ($75) to determine upgrade needs. RAM upgrades start at $100, SSD upgrades at $200. In-home installation available.',
    choices: [
      { id: 'hardware-assessment', text: 'Get Hardware Assessment', nextStep: 'diagnosis-service' },
      { id: 'ram-upgrade-info', text: 'Learn About RAM Upgrades', nextStep: 'hardware-upgrade-info' },
      { id: 'full-upgrade-service', text: 'Complete Upgrade Service', nextStep: 'inhome-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'slow-background-programs': {
    id: 'slow-background-programs',
    type: 'diagnostic',
    title: 'Background Programs Check',
    content: 'Some software runs in the background even when you\'re not using it. Try restarting your computer. Does it run faster immediately after restart?',
    choices: [
      { id: 'faster-after-restart', text: 'Yes, faster after restart', nextStep: 'slow-startup-programs' },
      { id: 'still-slow-after-restart', text: 'No, still slow after restart', nextStep: 'slow-system-optimization' },
      { id: 'havent-restarted', text: 'Haven\'t tried restarting', nextStep: 'slow-restart-test' }
    ]
  },

  'slow-restart-test': {
    id: 'slow-restart-test',
    type: 'solution',
    title: 'Restart Test',
    content: 'Please restart your computer now and test the speed immediately after it starts up.',
    choices: [
      { id: 'restart-helps', text: 'Much faster after restart!', nextStep: 'slow-startup-programs' },
      { id: 'restart-no-help', text: 'Still slow after restart', nextStep: 'slow-system-optimization' },
      { id: 'restart-problems', text: 'Having trouble restarting', nextStep: 'wont-start-main' }
    ]
  },

  'slow-startup-programs': {
    id: 'slow-startup-programs',
    type: 'solution',
    title: 'Too Many Startup Programs',
    content: 'Your computer gets slow because too many programs start automatically. This uses up memory and processing power.',
    serviceRecommendation: 'Our system optimization service ($99) includes startup program cleanup, system tuning, and performance optimization.',
    choices: [
      { id: 'startup-cleanup-service', text: 'Book Startup Cleanup ($99)', nextStep: 'book-service' },
      { id: 'diy-startup-cleanup', text: 'DIY Startup Cleanup Tips', nextStep: 'startup-cleanup-guide' },
      { id: 'call-startup-help', text: 'Call for Guidance', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'startup-cleanup-guide': {
    id: 'startup-cleanup-guide',
    type: 'solution',
    title: 'DIY Startup Cleanup',
    content: 'To disable startup programs:\n1. Press Ctrl+Shift+Esc for Task Manager\n2. Click "Startup" tab\n3. Right-click programs you don\'t need\n4. Select "Disable"\n\nBe careful - only disable programs you recognize!',
    choices: [
      { id: 'startup-cleanup-worked', text: 'This helped!', nextStep: 'success-startup-cleanup' },
      { id: 'startup-cleanup-confused', text: 'Too confusing for me', nextStep: 'book-service' },
      { id: 'startup-cleanup-broke', text: 'I think I broke something', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Gradual Slowdown Branch
  'slow-gradual': {
    id: 'slow-gradual',
    type: 'diagnostic',
    title: 'Gradual Slowdown',
    content: 'How old is your computer?',
    choices: [
      { id: 'computer-new', text: 'Less than 2 years old', nextStep: 'slow-software-bloat' },
      { id: 'computer-medium', text: '2-5 years old', nextStep: 'slow-aging-hardware' },
      { id: 'computer-old', text: 'More than 5 years old', nextStep: 'slow-old-hardware' },
      { id: 'computer-unknown', text: 'Not sure how old', nextStep: 'slow-age-check' }
    ]
  },

  'slow-software-bloat': {
    id: 'slow-software-bloat',
    type: 'diagnostic',
    title: 'Software Bloat Check',
    content: 'Newer computers that slow down gradually usually have software issues. When did you last clean up your computer?',
    choices: [
      { id: 'never-cleaned', text: 'Never cleaned it up', nextStep: 'slow-cleanup-needed' },
      { id: 'long-time-cleaned', text: 'Long time ago (6+ months)', nextStep: 'slow-cleanup-needed' },
      { id: 'recently-cleaned', text: 'Recently (last month)', nextStep: 'slow-deeper-issue' }
    ]
  },

  'slow-cleanup-needed': {
    id: 'slow-cleanup-needed',
    type: 'service',
    title: 'Computer Cleanup Needed',
    content: 'Your computer needs a thorough cleanup to remove junk files, update software, and optimize performance.',
    serviceRecommendation: 'Our complete cleanup service ($99) includes junk file removal, software updates, startup optimization, and malware scan.',
    choices: [
      { id: 'book-cleanup-service', text: 'Book Cleanup Service ($99)', nextStep: 'book-service' },
      { id: 'diy-cleanup-tips', text: 'DIY Cleanup Tips', nextStep: 'cleanup-guide' },
      { id: 'protection-plan-cleanup', text: 'Prevent Future Slowdowns', nextStep: 'protection-plans' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'slow-aging-hardware': {
    id: 'slow-aging-hardware',
    type: 'diagnostic',
    title: 'Aging Hardware Assessment',
    content: 'Computers 2-5 years old may need hardware upgrades. What do you primarily use your computer for?',
    choices: [
      { id: 'basic-use', text: 'Email, web browsing, documents', nextStep: 'slow-ssd-upgrade' },
      { id: 'media-use', text: 'Photos, videos, streaming', nextStep: 'slow-ram-upgrade' },
      { id: 'work-use', text: 'Business work, multitasking', nextStep: 'slow-comprehensive-upgrade' },
      { id: 'gaming-use', text: 'Gaming or graphics work', nextStep: 'slow-gaming-upgrade' }
    ]
  },

  'slow-ssd-upgrade': {
    id: 'slow-ssd-upgrade',
    type: 'service',
    title: 'SSD Upgrade Recommended',
    content: 'For basic use, an SSD (Solid State Drive) upgrade will dramatically improve speed.',
    serviceRecommendation: 'SSD upgrade service includes drive replacement, data transfer, and installation. Starting at $250 total.',
    choices: [
      { id: 'book-ssd-upgrade', text: 'Book SSD Upgrade', nextStep: 'book-service' },
      { id: 'ssd-info', text: 'Learn More About SSDs', nextStep: 'ssd-upgrade-info' },
      { id: 'ssd-vs-new-computer', text: 'Upgrade vs New Computer?', nextStep: 'upgrade-vs-new' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'slow-old-hardware': {
    id: 'slow-old-hardware',
    type: 'service',
    title: 'Aging Computer Assessment',
    content: 'Computers over 5 years old may benefit more from replacement than expensive upgrades.',
    serviceRecommendation: 'Free consultation to assess upgrade vs replacement options. We can help you choose the best solution for your needs and budget.',
    choices: [
      { id: 'upgrade-consultation', text: 'Free Upgrade Consultation', nextStep: 'contact-service' },
      { id: 'new-computer-help', text: 'Help Choosing New Computer', nextStep: 'new-computer-consultation' },
      { id: 'basic-optimization', text: 'Basic Optimization Only', nextStep: 'slow-cleanup-needed' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Always Slow Branch
  'slow-always': {
    id: 'slow-always',
    type: 'diagnostic',
    title: 'Always Been Slow',
    content: 'If your computer has always been slow, it may be under-powered for your needs. What do you primarily use it for?',
    choices: [
      { id: 'basic-always', text: 'Basic tasks (email, web, documents)', nextStep: 'slow-underpowered-basic' },
      { id: 'media-always', text: 'Photos, videos, media', nextStep: 'slow-underpowered-media' },
      { id: 'work-always', text: 'Business or professional work', nextStep: 'slow-underpowered-work' },
      { id: 'gaming-always', text: 'Gaming or graphics', nextStep: 'slow-underpowered-gaming' }
    ]
  },

  'slow-underpowered-basic': {
    id: 'slow-underpowered-basic',
    type: 'diagnostic',
    title: 'Basic Use Slowness',
    content: 'Even basic tasks should run smoothly. How much memory (RAM) does your computer have?',
    choices: [
      { id: 'ram-unknown', text: 'Not sure how much RAM', nextStep: 'slow-ram-check' },
      { id: 'ram-low', text: '4GB or less', nextStep: 'slow-insufficient-ram' },
      { id: 'ram-ok', text: '8GB or more', nextStep: 'slow-other-bottleneck' }
    ]
  },

  'slow-insufficient-ram': {
    id: 'slow-insufficient-ram',
    type: 'service',
    title: 'Insufficient RAM',
    content: 'Modern computers need at least 8GB RAM for smooth operation. Your computer needs a memory upgrade.',
    serviceRecommendation: 'RAM upgrade to 8GB or 16GB costs $150-250 including installation. This will dramatically improve performance.',
    choices: [
      { id: 'book-ram-upgrade', text: 'Book RAM Upgrade', nextStep: 'book-service' },
      { id: 'ram-upgrade-info', text: 'RAM Upgrade Details', nextStep: 'ram-upgrade-info' },
      { id: 'budget-alternatives', text: 'Budget Alternatives?', nextStep: 'budget-performance-tips' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Specific Programs Slow Branch
  'slow-programs': {
    id: 'slow-programs',
    type: 'diagnostic',
    title: 'Specific Program Slowness',
    content: 'Which programs are running slowly?',
    choices: [
      { id: 'office-slow', text: 'Microsoft Office/Word/Excel', nextStep: 'slow-office-programs' },
      { id: 'browser-slow', text: 'Web browser (Chrome/Firefox/Edge)', nextStep: 'slow-browser' },
      { id: 'photo-slow', text: 'Photo/video editing programs', nextStep: 'slow-media-programs' },
      { id: 'game-slow', text: 'Games', nextStep: 'slow-gaming' },
      { id: 'email-slow', text: 'Email programs', nextStep: 'slow-email-programs' }
    ]
  },

  'slow-office-programs': {
    id: 'slow-office-programs',
    type: 'diagnostic',
    title: 'Office Program Slowness',
    content: 'Office programs can slow down due to add-ins or large files. Are you working with very large documents?',
    choices: [
      { id: 'large-files', text: 'Yes, large files with lots of images', nextStep: 'slow-large-files' },
      { id: 'normal-files', text: 'No, normal-sized documents', nextStep: 'slow-office-addins' },
      { id: 'multiple-files', text: 'Multiple files open at once', nextStep: 'slow-multitasking' }
    ]
  },

  'slow-office-addins': {
    id: 'slow-office-addins',
    type: 'solution',
    title: 'Office Add-ins Check',
    content: 'Office programs can be slowed by add-ins. Try starting Office in Safe Mode to see if it\'s faster.',
    serviceRecommendation: 'Our software optimization service ($99) includes Office optimization, add-in management, and performance tuning.',
    choices: [
      { id: 'office-safe-mode', text: 'How to Start Safe Mode?', nextStep: 'office-safe-mode-guide' },
      { id: 'office-optimization', text: 'Book Office Optimization', nextStep: 'book-service' },
      { id: 'call-office-help', text: 'Call for Help', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Browser Slowness Branch
  'slow-browser': {
    id: 'slow-browser',
    type: 'diagnostic',
    title: 'Browser Slowness',
    content: 'Which browser are you using, and when is it slow?',
    choices: [
      { id: 'chrome-slow', text: 'Google Chrome', nextStep: 'slow-chrome-specific' },
      { id: 'firefox-slow', text: 'Mozilla Firefox', nextStep: 'slow-firefox-specific' },
      { id: 'edge-slow', text: 'Microsoft Edge', nextStep: 'slow-edge-specific' },
      { id: 'all-browsers-slow', text: 'All browsers are slow', nextStep: 'slow-internet-vs-computer' },
      { id: 'browser-unknown', text: 'Not sure which browser', nextStep: 'slow-browser-identify' }
    ]
  },

  'slow-internet-vs-computer': {
    id: 'slow-internet-vs-computer',
    type: 'diagnostic',
    title: 'Internet vs Computer Speed',
    content: 'Let\'s determine if it\'s your internet connection or computer. Are other devices (phone, tablet) also slow on the same internet?',
    choices: [
      { id: 'other-devices-slow', text: 'Yes, other devices are slow too', nextStep: 'internet-main' },
      { id: 'only-computer-slow', text: 'No, only computer is slow', nextStep: 'slow-computer-internet' },
      { id: 'no-other-devices', text: 'Don\'t have other devices to test', nextStep: 'slow-speed-test' }
    ]
  },

  'slow-computer-internet': {
    id: 'slow-computer-internet',
    type: 'diagnostic',
    title: 'Computer Internet Issues',
    content: 'Your computer specifically has internet slowness. How long has this been happening?',
    choices: [
      { id: 'internet-recent', text: 'Started recently', nextStep: 'slow-recent-internet' },
      { id: 'internet-always', text: 'Always been slow', nextStep: 'slow-wifi-vs-ethernet' },
      { id: 'internet-intermittent', text: 'Sometimes fast, sometimes slow', nextStep: 'slow-intermittent-internet' }
    ]
  },

  'slow-chrome-specific': {
    id: 'slow-chrome-specific',
    type: 'diagnostic',
    title: 'Chrome Performance Issues',
    content: 'Chrome can become slow due to too many extensions or tabs. How many tabs do you typically have open?',
    choices: [
      { id: 'many-tabs', text: 'Many tabs (10+)', nextStep: 'slow-too-many-tabs' },
      { id: 'few-tabs', text: 'Just a few tabs', nextStep: 'slow-chrome-extensions' },
      { id: 'chrome-extensions-many', text: 'Lots of extensions installed', nextStep: 'slow-chrome-extensions' }
    ]
  },

  'slow-too-many-tabs': {
    id: 'slow-too-many-tabs',
    type: 'solution',
    title: 'Too Many Browser Tabs',
    content: 'Multiple browser tabs consume significant memory. Try closing tabs you\'re not actively using.',
    choices: [
      { id: 'close-tabs-helped', text: 'Closing tabs helped!', nextStep: 'success-browser-optimization' },
      { id: 'still-slow-fewer-tabs', text: 'Still slow with fewer tabs', nextStep: 'slow-chrome-extensions' },
      { id: 'need-all-tabs', text: 'I need all these tabs open', nextStep: 'slow-ram-upgrade' }
    ]
  },

  'slow-chrome-extensions': {
    id: 'slow-chrome-extensions',
    type: 'solution',
    title: 'Chrome Extensions Check',
    content: 'Too many browser extensions slow down Chrome. Try disabling extensions you don\'t actively use.',
    serviceRecommendation: 'Our browser optimization service ($50 add-on to any service) includes extension cleanup and browser tuning.',
    choices: [
      { id: 'disable-extensions', text: 'How to Disable Extensions?', nextStep: 'chrome-extension-guide' },
      { id: 'browser-optimization', text: 'Professional Browser Cleanup', nextStep: 'virus-removal-service' },
      { id: 'browser-help', text: 'Call for Browser Help', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Startup Slowness Branch
  'slow-startup': {
    id: 'slow-startup',
    type: 'diagnostic',
    title: 'Slow Startup',
    content: 'How long does it take for your computer to fully start up and be ready to use?',
    choices: [
      { id: 'startup-very-slow', text: 'More than 5 minutes', nextStep: 'slow-startup-critical' },
      { id: 'startup-slow', text: '2-5 minutes', nextStep: 'slow-startup-optimization' },
      { id: 'startup-ok', text: '1-2 minutes', nextStep: 'slow-startup-normal' },
      { id: 'startup-unknown', text: 'Not sure, seems forever', nextStep: 'slow-startup-critical' }
    ]
  },

  'slow-startup-critical': {
    id: 'slow-startup-critical',
    type: 'service',
    title: 'Critical Startup Slowness',
    content: 'Startup times over 5 minutes indicate serious performance issues requiring professional attention.',
    serviceRecommendation: 'Complete system optimization ($99) includes startup repair, disk cleanup, malware removal, and hardware assessment.',
    urgencyLevel: 'medium',
    choices: [
      { id: 'emergency-optimization', text: 'Emergency Optimization', nextStep: 'emergency-service' },
      { id: 'book-optimization', text: 'Book System Optimization', nextStep: 'book-service' },
      { id: 'startup-tips', text: 'Emergency Startup Tips', nextStep: 'startup-emergency-tips' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'slow-startup-optimization': {
    id: 'slow-startup-optimization',
    type: 'service',
    title: 'Startup Optimization Needed',
    content: 'Startup times of 2-5 minutes can be significantly improved with optimization.',
    serviceRecommendation: 'Startup optimization service ($99) includes program cleanup, registry optimization, and SSD upgrade assessment.',
    choices: [
      { id: 'book-startup-optimization', text: 'Book Startup Optimization', nextStep: 'book-service' },
      { id: 'diy-startup-tips', text: 'DIY Startup Tips', nextStep: 'startup-cleanup-guide' },
      { id: 'ssd-for-startup', text: 'Would SSD Help?', nextStep: 'ssd-startup-benefits' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // System Check and Optimization
  'slow-system-check': {
    id: 'slow-system-check',
    type: 'diagnostic',
    title: 'System Health Check',
    content: 'Let\'s check your system health. When did you last restart your computer?',
    choices: [
      { id: 'restart-recent', text: 'Today or yesterday', nextStep: 'slow-disk-space' },
      { id: 'restart-week', text: 'A few days to a week ago', nextStep: 'slow-restart-needed' },
      { id: 'restart-long', text: 'Weeks or months ago', nextStep: 'slow-restart-overdue' },
      { id: 'restart-never', text: 'I never restart it', nextStep: 'slow-restart-overdue' }
    ]
  },

  'slow-restart-overdue': {
    id: 'slow-restart-overdue',
    type: 'solution',
    title: 'Restart Long Overdue',
    content: 'Computers need regular restarts to clear memory and install updates. Please restart now and test performance.',
    choices: [
      { id: 'restart-now', text: 'I\'ll restart now', nextStep: 'slow-restart-test' },
      { id: 'afraid-to-restart', text: 'Afraid I\'ll lose work', nextStep: 'restart-guidance' },
      { id: 'cant-restart', text: 'Computer won\'t restart', nextStep: 'wont-start-main' }
    ]
  },

  'slow-disk-space': {
    id: 'slow-disk-space',
    type: 'diagnostic',
    title: 'Disk Space Check',
    content: 'Low disk space causes severe slowdowns. How much free space do you have on your main drive?',
    choices: [
      { id: 'disk-space-plenty', text: 'Plenty of space (20GB+)', nextStep: 'slow-memory-check' },
      { id: 'disk-space-low', text: 'Very little space (under 5GB)', nextStep: 'slow-disk-cleanup' },
      { id: 'disk-space-unknown', text: 'Not sure how to check', nextStep: 'disk-space-check-guide' },
      { id: 'disk-space-full', text: 'Getting "disk full" warnings', nextStep: 'slow-disk-emergency' }
    ]
  },

  'slow-disk-cleanup': {
    id: 'slow-disk-cleanup',
    type: 'service',
    title: 'Disk Cleanup Required',
    content: 'Low disk space severely impacts performance. Your computer needs immediate disk cleanup.',
    serviceRecommendation: 'Disk cleanup service ($75) includes removing junk files, optimizing storage, and reclaiming space. Often recovers 20-50GB.',
    urgencyLevel: 'medium',
    choices: [
      { id: 'emergency-disk-cleanup', text: 'Emergency Disk Cleanup', nextStep: 'emergency-service' },
      { id: 'book-disk-cleanup', text: 'Book Disk Cleanup', nextStep: 'book-service' },
      { id: 'diy-disk-cleanup', text: 'DIY Cleanup Tips', nextStep: 'disk-cleanup-guide' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Success States
  'success-startup-cleanup': {
    id: 'success-startup-cleanup',
    type: 'solution',
    title: 'Startup Cleanup Success!',
    content: 'Great! Disabling unnecessary startup programs should improve your computer\'s boot time and overall performance.',
    choices: [
      { id: 'more-optimization', text: 'More Optimization Tips?', nextStep: 'optimization-tips' },
      { id: 'prevent-future-slowdown', text: 'Prevent Future Slowdowns', nextStep: 'protection-plans' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'success-browser-optimization': {
    id: 'success-browser-optimization',
    type: 'solution',
    title: 'Browser Optimization Success!',
    content: 'Excellent! Managing your browser tabs and extensions should keep your browsing experience fast.',
    choices: [
      { id: 'browser-tips', text: 'More Browser Tips', nextStep: 'browser-maintenance-tips' },
      { id: 'system-optimization', text: 'Optimize Whole System?', nextStep: 'slow-cleanup-needed' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Information and Guide Pages
  'hardware-upgrade-info': {
    id: 'hardware-upgrade-info',
    type: 'solution',
    title: 'Hardware Upgrade Information',
    content: 'Common upgrades for better performance:\n\n• RAM upgrade: $150-250 (most impact)\n• SSD upgrade: $200-300 (dramatic speed boost)\n• Graphics card: $300-600 (gaming/media)\n• Complete system: $800-1500 (future-proof)\n\nWe provide free consultations to recommend the best option.',
    choices: [
      { id: 'schedule-consultation', text: 'Schedule Consultation', nextStep: 'contact-service' },
      { id: 'ram-vs-ssd', text: 'RAM vs SSD - Which First?', nextStep: 'upgrade-priority-guide' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'cleanup-guide': {
    id: 'cleanup-guide',
    type: 'solution',
    title: 'DIY Computer Cleanup Guide',
    content: 'Basic cleanup steps:\n\n1. Restart your computer\n2. Run Disk Cleanup (search for it in Start menu)\n3. Uninstall programs you don\'t use\n4. Clear browser cache and cookies\n5. Run Windows Update\n\nFor deeper cleaning, professional service is recommended.',
    choices: [
      { id: 'cleanup-worked', text: 'This helped!', nextStep: 'success-cleanup' },
      { id: 'need-professional-cleanup', text: 'Need Professional Help', nextStep: 'book-service' },
      { id: 'cleanup-questions', text: 'Questions About Cleanup', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'optimization-tips': {
    id: 'optimization-tips',
    type: 'solution',
    title: 'Computer Optimization Tips',
    content: 'Keep your computer running fast:\n\n• Restart weekly\n• Keep 15%+ disk space free\n• Limit startup programs\n• Update software regularly\n• Use antivirus protection\n• Clear browser cache monthly\n\nOur Protection Plans automate many of these tasks.',
    choices: [
      { id: 'protection-plan-optimization', text: 'Automated Optimization Plan', nextStep: 'protection-plans' },
      { id: 'manual-optimization-schedule', text: 'Set Up Manual Schedule', nextStep: 'manual-maintenance-guide' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Additional flows for comprehensive coverage
  'slow-windows-update': {
    id: 'slow-windows-update',
    type: 'diagnostic',
    title: 'Windows Update Issues',
    content: 'Windows updates can sometimes cause performance issues. Did the slowdown start immediately after a specific update?',
    choices: [
      { id: 'immediate-after-update', text: 'Yes, right after an update', nextStep: 'slow-update-rollback' },
      { id: 'gradual-after-update', text: 'Gradually after recent updates', nextStep: 'slow-update-drivers' },
      { id: 'unsure-update-timing', text: 'Not sure about timing', nextStep: 'slow-system-check' }
    ]
  },

  'slow-update-rollback': {
    id: 'slow-update-rollback',
    type: 'solution',
    title: 'Windows Update Rollback',
    content: 'If Windows updates caused the slowdown, we can roll back the problematic update.',
    serviceRecommendation: 'Windows update troubleshooting ($75) includes rollback, driver updates, and system optimization.',
    choices: [
      { id: 'try-update-rollback', text: 'Try Update Rollback', nextStep: 'update-rollback-guide' },
      { id: 'professional-update-fix', text: 'Professional Update Fix', nextStep: 'diagnosis-service' },
      { id: 'call-update-help', text: 'Call for Help', nextStep: 'contact-service' }
    ]
  },

  'slow-gaming': {
    id: 'slow-gaming',
    type: 'diagnostic',
    title: 'Gaming Performance Issues',
    content: 'Gaming requires significant computer resources. What type of games are running slowly?',
    choices: [
      { id: 'new-games', text: 'New/recent games', nextStep: 'slow-gaming-hardware' },
      { id: 'old-games', text: 'Older games that used to work', nextStep: 'slow-gaming-software' },
      { id: 'online-games', text: 'Online games', nextStep: 'slow-gaming-network' },
      { id: 'all-games', text: 'All games are slow', nextStep: 'slow-gaming-system' }
    ]
  },

  'slow-gaming-hardware': {
    id: 'slow-gaming-hardware',
    type: 'service',
    title: 'Gaming Hardware Upgrade',
    content: 'New games require modern graphics cards and sufficient RAM for good performance.',
    serviceRecommendation: 'Gaming system assessment ($75) includes graphics card evaluation and upgrade recommendations. Gaming upgrades typically $400-800.',
    choices: [
      { id: 'gaming-assessment', text: 'Gaming System Assessment', nextStep: 'diagnosis-service' },
      { id: 'graphics-card-info', text: 'Graphics Card Upgrade Info', nextStep: 'graphics-upgrade-info' },
      { id: 'gaming-vs-new-pc', text: 'Upgrade vs Gaming PC?', nextStep: 'gaming-pc-consultation' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'success-cleanup': {
    id: 'success-cleanup',
    type: 'solution',
    title: 'Cleanup Success!',
    content: 'Great job! Regular maintenance like this will keep your computer running smoothly.',
    serviceRecommendation: 'Consider our Protection Plan ($19.99/month) for automated maintenance and monitoring.',
    choices: [
      { id: 'automated-maintenance', text: 'Automated Maintenance Plan', nextStep: 'protection-plans' },
      { id: 'maintenance-schedule', text: 'Set Maintenance Reminders', nextStep: 'manual-maintenance-guide' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  }
};