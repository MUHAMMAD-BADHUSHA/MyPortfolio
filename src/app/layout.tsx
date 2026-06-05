import type { Metadata, Viewport } from "next";
import "./globals.css";
import CursorEffect from "@/components/CursorEffect";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Muhammad Badhusha — Junior MERN Stack Developer",
  description:
    "Junior MERN Stack Developer at WebCastle Technologies. Building modern web applications with React, Next.js, Node.js, and Strapi.",
  keywords: [
    "Muhammad Badhusha",
    "MERN Stack",
    "React Developer",
    "Next.js",
    "WebCastle Technologies",
    "portfolio",
  ],
  openGraph: {
    title: "Muhammad Badhusha — Junior MERN Stack Developer",
    description:
      "Junior MERN Stack Developer building modern web applications with React, Next.js, Node.js, and Strapi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-dark text-text font-sans">
        <CursorEffect />
        {children}
      </body>
    </html>
  );
}
