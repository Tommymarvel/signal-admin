import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";



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
        className={`bg-white-200 font-man-rope antialiased `}
      >
        {children}
        <ToastContainer position="bottom-right" theme="dark" draggable/>
      </body>
    </html>
  );
}
