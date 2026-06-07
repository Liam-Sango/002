import type { Metadata } from "next";
import { Chakra_Petch, Saira, JetBrains_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BootSequence from "@/components/BootSequence";
import Hud from "@/components/Hud";
import "@/app/globals.css";

// Display — an angular, cut-cornered technical face for that NERV terminal /
// HUD readout feel (not Inter/Roboto/system).
const chakra = Chakra_Petch({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

// Body — an industrial humanist sans that stays readable at length.
const saira = Saira({
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

// "LS" glyph favicon — NERV-style: hazard-orange mark on black with a
// notched (cut-corner) frame.
const FAVICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>` +
      `<polygon points='4,4 78,4 96,22 96,96 22,96 4,78' fill='%230a0a0b' stroke='%232bff88' stroke-width='4'/>` +
      `<text x='50' y='70' font-size='50' font-family='Arial, sans-serif' font-weight='700' text-anchor='middle' fill='%232bff88'>LS</text>` +
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
      className={`${chakra.variable} ${saira.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href={FAVICON} />
      </head>
      <body>
        <Hud />
        <NavBar />
        {children}
        <Footer />
        <BootSequence />
      </body>
    </html>
  );
}
