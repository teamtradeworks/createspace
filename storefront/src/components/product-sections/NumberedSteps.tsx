import SectionTracker from "./SectionTracker";

interface Step {
  title: string;
  description: string;
}

interface NumberedStepsProps {
  title: string;
  subtitle?: string;
  steps: Step[];
  background?: "white" | "gray" | "navy" | "navy-card";
  columns?: 2 | 3 | 4;
}

export function NumberedSteps({
  title,
  subtitle,
  steps,
  background = "white",
  columns = 3,
}: NumberedStepsProps) {
  const isNavyCard = background === "navy-card";
  const isNavy = background === "navy" || isNavyCard;

  const bgClass = {
    white: "bg-white",
    gray: "bg-gray-50",
    navy: "bg-navy",
    "navy-card": "bg-white",
  }[background];

  const cardClass = isNavyCard ? "bg-navy rounded-2xl p-8 md:p-12" : "";
  const titleClass = isNavy ? "text-white" : "text-navy";
  const subtitleClass = isNavy ? "text-white/70" : "text-gray-600";
  const descriptionClass = isNavy ? "text-white/70" : "text-gray-600";

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <SectionTracker name="NumberedSteps">
      <section className={`py-16 ${bgClass}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cardClass}>
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-semibold mb-4 ${titleClass}`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`${subtitleClass} max-w-2xl mx-auto`}>
                {subtitle}
              </p>
            )}
          </div>
          <div className={`grid ${gridCols} gap-8`}>
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-cs-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${titleClass}`}>
                  {step.title}
                </h3>
                <p className={descriptionClass}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </SectionTracker>

  );
}
