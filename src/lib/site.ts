// Central site-wide constants and small shared helpers.

export const SOCIALS = {
  github: "https://github.com/Liam-Sango",
  linkedin: "https://www.linkedin.com/in/liam-sango",
  email: "mailto:hello@liamsango.dev",
  source: "https://github.com/Liam-Sango/002",
};

/** Shorter month/year form, e.g. "2026-03-08" → "Mar 2026". */
export function formatMonth(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "short",
  });
}
