export interface FlowStep {
  id: string;
  type: 'category' | 'question' | 'diagnostic' | 'solution' | 'service';
  title: string;
  content: string;
  choices?: FlowChoice[];
  serviceRecommendation?: string;
  urgencyLevel?: 'low' | 'medium' | 'high' | 'emergency';
  nextStep?: string;
}

export interface FlowChoice {
  id: string;
  text: string;
  nextStep: string;
}

// Import the comprehensive diagnostic flows from the modular system
import { allDiagnosticFlows, getFlowStep as getFlowStepFromFlows, getInitialStep as getInitialStepFromFlows } from './flows';

export const diagnosticFlows = allDiagnosticFlows;

export function getFlowStep(stepId: string): FlowStep | null {
  return getFlowStepFromFlows(stepId);
}

export function getInitialStep(): FlowStep {
  return getInitialStepFromFlows();
}