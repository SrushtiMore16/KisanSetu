import Sidebar from "@/components/Sidebar";

export default function FarmerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-floral-white">
      <Sidebar role="Farmer" />
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
}