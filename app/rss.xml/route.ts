import { NextResponse } from "next/server";
import { getAllBlogs, getPersonalData } from "@/lib/data";

export const revalidate = 3600;

export async function GET() {
  const blogs = await getAllBlogs();
  const personal = getPersonalData();
  const baseUrl = personal.seo.siteUrl;

  const rssItemsXml = blogs
    .map((blog) => {
      const blogUrl = blog.url.startsWith("http")
        ? blog.url
        : `${baseUrl}/blogs/${blog.id}`;
      
      const parsedDate = blog.date ? new Date(blog.date) : new Date();
      const pubDate = isNaN(parsedDate.getTime())
        ? new Date().toUTCString()
        : parsedDate.toUTCString();

      return `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${blogUrl}</link>
      <guid isPermaLink="false">${baseUrl}/blogs/${blog.id}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${blog.description}]]></description>
      <dc:creator><![CDATA[${personal.name}]]></dc:creator>
      <category><![CDATA[${blog.platform}]]></category>
    </item>`;
    })
    .join("");

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title><![CDATA[${personal.name} — Blog Articles]]></title>
    <link>${baseUrl}/blogs</link>
    <description><![CDATA[${personal.seo.description}]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeedXml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
