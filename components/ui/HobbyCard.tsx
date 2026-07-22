import type { Hobby } from "@/types";

interface HobbyCardProps {
  hobby: Hobby;
}

export default function HobbyCard({ hobby }: HobbyCardProps) {
  return (
    <div
      className="glass-card glass-border-glow glass-sweep group cursor-default"
      style={
        {
          "--glow-color": hobby.color,
        } as React.CSSProperties
      }
    >
      {/* Emoji */}
      <div
        className="mb-3 text-4xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 md:text-5xl"
        role="img"
        aria-label={`${hobby.title} icon`}
      >
        {hobby.emoji}
      </div>

      {/* Title */}
      <h3 className="text-text mb-2 text-lg font-extrabold">{hobby.title}</h3>

      {/* Description */}
      <p className="text-text-secondary mb-3 text-sm">{hobby.description}</p>

      {/* Tags */}
      {hobby.tags && hobby.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {hobby.tags.map((tag) => (
            <span
              key={tag}
              className="glass-badge text-[0.65rem]"
              style={{
                backgroundColor: hobby.color,
                color: "#fff",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
