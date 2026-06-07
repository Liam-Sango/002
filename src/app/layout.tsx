import type { Metadata } from "next";
import { Outfit, Manrope, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";

// Display — a clean geometric sans with crisp, modern forms that suit
// the glass aesthetic (not Inter/Roboto/system).
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

// Body — a soft humanist sans, easy to read over frosted surfaces.
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

// Mono — technical labels, metadata, badges.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-jb",
});

export const metadata: Metadata = {
  title: "Liam Sango — Full-Stack Developer",
  description:
    "Portfolio and resume of Liam Sango — a full-stack developer building fast, thoughtful web applications.",
  openGraph: {
    title: "Liam Sango — Full-Stack Developer",
    description:
      "Portfolio and resume of Liam Sango — a full-stack developer building fast, thoughtful web applications.",
    type: "website",
  },
};

// "LS" glyph favicon — frosted dark glass block with a luminous edge.
const FAVICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>` +
      `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
      `<stop offset='0' stop-color='%23161a22'/><stop offset='1' stop-color='%230a0c11'/>` +
      `</linearGradient></defs>` +
      `<rect x='3' y='3' width='94' height='94' rx='24' fill='url(%23g)' stroke='%23ffffff' stroke-opacity='0.25' stroke-width='2'/>` +
      `<text x='50' y='69' font-size='50' font-family='Arial, sans-serif' font-weight='700' text-anchor='middle' fill='%23eaf1ff'>LS</text>` +
      `</svg>`,
  );

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href={FAVICON} />
      </head>
      <body>{children}</body>
    </html>
  );
}
