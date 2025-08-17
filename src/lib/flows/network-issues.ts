import { FlowStep } from '../diagnostic-flows';

export const networkIssuesFlows: Record<string, FlowStep> = {
  // Main Internet/Network Flow
  'internet-main': {
    id: 'internet-main',
    type: 'question',
    title: 'Internet/Network Problems',
    content: 'What type of internet or network issue are you experiencing?',
    choices: [
      { id: 'no-internet', text: 'No internet connection at all', nextStep: 'internet-no-connection' },
      { id: 'slow-internet', text: 'Internet is very slow', nextStep: 'internet-slow' },
      { id: 'wifi-problems', text: 'WiFi connection problems', nextStep: 'internet-wifi-issues' },
      { id: 'ethernet-problems', text: 'Ethernet/wired connection issues', nextStep: 'internet-ethernet-issues' },
      { id: 'intermittent-connection', text: 'Connection drops frequently', nextStep: 'internet-intermittent' },
      { id: 'cant-reach-sites', text: 'Can\'t reach specific websites', nextStep: 'internet-specific-sites' },
      { id: 'email-not-working', text: 'Email not working', nextStep: 'internet-email-issues' }
    ]
  },

  // No Internet Connection Branch
  'internet-no-connection': {
    id: 'internet-no-connection',
    type: 'diagnostic',
    title: 'No Internet Connection',
    content: 'Let\'s check your connection setup. Are you using WiFi or an ethernet cable?',
    choices: [
      { id: 'using-wifi', text: 'Using WiFi', nextStep: 'internet-wifi-no-connection' },
      { id: 'using-ethernet', text: 'Using ethernet cable', nextStep: 'internet-ethernet-no-connection' },
      { id: 'not-sure-connection', text: 'Not sure which I\'m using', nextStep: 'internet-connection-check' },
      { id: 'both-not-working', text: 'Tried both, neither works', nextStep: 'internet-router-issue' }
    ]
  },

  'internet-wifi-no-connection': {
    id: 'internet-wifi-no-connection',
    type: 'diagnostic',
    title: 'WiFi No Connection',
    content: 'Can you see your WiFi network name in the available networks list?',
    choices: [
      { id: 'wifi-visible', text: 'Yes, I can see my network', nextStep: 'internet-wifi-connect-issue' },
      { id: 'wifi-not-visible', text: 'No, my network isn\'t listed', nextStep: 'internet-wifi-broadcast-issue' },
      { id: 'no-networks-visible', text: 'No networks visible at all', nextStep: 'internet-wifi-adapter-issue' },
      { id: 'wrong-password', text: 'Says wrong password', nextStep: 'internet-wifi-password' }
    ]
  },

  'internet-wifi-connect-issue': {
    id: 'internet-wifi-connect-issue',
    type: 'diagnostic',
    title: 'WiFi Connection Problem',
    content: 'What happens when you try to connect to your WiFi network?',
    choices: [
      { id: 'wifi-connects-no-internet', text: 'Connects but no internet', nextStep: 'internet-router-problem' },
      { id: 'wifi-wont-connect', text: 'Won\'t connect at all', nextStep: 'internet-wifi-authentication' },
      { id: 'wifi-limited-connectivity', text: 'Limited or no connectivity', nextStep: 'internet-wifi-limited' },
      { id: 'wifi-takes-forever', text: 'Takes forever to connect', nextStep: 'internet-wifi-slow-connect' }
    ]
  },

  'internet-wifi-password': {
    id: 'internet-wifi-password',
    type: 'diagnostic',
    title: 'WiFi Password Issue',
    content: 'Have you recently changed your WiFi password, or are you sure you have the correct password?',
    choices: [
      { id: 'password-recently-changed', text: 'Password was recently changed', nextStep: 'internet-wifi-password-update' },
      { id: 'password-unsure', text: 'Not sure of correct password', nextStep: 'internet-wifi-password-help' },
      { id: 'password-definitely-correct', text: 'Password is definitely correct', nextStep: 'internet-wifi-authentication' },
      { id: 'password-never-set', text: 'Never set a password', nextStep: 'internet-wifi-security-issue' }
    ]
  },

  'internet-wifi-password-help': {
    id: 'internet-wifi-password-help',
    type: 'solution',
    title: 'Find WiFi Password',
    content: 'To find your WiFi password:\n1. Check sticker on router/modem\n2. Look for "Network Key" or "Password"\n3. Try common defaults like "admin" or "password"\n4. Check with internet provider\n\nIf still having trouble, we can help reset and configure.',
    choices: [
      { id: 'found-wifi-password', text: 'Found password, will try again', nextStep: 'internet-wifi-connect-test' },
      { id: 'cant-find-password', text: 'Can\'t find password anywhere', nextStep: 'internet-wifi-reset-help' },
      { id: 'router-setup-service', text: 'Need router setup help', nextStep: 'internet-router-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'internet-ethernet-no-connection': {
    id: 'internet-ethernet-no-connection',
    type: 'diagnostic',
    title: 'Ethernet No Connection',
    content: 'Is the ethernet cable firmly connected to both your computer and router/modem?',
    choices: [
      { id: 'ethernet-connected', text: 'Yes, cable is secure', nextStep: 'internet-ethernet-cable-test' },
      { id: 'ethernet-loose', text: 'Cable was loose', nextStep: 'internet-ethernet-reconnect' },
      { id: 'ethernet-unsure', text: 'Not sure where to connect', nextStep: 'internet-ethernet-setup-help' }
    ]
  },

  'internet-ethernet-reconnect': {
    id: 'internet-ethernet-reconnect',
    type: 'solution',
    title: 'Reconnect Ethernet Cable',
    content: 'Please firmly reconnect the ethernet cable to both your computer and router, then test your connection.',
    choices: [
      { id: 'ethernet-works-now', text: 'Internet works now!', nextStep: 'success-ethernet-connection' },
      { id: 'ethernet-still-not-working', text: 'Still no connection', nextStep: 'internet-ethernet-cable-test' }
    ]
  },

  'internet-ethernet-cable-test': {
    id: 'internet-ethernet-cable-test',
    type: 'diagnostic',
    title: 'Ethernet Cable Test',
    content: 'Do you have another ethernet cable to try, or can you test this cable with another device?',
    choices: [
      { id: 'different-ethernet-works', text: 'Different cable works', nextStep: 'success-ethernet-cable' },
      { id: 'different-ethernet-fails', text: 'Different cable doesn\'t work', nextStep: 'internet-ethernet-port-issue' },
      { id: 'no-spare-ethernet', text: 'Don\'t have spare cable', nextStep: 'internet-ethernet-port-issue' }
    ]
  },

  // Slow Internet Branch
  'internet-slow': {
    id: 'internet-slow',
    type: 'diagnostic',
    title: 'Slow Internet Speed',
    content: 'Let\'s determine if it\'s your internet service or computer. Are other devices (phone, tablet) also slow on the same internet?',
    choices: [
      { id: 'all-devices-slow', text: 'All devices are slow', nextStep: 'internet-isp-issue' },
      { id: 'only-computer-slow', text: 'Only this computer is slow', nextStep: 'internet-computer-specific' },
      { id: 'no-other-devices', text: 'Don\'t have other devices', nextStep: 'internet-speed-test' }
    ]
  },

  'internet-isp-issue': {
    id: 'internet-isp-issue',
    type: 'diagnostic',
    title: 'Internet Service Provider Issue',
    content: 'If all devices are slow, the issue is likely with your internet service. When did you first notice the slowdown?',
    choices: [
      { id: 'isp-slow-recent', text: 'Started recently', nextStep: 'internet-isp-outage' },
      { id: 'isp-slow-always', text: 'Always been slow', nextStep: 'internet-plan-inadequate' },
      { id: 'isp-slow-certain-times', text: 'Slow at certain times of day', nextStep: 'internet-congestion' },
      { id: 'isp-slow-weather', text: 'Slow during bad weather', nextStep: 'internet-weather-issue' }
    ]
  },

  'internet-isp-outage': {
    id: 'internet-isp-outage',
    type: 'solution',
    title: 'Check for Service Outage',
    content: 'Recent slowdowns often indicate ISP issues. Contact your internet provider to check for outages or service problems in your area.',
    choices: [
      { id: 'contact-isp', text: 'I\'ll contact my ISP', nextStep: 'internet-isp-contact-info' },
      { id: 'router-reset-first', text: 'Try resetting router first?', nextStep: 'internet-router-reset' },
      { id: 'network-troubleshooting', text: 'Need network troubleshooting', nextStep: 'internet-troubleshooting-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'internet-computer-specific': {
    id: 'internet-computer-specific',
    type: 'diagnostic',
    title: 'Computer-Specific Slowness',
    content: 'Since only your computer is slow, this is likely a computer issue. Are you using WiFi or ethernet?',
    choices: [
      { id: 'computer-wifi-slow', text: 'Using WiFi', nextStep: 'internet-wifi-performance' },
      { id: 'computer-ethernet-slow', text: 'Using ethernet', nextStep: 'internet-ethernet-performance' },
      { id: 'computer-both-slow', text: 'Both WiFi and ethernet are slow', nextStep: 'internet-network-adapter-issue' }
    ]
  },

  'internet-wifi-performance': {
    id: 'internet-wifi-performance',
    type: 'diagnostic',
    title: 'WiFi Performance Issues',
    content: 'WiFi can be affected by distance, interference, and computer issues. How far are you from your router?',
    choices: [
      { id: 'wifi-close-to-router', text: 'Close to router (same room)', nextStep: 'internet-wifi-adapter-performance' },
      { id: 'wifi-far-from-router', text: 'Far from router (different floor)', nextStep: 'internet-wifi-range-issue' },
      { id: 'wifi-moderate-distance', text: 'Moderate distance (few rooms away)', nextStep: 'internet-wifi-interference' },
      { id: 'wifi-signal-weak', text: 'Signal shows as weak', nextStep: 'internet-wifi-signal-boost' }
    ]
  },

  'internet-wifi-range-issue': {
    id: 'internet-wifi-range-issue',
    type: 'service',
    title: 'WiFi Range Problem',
    content: 'Distance from router significantly affects WiFi speed. You may need a WiFi extender or router upgrade.',
    serviceRecommendation: 'WiFi optimization service ($125) includes range testing, extender installation, and network configuration for optimal coverage.',
    choices: [
      { id: 'wifi-extender-service', text: 'WiFi Extender Installation', nextStep: 'inhome-service' },
      { id: 'router-upgrade-consultation', text: 'Router Upgrade Consultation', nextStep: 'internet-router-service' },
      { id: 'test-ethernet-instead', text: 'Try Ethernet Connection?', nextStep: 'internet-ethernet-test' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // WiFi Specific Issues
  'internet-wifi-issues': {
    id: 'internet-wifi-issues',
    type: 'diagnostic',
    title: 'WiFi Connection Problems',
    content: 'What specific WiFi problem are you experiencing?',
    choices: [
      { id: 'wifi-keeps-disconnecting', text: 'Keeps disconnecting', nextStep: 'internet-wifi-drops' },
      { id: 'wifi-weak-signal', text: 'Weak signal strength', nextStep: 'internet-wifi-signal-boost' },
      { id: 'wifi-cant-connect', text: 'Can\'t connect to network', nextStep: 'internet-wifi-connect-issue' },
      { id: 'wifi-slow-speeds', text: 'WiFi is very slow', nextStep: 'internet-wifi-performance' },
      { id: 'wifi-no-networks', text: 'No networks showing up', nextStep: 'internet-wifi-adapter-issue' }
    ]
  },

  'internet-wifi-drops': {
    id: 'internet-wifi-drops',
    type: 'diagnostic',
    title: 'WiFi Keeps Disconnecting',
    content: 'How often does your WiFi disconnect?',
    choices: [
      { id: 'wifi-drops-frequently', text: 'Every few minutes', nextStep: 'internet-wifi-driver-issue' },
      { id: 'wifi-drops-hourly', text: 'Every hour or so', nextStep: 'internet-wifi-power-management' },
      { id: 'wifi-drops-daily', text: 'Once or twice a day', nextStep: 'internet-wifi-interference' },
      { id: 'wifi-drops-random', text: 'Randomly, no pattern', nextStep: 'internet-wifi-hardware-issue' }
    ]
  },

  'internet-wifi-driver-issue': {
    id: 'internet-wifi-driver-issue',
    type: 'service',
    title: 'WiFi Driver Problem',
    content: 'Frequent WiFi disconnections often indicate driver or hardware issues requiring professional diagnosis.',
    serviceRecommendation: 'WiFi troubleshooting service ($75) includes driver updates, hardware testing, and connection optimization.',
    choices: [
      { id: 'wifi-driver-service', text: 'WiFi Driver Service', nextStep: 'diagnosis-service' },
      { id: 'try-driver-update', text: 'Try Updating Drivers?', nextStep: 'internet-driver-update-guide' },
      { id: 'wifi-hardware-check', text: 'Check WiFi Hardware', nextStep: 'internet-wifi-hardware-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'internet-wifi-power-management': {
    id: 'internet-wifi-power-management',
    type: 'solution',
    title: 'WiFi Power Management',
    content: 'Windows may be turning off your WiFi adapter to save power. This can be disabled in device settings.',
    choices: [
      { id: 'disable-power-management', text: 'How to Disable Power Management?', nextStep: 'wifi-power-management-guide' },
      { id: 'professional-wifi-setup', text: 'Professional WiFi Optimization', nextStep: 'diagnosis-service' },
      { id: 'call-wifi-help', text: 'Call for Help', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Ethernet Issues
  'internet-ethernet-issues': {
    id: 'internet-ethernet-issues',
    type: 'diagnostic',
    title: 'Ethernet Connection Issues',
    content: 'What problem are you having with your ethernet connection?',
    choices: [
      { id: 'ethernet-no-connection', text: 'No connection at all', nextStep: 'internet-ethernet-no-connection' },
      { id: 'ethernet-slow-speeds', text: 'Very slow speeds', nextStep: 'internet-ethernet-performance' },
      { id: 'ethernet-intermittent', text: 'Connection drops occasionally', nextStep: 'internet-ethernet-drops' },
      { id: 'ethernet-limited', text: 'Limited connectivity', nextStep: 'internet-ethernet-limited' }
    ]
  },

  'internet-ethernet-performance': {
    id: 'internet-ethernet-performance',
    type: 'diagnostic',
    title: 'Ethernet Performance Issues',
    content: 'Ethernet should be faster than WiFi. What speed are you getting versus what you\'re paying for?',
    choices: [
      { id: 'ethernet-much-slower', text: 'Much slower than plan', nextStep: 'internet-ethernet-bottleneck' },
      { id: 'ethernet-slightly-slow', text: 'Slightly slower than expected', nextStep: 'internet-speed-optimization' },
      { id: 'ethernet-unsure-speed', text: 'Not sure what speed I should get', nextStep: 'internet-speed-test' }
    ]
  },

  'internet-ethernet-bottleneck': {
    id: 'internet-ethernet-bottleneck',
    type: 'diagnostic',
    title: 'Ethernet Speed Bottleneck',
    content: 'What type of ethernet cable are you using? (Check the cable for markings like "Cat5", "Cat6", etc.)',
    choices: [
      { id: 'ethernet-cat5-older', text: 'Cat5 or older cable', nextStep: 'internet-cable-upgrade' },
      { id: 'ethernet-cat6-newer', text: 'Cat6 or newer cable', nextStep: 'internet-ethernet-port-speed' },
      { id: 'ethernet-cable-unknown', text: 'Not sure about cable type', nextStep: 'internet-cable-identification' },
      { id: 'ethernet-very-old-cable', text: 'Very old cable (10+ years)', nextStep: 'internet-cable-upgrade' }
    ]
  },

  'internet-cable-upgrade': {
    id: 'internet-cable-upgrade',
    type: 'service',
    title: 'Ethernet Cable Upgrade',
    content: 'Older ethernet cables limit speed. Cat5e or Cat6 cables are needed for modern internet speeds.',
    serviceRecommendation: 'Network cable upgrade service ($75) includes cable assessment, replacement with Cat6 cables, and speed optimization.',
    choices: [
      { id: 'cable-upgrade-service', text: 'Cable Upgrade Service', nextStep: 'inhome-service' },
      { id: 'buy-cable-myself', text: 'Buy Cable Myself?', nextStep: 'internet-cable-buying-guide' },
      { id: 'network-optimization', text: 'Complete Network Optimization', nextStep: 'internet-troubleshooting-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Intermittent Connection Issues
  'internet-intermittent': {
    id: 'internet-intermittent',
    type: 'diagnostic',
    title: 'Intermittent Connection',
    content: 'How often does your internet connection drop?',
    choices: [
      { id: 'drops-very-frequently', text: 'Multiple times per hour', nextStep: 'internet-frequent-drops' },
      { id: 'drops-few-times-day', text: 'Few times per day', nextStep: 'internet-occasional-drops' },
      { id: 'drops-certain-times', text: 'At certain times of day', nextStep: 'internet-scheduled-drops' },
      { id: 'drops-during-activity', text: 'During specific activities', nextStep: 'internet-activity-drops' }
    ]
  },

  'internet-frequent-drops': {
    id: 'internet-frequent-drops',
    type: 'service',
    title: 'Frequent Connection Drops',
    content: 'Multiple disconnections per hour indicate serious network hardware or ISP issues requiring immediate attention.',
    serviceRecommendation: 'Emergency network troubleshooting ($125) includes modem/router diagnosis, ISP coordination, and hardware replacement if needed.',
    urgencyLevel: 'medium',
    choices: [
      { id: 'emergency-network-service', text: 'Emergency Network Service', nextStep: 'emergency-service' },
      { id: 'router-modem-check', text: 'Check Router/Modem First', nextStep: 'internet-router-reset' },
      { id: 'call-network-emergency', text: 'Call for Network Help', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'internet-occasional-drops': {
    id: 'internet-occasional-drops',
    type: 'diagnostic',
    title: 'Occasional Connection Drops',
    content: 'Occasional drops can be caused by various factors. Does this happen with specific activities or randomly?',
    choices: [
      { id: 'drops-during-streaming', text: 'During video streaming', nextStep: 'internet-bandwidth-issue' },
      { id: 'drops-during-gaming', text: 'During online gaming', nextStep: 'internet-gaming-optimization' },
      { id: 'drops-during-downloads', text: 'During large downloads', nextStep: 'internet-bandwidth-management' },
      { id: 'drops-randomly', text: 'Completely random', nextStep: 'internet-hardware-instability' }
    ]
  },

  // Specific Sites Issues
  'internet-specific-sites': {
    id: 'internet-specific-sites',
    type: 'diagnostic',
    title: 'Can\'t Reach Specific Websites',
    content: 'Which websites or services are you having trouble reaching?',
    choices: [
      { id: 'cant-reach-google', text: 'Google, Facebook, major sites', nextStep: 'internet-dns-issue' },
      { id: 'cant-reach-email', text: 'Email services', nextStep: 'internet-email-ports' },
      { id: 'cant-reach-streaming', text: 'Netflix, YouTube, streaming', nextStep: 'internet-streaming-blocked' },
      { id: 'cant-reach-work-sites', text: 'Work or specific business sites', nextStep: 'internet-firewall-blocking' },
      { id: 'cant-reach-some-sites', text: 'Some sites work, others don\'t', nextStep: 'internet-partial-connectivity' }
    ]
  },

  'internet-dns-issue': {
    id: 'internet-dns-issue',
    type: 'service',
    title: 'DNS Resolution Problem',
    content: 'Not being able to reach major websites suggests DNS (Domain Name System) issues.',
    serviceRecommendation: 'DNS troubleshooting service ($75) includes DNS configuration, server testing, and connectivity optimization.',
    choices: [
      { id: 'dns-service', text: 'DNS Troubleshooting Service', nextStep: 'diagnosis-service' },
      { id: 'try-dns-change', text: 'Try Changing DNS Servers?', nextStep: 'internet-dns-change-guide' },
      { id: 'call-dns-help', text: 'Call for DNS Help', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Email Issues
  'internet-email-issues': {
    id: 'internet-email-issues',
    type: 'diagnostic',
    title: 'Email Connection Problems',
    content: 'What type of email problem are you experiencing?',
    choices: [
      { id: 'email-cant-send', text: 'Can receive but can\'t send', nextStep: 'internet-email-send-issue' },
      { id: 'email-cant-receive', text: 'Can send but can\'t receive', nextStep: 'internet-email-receive-issue' },
      { id: 'email-cant-connect', text: 'Can\'t connect to email at all', nextStep: 'internet-email-connection' },
      { id: 'email-very-slow', text: 'Email is extremely slow', nextStep: 'internet-email-performance' }
    ]
  },

  'internet-email-send-issue': {
    id: 'internet-email-send-issue',
    type: 'diagnostic',
    title: 'Email Sending Problems',
    content: 'Email sending issues are often caused by SMTP port blocking. Are you using a work email or personal email?',
    choices: [
      { id: 'work-email-send', text: 'Work email (Exchange, corporate)', nextStep: 'internet-work-email-issue' },
      { id: 'personal-email-send', text: 'Personal email (Gmail, Yahoo, etc.)', nextStep: 'internet-personal-email-send' },
      { id: 'multiple-email-send', text: 'Multiple email accounts affected', nextStep: 'internet-smtp-blocking' }
    ]
  },

  'internet-smtp-blocking': {
    id: 'internet-smtp-blocking',
    type: 'service',
    title: 'SMTP Port Blocking',
    content: 'Many ISPs block outgoing email ports to prevent spam. This requires configuration changes or ISP coordination.',
    serviceRecommendation: 'Email configuration service ($75) includes SMTP troubleshooting, port configuration, and ISP coordination if needed.',
    choices: [
      { id: 'email-config-service', text: 'Email Configuration Service', nextStep: 'diagnosis-service' },
      { id: 'contact-isp-email', text: 'Should I Contact ISP?', nextStep: 'internet-isp-email-help' },
      { id: 'call-email-help', text: 'Call for Email Help', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Router and Infrastructure
  'internet-router-reset': {
    id: 'internet-router-reset',
    type: 'solution',
    title: 'Router Reset Instructions',
    content: 'To reset your router:\n1. Unplug power from router for 30 seconds\n2. Plug power back in\n3. Wait 2-3 minutes for full startup\n4. Test internet connection\n\nThis often resolves connection issues.',
    choices: [
      { id: 'router-reset-worked', text: 'Router reset fixed it!', nextStep: 'success-router-reset' },
      { id: 'router-reset-no-help', text: 'Still having issues', nextStep: 'internet-router-problem' },
      { id: 'cant-find-router', text: 'Can\'t find router to reset', nextStep: 'internet-router-location' },
      { id: 'router-wont-reset', text: 'Router won\'t restart', nextStep: 'internet-router-hardware-issue' }
    ]
  },

  'internet-router-problem': {
    id: 'internet-router-problem',
    type: 'diagnostic',
    title: 'Router Hardware Problem',
    content: 'If resetting didn\'t help, there may be a hardware issue. How old is your router?',
    choices: [
      { id: 'router-very-old', text: 'More than 5 years old', nextStep: 'internet-router-replacement' },
      { id: 'router-few-years', text: '2-5 years old', nextStep: 'internet-router-diagnosis' },
      { id: 'router-new', text: 'Less than 2 years old', nextStep: 'internet-router-warranty' },
      { id: 'router-age-unknown', text: 'Not sure how old', nextStep: 'internet-router-identification' }
    ]
  },

  'internet-router-replacement': {
    id: 'internet-router-replacement',
    type: 'service',
    title: 'Router Replacement Needed',
    content: 'Routers over 5 years old often can\'t handle modern internet speeds and may have hardware failures.',
    serviceRecommendation: 'Router replacement service ($200-400) includes new router selection, installation, configuration, and WiFi optimization.',
    choices: [
      { id: 'router-replacement-service', text: 'Router Replacement Service', nextStep: 'internet-router-service' },
      { id: 'router-recommendations', text: 'Router Recommendations', nextStep: 'internet-router-buying-guide' },
      { id: 'router-vs-isp-modem', text: 'Router vs ISP Modem?', nextStep: 'internet-equipment-explanation' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Service Flows
  'internet-troubleshooting-service': {
    id: 'internet-troubleshooting-service',
    type: 'service',
    title: 'Network Troubleshooting Service',
    content: 'Complete network diagnosis and optimization to resolve all internet and connectivity issues.',
    serviceRecommendation: 'Network troubleshooting service ($125) includes router/modem testing, speed optimization, WiFi setup, and ISP coordination.',
    choices: [
      { id: 'book-network-service', text: 'Book Network Service', nextStep: 'inhome-service' },
      { id: 'network-emergency', text: 'Emergency Network Service', nextStep: 'emergency-service' },
      { id: 'call-network-questions', text: 'Call with Questions', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'internet-router-service': {
    id: 'internet-router-service',
    type: 'service',
    title: 'Router Setup and Optimization',
    content: 'Professional router installation, configuration, and WiFi optimization for maximum performance.',
    serviceRecommendation: 'Router service ($150-300) includes router selection, installation, security configuration, and performance optimization.',
    choices: [
      { id: 'book-router-service', text: 'Book Router Service', nextStep: 'inhome-service' },
      { id: 'router-consultation', text: 'Router Consultation', nextStep: 'contact-service' },
      { id: 'wifi-optimization-only', text: 'WiFi Optimization Only', nextStep: 'internet-troubleshooting-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Success States
  'success-ethernet-connection': {
    id: 'success-ethernet-connection',
    type: 'solution',
    title: 'Ethernet Connection Fixed!',
    content: 'Great! Your ethernet connection is working. Loose cables are a common cause of connection issues.',
    choices: [
      { id: 'ethernet-maintenance-tips', text: 'Ethernet Maintenance Tips', nextStep: 'ethernet-care-guide' },
      { id: 'wifi-as-backup', text: 'Set Up WiFi as Backup?', nextStep: 'internet-wifi-setup' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'success-ethernet-cable': {
    id: 'success-ethernet-cable',
    type: 'solution',
    title: 'Ethernet Cable Replaced!',
    content: 'Excellent! The new ethernet cable fixed your connection. Bad cables can cause intermittent issues.',
    choices: [
      { id: 'keep-old-cable', text: 'What to Do with Old Cable?', nextStep: 'cable-disposal-advice' },
      { id: 'network-optimization', text: 'Optimize Network Performance?', nextStep: 'internet-troubleshooting-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'success-router-reset': {
    id: 'success-router-reset',
    type: 'solution',
    title: 'Router Reset Successful!',
    content: 'Perfect! Router resets clear temporary issues and refresh the connection. This is good maintenance.',
    choices: [
      { id: 'router-maintenance-schedule', text: 'Router Maintenance Tips', nextStep: 'router-maintenance-guide' },
      { id: 'speed-optimization', text: 'Optimize Internet Speed?', nextStep: 'internet-speed-optimization' },
      { id: 'network-security-check', text: 'Check Network Security?', nextStep: 'internet-security-audit' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Information and Guide Pages
  'internet-speed-test': {
    id: 'internet-speed-test',
    type: 'solution',
    title: 'Internet Speed Test',
    content: 'To test your internet speed:\n1. Go to speedtest.net or fast.com\n2. Click "Go" or "Start"\n3. Compare results to your ISP plan\n4. Test multiple times at different hours\n\nIf speed is much lower than plan, contact ISP.',
    choices: [
      { id: 'speed-much-lower', text: 'Speed much lower than plan', nextStep: 'internet-isp-issue' },
      { id: 'speed-acceptable', text: 'Speed matches plan', nextStep: 'internet-computer-optimization' },
      { id: 'speed-unsure-plan', text: 'Not sure what my plan is', nextStep: 'internet-plan-check' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'wifi-power-management-guide': {
    id: 'wifi-power-management-guide',
    type: 'solution',
    title: 'Disable WiFi Power Management',
    content: 'To disable WiFi power management:\n1. Right-click Start button → Device Manager\n2. Expand "Network adapters"\n3. Right-click your WiFi adapter → Properties\n4. Power Management tab\n5. Uncheck "Allow computer to turn off"\n\nThis prevents Windows from turning off WiFi.',
    choices: [
      { id: 'power-mgmt-worked', text: 'This fixed the disconnections!', nextStep: 'success-wifi-power-fix' },
      { id: 'power-mgmt-still-issues', text: 'Still having disconnection issues', nextStep: 'internet-wifi-driver-issue' },
      { id: 'need-power-mgmt-help', text: 'Need help with these steps', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'internet-dns-change-guide': {
    id: 'internet-dns-change-guide',
    type: 'solution',
    title: 'Change DNS Servers',
    content: 'To change DNS servers:\n1. Go to Network Settings\n2. Change adapter settings\n3. Right-click connection → Properties\n4. Select Internet Protocol (TCP/IPv4)\n5. Use these DNS servers:\n   Primary: 8.8.8.8\n   Secondary: 8.8.4.4',
    choices: [
      { id: 'dns-change-worked', text: 'DNS change fixed it!', nextStep: 'success-dns-fix' },
      { id: 'dns-change-no-help', text: 'Still can\'t reach websites', nextStep: 'internet-firewall-blocking' },
      { id: 'need-dns-help', text: 'Need help changing DNS', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Additional specialized flows
  'internet-gaming-optimization': {
    id: 'internet-gaming-optimization',
    type: 'service',
    title: 'Gaming Network Optimization',
    content: 'Online gaming requires low latency and stable connections. Specialized optimization can improve gaming performance.',
    serviceRecommendation: 'Gaming network optimization ($125) includes latency reduction, QoS setup, and gaming router configuration.',
    choices: [
      { id: 'gaming-network-service', text: 'Gaming Network Service', nextStep: 'inhome-service' },
      { id: 'gaming-router-upgrade', text: 'Gaming Router Upgrade', nextStep: 'internet-router-service' },
      { id: 'gaming-ethernet-setup', text: 'Wired Gaming Setup', nextStep: 'internet-troubleshooting-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'internet-security-audit': {
    id: 'internet-security-audit',
    type: 'service',
    title: 'Network Security Audit',
    content: 'Check your network for security vulnerabilities, unauthorized access, and optimize security settings.',
    serviceRecommendation: 'Network security audit ($100) includes WiFi security assessment, router security hardening, and intrusion detection setup.',
    choices: [
      { id: 'network-security-service', text: 'Network Security Service', nextStep: 'diagnosis-service' },
      { id: 'wifi-security-only', text: 'WiFi Security Only', nextStep: 'internet-router-service' },
      { id: 'business-network-security', text: 'Business Network Security', nextStep: 'business-protection' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'success-wifi-power-fix': {
    id: 'success-wifi-power-fix',
    type: 'solution',
    title: 'WiFi Power Fix Successful!',
    content: 'Great! Disabling power management should prevent future WiFi disconnections.',
    choices: [
      { id: 'wifi-optimization-tips', text: 'More WiFi Optimization Tips', nextStep: 'wifi-optimization-guide' },
      { id: 'network-monitoring', text: 'Set Up Network Monitoring?', nextStep: 'protection-plans' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'success-dns-fix': {
    id: 'success-dns-fix',
    type: 'solution',
    title: 'DNS Fix Successful!',
    content: 'Excellent! Changing DNS servers resolved your website access issues. Google\'s DNS is fast and reliable.',
    choices: [
      { id: 'dns-optimization-tips', text: 'DNS Optimization Tips', nextStep: 'dns-optimization-guide' },
      { id: 'internet-speed-optimization', text: 'Full Internet Optimization?', nextStep: 'internet-troubleshooting-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  }
};