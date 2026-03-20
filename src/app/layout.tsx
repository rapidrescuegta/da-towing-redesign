import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "D&A Towing & Storage | 24/7 Professional Towing in Barrie, Ontario",
  description:
    "Professional towing services in Barrie, Orillia & Essa. Light duty, heavy duty, flatbed, RV towing, accident recovery & storage. Available 24/7. Call 705-795-0993.",
  keywords:
    "towing barrie, tow truck barrie, heavy duty towing, flatbed towing, rv towing, accident towing, auto transport ontario, storage barrie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-midnight text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
