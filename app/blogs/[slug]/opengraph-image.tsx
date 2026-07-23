import { ImageResponse } from "next/og";
import { getBlogById, getPersonalData } from "@/lib/data";

export const alt = "Blog Article Social Preview Card";
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
  const blog = await getBlogById(slug);
  const personal = getPersonalData();

  const title = blog?.title || "Technical Article & Insights";
  const description =
    blog?.description ||
    "Articles, tutorials, and thoughts on software engineering and design by Priyanshu Gupta.";
  const platform = blog?.platform || "Blog";
  const date = blog?.date || "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0F",
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(168, 85, 247, 0.22) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.22) 0%, transparent 50%)",
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
                background: "linear-gradient(135deg, #A855F7, #3B82F6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#FFFFFF",
                boxShadow: "0 4px 12px rgba(168, 85, 247, 0.4)",
              }}
            >
              ✍️
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
                Articles & Writings
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
              textTransform: "uppercase",
            }}
          >
            {platform}
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
              lineHeight: 1.15,
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
            {date ? (
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  background: "rgba(168, 85, 247, 0.15)",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                  color: "#C084FC",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                {date}
              </div>
            ) : null}
          </div>

          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#71717A",
            }}
          >
            priyanshugupta.in/blogs
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
