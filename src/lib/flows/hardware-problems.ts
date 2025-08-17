import { FlowStep } from '../diagnostic-flows';

export const hardwareProblemsFlows: Record<string, FlowStep> = {
  // Main Hardware Problems Flow
  'hardware-main': {
    id: 'hardware-main',
    type: 'question',
    title: 'Hardware Problems',
    content: 'What type of hardware issue are you experiencing?',
    choices: [
      { id: 'computer-overheating', text: 'Computer overheating/very hot', nextStep: 'hardware-overheating' },
      { id: 'strange-noises', text: 'Strange noises (clicking, grinding)', nextStep: 'hardware-noises' },
      { id: 'screen-problems', text: 'Screen/display problems', nextStep: 'hardware-display' },
      { id: 'keyboard-mouse-issues', text: 'Keyboard or mouse not working', nextStep: 'hardware-input-devices' },
      { id: 'usb-ports-not-working', text: 'USB ports not working', nextStep: 'hardware-usb-issues' },
      { id: 'cd-dvd-problems', text: 'CD/DVD drive problems', nextStep: 'hardware-optical-drive' },
      { id: 'hardware-upgrade-needed', text: 'Need hardware upgrade advice', nextStep: 'hardware-upgrade-consultation' }
    ]
  },

  // Overheating Branch
  'hardware-overheating': {
    id: 'hardware-overheating',
    type: 'diagnostic',
    title: 'Computer Overheating',
    content: 'Overheating can cause serious damage. What symptoms are you experiencing?',
    urgencyLevel: 'medium',
    choices: [
      { id: 'very-hot-touch', text: 'Computer very hot to touch', nextStep: 'hardware-extreme-heat' },
      { id: 'fans-very-loud', text: 'Fans running extremely loudly', nextStep: 'hardware-fan-overwork' },
      { id: 'random-shutdowns', text: 'Random shutdowns/restarts', nextStep: 'hardware-thermal-shutdown' },
      { id: 'performance-throttling', text: 'Computer slowing down when hot', nextStep: 'hardware-thermal-throttling' },
      { id: 'overheating-warnings', text: 'Getting overheating warnings', nextStep: 'hardware-temperature-critical' }
    ]
  },

  'hardware-extreme-heat': {
    id: 'hardware-extreme-heat',
    type: 'service',
    title: 'Extreme Overheating Emergency',
    content: 'Extreme heat can cause permanent hardware damage. This requires immediate attention to prevent component failure.',
    serviceRecommendation: 'URGENT: Emergency cooling service ($150) includes immediate thermal assessment, emergency cleaning, and thermal paste replacement.',
    urgencyLevel: 'high',
    choices: [
      { id: 'emergency-cooling-service', text: 'Emergency Cooling Service', nextStep: 'emergency-service' },
      { id: 'immediate-shutdown', text: 'Should I Shut Down Now?', nextStep: 'hardware-emergency-shutdown' },
      { id: 'call-overheating-emergency', text: 'Call Overheating Emergency', nextStep: 'contact-service' }
    ]
  },

  'hardware-fan-overwork': {
    id: 'hardware-fan-overwork',
    type: 'diagnostic',
    title: 'Overworked Cooling System',
    content: 'Extremely loud fans indicate your cooling system is struggling. When did this start?',
    choices: [
      { id: 'fans-always-loud', text: 'Always been loud', nextStep: 'hardware-inadequate-cooling' },
      { id: 'fans-recently-loud', text: 'Started recently', nextStep: 'hardware-cooling-blockage' },
      { id: 'fans-loud-certain-tasks', text: 'Only during certain tasks', nextStep: 'hardware-demanding-tasks' },
      { id: 'fans-loud-random', text: 'Random times, no pattern', nextStep: 'hardware-cooling-failure' }
    ]
  },

  'hardware-cooling-blockage': {
    id: 'hardware-cooling-blockage',
    type: 'service',
    title: 'Cooling System Blockage',
    content: 'Recent loud fan noise suggests dust or debris blocking airflow. Professional cleaning is needed.',
    serviceRecommendation: 'Computer cleaning service ($75) includes dust removal, fan cleaning, thermal paste replacement, and airflow optimization.',
    choices: [
      { id: 'book-cleaning-service', text: 'Book Computer Cleaning', nextStep: 'book-service' },
      { id: 'diy-cleaning-tips', text: 'DIY Cleaning Tips', nextStep: 'hardware-cleaning-guide' },
      { id: 'urgent-cleaning', text: 'Urgent Cleaning Needed', nextStep: 'emergency-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'hardware-thermal-shutdown': {
    id: 'hardware-thermal-shutdown',
    type: 'service',
    title: 'Thermal Protection Shutdown',
    content: 'Random shutdowns during operation indicate critical overheating. Your computer is protecting itself from damage.',
    serviceRecommendation: 'Emergency thermal repair ($150) includes comprehensive cooling system overhaul, thermal paste replacement, and heat management optimization.',
    urgencyLevel: 'high',
    choices: [
      { id: 'emergency-thermal-repair', text: 'Emergency Thermal Repair', nextStep: 'emergency-service' },
      { id: 'thermal-monitoring', text: 'Monitor Temperature First?', nextStep: 'hardware-temperature-monitoring' },
      { id: 'call-thermal-emergency', text: 'Call Thermal Emergency', nextStep: 'contact-service' }
    ]
  },

  // Strange Noises Branch
  'hardware-noises': {
    id: 'hardware-noises',
    type: 'diagnostic',
    title: 'Strange Computer Noises',
    content: 'Strange noises often indicate hardware problems. What type of noise are you hearing?',
    urgencyLevel: 'medium',
    choices: [
      { id: 'clicking-ticking', text: 'Clicking or ticking sounds', nextStep: 'hardware-hdd-failure' },
      { id: 'grinding-scraping', text: 'Grinding or scraping sounds', nextStep: 'hardware-mechanical-failure' },
      { id: 'high-pitch-whining', text: 'High-pitched whining', nextStep: 'hardware-electrical-noise' },
      { id: 'buzzing-humming', text: 'Buzzing or humming', nextStep: 'hardware-electrical-interference' },
      { id: 'intermittent-beeping', text: 'Intermittent beeping', nextStep: 'hardware-system-alerts' }
    ]
  },

  'hardware-hdd-failure': {
    id: 'hardware-hdd-failure',
    type: 'service',
    title: 'Hard Drive Failure Warning',
    content: 'Clicking sounds from hard drives indicate imminent failure. This is a data emergency requiring immediate action.',
    serviceRecommendation: 'URGENT: Emergency data backup and drive replacement ($250-400) including data recovery and new drive installation.',
    urgencyLevel: 'emergency',
    choices: [
      { id: 'emergency-data-backup', text: 'Emergency Data Backup', nextStep: 'emergency-service' },
      { id: 'immediate-drive-replacement', text: 'Immediate Drive Replacement', nextStep: 'data-recovery-service' },
      { id: 'stop-using-computer', text: 'Should I Stop Using Computer?', nextStep: 'hardware-data-preservation' },
      { id: 'call-data-emergency', text: 'Call Data Emergency', nextStep: 'contact-service' }
    ]
  },

  'hardware-mechanical-failure': {
    id: 'hardware-mechanical-failure',
    type: 'diagnostic',
    title: 'Mechanical Component Failure',
    content: 'Grinding sounds indicate mechanical wear. Where does the sound seem to come from?',
    choices: [
      { id: 'sound-from-fans', text: 'From cooling fans', nextStep: 'hardware-fan-bearing-failure' },
      { id: 'sound-from-drive', text: 'From hard drive area', nextStep: 'hardware-hdd-failure' },
      { id: 'sound-from-power-supply', text: 'From power supply', nextStep: 'hardware-psu-fan-failure' },
      { id: 'sound-location-unknown', text: 'Can\'t tell where it\'s from', nextStep: 'hardware-general-mechanical' }
    ]
  },

  'hardware-fan-bearing-failure': {
    id: 'hardware-fan-bearing-failure',
    type: 'service',
    title: 'Fan Bearing Failure',
    content: 'Fan bearing failure causes grinding noises and can lead to overheating if the fan stops working.',
    serviceRecommendation: 'Fan replacement service ($100-150) includes diagnosis, fan replacement, and cooling system optimization to prevent future failures.',
    urgencyLevel: 'medium',
    choices: [
      { id: 'fan-replacement-service', text: 'Fan Replacement Service', nextStep: 'book-service' },
      { id: 'how-urgent-fan', text: 'How Urgent Is This?', nextStep: 'hardware-fan-urgency' },
      { id: 'temporary-fan-solution', text: 'Temporary Solution?', nextStep: 'hardware-fan-temporary' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Display Problems Branch
  'hardware-display': {
    id: 'hardware-display',
    type: 'diagnostic',
    title: 'Screen/Display Problems',
    content: 'What type of display issue are you experiencing?',
    choices: [
      { id: 'screen-completely-black', text: 'Screen completely black', nextStep: 'hardware-no-display' },
      { id: 'screen-flickering', text: 'Screen flickering or flashing', nextStep: 'hardware-display-flickering' },
      { id: 'screen-lines-distortion', text: 'Lines, distortion, or artifacts', nextStep: 'hardware-display-corruption' },
      { id: 'screen-colors-wrong', text: 'Colors wrong or washed out', nextStep: 'hardware-color-issues' },
      { id: 'screen-dim-dark', text: 'Screen very dim or dark', nextStep: 'hardware-backlight-issue' },
      { id: 'screen-cracked-damaged', text: 'Physically cracked or damaged', nextStep: 'hardware-physical-damage' }
    ]
  },

  'hardware-no-display': {
    id: 'hardware-no-display',
    type: 'diagnostic',
    title: 'No Display Output',
    content: 'A completely black screen can be caused by various issues. Is the monitor power light on?',
    choices: [
      { id: 'monitor-power-on', text: 'Monitor power light is on', nextStep: 'hardware-signal-issue' },
      { id: 'monitor-power-off', text: 'Monitor power light is off', nextStep: 'hardware-monitor-power' },
      { id: 'monitor-standby', text: 'Monitor in standby/sleep mode', nextStep: 'hardware-signal-issue' },
      { id: 'laptop-screen-black', text: 'This is a laptop screen', nextStep: 'hardware-laptop-display' }
    ]
  },

  'hardware-signal-issue': {
    id: 'hardware-signal-issue',
    type: 'diagnostic',
    title: 'Display Signal Problem',
    content: 'If the monitor is on but black, there\'s likely no signal from the computer. Is this a desktop or laptop?',
    choices: [
      { id: 'desktop-no-signal', text: 'Desktop computer', nextStep: 'hardware-desktop-graphics' },
      { id: 'laptop-no-signal', text: 'Laptop computer', nextStep: 'hardware-laptop-display' },
      { id: 'external-monitor-laptop', text: 'Laptop with external monitor', nextStep: 'hardware-external-monitor' }
    ]
  },

  'hardware-desktop-graphics': {
    id: 'hardware-desktop-graphics',
    type: 'diagnostic',
    title: 'Desktop Graphics Issue',
    content: 'Desktop display issues are often graphics card related. Have you checked the video cable connections?',
    choices: [
      { id: 'video-cable-checked', text: 'Yes, cables are secure', nextStep: 'hardware-graphics-card-issue' },
      { id: 'video-cable-loose', text: 'Found loose cable', nextStep: 'hardware-reconnect-video' },
      { id: 'multiple-video-ports', text: 'Computer has multiple video ports', nextStep: 'hardware-try-different-port' },
      { id: 'unsure-video-connection', text: 'Not sure about video connections', nextStep: 'hardware-video-connection-help' }
    ]
  },

  'hardware-graphics-card-issue': {
    id: 'hardware-graphics-card-issue',
    type: 'service',
    title: 'Graphics Card Problem',
    content: 'No display with secure connections suggests graphics card failure or compatibility issues.',
    serviceRecommendation: 'Graphics card diagnosis ($75) includes testing, driver updates, and replacement recommendations. Graphics card replacement typically $200-500.',
    choices: [
      { id: 'graphics-diagnosis-service', text: 'Graphics Card Diagnosis', nextStep: 'diagnosis-service' },
      { id: 'graphics-card-replacement', text: 'Graphics Card Replacement', nextStep: 'hardware-graphics-upgrade' },
      { id: 'integrated-graphics-test', text: 'Try Integrated Graphics?', nextStep: 'hardware-integrated-graphics' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'hardware-display-flickering': {
    id: 'hardware-display-flickering',
    type: 'diagnostic',
    title: 'Display Flickering Issue',
    content: 'Flickering can be caused by cables, graphics cards, or monitors. Is the flickering constant or intermittent?',
    choices: [
      { id: 'flickering-constant', text: 'Constant flickering', nextStep: 'hardware-refresh-rate-issue' },
      { id: 'flickering-intermittent', text: 'Intermittent flickering', nextStep: 'hardware-loose-connection' },
      { id: 'flickering-specific-apps', text: 'Only in specific applications', nextStep: 'hardware-software-graphics' },
      { id: 'flickering-getting-worse', text: 'Getting progressively worse', nextStep: 'hardware-failing-display' }
    ]
  },

  // Input Device Problems Branch
  'hardware-input-devices': {
    id: 'hardware-input-devices',
    type: 'diagnostic',
    title: 'Keyboard/Mouse Problems',
    content: 'Which input device is having problems?',
    choices: [
      { id: 'keyboard-not-working', text: 'Keyboard not working', nextStep: 'hardware-keyboard-issues' },
      { id: 'mouse-not-working', text: 'Mouse not working', nextStep: 'hardware-mouse-issues' },
      { id: 'both-input-not-working', text: 'Both keyboard and mouse', nextStep: 'hardware-usb-controller-issue' },
      { id: 'input-intermittent', text: 'Working intermittently', nextStep: 'hardware-input-intermittent' }
    ]
  },

  'hardware-keyboard-issues': {
    id: 'hardware-keyboard-issues',
    type: 'diagnostic',
    title: 'Keyboard Problems',
    content: 'What type of keyboard problem are you experiencing?',
    choices: [
      { id: 'keyboard-completely-dead', text: 'Completely unresponsive', nextStep: 'hardware-keyboard-connection' },
      { id: 'keyboard-some-keys', text: 'Some keys don\'t work', nextStep: 'hardware-keyboard-partial' },
      { id: 'keyboard-wrong-characters', text: 'Types wrong characters', nextStep: 'hardware-keyboard-layout' },
      { id: 'keyboard-sticky-keys', text: 'Keys stick or repeat', nextStep: 'hardware-keyboard-mechanical' }
    ]
  },

  'hardware-keyboard-connection': {
    id: 'hardware-keyboard-connection',
    type: 'diagnostic',
    title: 'Keyboard Connection Check',
    content: 'Is your keyboard connected via USB, PS/2, or is it wireless?',
    choices: [
      { id: 'keyboard-usb', text: 'USB keyboard', nextStep: 'hardware-usb-keyboard-test' },
      { id: 'keyboard-wireless', text: 'Wireless keyboard', nextStep: 'hardware-wireless-keyboard' },
      { id: 'keyboard-ps2', text: 'PS/2 (round connector)', nextStep: 'hardware-ps2-keyboard' },
      { id: 'keyboard-laptop-built-in', text: 'Laptop built-in keyboard', nextStep: 'hardware-laptop-keyboard' }
    ]
  },

  'hardware-usb-keyboard-test': {
    id: 'hardware-usb-keyboard-test',
    type: 'diagnostic',
    title: 'USB Keyboard Testing',
    content: 'Try connecting the keyboard to a different USB port. Does it work in other ports?',
    choices: [
      { id: 'keyboard-works-other-port', text: 'Works in different port', nextStep: 'hardware-usb-port-failure' },
      { id: 'keyboard-no-ports-work', text: 'Doesn\'t work in any port', nextStep: 'hardware-keyboard-failure' },
      { id: 'keyboard-works-sometimes', text: 'Works in some ports only', nextStep: 'hardware-usb-controller-partial' },
      { id: 'no-other-ports', text: 'No other ports available', nextStep: 'hardware-keyboard-cable-test' }
    ]
  },

  'hardware-mouse-issues': {
    id: 'hardware-mouse-issues',
    type: 'diagnostic',
    title: 'Mouse Problems',
    content: 'What type of mouse problem are you experiencing?',
    choices: [
      { id: 'mouse-not-moving', text: 'Cursor not moving at all', nextStep: 'hardware-mouse-connection' },
      { id: 'mouse-erratic-movement', text: 'Erratic or jumpy movement', nextStep: 'hardware-mouse-sensor' },
      { id: 'mouse-clicks-not-working', text: 'Clicks not working', nextStep: 'hardware-mouse-buttons' },
      { id: 'mouse-scroll-broken', text: 'Scroll wheel not working', nextStep: 'hardware-mouse-scroll' }
    ]
  },

  // USB Port Issues Branch
  'hardware-usb-issues': {
    id: 'hardware-usb-issues',
    type: 'diagnostic',
    title: 'USB Port Problems',
    content: 'Which USB-related issue are you experiencing?',
    choices: [
      { id: 'usb-ports-completely-dead', text: 'No USB ports work at all', nextStep: 'hardware-usb-controller-failure' },
      { id: 'usb-some-ports-dead', text: 'Some USB ports don\'t work', nextStep: 'hardware-usb-port-failure' },
      { id: 'usb-devices-not-recognized', text: 'Devices not recognized', nextStep: 'hardware-usb-driver-issue' },
      { id: 'usb-slow-transfer', text: 'Very slow transfer speeds', nextStep: 'hardware-usb-speed-issue' },
      { id: 'usb-power-issues', text: 'Devices not getting power', nextStep: 'hardware-usb-power-failure' }
    ]
  },

  'hardware-usb-controller-failure': {
    id: 'hardware-usb-controller-failure',
    type: 'service',
    title: 'USB Controller Failure',
    content: 'Complete USB failure indicates motherboard or USB controller issues requiring professional diagnosis.',
    serviceRecommendation: 'USB controller diagnosis ($75) includes motherboard testing and USB hub installation if needed. Motherboard repair may be required.',
    urgencyLevel: 'medium',
    choices: [
      { id: 'usb-controller-diagnosis', text: 'USB Controller Diagnosis', nextStep: 'diagnosis-service' },
      { id: 'usb-hub-solution', text: 'External USB Hub Solution', nextStep: 'hardware-usb-hub-service' },
      { id: 'motherboard-replacement', text: 'Motherboard Replacement?', nextStep: 'hardware-motherboard-consultation' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'hardware-usb-port-failure': {
    id: 'hardware-usb-port-failure',
    type: 'service',
    title: 'Individual USB Port Failure',
    content: 'Individual USB port failures are common and can often be worked around with USB hubs or other ports.',
    serviceRecommendation: 'USB port repair ($50-100) or USB hub installation. For multiple port failures, motherboard assessment may be needed.',
    choices: [
      { id: 'usb-port-repair', text: 'USB Port Repair', nextStep: 'diagnosis-service' },
      { id: 'usb-hub-workaround', text: 'USB Hub Workaround', nextStep: 'hardware-usb-hub-service' },
      { id: 'ignore-broken-ports', text: 'Just Use Working Ports', nextStep: 'hardware-usb-management' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Optical Drive Branch
  'hardware-optical-drive': {
    id: 'hardware-optical-drive',
    type: 'diagnostic',
    title: 'CD/DVD Drive Problems',
    content: 'What problem are you having with your optical drive?',
    choices: [
      { id: 'drive-wont-open', text: 'Drive won\'t open/eject', nextStep: 'hardware-drive-stuck' },
      { id: 'drive-not-reading', text: 'Won\'t read discs', nextStep: 'hardware-drive-reading' },
      { id: 'drive-not-burning', text: 'Won\'t burn/write discs', nextStep: 'hardware-drive-burning' },
      { id: 'drive-making-noise', text: 'Making grinding/loud noises', nextStep: 'hardware-drive-mechanical' },
      { id: 'drive-disappeared', text: 'Computer doesn\'t see drive', nextStep: 'hardware-drive-detection' }
    ]
  },

  'hardware-drive-stuck': {
    id: 'hardware-drive-stuck',
    type: 'solution',
    title: 'Stuck Optical Drive',
    content: 'A stuck drive can often be manually ejected. Look for a small hole near the drive tray for emergency eject.',
    choices: [
      { id: 'try-manual-eject', text: 'Try Manual Eject', nextStep: 'hardware-manual-eject-guide' },
      { id: 'drive-eject-worked', text: 'Manual eject worked', nextStep: 'hardware-drive-maintenance' },
      { id: 'drive-still-stuck', text: 'Still stuck after manual eject', nextStep: 'hardware-drive-replacement' },
      { id: 'no-manual-eject-hole', text: 'Can\'t find eject hole', nextStep: 'hardware-drive-service' }
    ]
  },

  'hardware-drive-reading': {
    id: 'hardware-drive-reading',
    type: 'diagnostic',
    title: 'Optical Drive Reading Issues',
    content: 'Drive reading problems can be caused by dirty lenses or worn lasers. Have you tried different discs?',
    choices: [
      { id: 'multiple-discs-fail', text: 'Multiple discs don\'t work', nextStep: 'hardware-drive-laser-failure' },
      { id: 'some-discs-work', text: 'Some discs work, others don\'t', nextStep: 'hardware-drive-compatibility' },
      { id: 'only-one-disc-tried', text: 'Only tried one disc', nextStep: 'hardware-drive-disc-test' },
      { id: 'used-to-work', text: 'Used to work fine', nextStep: 'hardware-drive-cleaning' }
    ]
  },

  // Hardware Services and Upgrades
  'hardware-upgrade-consultation': {
    id: 'hardware-upgrade-consultation',
    type: 'service',
    title: 'Hardware Upgrade Consultation',
    content: 'Get expert advice on the best hardware upgrades for your needs and budget.',
    serviceRecommendation: 'Hardware consultation ($75) includes performance assessment, upgrade recommendations, compatibility checking, and cost-benefit analysis.',
    choices: [
      { id: 'book-hardware-consultation', text: 'Book Hardware Consultation', nextStep: 'contact-service' },
      { id: 'specific-upgrade-advice', text: 'Specific Upgrade Questions', nextStep: 'hardware-upgrade-types' },
      { id: 'upgrade-vs-new-computer', text: 'Upgrade vs New Computer?', nextStep: 'hardware-replacement-consultation' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'hardware-upgrade-types': {
    id: 'hardware-upgrade-types',
    type: 'diagnostic',
    title: 'Hardware Upgrade Options',
    content: 'What type of upgrade are you considering?',
    choices: [
      { id: 'ram-upgrade', text: 'Memory (RAM) upgrade', nextStep: 'hardware-ram-upgrade' },
      { id: 'storage-upgrade', text: 'Storage (SSD/Hard Drive)', nextStep: 'hardware-storage-upgrade' },
      { id: 'graphics-upgrade', text: 'Graphics card upgrade', nextStep: 'hardware-graphics-upgrade' },
      { id: 'cpu-upgrade', text: 'Processor (CPU) upgrade', nextStep: 'hardware-cpu-upgrade' },
      { id: 'multiple-upgrades', text: 'Multiple components', nextStep: 'hardware-system-upgrade' }
    ]
  },

  'hardware-ram-upgrade': {
    id: 'hardware-ram-upgrade',
    type: 'service',
    title: 'Memory (RAM) Upgrade',
    content: 'RAM upgrades provide immediate performance improvements for multitasking and demanding applications.',
    serviceRecommendation: 'RAM upgrade service ($150-300) includes compatibility checking, installation, and performance optimization. Typically 8GB to 16GB or 32GB.',
    choices: [
      { id: 'ram-upgrade-service', text: 'RAM Upgrade Service', nextStep: 'book-service' },
      { id: 'ram-compatibility-check', text: 'Check RAM Compatibility', nextStep: 'diagnosis-service' },
      { id: 'how-much-ram-needed', text: 'How Much RAM Do I Need?', nextStep: 'hardware-ram-sizing' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'hardware-storage-upgrade': {
    id: 'hardware-storage-upgrade',
    type: 'service',
    title: 'Storage Upgrade (SSD/HDD)',
    content: 'Storage upgrades, especially to SSD, provide dramatic speed improvements for boot times and application loading.',
    serviceRecommendation: 'SSD upgrade service ($250-400) includes data migration, installation, and optimization. Typical upgrade to 500GB-1TB SSD.',
    choices: [
      { id: 'ssd-upgrade-service', text: 'SSD Upgrade Service', nextStep: 'book-service' },
      { id: 'ssd-vs-hdd', text: 'SSD vs HDD Comparison', nextStep: 'hardware-storage-comparison' },
      { id: 'data-migration-included', text: 'Is Data Migration Included?', nextStep: 'hardware-data-migration' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Success States and Guides
  'hardware-reconnect-video': {
    id: 'hardware-reconnect-video',
    type: 'solution',
    title: 'Reconnect Video Cable',
    content: 'Please firmly reconnect the video cable to both your computer and monitor, then test your display.',
    choices: [
      { id: 'video-cable-fixed', text: 'Display works now!', nextStep: 'success-video-connection' },
      { id: 'video-cable-still-black', text: 'Still no display', nextStep: 'hardware-try-different-port' }
    ]
  },

  'success-video-connection': {
    id: 'success-video-connection',
    type: 'solution',
    title: 'Video Connection Fixed!',
    content: 'Great! Loose video cables are a common cause of display issues. Make sure connections are secure.',
    choices: [
      { id: 'video-cable-maintenance', text: 'Video Cable Maintenance Tips', nextStep: 'hardware-cable-care' },
      { id: 'display-optimization', text: 'Optimize Display Settings?', nextStep: 'hardware-display-optimization' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'hardware-emergency-shutdown': {
    id: 'hardware-emergency-shutdown',
    type: 'solution',
    title: 'Emergency Shutdown Procedure',
    content: 'For extreme overheating:\n1. Save any open work immediately\n2. Shut down computer normally if possible\n3. If frozen, hold power button for 10 seconds\n4. Unplug power cable\n5. Let computer cool for 30 minutes before calling',
    urgencyLevel: 'high',
    choices: [
      { id: 'computer-shutdown', text: 'Computer is shut down', nextStep: 'emergency-service' },
      { id: 'computer-wont-shutdown', text: 'Computer won\'t shut down', nextStep: 'hardware-emergency-force' },
      { id: 'call-shutdown-help', text: 'Call for Shutdown Help', nextStep: 'contact-service' }
    ]
  },

  'hardware-cleaning-guide': {
    id: 'hardware-cleaning-guide',
    type: 'solution',
    title: 'DIY Computer Cleaning',
    content: 'Basic cleaning steps:\n1. Shut down and unplug computer\n2. Use compressed air to blow out vents\n3. Clean intake fans gently\n4. Don\'t use vacuum or liquids inside computer\n5. Professional cleaning recommended for internal components',
    choices: [
      { id: 'cleaning-helped', text: 'Cleaning helped with noise/heat', nextStep: 'success-hardware-cleaning' },
      { id: 'need-professional-cleaning', text: 'Need professional cleaning', nextStep: 'book-service' },
      { id: 'cleaning-questions', text: 'Questions about cleaning', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'hardware-manual-eject-guide': {
    id: 'hardware-manual-eject-guide',
    type: 'solution',
    title: 'Manual Disc Eject',
    content: 'To manually eject a stuck disc:\n1. Straighten a paperclip\n2. Find the small hole near the drive tray\n3. Insert paperclip and push gently\n4. Tray should partially eject\n5. Pull tray out gently by hand',
    choices: [
      { id: 'manual-eject-worked', text: 'Manual eject worked!', nextStep: 'hardware-drive-maintenance' },
      { id: 'manual-eject-failed', text: 'Still stuck', nextStep: 'hardware-drive-replacement' },
      { id: 'broke-something', text: 'I think I broke something', nextStep: 'hardware-drive-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Additional Hardware Services
  'hardware-drive-service': {
    id: 'hardware-drive-service',
    type: 'service',
    title: 'Optical Drive Service',
    content: 'Professional optical drive repair or replacement service.',
    serviceRecommendation: 'Optical drive service ($100-150) includes cleaning, repair, or replacement. Many users are switching to external USB drives.',
    choices: [
      { id: 'drive-repair-service', text: 'Drive Repair Service', nextStep: 'book-service' },
      { id: 'drive-replacement', text: 'Drive Replacement', nextStep: 'hardware-drive-replacement' },
      { id: 'external-drive-option', text: 'External Drive Option', nextStep: 'hardware-external-drive' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'hardware-graphics-upgrade': {
    id: 'hardware-graphics-upgrade',
    type: 'service',
    title: 'Graphics Card Upgrade',
    content: 'Graphics card upgrades improve gaming, video editing, and graphics performance significantly.',
    serviceRecommendation: 'Graphics card upgrade ($300-800) includes compatibility checking, installation, driver setup, and performance optimization.',
    choices: [
      { id: 'graphics-upgrade-service', text: 'Graphics Upgrade Service', nextStep: 'book-service' },
      { id: 'graphics-compatibility', text: 'Check Graphics Compatibility', nextStep: 'diagnosis-service' },
      { id: 'gaming-vs-professional', text: 'Gaming vs Professional Graphics?', nextStep: 'hardware-graphics-consultation' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'hardware-usb-hub-service': {
    id: 'hardware-usb-hub-service',
    type: 'service',
    title: 'USB Hub Installation',
    content: 'USB hubs provide additional ports and can work around failed motherboard USB ports.',
    serviceRecommendation: 'USB hub setup ($50-100) includes hub selection, installation, and port management optimization.',
    choices: [
      { id: 'usb-hub-installation', text: 'USB Hub Installation', nextStep: 'inhome-service' },
      { id: 'hub-buying-advice', text: 'USB Hub Buying Advice', nextStep: 'hardware-usb-hub-guide' },
      { id: 'powered-vs-unpowered-hub', text: 'Powered vs Unpowered Hub?', nextStep: 'hardware-hub-power-guide' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'success-hardware-cleaning': {
    id: 'success-hardware-cleaning',
    type: 'solution',
    title: 'Hardware Cleaning Success!',
    content: 'Excellent! Regular cleaning helps prevent overheating and extends hardware life.',
    serviceRecommendation: 'Consider our Protection Plan ($19.99/month) which includes annual professional cleaning and maintenance.',
    choices: [
      { id: 'cleaning-schedule', text: 'Set Cleaning Schedule', nextStep: 'hardware-maintenance-schedule' },
      { id: 'professional-maintenance', text: 'Professional Maintenance Plan', nextStep: 'protection-plans' },
      { id: 'more-cleaning-tips', text: 'More Cleaning Tips', nextStep: 'hardware-maintenance-guide' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  }
};