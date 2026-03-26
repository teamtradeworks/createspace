import Image from "next/image";
import SectionTracker from "./SectionTracker";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  background?: "white" | "gray" | "navy";
}

// Map icon names to new SVG icon files
const iconFiles: Record<string, string> = {
  // Coding & Tech
  code: "/images/icons/laptop-code.svg",
  cpu: "/images/icons/microchip.svg",
  brain: "/images/icons/brain-circuit.svg",
  robot: "/images/icons/user-robot.svg",
  sensor: "/images/icons/sensor-on.svg",
  wifi: "/images/icons/mobile-button.svg",
  bluetooth: "/images/icons/mobile-button.svg",
  radio: "/images/icons/mobile-button.svg",
  app: "/images/icons/mobile-button.svg",
  display: "/images/icons/display-code.svg",
  ai: "/images/icons/artificial-intelligence.svg",

  // Learning
  book: "/images/icons/book-open-cover.svg",
  guide: "/images/icons/book-open-cover.svg",
  lightbulb: "/images/icons/lightbulb-on.svg",
  compass: "/images/icons/ruler-triangle.svg",
  pencil: "/images/icons/ballot.svg",
  layers: "/images/icons/layer-plus.svg",
  "thought-bubble": "/images/icons/thought-bubble.svg",
  mind: "/images/icons/mind-share.svg",

  // Activities
  puzzle: "/images/icons/puzzle-alt.svg",
  blocks: "/images/icons/dice-d6.svg",
  "building-blocks": "/images/icons/dice-d6.svg",
  tools: "/images/icons/wrench-alt.svg",
  tool: "/images/icons/wrench-alt.svg",
  dice: "/images/icons/dice-alt.svg",
  gamepad: "/images/icons/gamepad.svg",
  remote: "/images/icons/remote-control.svg",
  build: "/images/icons/build-alt.svg",
  running: "/images/icons/running.svg",

  // Power & Energy
  battery: "/images/icons/battery-three-quarters.svg",
  zap: "/images/icons/bolt.svg",
  sun: "/images/icons/brightness.svg",
  plug: "/images/icons/plug-alt.svg",
  wave: "/images/icons/wave-square.svg",

  // People & Community
  users: "/images/icons/people.svg",
  age: "/images/icons/people-line.svg",
  globe: "/images/icons/save-the-planet.svg",
  community: "/images/icons/people-poll.svg",
  language: "/images/icons/bubble-discussion.svg",
  map: "/images/icons/sitemap.svg",
  handshake: "/images/icons/handshake.svg",

  // Online & Cloud
  cloud: "/images/icons/cloud-download-alt.svg",
  "cloud-platform": "/images/icons/cloud-upload-alt.svg",
  "cross-device": "/images/icons/laptop-mobile.svg",
  "open-source": "/images/icons/code-fork.svg",
  compatible: "/images/icons/link-alt.svg",
  chess: "/images/icons/chess-board.svg",
  "arrow-trend-up": "/images/icons/arrow-trend-up.svg",

  // Achievement
  star: "/images/icons/ranking-stars.svg",
  award: "/images/icons/medal.svg",
  shield: "/images/icons/octagon-check.svg",
  "badget-check": "/images/icons/badget-check-alt.svg",
  "octagon-check": "/images/icons/octagon-check.svg",
  "octagon-xmark": "/images/icons/octagon-xmark.svg",
  flag: "/images/icons/flag-checkered.svg",
  target: "/images/icons/ranking-podium-empty.svg",
  rocket: "/images/icons/rocket-lunch.svg",
  medal: "/images/icons/medal.svg",
  podium: "/images/icons/ranking-podium-empty.svg",

  // Media & Senses
  music: "/images/icons/music-alt.svg",
  microphone: "/images/icons/assistive-listening-systems.svg",
  camera: "/images/icons/video-camera-alt.svg",
  eye: "/images/icons/video-camera-alt.svg",
  video: "/images/icons/video-camera-alt.svg",
  waveform: "/images/icons/waveform.svg",
  megaphone: "/images/icons/megaphone-sound-waves.svg",
  headphones: "/images/icons/headphones-rhythm.svg",

  // Data & Analytics
  chart: "/images/icons/chart-mixed.svg",
  activity: "/images/icons/chart-mixed.svg",
  progress: "/images/icons/bars-progress.svg",

  // Misc
  abacus: "/images/icons/abacus.svg",
  time: "/images/icons/clock-five.svg",
  clock: "/images/icons/clock-five.svg",
  calendar: "/images/icons/calendar-lines.svg",
  "refresh-cw": "/images/icons/rotate-left.svg",
  refresh: "/images/icons/rotate-left.svg",
  sparkles: "/images/icons/sparkles.svg",
  palette: "/images/icons/eye-dropper.svg",
  "no-solder": "/images/icons/welding.svg",
  touch: "/images/icons/skill-user.svg",
  tag: "/images/icons/file-invoice.svg",
  math: "/images/icons/square-root.svg",
  temperature: "/images/icons/temperature-high.svg",
  robotic: "/images/icons/robotic-arm.svg",
  arm: "/images/icons/robotic-arm.svg",
  smile: "/images/icons/smile-beam.svg",
};

function FeatureIcon({
  icon,
  iconColor,
}: {
  icon: string;
  iconColor: string;
}) {
  // Check if it's a path to an image
  if (icon.startsWith("/")) {
    return <Image src={icon} alt="" width={28} height={28} className="w-7 h-7" />;
  }

  // Check if we have a new icon file for this name
  const iconFile = iconFiles[icon];
  if (iconFile) {
    return <Image src={iconFile} alt="" width={28} height={28} className="w-7 h-7" />;
  }

  // Default: show the icon name text as fallback
  return <span className={`text-lg font-bold ${iconColor}`}>{icon}</span>;
}

export function FeatureGrid({
  title = "Features",
  subtitle,
  features,
  columns = 3,
  background = "gray",
}: FeatureGridProps) {
  const bgClass = {
    white: "bg-white",
    gray: "bg-gray-50",
    navy: "bg-navy",
  }[background];

  const textClass = background === "navy" ? "text-white" : "text-navy";
  const subtitleClass = background === "navy" ? "text-white/70" : "text-gray-600";
  const cardBg = background === "navy" ? "bg-white/10" : "bg-white";
  const iconBg = background === "navy" ? "bg-cs-orange" : "bg-cs-blue/10";
  const iconColor = background === "navy" ? "text-white" : "text-cs-blue";

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <SectionTracker name="FeatureGrid">
      <section className={`py-16 ${bgClass}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-semibold ${textClass} mb-4`}>{title}</h2>
            {subtitle && <p className={`${subtitleClass} max-w-2xl mx-auto`}>{subtitle}</p>}
          </div>

          {/* Features Grid */}
          <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
            {features.map((feature, index) => (
              <div key={index} className={`${cardBg} rounded-xl p-6 text-center`}>
                {/* Icon */}
                <div
                  className={`w-14 h-14 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <FeatureIcon icon={feature.icon} iconColor={iconColor} />
                </div>

                {/* Content */}
                <h3 className={`text-lg font-semibold ${textClass} mb-2`}>{feature.title}</h3>
                <p className={`text-sm ${subtitleClass}`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionTracker>
  );
}
