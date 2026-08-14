import AgeGroupCard from "@/components/AgeGroupCard";
import CategoryChips from "@/components/CategoryChips";
import BrandDecor from "@/components/BrandDecor";
import TrackedLink from "@/components/TrackedLink";

const ageGroups = [
  {
    range: "3-5",
    label: "Early explorers",
    color: "bg-cs-red",
    darkText: false,
    href: "/shop?age=3-5",
    image: "/images/home/age-groups/person-holding-robot-moving-it-on-board.jpg",
    alt: "A person holding a Tale-Bot Pro robot and moving it on a coding board",
    event: "home_page_3to5_clicked",
    imageTransform: "scale(1.25) translateY(-10%)",
  },
  {
    range: "6-8",
    label: "Junior innovators",
    color: "bg-cs-green",
    darkText: true,
    href: "/shop?age=6-8",
    image: "/images/home/age-groups/child-building-while-coding-on-tablet.jpg",
    alt: "A child building a Makerzoid robot while following coding instructions on a tablet",
    event: "home_page_6to8_clicked",
    imageTransform: "scale(1.12) translateY(-8%)",
  },
  {
    range: "9-12",
    label: "Budding engineers",
    color: "bg-cs-blue",
    darkText: true,
    href: "/shop?age=9-12",
    image: "/images/home/age-groups/hand-snapping-pieces-together.jpg",
    alt: "A hand snapping Snap Circuits pieces together to build a circuit",
    event: "home_page_9to12_clicked",
    imageTransform: "none",
  },
  {
    range: "13+",
    label: "Advanced creators",
    color: "bg-cs-purple",
    darkText: false,
    href: "/shop?age=13%2B",
    image: "/images/home/age-groups/teen-working-on-kit-with-workbook-and-laptop.jpg",
    alt: "A teen working on an Arduino kit with a workbook and laptop open beside them",
    event: "home_page_13plus_clicked",
    imageTransform: "scale(1.5) translateY(-16%)",
  },
];

export default function AgeGroups() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 bg-gray-50">
      <BrandDecor
        src="/images/illustrations/atom-1.svg"
        className="right-8 top-10 w-24 rotate-6 opacity-[0.07] lg:w-32"
      />
      <BrandDecor
        src="/images/illustrations/nut.svg"
        className="-left-5 bottom-10 w-20 -rotate-12 opacity-[0.06] lg:w-28"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-3">Find the right kit</h2>
          <p className="text-gray-600">
            Start with their age, or with what they love, or{" "}
            <TrackedLink
              href="/shop"
              event="home_page_shop_link_clicked"
              eventProps={{ source: "agegroups_subtitle" }}
              className="font-medium text-navy underline underline-offset-2 transition-colors hover:text-cs-orange"
            >
              browse the lot
            </TrackedLink>
            .
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {ageGroups.map((group) => (
            <AgeGroupCard
              key={group.range}
              range={group.range}
              label={group.label}
              color={group.color}
              darkText={group.darkText}
              href={group.href}
              image={group.image}
              alt={group.alt}
              event={group.event}
              imageTransform={group.imageTransform}
            />
          ))}
        </div>

        <CategoryChips />
      </div>
    </section>
  );
}
