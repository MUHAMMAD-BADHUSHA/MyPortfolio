import type { Metadata, Viewport } from "next";
import "./globals.css";
import CursorEffect from "@/components/CursorEffect";
import LoadingScreen from "@/components/LoadingScreen";
import Scene3DWrapper from "@/components/Scene3DWrapper";

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
      <body className="min-h-full font-sans" style={{ background: "#050008", color: "#e0e0ff" }}>
        <LoadingScreen />
        <Scene3DWrapper />
        <CursorEffect />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
