import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";

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
        className={`bg-white-200 font-man-rope antialiased flex items-start h-screen `}
      >
        <Sidebar />
        <div className="w-full h-full overflow-y-auto">
          <Navbar/>
          {children}
        </div>
      </body>
    </html>
  );
}
