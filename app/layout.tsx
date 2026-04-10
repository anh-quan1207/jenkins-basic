import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jenkins Demo Todo",
  description: "Simple Next.js todo app for Jenkins seminar demos."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

