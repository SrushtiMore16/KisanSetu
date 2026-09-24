// config/navigation/trader.ts
import { 
  LayoutDashboard, 
  Store, 
  Handshake, 
  ShieldCheck, 
  Building, 
  Settings 
} from "lucide-react";
import { NavItem } from "./farmer"; // Reusing the type

export const traderNavigation: NavItem[] = [
  {
    title: "Trader Hub",
    href: "/trader/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Marketplace",
    href: "/trader/marketplace",
    icon: Store,
  },
  {
    title: "Deal Management",
    href: "/trader/deals",
    icon: Handshake,
  },
  {
    title: "Verification",
    href: "/trader/verification",
    icon: ShieldCheck,
  },
  {
    title: "Business Profile",
    href: "/trader/profile",
    icon: Building,
  },
  {
    title: "Settings",
    href: "/trader/settings",
    icon: Settings,
  },
];
