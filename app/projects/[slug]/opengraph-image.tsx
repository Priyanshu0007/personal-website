import { ImageResponse } from "next/og";
import { getProjectBySlug, getPersonalData } from "@/lib/data";

export const alt = "Project Social Preview Card";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const personal = getPersonalData();

  const title = project?.title || "Featured Project";
  const description =
    project?.description ||
    "Detailed overview of software engineering project built by Priyanshu Gupta.";
  const techStack = project?.techStack?.slice(0, 5) || [];
  const categoryLabel = project?.category
    ? project.category.replace("-", " ").toUpperCase()
    : "PROJECT";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0A0A0F",
        backgroundImage:
          "radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.22) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(244, 63, 94, 0.22) 0%, transparent 50%)",
        padding: "60px",
        color: "#FFFFFF",
        fontFamily: "sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366F1, #F43F5E)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#FFFFFF",
              boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
            }}
          >
            P
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                fontWeight: "700",
                letterSpacing: "-0.5px",
                color: "#F4F4F5",
              }}
            >
              {personal.name}
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#A1A1AA",
              }}
            >
              {personal.title}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 20px",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.07)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            fontSize: "14px",
            fontWeight: "700",
            color: "#E4E4E7",
            letterSpacing: "1px",
          }}
        >
          {categoryLabel}
        </div>
      </div>

      {/* Center Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          maxWidth: "1050px",
        }}
      >
        <div
          style={{
            fontSize: "56px",
            fontWeight: "900",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            color: "#FFFFFF",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "22px",
            lineHeight: 1.45,
            color: "#A1A1AA",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          {techStack.map((tech) => (
            <div
              key={tech}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                background: "rgba(99, 102, 241, 0.15)",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                color: "#A5B4FC",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        <div
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#71717A",
          }}
        >
          priyanshugupta.in/projects/{slug}
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
