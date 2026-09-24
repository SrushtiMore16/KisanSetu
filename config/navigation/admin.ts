// config/navigation/admin.ts
import { 
  LayoutDashboard, 
  Users, 
  Scale, 
  Settings 
} from "lucide-react";
import { NavItem } from "./farmer"; // Reusing the type

export const adminNavigation: NavItem[] = [
  {
    title: "Platform Overview",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Deal & Disputes",
    href: "/admin/deals",
    icon: Scale,
  },
  {
    title: "System Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];
