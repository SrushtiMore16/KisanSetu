// config/navigation/farmer.ts
import { 
  LayoutDashboard, 
  Activity, 
  ShieldAlert, 
  Landmark, 
  User, 
  Settings 
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const farmerNavigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/farmer/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Plant Doctor",
    href: "/farmer/diagnosis",
    icon: Activity,
  },
  {
    title: "Risk Engine",
    href: "/farmer/RiskEngine",
    icon: ShieldAlert,
  },
  {
    title: "Scheme Guidance",
    href: "/farmer/schemes",
    icon: Landmark,
  },
  {
    title: "My Profile",
    href: "/farmer/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/farmer/settings",
    icon: Settings,
  },
];
