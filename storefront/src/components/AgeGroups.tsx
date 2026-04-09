"use client";

import Link from "next/link";
import { capture } from "@/lib/analytics";

const ageGroups = [
  {
    range: "3-5",
    label: "Early Explorers",
    color: "bg-cs-red",
    href: "/shop?age=3-5",
  },
  {
    range: "6-8",
    label: "Junior Innovators",
    color: "bg-cs-green",
    href: "/shop?age=6-8",
  },
  {
    range: "9-12",
    label: "Budding Engineers",
    color: "bg-cs-blue",
    href: "/shop?age=9-12",
  },
  {
    range: "13+",
    label: "Advanced Creators",
    color: "bg-cs-purple",
    href: "/shop?age=13+",
  },
];

export default function AgeGroups() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-navy mb-3">Shop by Age Group</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect STEM kit matched to your child&apos;s age and skill level
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ageGroups.map((group) => (
            <Link
              key={group.range}
              href={group.href}
              onClick={() => {
                const eventMap: Record<string, string> = {
                  "3-5": "home_page_3to5_clicked",
                  "6-8": "home_page_6to8_clicked",
                  "9-12": "home_page_9to12_clicked",
                  "13+": "home_page_13plus_clicked",
                };
                const event = eventMap[group.range];
                if (event) capture(event);
              }}
              className={`${group.color} rounded-xl p-6 text-white hover:scale-105 transition-transform relative overflow-hidden group`}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="80" cy="20" r="30" />
                  <circle cx="20" cy="80" r="20" />
                </svg>
              </div>

              <div className="relative">
                <span className="text-4xl md:text-5xl font-bold block mb-1">{group.range}</span>
                <span className="text-sm md:text-base font-medium opacity-90">{group.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
