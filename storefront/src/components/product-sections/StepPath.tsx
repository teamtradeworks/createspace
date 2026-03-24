import SectionTracker from "./SectionTracker";

interface Step {
  title: string;
  description: string;
}

interface StepPathProps {
  title: string;
  subtitle?: string;
  steps: Step[];
  background?: "white" | "gray" | "navy";
}

export function StepPath({ title, subtitle, steps, background = "white" }: StepPathProps) {
  const isNavy = background === "navy";

  const bgClass = {
    white: "bg-white",
    gray: "bg-gray-50",
    navy: "bg-navy",
  }[background];

  const titleClass = isNavy ? "text-white" : "text-navy";
  const subtitleClass = isNavy ? "text-white/70" : "text-gray-600";
  const descClass = isNavy ? "text-white/60" : "text-gray-500";
  const lineClass = isNavy ? "bg-white/20" : "bg-gray-200";

  return (
    <SectionTracker name="StepPath">
      <section className={`py-16 ${bgClass}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-semibold mb-4 ${titleClass}`}>{title}</h2>
            {subtitle && <p className={`${subtitleClass} max-w-2xl mx-auto`}>{subtitle}</p>}
          </div>

          {/* Horizontal pathway */}
          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div
              className={`hidden md:block absolute top-6 left-0 right-0 h-0.5 ${lineClass}`}
              style={{ marginLeft: "12.5%", marginRight: "12.5%" }}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
              {steps.map((step, index) => (
                <div key={index} className="relative text-center">
                  {/* Numbered circle */}
                  <div className="w-12 h-12 bg-cs-orange rounded-full flex items-center justify-center mx-auto mb-3 relative z-10">
                    <span className="text-lg font-bold text-white">{index + 1}</span>
                  </div>
                  <h3 className={`text-sm font-semibold mb-1 ${titleClass}`}>{step.title}</h3>
                  <p className={`text-xs leading-relaxed ${descClass}`}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionTracker>
  );
}
