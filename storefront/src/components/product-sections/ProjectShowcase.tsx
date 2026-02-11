import Image from "next/image";

interface Project {
  name: string;
  description: string;
  concepts?: string;
  image?: string;
}

interface ProjectShowcaseProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  projects: Project[];
  moreText?: string;
  background?: "white" | "gray" | "navy";
  columns?: 2 | 3;
}

export function ProjectShowcase({
  title,
  highlight,
  subtitle,
  projects,
  moreText,
  background = "white",
  columns = 3,
}: ProjectShowcaseProps) {
  const bgClass = {
    white: "bg-white",
    gray: "bg-gray-50",
    navy: "bg-navy",
  }[background];

  const titleClass = background === "navy" ? "text-white" : "text-navy";
  const highlightClass = background === "navy" ? "text-cs-orange" : "text-cs-blue";
  const subtitleClass = background === "navy" ? "text-white/70" : "text-gray-600";
  const cardBgClass = background === "navy" ? "bg-white/10" : "bg-gray-50";
  const cardBorderClass = background === "navy" ? "border-white/10" : "border-gray-100";
  const projectTitleClass = background === "navy" ? "text-white" : "text-navy";
  const projectDescClass = background === "navy" ? "text-white/70" : "text-gray-600";

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-semibold ${titleClass} text-center mb-4`}>
          {title}
        </h2>
        {highlight && (
          <p className={`text-xl font-semibold ${highlightClass} text-center max-w-2xl mx-auto mb-4`}>
            {highlight}
          </p>
        )}
        {subtitle && (
          <p className={`${subtitleClass} text-center max-w-2xl mx-auto mb-10`}>
            {subtitle}
          </p>
        )}
        {!highlight && !subtitle && <div className="mb-6" />}
        <div className={`grid ${gridCols} gap-6`}>
          {projects.map((project, index) => (
            <div
              key={index}
              className={`${cardBgClass} rounded-xl p-6 border ${cardBorderClass}`}
            >
              {project.image && (
                <div className="w-24 h-24 relative rounded-lg overflow-hidden mb-4">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              )}
              <h3 className={`text-lg font-semibold ${projectTitleClass} mb-2`}>
                {project.name}
              </h3>
              <p className={`${projectDescClass} text-sm mb-3`}>
                {project.description}
              </p>
              {project.concepts && (
                <p className="text-xs text-cs-orange font-medium">
                  Learn: {project.concepts}
                </p>
              )}
            </div>
          ))}
        </div>
        {moreText && (
          <p className={`text-center ${subtitleClass} mt-8`}>
            {moreText}
          </p>
        )}
      </div>
    </section>
  );
}
