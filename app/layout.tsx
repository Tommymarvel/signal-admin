import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal Admin",
  description: "All things Administrative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-white-200 font-man-rope antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
