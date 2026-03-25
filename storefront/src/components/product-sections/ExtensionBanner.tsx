import Link from "next/link";
import SectionTracker from "./SectionTracker";

interface ExtensionBannerProps {
  parentProductName: string;
  parentProductHref: string;
  message?: string;
  background?: "white" | "gray";
}

export function ExtensionBanner({
  parentProductName,
  parentProductHref,
  message,
  background = "white",
}: ExtensionBannerProps) {
  const bgClass = background === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <SectionTracker name="ExtensionBanner">
      <section className={`py-6 ${bgClass} border-b border-gray-200`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4">
            <svg
              className="h-6 w-6 flex-shrink-0 text-[#3CC7F7]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            <p className="text-sm text-navy sm:text-base">
              {message || "This is an expansion pack for the"}{" "}
              {!message && (
                <Link
                  href={parentProductHref}
                  className="font-semibold text-[#3CC7F7] underline underline-offset-2 hover:text-[#0C1446]"
                >
                  {parentProductName}
                </Link>
              )}
              {!message && (
                <span>. Already have one? Add this to unlock new projects and possibilities.</span>
              )}
            </p>
          </div>
        </div>
      </section>
    </SectionTracker>
  );
}
