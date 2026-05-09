"use client";

interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  // Duplicate items for seamless loop
  const duplicated = [...items, ...items];

  return (
    <div className="w-full overflow-hidden border-y-[3px] border-[var(--color-border)] bg-[var(--color-surface)] py-4">
      <div className="marquee-track">
        {duplicated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center text-lg font-extrabold tracking-wider whitespace-nowrap text-[var(--color-text)] uppercase md:text-xl"
          >
            {item}
            <span className="mx-4 block h-3 w-3 rotate-45 border-[2px] border-[var(--color-border)] bg-[var(--color-primary)]" />
          </span>
        ))}
      </div>
    </div>
  );
}
