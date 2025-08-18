"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQ[];
}

export function FAQAccordion({
  title = "Frequently Asked Questions",
  subtitle = "Get answers to common questions about our service",
  faqs
}: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-va-neutral-50">
      <div className="va-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
            {title}
          </h2>
          <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(index);
            return (
              <div key={index} className="bg-white rounded-lg va-card overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-va-neutral-50 transition-colors"
                >
                  <h3 className="font-montserrat font-semibold text-va-text-primary pr-4">
                    {faq.question}
                  </h3>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-va-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-va-primary flex-shrink-0" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-va-neutral-200 pt-4">
                      <p className="text-va-text-secondary font-roboto leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}