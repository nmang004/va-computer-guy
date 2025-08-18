import { CheckCircle, LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface ServiceFeaturesProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  layout?: "grid" | "list";
  columns?: 2 | 3 | 4;
}

export function ServiceFeatures({
  title = "What's Included",
  subtitle,
  features,
  layout = "grid",
  columns = 3
}: ServiceFeaturesProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3", 
    4: "md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <section className="py-16 bg-va-neutral-50">
      <div className="va-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              {subtitle}
            </p>
          )}
        </div>

        {layout === "grid" ? (
          <div className={`grid gap-8 ${gridCols[columns]} max-w-6xl mx-auto`}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon || CheckCircle;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-va-primary/10 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="h-8 w-8 text-va-primary" />
                  </div>
                  <h3 className="text-xl font-montserrat font-semibold mb-3 text-va-text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-va-text-secondary font-roboto">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon || CheckCircle;
              return (
                <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-lg va-card">
                  <div className="flex-shrink-0 w-12 h-12 bg-va-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-va-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-montserrat font-semibold mb-2 text-va-text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-va-text-secondary font-roboto">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}