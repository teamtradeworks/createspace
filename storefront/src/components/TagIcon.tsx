// Price-tag mark shared by the shop's "On sale" chip and the header's
// promotion pill. Drawn rather than borrowed so it inherits currentColor
// across every fill it sits on.
export default function TagIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`flex-none ${className}`}
    >
      <path d="M2.2 9.6 9.6 2.2H15.8v6.2L8.4 15.8Z" />
      <circle cx="12.6" cy="5.4" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
