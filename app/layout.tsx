import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jana - Farmer & Trader Platform",
  description: "Connecting farmers and traders with AI diagnostics and real-time marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen selection:bg-[#7D9F30] selection:text-white">
        {children}
      </body>
    </html>
  );
}