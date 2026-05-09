/**
 * Cleans a URL string by removing leading/trailing spaces and quotes.
 * This is useful for fixing malformed data that might come from external sources or databases.
 */
export function cleanUrl(url: string | null | undefined): string {
  if (!url) return "";
  
  // Remove spaces and literal double/single quotes from start and end
  return url.trim().replace(/^["']|["']$/g, "").trim();
}

/**
 * Cleans an array of URL strings.
 */
export function cleanUrls(urls: string[] | null | undefined): string[] {
  if (!urls) return [];
  return urls.map(cleanUrl).filter(Boolean);
}
