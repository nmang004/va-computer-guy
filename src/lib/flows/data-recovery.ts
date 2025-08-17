import { FlowStep } from '../diagnostic-flows';

export const dataRecoveryFlows: Record<string, FlowStep> = {
  // Main Data Recovery Flow
  'data-main': {
    id: 'data-main',
    type: 'question',
    title: 'Data Recovery/Lost Files',
    content: 'What type of data loss are you experiencing?',
    choices: [
      { id: 'accidentally-deleted', text: 'Accidentally deleted files', nextStep: 'data-deleted-files' },
      { id: 'hard-drive-failed', text: 'Hard drive stopped working', nextStep: 'data-drive-failure' },
      { id: 'corrupted-files', text: 'Files corrupted/won\'t open', nextStep: 'data-file-corruption' },
      { id: 'formatted-drive', text: 'Accidentally formatted drive', nextStep: 'data-formatted-drive' },
      { id: 'virus-destroyed-files', text: 'Virus destroyed files', nextStep: 'data-virus-damage' },
      { id: 'computer-wont-start-data', text: 'Computer won\'t start, need files', nextStep: 'data-computer-failure' },
      { id: 'backup-prevention', text: 'Want to prevent data loss', nextStep: 'data-backup-solutions' }
    ]
  },

  // Accidentally Deleted Files Branch
  'data-deleted-files': {
    id: 'data-deleted-files',
    type: 'diagnostic',
    title: 'Accidentally Deleted Files',
    content: 'When did you delete the files, and have you done anything on the computer since?',
    urgencyLevel: 'medium',
    choices: [
      { id: 'deleted-just-now', text: 'Just deleted them (within last hour)', nextStep: 'data-recent-deletion' },
      { id: 'deleted-today', text: 'Earlier today', nextStep: 'data-same-day-deletion' },
      { id: 'deleted-days-ago', text: 'Few days ago', nextStep: 'data-older-deletion' },
      { id: 'deleted-weeks-ago', text: 'Weeks or months ago', nextStep: 'data-very-old-deletion' },
      { id: 'used-computer-since', text: 'Used computer a lot since deletion', nextStep: 'data-overwritten-risk' }
    ]
  },

  'data-recent-deletion': {
    id: 'data-recent-deletion',
    type: 'solution',
    title: 'Recent File Deletion',
    content: 'Recent deletions have the best recovery chances. First, check the Recycle Bin for your files.',
    choices: [
      { id: 'files-in-recycle-bin', text: 'Found files in Recycle Bin!', nextStep: 'data-recycle-bin-restore' },
      { id: 'recycle-bin-empty', text: 'Recycle Bin is empty', nextStep: 'data-bypass-recycle-bin' },
      { id: 'deleted-with-shift-del', text: 'Used Shift+Delete (bypassed Recycle Bin)', nextStep: 'data-immediate-recovery' },
      { id: 'cant-find-recycle-bin', text: 'Can\'t find Recycle Bin', nextStep: 'data-recycle-bin-help' }
    ]
  },

  'data-recycle-bin-restore': {
    id: 'data-recycle-bin-restore',
    type: 'solution',
    title: 'Restore from Recycle Bin',
    content: 'To restore files from Recycle Bin:\n1. Double-click Recycle Bin on desktop\n2. Find your deleted files\n3. Right-click files → Restore\n4. Files return to original location',
    choices: [
      { id: 'recycle-restore-worked', text: 'Files restored successfully!', nextStep: 'success-data-recovery' },
      { id: 'some-files-missing', text: 'Some files still missing', nextStep: 'data-partial-recovery' },
      { id: 'restore-failed', text: 'Restore failed or error occurred', nextStep: 'data-recycle-bin-issues' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'data-immediate-recovery': {
    id: 'data-immediate-recovery',
    type: 'service',
    title: 'Immediate File Recovery',
    content: 'Files deleted with Shift+Delete bypass the Recycle Bin but can still be recovered with professional tools.',
    serviceRecommendation: 'Emergency file recovery ($150) using professional data recovery software. Success rate highest when done immediately.',
    urgencyLevel: 'high',
    choices: [
      { id: 'emergency-file-recovery', text: 'Emergency File Recovery', nextStep: 'emergency-service' },
      { id: 'try-recovery-software', text: 'Try Recovery Software First?', nextStep: 'data-recovery-software' },
      { id: 'stop-using-computer', text: 'Should I Stop Using Computer?', nextStep: 'data-preservation-guide' },
      { id: 'call-recovery-help', text: 'Call for Recovery Help', nextStep: 'contact-service' }
    ]
  },

  'data-overwritten-risk': {
    id: 'data-overwritten-risk',
    type: 'diagnostic',
    title: 'Overwritten Data Risk',
    content: 'Using the computer after deletion reduces recovery chances. What type of activities have you done?',
    choices: [
      { id: 'heavy-computer-use', text: 'Heavy use (downloads, installs)', nextStep: 'data-low-recovery-chance' },
      { id: 'light-computer-use', text: 'Light use (email, browsing)', nextStep: 'data-moderate-recovery-chance' },
      { id: 'installed-programs', text: 'Installed new programs', nextStep: 'data-low-recovery-chance' },
      { id: 'just-basic-tasks', text: 'Just basic tasks', nextStep: 'data-good-recovery-chance' }
    ]
  },

  // Hard Drive Failure Branch
  'data-drive-failure': {
    id: 'data-drive-failure',
    type: 'diagnostic',
    title: 'Hard Drive Failure',
    content: 'Hard drive failure is serious. What symptoms is your drive showing?',
    urgencyLevel: 'high',
    choices: [
      { id: 'drive-clicking-noises', text: 'Making clicking/grinding noises', nextStep: 'data-mechanical-failure' },
      { id: 'drive-not-detected', text: 'Computer doesn\'t detect drive', nextStep: 'data-drive-not-detected' },
      { id: 'drive-error-messages', text: 'Getting drive error messages', nextStep: 'data-drive-errors' },
      { id: 'drive-very-slow', text: 'Drive extremely slow', nextStep: 'data-drive-degradation' },
      { id: 'blue-screen-drive', text: 'Blue screen when accessing drive', nextStep: 'data-critical-drive-failure' }
    ]
  },

  'data-mechanical-failure': {
    id: 'data-mechanical-failure',
    type: 'service',
    title: 'Mechanical Drive Failure',
    content: 'Clicking or grinding sounds indicate mechanical failure. This is a DATA EMERGENCY requiring immediate professional help.',
    serviceRecommendation: 'URGENT: Stop using immediately. Professional data recovery ($300-800) depending on damage severity. Success rate 70-90% with immediate action.',
    urgencyLevel: 'emergency',
    choices: [
      { id: 'emergency-data-recovery', text: 'Emergency Data Recovery', nextStep: 'emergency-service' },
      { id: 'stop-computer-immediately', text: 'Stop Computer Use NOW', nextStep: 'data-emergency-shutdown' },
      { id: 'call-data-emergency', text: 'Call Data Emergency Line', nextStep: 'contact-service' }
    ]
  },

  'data-drive-not-detected': {
    id: 'data-drive-not-detected',
    type: 'diagnostic',
    title: 'Drive Not Detected',
    content: 'When a drive isn\'t detected, it could be connection or hardware failure. Is this an internal or external drive?',
    choices: [
      { id: 'internal-drive-not-detected', text: 'Internal hard drive', nextStep: 'data-internal-drive-failure' },
      { id: 'external-drive-not-detected', text: 'External/USB drive', nextStep: 'data-external-drive-failure' },
      { id: 'ssd-not-detected', text: 'SSD (Solid State Drive)', nextStep: 'data-ssd-failure' },
      { id: 'unsure-drive-type', text: 'Not sure what type', nextStep: 'data-drive-identification' }
    ]
  },

  'data-internal-drive-failure': {
    id: 'data-internal-drive-failure',
    type: 'service',
    title: 'Internal Drive Failure',
    content: 'Internal drive detection failure indicates serious hardware issues requiring professional diagnosis.',
    serviceRecommendation: 'Internal drive recovery ($250-500) includes hardware diagnosis, connection testing, and data extraction if possible.',
    urgencyLevel: 'high',
    choices: [
      { id: 'internal-drive-recovery', text: 'Internal Drive Recovery', nextStep: 'data-recovery-service' },
      { id: 'drive-connection-check', text: 'Check Drive Connections?', nextStep: 'data-connection-diagnosis' },
      { id: 'emergency-internal-recovery', text: 'Emergency Recovery Service', nextStep: 'emergency-service' },
      { id: 'call-internal-drive-help', text: 'Call for Help', nextStep: 'contact-service' }
    ]
  },

  'data-external-drive-failure': {
    id: 'data-external-drive-failure',
    type: 'diagnostic',
    title: 'External Drive Failure',
    content: 'External drive issues can be connection or hardware related. Have you tried different USB ports or cables?',
    choices: [
      { id: 'tried-different-ports', text: 'Tried different ports/cables', nextStep: 'data-external-hardware-failure' },
      { id: 'only-tried-one-port', text: 'Only tried one port', nextStep: 'data-external-connection-test' },
      { id: 'drive-partially-detected', text: 'Sometimes detected, sometimes not', nextStep: 'data-external-intermittent' },
      { id: 'drive-makes-noise', text: 'Drive makes unusual noises', nextStep: 'data-external-mechanical' }
    ]
  },

  // File Corruption Branch
  'data-file-corruption': {
    id: 'data-file-corruption',
    type: 'diagnostic',
    title: 'File Corruption Issues',
    content: 'What type of file corruption are you experiencing?',
    choices: [
      { id: 'files-wont-open', text: 'Files won\'t open at all', nextStep: 'data-complete-corruption' },
      { id: 'files-partially-damaged', text: 'Files open but are damaged/incomplete', nextStep: 'data-partial-corruption' },
      { id: 'error-opening-files', text: 'Get error messages opening files', nextStep: 'data-corruption-errors' },
      { id: 'files-changed-format', text: 'Files changed to wrong format', nextStep: 'data-format-corruption' },
      { id: 'recent-corruption', text: 'Corruption started recently', nextStep: 'data-recent-corruption' }
    ]
  },

  'data-complete-corruption': {
    id: 'data-complete-corruption',
    type: 'diagnostic',
    title: 'Complete File Corruption',
    content: 'Complete file corruption can have various causes. Are all your files affected or just specific ones?',
    choices: [
      { id: 'all-files-corrupted', text: 'All or most files affected', nextStep: 'data-system-corruption' },
      { id: 'specific-file-types', text: 'Only specific file types (photos, documents)', nextStep: 'data-format-specific-corruption' },
      { id: 'files-from-specific-location', text: 'Files from specific folder/drive', nextStep: 'data-location-corruption' },
      { id: 'recent-files-only', text: 'Only recently created/modified files', nextStep: 'data-recent-file-corruption' }
    ]
  },

  'data-system-corruption': {
    id: 'data-system-corruption',
    type: 'service',
    title: 'System-Wide File Corruption',
    content: 'System-wide corruption indicates serious drive or system issues requiring immediate professional attention.',
    serviceRecommendation: 'Complete system recovery ($300-500) includes drive health assessment, system repair, and data recovery from corruption.',
    urgencyLevel: 'high',
    choices: [
      { id: 'system-recovery-service', text: 'System Recovery Service', nextStep: 'data-recovery-service' },
      { id: 'backup-remaining-files', text: 'Backup Remaining Files First', nextStep: 'data-emergency-backup' },
      { id: 'emergency-system-recovery', text: 'Emergency Recovery', nextStep: 'emergency-service' },
      { id: 'call-system-corruption', text: 'Call for Help', nextStep: 'contact-service' }
    ]
  },

  // Formatted Drive Branch
  'data-formatted-drive': {
    id: 'data-formatted-drive',
    type: 'diagnostic',
    title: 'Accidentally Formatted Drive',
    content: 'Drive formatting is serious but often recoverable. What type of format was performed?',
    urgencyLevel: 'high',
    choices: [
      { id: 'quick-format', text: 'Quick format', nextStep: 'data-quick-format-recovery' },
      { id: 'full-format', text: 'Full format', nextStep: 'data-full-format-recovery' },
      { id: 'unknown-format-type', text: 'Not sure what type', nextStep: 'data-format-assessment' },
      { id: 'reinstalled-windows', text: 'Reinstalled Windows/OS', nextStep: 'data-os-reinstall-recovery' },
      { id: 'used-disk-after-format', text: 'Used disk after formatting', nextStep: 'data-post-format-usage' }
    ]
  },

  'data-quick-format-recovery': {
    id: 'data-quick-format-recovery',
    type: 'service',
    title: 'Quick Format Recovery',
    content: 'Quick format recovery has excellent success rates as it only removes the file system, not the actual data.',
    serviceRecommendation: 'Quick format recovery ($200-300) typically recovers 85-95% of data. Time-sensitive - avoid using the drive.',
    urgencyLevel: 'medium',
    choices: [
      { id: 'quick-format-recovery-service', text: 'Quick Format Recovery', nextStep: 'data-recovery-service' },
      { id: 'stop-using-formatted-drive', text: 'Stop Using Drive Immediately', nextStep: 'data-preservation-guide' },
      { id: 'try-recovery-software-format', text: 'Try Recovery Software?', nextStep: 'data-recovery-software' },
      { id: 'call-format-recovery', text: 'Call for Recovery Help', nextStep: 'contact-service' }
    ]
  },

  'data-full-format-recovery': {
    id: 'data-full-format-recovery',
    type: 'service',
    title: 'Full Format Recovery',
    content: 'Full format recovery is more challenging but still possible with professional tools and expertise.',
    serviceRecommendation: 'Full format recovery ($300-500) with 60-80% success rate depending on drive size and usage after format.',
    urgencyLevel: 'high',
    choices: [
      { id: 'full-format-recovery-service', text: 'Full Format Recovery', nextStep: 'data-recovery-service' },
      { id: 'format-recovery-consultation', text: 'Recovery Consultation', nextStep: 'data-recovery-consultation' },
      { id: 'emergency-format-recovery', text: 'Emergency Recovery', nextStep: 'emergency-service' },
      { id: 'call-format-help', text: 'Call for Assessment', nextStep: 'contact-service' }
    ]
  },

  // Virus Damage Branch
  'data-virus-damage': {
    id: 'data-virus-damage',
    type: 'diagnostic',
    title: 'Virus-Damaged Files',
    content: 'Virus damage can range from file corruption to complete encryption. What type of damage occurred?',
    urgencyLevel: 'high',
    choices: [
      { id: 'files-encrypted-ransom', text: 'Files encrypted with ransom demand', nextStep: 'data-ransomware-recovery' },
      { id: 'files-deleted-by-virus', text: 'Files deleted by virus', nextStep: 'data-virus-deletion' },
      { id: 'files-corrupted-virus', text: 'Files corrupted by virus', nextStep: 'data-virus-corruption' },
      { id: 'unknown-virus-damage', text: 'Not sure what virus did', nextStep: 'data-virus-assessment' }
    ]
  },

  'data-ransomware-recovery': {
    id: 'data-ransomware-recovery',
    type: 'service',
    title: 'Ransomware File Recovery',
    content: 'Ransomware encryption is serious. DO NOT PAY the ransom. Professional recovery may be possible.',
    serviceRecommendation: 'EMERGENCY: Ransomware recovery ($400-800) includes isolation, decryption attempts, and system restoration. FBI reporting recommended.',
    urgencyLevel: 'emergency',
    choices: [
      { id: 'emergency-ransomware-recovery', text: 'Emergency Ransomware Recovery', nextStep: 'emergency-service' },
      { id: 'isolate-infected-computer', text: 'Isolate Computer First', nextStep: 'data-ransomware-isolation' },
      { id: 'report-to-authorities', text: 'Report to FBI/Authorities', nextStep: 'data-ransomware-reporting' },
      { id: 'call-ransomware-emergency', text: 'Call Ransomware Emergency', nextStep: 'contact-service' }
    ]
  },

  'data-virus-deletion': {
    id: 'data-virus-deletion',
    type: 'service',
    title: 'Virus File Deletion Recovery',
    content: 'Files deleted by viruses can often be recovered using specialized tools and techniques.',
    serviceRecommendation: 'Virus deletion recovery ($200-350) includes malware removal, file recovery, and system security hardening.',
    choices: [
      { id: 'virus-deletion-recovery', text: 'Virus Deletion Recovery', nextStep: 'data-recovery-service' },
      { id: 'clean-virus-first', text: 'Clean Virus First', nextStep: 'virus-removal-service' },
      { id: 'combined-virus-recovery', text: 'Combined Virus & Recovery Service', nextStep: 'data-virus-combo-service' },
      { id: 'call-virus-recovery', text: 'Call for Help', nextStep: 'contact-service' }
    ]
  },

  // Computer Won't Start - Data Recovery
  'data-computer-failure': {
    id: 'data-computer-failure',
    type: 'diagnostic',
    title: 'Computer Failure Data Recovery',
    content: 'When computers won\'t start, data can often still be recovered. What\'s happening with your computer?',
    choices: [
      { id: 'computer-completely-dead', text: 'Computer completely dead', nextStep: 'data-dead-computer-recovery' },
      { id: 'computer-blue-screen', text: 'Blue screen/crashes', nextStep: 'data-system-crash-recovery' },
      { id: 'computer-boot-loops', text: 'Starts but won\'t load Windows', nextStep: 'data-boot-failure-recovery' },
      { id: 'computer-hardware-failure', text: 'Hardware failure suspected', nextStep: 'data-hardware-failure-recovery' }
    ]
  },

  'data-dead-computer-recovery': {
    id: 'data-dead-computer-recovery',
    type: 'service',
    title: 'Dead Computer Data Recovery',
    content: 'Even when computers are completely dead, data can usually be recovered by removing and accessing the hard drive.',
    serviceRecommendation: 'Dead computer data recovery ($200-400) includes drive removal, external access, and data extraction to new media.',
    choices: [
      { id: 'dead-computer-recovery-service', text: 'Dead Computer Recovery', nextStep: 'data-recovery-service' },
      { id: 'drive-removal-service', text: 'Drive Removal & Access', nextStep: 'data-drive-extraction' },
      { id: 'emergency-dead-recovery', text: 'Emergency Recovery', nextStep: 'emergency-service' },
      { id: 'call-dead-computer-help', text: 'Call for Help', nextStep: 'contact-service' }
    ]
  },

  'data-boot-failure-recovery': {
    id: 'data-boot-failure-recovery',
    type: 'service',
    title: 'Boot Failure Data Recovery',
    content: 'Boot failures often leave data intact. Recovery can be done without affecting your files.',
    serviceRecommendation: 'Boot failure recovery ($150-300) includes data extraction, system repair attempts, and file preservation.',
    choices: [
      { id: 'boot-failure-recovery-service', text: 'Boot Failure Recovery', nextStep: 'data-recovery-service' },
      { id: 'try-safe-mode-recovery', text: 'Try Safe Mode Recovery?', nextStep: 'data-safe-mode-recovery' },
      { id: 'live-boot-recovery', text: 'Live Boot Data Access', nextStep: 'data-live-boot-service' },
      { id: 'call-boot-recovery', text: 'Call for Help', nextStep: 'contact-service' }
    ]
  },

  // Backup and Prevention
  'data-backup-solutions': {
    id: 'data-backup-solutions',
    type: 'service',
    title: 'Data Backup & Prevention',
    content: 'Preventing data loss is much better than recovery. We offer comprehensive backup solutions.',
    serviceRecommendation: 'Backup setup service ($100-200) includes automatic backup configuration, cloud storage setup, and recovery testing.',
    choices: [
      { id: 'backup-setup-service', text: 'Backup Setup Service', nextStep: 'data-backup-service' },
      { id: 'cloud-vs-local-backup', text: 'Cloud vs Local Backup?', nextStep: 'data-backup-comparison' },
      { id: 'automated-backup-plans', text: 'Automated Backup Plans', nextStep: 'protection-plans' },
      { id: 'backup-consultation', text: 'Backup Consultation', nextStep: 'contact-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Recovery Services and Consultations
  'data-recovery-consultation': {
    id: 'data-recovery-consultation',
    type: 'service',
    title: 'Data Recovery Consultation',
    content: 'Get expert assessment of your data recovery situation and options.',
    serviceRecommendation: 'Free data recovery consultation includes damage assessment, recovery probability, timeline, and cost estimate.',
    choices: [
      { id: 'free-recovery-consultation', text: 'Free Recovery Consultation', nextStep: 'contact-service' },
      { id: 'bring-drive-assessment', text: 'Bring Drive for Assessment', nextStep: 'data-drive-assessment' },
      { id: 'remote-consultation', text: 'Remote Consultation', nextStep: 'data-remote-assessment' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'data-backup-service': {
    id: 'data-backup-service',
    type: 'service',
    title: 'Professional Backup Setup',
    content: 'Complete backup solution setup including automated scheduling, testing, and monitoring.',
    serviceRecommendation: 'Backup service ($150-250) includes backup software setup, cloud integration, scheduling, and disaster recovery planning.',
    choices: [
      { id: 'complete-backup-setup', text: 'Complete Backup Setup', nextStep: 'inhome-service' },
      { id: 'business-backup-solutions', text: 'Business Backup Solutions', nextStep: 'business-protection' },
      { id: 'cloud-backup-only', text: 'Cloud Backup Setup Only', nextStep: 'data-cloud-backup' },
      { id: 'call-backup-questions', text: 'Call with Questions', nextStep: 'contact-service' }
    ]
  },

  // Emergency Procedures
  'data-emergency-shutdown': {
    id: 'data-emergency-shutdown',
    type: 'solution',
    title: 'Emergency Data Preservation',
    content: 'To preserve data with a failing drive:\n1. Stop all activity immediately\n2. Power down computer safely\n3. Do NOT restart or attempt repairs\n4. Remove power and network connections\n5. Call (757) 375-6764 for emergency service',
    urgencyLevel: 'emergency',
    choices: [
      { id: 'computer-powered-down', text: 'Computer Safely Powered Down', nextStep: 'emergency-service' },
      { id: 'cant-power-down', text: 'Computer Won\'t Power Down', nextStep: 'data-force-shutdown' },
      { id: 'call-emergency-data', text: 'Call Emergency Data Line', nextStep: 'contact-service' }
    ]
  },

  'data-preservation-guide': {
    id: 'data-preservation-guide',
    type: 'solution',
    title: 'Data Preservation Guidelines',
    content: 'To maximize recovery chances:\n\n• Stop using the affected drive immediately\n• Don\'t install recovery software on the same drive\n• Don\'t attempt DIY repairs\n• Keep drive powered off when possible\n• Contact professionals within 24-48 hours',
    urgencyLevel: 'medium',
    choices: [
      { id: 'preservation-understood', text: 'Will Follow These Guidelines', nextStep: 'data-recovery-service' },
      { id: 'already-used-drive', text: 'Already Used Drive After Loss', nextStep: 'data-usage-assessment' },
      { id: 'need-immediate-help', text: 'Need Immediate Professional Help', nextStep: 'emergency-service' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'data-ransomware-isolation': {
    id: 'data-ransomware-isolation',
    type: 'solution',
    title: 'Ransomware Isolation Protocol',
    content: 'IMMEDIATE ACTIONS for ransomware:\n1. Disconnect from internet/network NOW\n2. Power off computer immediately\n3. Isolate any connected external drives\n4. Do NOT pay ransom\n5. Contact FBI and professional recovery service',
    urgencyLevel: 'emergency',
    choices: [
      { id: 'ransomware-isolated', text: 'System Isolated', nextStep: 'emergency-service' },
      { id: 'cant-isolate-ransomware', text: 'Can\'t Isolate System', nextStep: 'data-force-shutdown' },
      { id: 'call-ransomware-help', text: 'Call Ransomware Emergency', nextStep: 'contact-service' }
    ]
  },

  // Recovery Software and DIY
  'data-recovery-software': {
    id: 'data-recovery-software',
    type: 'solution',
    title: 'DIY Recovery Software',
    content: 'Recovery software can help with simple deletions but has limitations. Professional service recommended for valuable data.',
    choices: [
      { id: 'try-free-software', text: 'Try Free Recovery Software', nextStep: 'data-software-guide' },
      { id: 'software-limitations', text: 'What Are the Limitations?', nextStep: 'data-software-limitations' },
      { id: 'skip-to-professional', text: 'Skip to Professional Recovery', nextStep: 'data-recovery-service' },
      { id: 'call-software-advice', text: 'Call for Software Advice', nextStep: 'contact-service' }
    ]
  },

  'data-software-guide': {
    id: 'data-software-guide',
    type: 'solution',
    title: 'Recovery Software Guide',
    content: 'Recommended free recovery tools:\n• Recuva (by Piriform)\n• PhotoRec (for photos)\n• TestDisk (for partitions)\n\nIMPORTANT: Install on different drive than the one you\'re recovering from!',
    choices: [
      { id: 'software-recovery-worked', text: 'Recovery Software Worked!', nextStep: 'success-data-recovery' },
      { id: 'software-partial-success', text: 'Recovered Some Files', nextStep: 'data-partial-recovery' },
      { id: 'software-didnt-work', text: 'Software Didn\'t Work', nextStep: 'data-recovery-service' },
      { id: 'need-software-help', text: 'Need Help Using Software', nextStep: 'contact-service' }
    ]
  },

  // Success States
  'success-data-recovery': {
    id: 'success-data-recovery',
    type: 'solution',
    title: 'Data Recovery Successful!',
    content: 'Great! Your files have been recovered. Now it\'s important to set up backup protection to prevent future data loss.',
    serviceRecommendation: 'Consider our backup service ($150) or Protection Plan ($19.99/month) to prevent future data loss.',
    choices: [
      { id: 'setup-backup-protection', text: 'Set Up Backup Protection', nextStep: 'data-backup-service' },
      { id: 'backup-prevention-tips', text: 'Data Loss Prevention Tips', nextStep: 'data-prevention-guide' },
      { id: 'protection-plan-data', text: 'Automated Protection Plan', nextStep: 'protection-plans' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  'data-partial-recovery': {
    id: 'data-partial-recovery',
    type: 'diagnostic',
    title: 'Partial Data Recovery',
    content: 'You\'ve recovered some files but others are still missing. Would you like professional help to recover the remaining files?',
    choices: [
      { id: 'recover-remaining-files', text: 'Yes, recover remaining files', nextStep: 'data-recovery-service' },
      { id: 'satisfied-with-partial', text: 'Satisfied with what I recovered', nextStep: 'data-backup-service' },
      { id: 'assess-missing-files', text: 'Assess what\'s still missing', nextStep: 'data-missing-assessment' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  },

  // Additional Services
  'data-drive-extraction': {
    id: 'data-drive-extraction',
    type: 'service',
    title: 'Drive Extraction Service',
    content: 'Professional hard drive removal and external access for data recovery from failed computers.',
    serviceRecommendation: 'Drive extraction ($100) plus data recovery ($150-300). Includes safe removal, external housing, and data access.',
    choices: [
      { id: 'drive-extraction-service', text: 'Drive Extraction Service', nextStep: 'inhome-service' },
      { id: 'extract-and-recover', text: 'Extraction + Recovery', nextStep: 'data-recovery-service' },
      { id: 'diy-drive-removal', text: 'DIY Drive Removal Advice', nextStep: 'data-diy-extraction' },
      { id: 'call-extraction-help', text: 'Call for Help', nextStep: 'contact-service' }
    ]
  },

  'data-virus-combo-service': {
    id: 'data-virus-combo-service',
    type: 'service',
    title: 'Virus Removal + Data Recovery',
    content: 'Combined service to remove virus threats and recover damaged or deleted files.',
    serviceRecommendation: 'Combined virus removal and data recovery ($199) includes malware removal, file recovery, and security hardening.',
    choices: [
      { id: 'combo-virus-recovery', text: 'Book Combined Service', nextStep: 'book-service' },
      { id: 'virus-first-then-recovery', text: 'Virus Removal First', nextStep: 'virus-removal-service' },
      { id: 'recovery-priority', text: 'Data Recovery Priority', nextStep: 'data-recovery-service' },
      { id: 'call-combo-questions', text: 'Call with Questions', nextStep: 'contact-service' }
    ]
  },

  'data-prevention-guide': {
    id: 'data-prevention-guide',
    type: 'solution',
    title: 'Data Loss Prevention Guide',
    content: 'Prevent future data loss:\n\n• Regular automated backups (3-2-1 rule)\n• Use cloud storage for important files\n• Keep antivirus updated\n• Safely eject external drives\n• Monitor drive health\n• Don\'t ignore warning signs',
    choices: [
      { id: 'automated-backup-setup', text: 'Set Up Automated Backups', nextStep: 'data-backup-service' },
      { id: 'drive-health-monitoring', text: 'Drive Health Monitoring', nextStep: 'protection-plans' },
      { id: 'backup-testing-service', text: 'Backup Testing Service', nextStep: 'data-backup-testing' },
      { id: 'back-main', text: 'Back to Main Menu', nextStep: 'start' }
    ]
  }
};