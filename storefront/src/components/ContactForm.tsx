"use client";

import { useEffect, useRef, useState } from "react";
import { capture, identify, group } from "@/lib/analytics";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  schoolName: string;
  position: string;
}

interface ContactFormProps {
  showEducationFields?: boolean;
  educationSource?: string;
}

const subjectOptions = [
  "Product Question",
  "Order Enquiry",
  "School / Bulk Order",
  "Returns & Refunds",
  "Partnership Opportunity",
  "Other",
];

/**
 * Shared field styling. Navy is the ink and the focus colour throughout — the
 * brand orange sits at 2.35:1 on white, so it is never used for text, borders,
 * or focus rings. The border is navy/50 (3.4:1 on white) so the field boundary
 * clears WCAG 1.4.11; the form is always rendered on a white card.
 */
const fieldClass =
  "w-full px-4 py-3 bg-white text-navy border border-navy/50 rounded-lg " +
  "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-navy " +
  "focus:border-navy transition-colors";

const labelClass = "block text-sm font-medium text-navy mb-1";

/** The asterisk is a shape, not a colour cue — `required` carries it for assistive tech. */
function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-navy">
      *
    </span>
  );
}

export default function ContactForm({
  showEducationFields = false,
  educationSource,
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    schoolName: "",
    position: "",
  });
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // The form is torn out and replaced on success, so move focus to the
  // confirmation — otherwise focus falls back to <body> and the outcome is
  // never announced.
  useEffect(() => {
    if (isSubmitted) successRef.current?.focus();
  }, [isSubmitted]);

  // The error renders above the form and can be off-screen after scrolling.
  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const submitData = showEducationFields
        ? {
            ...formData,
            subject: educationSource
              ? `Education Enquiry — ${educationSource}`
              : "Education Enquiry",
          }
        : formData;
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            "We couldn't send your message. Try again, or email us at info@thecreatespace.co.za.",
        );
        return;
      }

      capture("contact_form_submitted", { subject: submitData.subject });
      if (formData.email) {
        identify(formData.email, {
          email: formData.email,
          name: formData.name,
        });
      }
      if (submitData.subject === "School / Bulk Order" || showEducationFields) {
        group("enquiry_type", "school", {
          source: "contact_form",
        });
      }

      // Only send the address to the newsletter audience when it was actually
      // opted in — an unticked box is not consent to be stored as a contact.
      if (subscribeToNewsletter && formData.email) {
        try {
          const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email.trim(),
              subscribed: true,
            }),
          });
          if (res.ok) {
            capture("newsletter_subscribed", { source: "contact_form" });
          }
        } catch {
          // Don't let newsletter subscription errors affect the form submission
        }
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        schoolName: "",
        position: "",
      });
    } catch {
      setError(
        "We couldn't reach the server. Check your connection and try again, or email us at info@thecreatespace.co.za.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="bg-cs-green/10 ring-1 ring-cs-green/40 rounded-xl p-8 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
      >
        <div className="w-16 h-16 bg-cs-green rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-navy"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-navy mb-2">Message sent</h3>
        <p className="text-gray-600 mb-6">
          Thanks for reaching out. We&apos;ll get back to you within one business day.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-navy font-medium underline decoration-2 decoration-cs-orange underline-offset-4 hover:decoration-navy transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={showEducationFields ? "Education enquiry form" : "Contact form"}
      className="space-y-5"
    >
      {error && (
        <div
          ref={errorRef}
          role="alert"
          tabIndex={-1}
          className="flex items-start gap-3 bg-cs-red/10 ring-1 ring-cs-red/40 text-navy rounded-lg p-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
        >
          <svg
            className="w-5 h-5 shrink-0 text-cs-red"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <p>{error}</p>
        </div>
      )}

      {showEducationFields ? (
        <>
          {/* Education layout: Name + Position, School, Email + Phone, Message */}
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Name <RequiredMark />
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={fieldClass}
              />
            </div>

            {/* Position Held */}
            <div>
              <label htmlFor="position" className={labelClass}>
                Position held
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. Principal, HOD, Teacher"
                className={fieldClass}
              />
            </div>
          </div>

          {/* School Name */}
          <div>
            <label htmlFor="schoolName" className={labelClass}>
              School name
            </label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              placeholder="Your school name"
              className={fieldClass}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Email <RequiredMark />
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={fieldClass}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={fieldClass}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Standard layout: Name + Email, Phone + Subject, Message */}
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Name <RequiredMark />
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={fieldClass}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Email <RequiredMark />
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Phone */}
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={fieldClass}
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className={labelClass}>
                Subject <RequiredMark />
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className={fieldClass}
              >
                <option value="">Select a topic</option>
                {subjectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Message {!showEducationFields && <RequiredMark />}
        </label>
        <textarea
          id="message"
          name="message"
          required={!showEducationFields}
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          className={`${fieldClass} resize-y min-h-[8rem]`}
        />
      </div>

      {/* Newsletter opt-in */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={subscribeToNewsletter}
          onChange={(e) => setSubscribeToNewsletter(e.target.checked)}
          className="mt-0.5 h-5 w-5 rounded border-navy/50 accent-navy focus:ring-navy cursor-pointer"
        />
        <span className="text-sm text-gray-600">
          Keep me updated with new products, STEM deals, and education resources.
        </span>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-cs-orange text-navy hover:bg-navy hover:text-white font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-cs-orange disabled:hover:text-navy flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send message
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
