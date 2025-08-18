import { LucideIcon } from "lucide-react";

interface TimelineStep {
  number: number;
  title: string;
  description: string;
  icon?: LucideIcon;
  estimatedTime?: string;
}

interface ProcessTimelineProps {
  title?: string;
  subtitle?: string;
  steps: TimelineStep[];
}

export function ProcessTimeline({
  title = "Our Process",
  subtitle = "Here's how we handle your service from start to finish",
  steps
}: ProcessTimelineProps) {
  return (
    <section className="py-16 bg-va-neutral-100">
      <div className="va-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
            {title}
          </h2>
          <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-va-primary/20 hidden md:block"></div>
            
            <div className="space-y-12">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="relative flex items-start gap-6">
                    {/* Step number/icon */}
                    <div className="flex-shrink-0 w-16 h-16 bg-va-primary rounded-full flex items-center justify-center text-white font-montserrat font-bold text-lg relative z-10">
                      {IconComponent ? (
                        <IconComponent className="h-8 w-8" />
                      ) : (
                        step.number
                      )}
                    </div>

                    {/* Step content */}
                    <div className="flex-1 pb-8">
                      <div className="bg-white rounded-lg p-6 va-card">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-montserrat font-semibold text-va-text-primary">
                            Step {step.number}: {step.title}
                          </h3>
                          {step.estimatedTime && (
                            <span className="text-sm text-va-text-muted bg-va-neutral-100 px-3 py-1 rounded-full">
                              {step.estimatedTime}
                            </span>
                          )}
                        </div>
                        <p className="text-va-text-secondary font-roboto">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}