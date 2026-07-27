// Sparse, subtle brand illustrations dotted behind section content. Decorative
// only: aria-hidden, non-interactive, hidden on small screens, and sat behind
// content (-z-10) so it never competes with text. The parent <section> must be
// `relative overflow-hidden`. Pass position/size/opacity via `className`
// (e.g. "top-8 right-10 w-28 opacity-[0.07]").
export default function BrandDecor({ src, className = "" }: { src: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- decorative inline SVG, no optimization needed
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none absolute -z-10 hidden h-auto md:block ${className}`}
    />
  );
}
