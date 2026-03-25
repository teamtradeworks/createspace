import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Downloads | CREATESPACE",
  description:
    "Download tutorials, code, and guides for your CREATESPACE electronics kits. Resources for Robotico and ACEBOTT products.",
  alternates: {
    canonical: "/downloads",
  },
};

const robotico = [
  {
    name: "Robotico 37 Sensor Module Kit",
    url: "https://drive.google.com/drive/folders/1WKKyLEaIdUF2-rpH3RRkEJ4tbnTW6Uuv",
  },
  {
    name: "Robotico Upgraded Uno R3 Starter Kit",
    url: "https://drive.google.com/drive/folders/18mNwuJUR3XzvOPDmZaOKi4xlZBJkpvXf",
  },
  {
    name: "Robotico Ultimate Uno R3 Starter Kit",
    url: "https://drive.google.com/drive/folders/1zTpQXeyhwTcBZagvnt2Wx25s6dxghMwF",
  },
  {
    name: "Robotico Ultimate Mega 2560 Starter Kit",
    url: "https://drive.google.com/drive/folders/1jQnH_uMB3BlY5R9twg71t6suSNFYlr7l",
  },
  {
    name: "Robotico 37 Sensor Kit V2.0",
    url: "https://drive.google.com/drive/folders/13MMC_iwa-oV8P_wFAXdgLxH7NGqSSmLC",
  },
  {
    name: "Robotico Arduino Smart Robot Car Kit",
    url: "https://drive.google.com/drive/folders/1tB4JMV-FJTxmQd3WwsKb54zSlDGBin5B",
  },
  {
    name: "Robotico Uno R3 + Components Starter Kit",
    url: "https://drive.google.com/drive/folders/1fY3VUF-DN2gxNm55ziAnAn7J7s-PA3tX",
  },
  {
    name: "Robotico ESP32 Starter Kit",
    url: "https://drive.google.com/drive/folders/11tb9rv7CwndZAO0jBjbuJVrq3_XwXLFp",
  },
  {
    name: "Robotico Raspberry Pico Pi Starter Kit",
    url: "https://drive.google.com/drive/folders/1W_pmDoHPNrvXHjbMqCBKu65IbI-a83iQ",
  },
];

const acebott = [
  {
    name: "ACEBOTT Smart Home Basic Starter Kit with Microbit",
    url: "https://drive.google.com/drive/folders/1f9cdfkc6JnZirqv4Q0lyhbCyTHjbGIkw",
  },
  {
    name: "ACEBOTT Smart Car Starter Kit",
    url: "https://drive.google.com/drive/folders/1EO6xuev3SuWMZtdnH9i1rLlnXIJEywN7",
  },
  {
    name: "ACEBOTT IoT Smart Farm Starter Kit",
    url: "https://drive.google.com/drive/folders/1D8XR3N44hHbWGftbK_02sORSCAKfVdw-",
  },
  {
    name: "ACEBOTT Quadruped Bionic Spider Robot with ESP8266",
    url: "https://drive.google.com/drive/folders/158hJ8ttLcUG9ZPQjMRXVlgMbiz4jKKUm",
  },
  {
    name: "ACEBOTT IoT Smart Home Starter Kit",
    url: "https://drive.google.com/drive/folders/13uL8xW1ORshfyPH-vNf6JO_6wVXsGWKY",
  },
  {
    name: "ACEBOTT IoT Smart Home Basic Starter Kit for ESP32",
    url: "https://drive.google.com/drive/folders/124nc4btvdx2lybsGid2MdWrxBscSbVmx",
  },
  {
    name: "ACEBOTT Bionic Biped Robot",
    url: "https://drive.google.com/drive/folders/1l9UqrEvK4zAC4pCI9tX0DCOFynoiBnEk",
  },
  {
    name: "ACEBOTT 4 DOF Robot Arm Kit for ESP32",
    url: "https://drive.google.com/drive/folders/1-s4qW_magcaCvgp1ZRbiah06x1pRl0T-",
  },
  {
    name: "ACEBOTT IoT Weather Station Starter Kit",
    url: "https://drive.google.com/drive/folders/1vuStdvMELxTjP40JNMZi5UHCQnn--zOy",
  },
  {
    name: "ACEBOTT Education Solution Series — Smart Home Education Kit Level 1",
    url: "https://drive.google.com/drive/folders/1WNGRzVZk5faubaJkFGhFgBexuKMkmjZc",
  },
  {
    name: "ACEBOTT Intelligent Transport Education Kit Level 1",
    url: "https://drive.google.com/drive/folders/1tLcXg0Mn0xXpKieKckVw1btuYi_xvyn7",
  },
  {
    name: "ACEBOTT Smart Factory Education Kit Level 1",
    url: "https://drive.google.com/drive/folders/1wL-OzwXZQTUti1aICHn7UwRTHUgof8VJ",
  },
  {
    name: "ACEBOTT ESP32 Camera Expansion Pack",
    url: "https://drive.google.com/drive/folders/125JUsyRDWfONRRo6kG7xw20ngs5I-fy7",
  },
  {
    name: "ACEBOTT ESP32 Tank Expansion Pack",
    url: "https://drive.google.com/drive/folders/1FXoYAwruMjOsPFrJJonmcV4-JJvgv_Vj",
  },
  {
    name: "ACEBOTT Robot Arm Expansion Pack",
    url: "https://drive.google.com/drive/folders/12vWkW0fphI5IbkRbRm04TjohAW5JhDhr",
  },
];

function DownloadIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  );
}

function DownloadList({ items }: { items: { name: string; url: string }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm hover:border-cs-orange/40 hover:shadow-md transition-all group"
          >
            <span className="font-medium text-navy group-hover:text-cs-orange transition-colors">
              {item.name}
            </span>
            <span className="text-cs-orange flex-shrink-0 flex items-center gap-1.5 text-sm font-medium">
              <DownloadIcon />
              <span className="hidden sm:inline">Download</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function DownloadsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              Resources
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mt-2 mb-4">
              Guides &amp; Downloads
            </h1>
            <p className="text-white/70 text-lg">
              Download the tutorials, code, and other resources for your
              CREATESPACE electronics kit.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-14">
          {/* ROBOTICO */}
          <div>
            <h2 className="text-2xl font-semibold text-navy mb-6">Robotico</h2>
            <DownloadList items={robotico} />
          </div>

          {/* ACEBOTT */}
          <div>
            <h2 className="text-2xl font-semibold text-navy mb-6">ACEBOTT</h2>
            <DownloadList items={acebott} />
          </div>
        </div>
      </section>

      {/* Help CTA */}
      <section className="py-14 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            If your kit isn&apos;t listed or you need additional support, get in touch
            and we&apos;ll help you out.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
