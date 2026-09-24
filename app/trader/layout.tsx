import Sidebar from "@/components/Sidebar";

export default function TraderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-floral-white">
      <Sidebar role="Trader" />
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
}