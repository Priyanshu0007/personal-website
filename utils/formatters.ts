/**
 * Cleans a URL string by removing leading/trailing spaces and quotes.
 * This is useful for fixing malformed data that might come from external sources or databases.
 */
export function cleanUrl(url: string | null | undefined): string {
  if (!url) return "";

  // Remove spaces and literal double/single quotes from start and end
  return url
    .trim()
    .replace(/^["']|["']$/g, "")
    .trim();
}

/**
 * Cleans an array of URL strings.
 */
export function cleanUrls(urls: string[] | null | undefined): string[] {
  if (!urls) return [];
  return urls.map(cleanUrl).filter(Boolean);
}

/**
 * Formats a date string or Date object into a localized human-readable string.
 * Defaults to "MMM D, YYYY" format in en-US locale.
 */
export function formatDate(
  dateInput: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
): string {
  if (!dateInput) return "";

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", options);
}
