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
        className={`mb-4 inline-flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
        aria-hidden="true"
      >
        <span
          className="block h-4 w-4 rotate-45 border-[3px] border-border"
          style={{ backgroundColor: accent }}
        />
        <span
          className="block h-[3px] w-12"
          style={{ backgroundColor: accent }}
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
