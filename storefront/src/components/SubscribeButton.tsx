"use client";

interface SubscribeButtonProps {
  label: string;
  className?: string;
}

export default function SubscribeButton({ label, className }: SubscribeButtonProps) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-email-popup"))}
      className={className}
    >
      {label}
    </button>
  );
}
