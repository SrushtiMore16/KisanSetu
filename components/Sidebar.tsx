// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sprout, LogOut } from "lucide-react";

// Import configurations directly into the Client Component
import { farmerNavigation } from "@/config/navigation/farmer";
import { traderNavigation } from "@/config/navigation/trader";
import { adminNavigation } from "@/config/navigation/admin";

interface SidebarProps {
  role: "Farmer" | "Trader" | "Admin";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  // Determine which navigation to use based on the role
  const items = 
    role === "Farmer" ? farmerNavigation : 
    role === "Trader" ? traderNavigation : 
    adminNavigation;

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-[#F0EBE1] flex flex-col z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      
      {/* Branding / Logo */}
      <div className="h-24 flex items-center px-8 border-b border-[#F0EBE1]">
        <Link href={`/${role.toLowerCase()}/dashboard`} className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-sage-green text-white group-hover:scale-105 transition-transform">
            <Sprout size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-pitch-black font-heading">
            KisanSetu
          </span>
        </Link>
      </div>

      {/* Role Indicator */}
      <div className="px-8 py-4">
        <span className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider bg-floral-white border border-[#F0EBE1] px-3 py-1.5 rounded-full">
          {role} Portal
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto hide-scrollbar">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors z-10 group ${
                isActive ? "text-sage-green" : "text-golden-chestnut hover:text-pitch-black"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 bg-sage-green/10 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <item.icon 
                size={20} 
                className={`transition-colors ${
                  isActive ? "text-sage-green" : "text-golden-chestnut group-hover:text-pitch-black"
                }`} 
              />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-[#F0EBE1] bg-floral-white/50">
        <button 
          onClick={() => {
            window.location.href = "/login";
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}