import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";

const BRAND_NAVY = "#0C1446";
const BRAND_ORANGE = "#FF8B00";
const BRAND_BLUE = "#3CC7F7";
const BRAND_YELLOW = "#FFD500";
const BRAND_GREEN = "#93DB21";

type EmailLayoutProps = {
  previewText: string;
  baseUrl: string;
  children: ReactNode;
};

export function EmailLayout({ previewText, baseUrl, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                navy: BRAND_NAVY,
                orange: BRAND_ORANGE,
                "brand-blue": BRAND_BLUE,
                "brand-yellow": BRAND_YELLOW,
                "brand-green": BRAND_GREEN,
              },
              fontFamily: {
                sans: ["Outfit", "Helvetica", "Arial", "sans-serif"],
              },
            },
          },
        }}
      >
        <Body className="bg-[#f5f6fb] font-sans text-navy">
          <Container className="mx-auto my-6 max-w-[600px] overflow-hidden rounded-2xl bg-white">
            <Section className="bg-navy px-8 py-6 text-center">
              <Img
                src={`${baseUrl}/images/brand/logo-dark.png`}
                width="200"
                height="24"
                alt="CREATESPACE"
                className="mx-auto"
              />
            </Section>

            <Section className="px-8 pt-8">{children}</Section>

            <Hr className="mx-8 my-0 border-gray-200" />

            <Section className="px-8 py-6 text-center">
              <Img
                src={`${baseUrl}/images/illustrations/atom.png`}
                width="40"
                height="37"
                alt=""
                className="mx-2 inline-block"
              />
              <Img
                src={`${baseUrl}/images/illustrations/beaker.png`}
                width="32"
                height="40"
                alt=""
                className="mx-2 inline-block"
              />
              <Img
                src={`${baseUrl}/images/illustrations/lightbulb.png`}
                width="29"
                height="40"
                alt=""
                className="mx-2 inline-block"
              />
              <Text className="m-0 mt-3 text-xs text-gray-500">
                CREATESPACE — STEM toys, kits and education for South African families and schools.
              </Text>
              <Text className="mt-2 text-xs text-gray-500">
                You&apos;re getting this because you subscribed at{" "}
                <Link href="https://www.thecreatespace.co.za" className="text-navy underline">
                  thecreatespace.co.za
                </Link>
                .{" "}
                <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" className="text-navy underline">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
