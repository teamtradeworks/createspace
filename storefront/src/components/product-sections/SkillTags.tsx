import SectionTracker from "./SectionTracker";

interface SkillTagsProps {
  tags: string[];
  title?: string;
  background?: "white" | "gray" | "navy";
}

const tagColors: Record<string, string> = {
  // STEM Skills
  "Circuits": "bg-cs-blue/10 text-cs-blue border-cs-blue/20",
  "Coding": "bg-cs-purple/10 text-cs-purple border-cs-purple/20",
  "Robotics": "bg-cs-orange/10 text-cs-orange border-cs-orange/20",
  "Mechanical Engineering": "bg-cs-green/10 text-cs-green border-cs-green/20",
  "Electronics": "bg-cs-blue/10 text-cs-blue border-cs-blue/20",
  "Science": "bg-cs-purple/10 text-cs-purple border-cs-purple/20",
  "Mathematics": "bg-cs-orange/10 text-cs-orange border-cs-orange/20",
  // Life Skills
  "Problem Solving": "bg-navy/10 text-navy border-navy/20",
  "Logical Thinking": "bg-navy/10 text-navy border-navy/20",
  "Creativity": "bg-cs-yellow/20 text-amber-700 border-cs-yellow/30",
  "Following Instructions": "bg-gray-100 text-gray-700 border-gray-200",
  "Fine Motor Skills": "bg-gray-100 text-gray-700 border-gray-200",
  "Patience & Focus": "bg-gray-100 text-gray-700 border-gray-200",
};

const defaultTagColor = "bg-navy/10 text-navy border-navy/20";

export function SkillTags({
  tags,
  title = "Skills",
  background = "white",
}: SkillTagsProps) {
  const bgClass = {
    white: "bg-white",
    gray: "bg-gray-50",
    navy: "bg-navy",
  }[background];

  const titleClass = background === "navy" ? "text-white" : "text-navy";

  return (
    <SectionTracker name="SkillTags">
      <section className={`py-8 ${bgClass}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className={`text-sm font-medium ${titleClass} mr-2`}>
            {title}:
          </span>
          {tags.map((tag) => (
            <span
              key={tag}
              className={`px-4 py-1.5 text-sm font-medium rounded-full border ${
                tagColors[tag] || defaultTagColor
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
    </SectionTracker>

  );
}
