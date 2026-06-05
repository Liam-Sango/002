import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Liam Sango — Portfolio",
  description: "Portfolio & resume website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
