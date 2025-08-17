import { FlowStep } from '../diagnostic-flows';
import { serviceFlows } from './service-flows';
import { computerStartupFlows } from './computer-startup';
import { performanceIssuesFlows } from './performance-issues';
import { virusMalwareFlows } from './virus-malware';
import { networkIssuesFlows } from './network-issues';
import { hardwareProblemsFlows } from './hardware-problems';
import { dataRecoveryFlows } from './data-recovery';

// Main starting flow
const mainFlow: Record<string, FlowStep> = {
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
  }
};

// Combine all flow modules
export const allDiagnosticFlows: Record<string, FlowStep> = {
  ...mainFlow,
  ...serviceFlows,
  ...computerStartupFlows,
  ...performanceIssuesFlows,
  ...virusMalwareFlows,
  ...networkIssuesFlows,
  ...hardwareProblemsFlows,
  ...dataRecoveryFlows
};

// Export function to get a specific flow step
export function getFlowStep(stepId: string): FlowStep | null {
  return allDiagnosticFlows[stepId] || null;
}

// Export function to get the initial step
export function getInitialStep(): FlowStep {
  return allDiagnosticFlows.start;
}

// Export all flow categories for reference
export const flowCategories = {
  main: mainFlow,
  service: serviceFlows,
  computerStartup: computerStartupFlows,
  performance: performanceIssuesFlows,
  virusMalware: virusMalwareFlows,
  network: networkIssuesFlows,
  hardware: hardwareProblemsFlows,
  dataRecovery: dataRecoveryFlows
};

// Utility function to count total flows
export function getTotalFlowCount(): number {
  return Object.keys(allDiagnosticFlows).length;
}

// Utility function to get flows by category
export function getFlowsByCategory(category: keyof typeof flowCategories): Record<string, FlowStep> {
  return flowCategories[category];
}

// Utility function to validate flow integrity
export function validateFlowIntegrity(): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  const allStepIds = Object.keys(allDiagnosticFlows);
  
  // Check for broken references
  Object.values(allDiagnosticFlows).forEach(step => {
    if (step.choices) {
      step.choices.forEach(choice => {
        if (!allStepIds.includes(choice.nextStep) && !choice.nextStep.startsWith('redirect-')) {
          issues.push(`Step "${step.id}" has invalid choice "${choice.id}" pointing to non-existent step "${choice.nextStep}"`);
        }
      });
    }
    
    if (step.nextStep && !allStepIds.includes(step.nextStep) && !step.nextStep.startsWith('redirect-')) {
      issues.push(`Step "${step.id}" has invalid nextStep pointing to non-existent step "${step.nextStep}"`);
    }
  });
  
  // Check for orphaned steps (steps that can't be reached)
  const reachableSteps = new Set(['start']);
  const queue = ['start'];
  
  while (queue.length > 0) {
    const currentStepId = queue.shift()!;
    const currentStep = allDiagnosticFlows[currentStepId];
    
    if (currentStep) {
      if (currentStep.choices) {
        currentStep.choices.forEach(choice => {
          if (!reachableSteps.has(choice.nextStep) && !choice.nextStep.startsWith('redirect-')) {
            reachableSteps.add(choice.nextStep);
            queue.push(choice.nextStep);
          }
        });
      }
      
      if (currentStep.nextStep && !reachableSteps.has(currentStep.nextStep) && !currentStep.nextStep.startsWith('redirect-')) {
        reachableSteps.add(currentStep.nextStep);
        queue.push(currentStep.nextStep);
      }
    }
  }
  
  const orphanedSteps = allStepIds.filter(stepId => !reachableSteps.has(stepId));
  if (orphanedSteps.length > 0) {
    issues.push(`Orphaned steps (unreachable): ${orphanedSteps.join(', ')}`);
  }
  
  return {
    valid: issues.length === 0,
    issues
  };
}

// Export statistics about the flows
export function getFlowStatistics() {
  const stats = {
    totalSteps: getTotalFlowCount(),
    stepsByType: {
      category: 0,
      question: 0,
      diagnostic: 0,
      solution: 0,
      service: 0
    },
    stepsByUrgency: {
      low: 0,
      medium: 0,
      high: 0,
      emergency: 0,
      none: 0
    },
    stepsByCategory: {
      main: Object.keys(flowCategories.main).length,
      service: Object.keys(flowCategories.service).length,
      computerStartup: Object.keys(flowCategories.computerStartup).length,
      performance: Object.keys(flowCategories.performance).length,
      virusMalware: Object.keys(flowCategories.virusMalware).length,
      network: Object.keys(flowCategories.network).length,
      hardware: Object.keys(flowCategories.hardware).length,
      dataRecovery: Object.keys(flowCategories.dataRecovery).length
    }
  };
  
  // Count steps by type and urgency
  Object.values(allDiagnosticFlows).forEach(step => {
    stats.stepsByType[step.type]++;
    
    const urgency = step.urgencyLevel || 'none';
    stats.stepsByUrgency[urgency]++;
  });
  
  return stats;
}

// Development helper to find steps with missing service recommendations
export function findStepsNeedingServiceRecommendations(): string[] {
  return Object.entries(allDiagnosticFlows)
    .filter(([_, step]) => step.type === 'service' && !step.serviceRecommendation)
    .map(([id, _]) => id);
}

// Development helper to find steps with high urgency
export function findHighUrgencySteps(): string[] {
  return Object.entries(allDiagnosticFlows)
    .filter(([_, step]) => step.urgencyLevel === 'high' || step.urgencyLevel === 'emergency')
    .map(([id, _]) => id);
}