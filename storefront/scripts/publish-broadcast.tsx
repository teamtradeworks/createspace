/* eslint-disable no-console */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import dotenv from "dotenv";
import React from "react";
import { Resend } from "resend";

const here = path.dirname(fileURLToPath(import.meta.url));
const storefrontRoot = path.join(here, "..");
dotenv.config({ path: path.join(storefrontRoot, ".env.local"), quiet: true });
dotenv.config({ path: path.join(storefrontRoot, ".env"), quiet: true });

type EmailModule = {
  default: React.ComponentType<Record<string, unknown>>;
  metadata?: {
    name?: string;
    subject?: string;
    previewText?: string;
  };
  loadProps?: () => Promise<Record<string, unknown>>;
};

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: npm run newsletter:publish -- <slug>");
    console.error("Example: npm run newsletter:publish -- welcome-spring-2026");
    process.exit(1);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const from = process.env.RESEND_FROM_EMAIL;

  const missing: string[] = [];
  if (!apiKey) missing.push("RESEND_API_KEY");
  if (!audienceId) missing.push("RESEND_AUDIENCE_ID");
  if (!from) missing.push("RESEND_FROM_EMAIL");
  if (missing.length > 0) {
    console.error(`Missing env vars: ${missing.join(", ")}`);
    console.error("Set these in storefront/.env.local before running.");
    process.exit(1);
  }

  const modulePath = path.join(storefrontRoot, "emails", `${slug}.tsx`);

  let mod: EmailModule;
  try {
    mod = (await import(pathToFileURL(modulePath).href)) as EmailModule;
  } catch (err) {
    console.error(`Could not load emails/${slug}.tsx`);
    console.error(err);
    process.exit(1);
  }

  const Email = mod.default;
  const meta = mod.metadata ?? {};
  const subject = meta.subject;
  if (!subject) {
    console.error(`emails/${slug}.tsx is missing 'metadata.subject'`);
    process.exit(1);
  }

  let props: Record<string, unknown> = {};
  if (mod.loadProps) {
    try {
      props = await mod.loadProps();
    } catch (err) {
      console.error(`emails/${slug}.tsx loadProps() failed:`);
      console.error(err);
      process.exit(1);
    }
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.broadcasts.create({
    audienceId: audienceId!,
    from: from!,
    subject,
    name: meta.name ?? slug,
    previewText: meta.previewText,
    react: <Email {...props} />,
  });

  if (error) {
    console.error("Resend rejected the broadcast:");
    console.error(error);
    process.exit(1);
  }

  const id = data?.id;
  console.log(`Broadcast created as draft: ${id}`);
  console.log(`Review and send at: https://resend.com/broadcasts/${id}`);
}

void main();
