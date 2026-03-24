"use client";

import { useState } from "react";
import SectionTracker from "./SectionTracker";

interface Step {
  title: string;
  description: string;
}

interface CourseTab {
  label: string;
  title: string;
  subtitle: string;
  steps: Step[];
}

interface CourseTabsProps {
  tabs: CourseTab[];
}

export function CourseTabs({ tabs }: CourseTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const active = tabs[activeTab];

  return (
    <SectionTracker name="CourseTabs">
      <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-navy text-center mb-8">
          What You&apos;ll Learn
        </h2>

        {/* Tab navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full bg-gray-100 p-1.5 gap-1 shadow-sm border border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                  activeTab === index
                    ? "bg-navy text-white shadow-lg scale-105"
                    : "text-navy hover:text-navy hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active course content */}
        <div className="bg-navy rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold mb-4 text-white">
              {active.title}
            </h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              {active.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {active.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-cs-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                <h4 className="text-xl font-semibold mb-2 text-white">
                  {step.title}
                </h4>
                <p className="text-white/70">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-10">
            {tabs.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                aria-label={`Go to ${tabs[index].label}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  activeTab === index
                    ? "bg-cs-orange w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    </SectionTracker>

  );
}
