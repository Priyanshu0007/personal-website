interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accent?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export default function SectionHeading({
  title,
  subtitle,
  accent = "var(--color-primary)",
  align = "left",
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-10 md:mb-14 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <div
        className={`mb-4 inline-flex items-center gap-2 ${
          align === "center" ? "justify-center" : ""
        }`}
        aria-hidden="true"
      >
        <span
          className="block h-2.5 w-2.5 rounded-full animate-pulse shadow-md"
          style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }}
        />
        <span
          className="block h-[2px] w-12 rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />
      </div>
      <Tag className="font-extrabold">{title}</Tag>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-lg text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
