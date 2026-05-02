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
            className="flex items-center gap-4 px-6 text-lg md:text-xl font-extrabold uppercase tracking-wider whitespace-nowrap text-[var(--color-text)]"
          >
            {item}
            <span className="block w-3 h-3 bg-[var(--color-primary)] border-[2px] border-[var(--color-border)] rotate-45" />
          </span>
        ))}
      </div>
    </div>
  );
}
