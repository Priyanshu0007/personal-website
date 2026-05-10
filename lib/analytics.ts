import { trackEvent } from "@/lib/firebase";

// Define a structured object containing all event names to avoid typos
export const AnalyticsEvents = {
  // Navigation
  NAV_LINK_CLICK: "nav_link_click",
  FOOTER_LINK_CLICK: "footer_link_click",
  SOCIAL_LINK_CLICK: "social_link_click",
  THEME_TOGGLE: "theme_toggle",
  
  // Content interaction
  PROJECT_VIEW: "project_view",
  PROJECT_SOURCE_CLICK: "project_source_click",
  PROJECT_DEMO_CLICK: "project_demo_click",
  BLOG_VIEW: "blog_view",
  HOBBY_VIEW: "hobby_view",
  
  // Resumes
  RESUME_VIEW: "resume_view",
  RESUME_DOWNLOAD: "resume_download",

  // Forms
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  CONTACT_FORM_ERROR: "contact_form_error",

  // Misc UI
  CAROUSEL_NEXT: "carousel_next",
  CAROUSEL_PREV: "carousel_prev",
} as const;

// Helper function with strict typing for the event name
export const trackUserAction = (
  eventName: typeof AnalyticsEvents[keyof typeof AnalyticsEvents],
  params?: Record<string, string | number | boolean>
) => {
  trackEvent(eventName, params);
};
