// app/page.tsx
import { HeroSection } from "@/components/hero-section";
import { FeatureSection } from "@/components/feature-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <HeroSection />
      <FeatureSection />
    </main>
  );
}