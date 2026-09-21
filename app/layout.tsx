import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer"; // Import the new Footer
import "./globals.css";

export const metadata: Metadata = {
  title: "KisanSetu - Empowering Farmers, Connecting Markets",
  description: "Manage your crop lifecycle, get AI-powered diagnostics, and negotiate directly with traders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* 
        flex and min-h-screen ensure the footer is always pushed 
        to the very bottom of the window, even if page content is short.
      */}
      <body className="min-h-screen flex flex-col selection:bg-sage-green selection:text-white relative">
        <Navbar />
        
        {/* flex-grow expands this container to push the footer down */}
        <div className="flex-grow flex flex-col pt-20">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}