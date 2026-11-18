export type Stamp = { top: string; big: string; bottom: string };

// The round red "Up to 20% off" stamp for the Black Friday sections (decorative: the subhead says the same).
// Tilt and bob come from `.hero-stamp` in globals.css.
export default function SaleStamp({ stamp, className }: { stamp: Stamp; className: string }) {
  const size = "h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20 xl:h-24 xl:w-24";
  const small = "text-[0.6rem] sm:text-[0.65rem] xl:text-xs";
  const big = "text-2xl sm:text-[1.7rem] xl:text-[2rem]";
  return (
    <span
      aria-hidden="true"
      className={`hero-stamp z-10 ${size} flex-col items-center justify-center rounded-full bg-cs-red text-white tracking-normal shadow-sm ring-4 ring-navy ${className}`}
    >
      <span className={`${small} font-bold uppercase leading-tight tracking-wider`}>
        {stamp.top}
      </span>
      <span className={`${big} font-extrabold leading-none`}>{stamp.big}</span>
      <span className={`${small} font-bold uppercase leading-tight tracking-wider`}>
        {stamp.bottom}
      </span>
    </span>
  );
}
