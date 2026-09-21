// components/footer.tsx
import Link from "next/link";
import { Sprout, Send } from "lucide-react";

// Native SVGs to replace the deprecated Lucide brand icons
const SocialIcons = [
  {
    name: "X (Twitter)",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.002 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881zM21.94 8.01c-.135-2.951-1.267-5.568-3.488-7.79S13.612-.134 10.66.002C7.593.14 4.887 1.34 2.668 3.559c-2.22 2.22-3.418 4.925-3.557 7.992-.135 2.951 1.002 5.655 3.22 7.874 2.22 2.22 4.927 3.42 7.992 3.557 3.033.136 5.698-.992 7.937-3.23 2.238-2.24 3.366-4.905 3.23-7.938zm-2.484 10.873c-1.682 1.68-3.743 2.55-6.126 2.454-2.502-.102-4.667-1.077-6.386-2.796-1.72-1.719-2.694-3.884-2.796-6.387-.097-2.383.774-4.445 2.454-6.126 1.681-1.681 3.744-2.55 6.126-2.454 2.503.102 4.668 1.077 6.387 2.796 1.719 1.72 2.694 3.885 2.796 6.387.096 2.383-.775 4.444-2.455 6.126z" />
      </svg>
    ),
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-floral-white border-t border-[#F0EBE1] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand & Description */}
          <div className="flex flex-col items-start gap-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-sage-green/10 text-sage-green transition-colors">
                <Sprout size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-pitch-black font-heading">
                KisanSetu
              </span>
            </Link>
            <p className="text-sm font-medium text-golden-chestnut leading-relaxed mt-2">
              Empowering farmers and connecting markets through AI diagnostics, lifecycle tracking, and a verified trading network.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-2">
              {SocialIcons.map((social) => (
                <a 
                  key={social.name} 
                  href="#" 
                  aria-label={social.name}
                  className="text-golden-chestnut hover:text-sage-green hover:-translate-y-1 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold text-pitch-black font-heading mb-2">Platform</h4>
            {["Marketplace", "Crop Diagnostics", "Weather Alerts", "Pricing"].map((item) => (
              <Link 
                key={item} 
                href="#" 
                className="text-sm font-medium text-golden-chestnut hover:text-sage-green transition-colors w-fit"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold text-pitch-black font-heading mb-2">Company</h4>
            {["About Us", "Careers", "Privacy Policy", "Terms of Service"].map((item) => (
              <Link 
                key={item} 
                href="#" 
                className="text-sm font-medium text-golden-chestnut hover:text-sage-green transition-colors w-fit"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Newsletter / CTA */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <h4 className="text-lg font-bold text-pitch-black font-heading mb-2">Stay Updated</h4>
            <p className="text-sm font-medium text-golden-chestnut">
              Get the latest market trends and agricultural tips delivered to your inbox.
            </p>
            <div className="relative mt-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-3 pl-4 pr-12 outline-none focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 transition-all placeholder:text-golden-chestnut/50"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-sage-green text-white rounded-lg hover:bg-pitch-black transition-colors"
                aria-label="Subscribe"
              >
                <Send size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="w-full pt-8 border-t border-[#F0EBE1] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-golden-chestnut/70">
            © {currentYear} KisanSetu. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-golden-chestnut/70 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sage-green animate-pulse"></span>
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}