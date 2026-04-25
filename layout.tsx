import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Mercer — Creative Developer",
  description: "Bridging design and engineering. Building digital experiences that matter.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain antialiased">
        {children}
      </body>
    </html>
  );
}
