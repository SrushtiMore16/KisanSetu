// app/admin/settings/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  ChevronLeft, 
  KeyRound, 
  ShieldCheck, 
  Terminal, 
  Download,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";

// Mock Data: System Audit Logs
const systemLogs = [
  { id: "LOG-9921", time: "Today, 10:45 AM", action: "Deal Frozen manually (TRD-8940)", user: "Admin Prathamesh", ip: "192.168.1.45", status: "Success" },
  { id: "LOG-9920", time: "Today, 09:12 AM", action: "KYC Approved: Metro Agro Trading", user: "Admin Prathamesh", ip: "192.168.1.45", status: "Success" },
  { id: "LOG-9919", time: "Yesterday, 23:30 PM", action: "System automated database backup", user: "SYSTEM_CRON", ip: "localhost", status: "Success" },
  { id: "LOG-9918", time: "Yesterday, 14:05 PM", action: "Failed login attempt (Invalid Password)", user: "Unknown", ip: "45.22.11.90", status: "Warning" },
  { id: "LOG-9917", time: "Yesterday, 11:20 AM", action: "User Suspended: Navin Traders", user: "Admin Prathamesh", ip: "192.168.1.45", status: "Success" },
  { id: "LOG-9916", time: "Oct 22, 08:00 AM", action: "Risk Engine Threshold Config Updated", user: "Admin Prathamesh", ip: "192.168.1.45", status: "Success" },
];

export default function AdminSettingsPage() {
  const [showPassword, setShowPassword] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-12 font-body">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex flex-col gap-4">
          <Link 
            href="/admin/dashboard" 
            className="w-fit text-golden-chestnut hover:text-sage-green flex items-center gap-1 font-medium transition-colors text-sm"
          >
            <ChevronLeft size={16} /> Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-pitch-black font-heading flex items-center gap-3">
                <Settings className="text-sage-green" size={32} />
                System Settings
              </h1>
              <p className="text-golden-chestnut font-medium mt-2">
                Manage your administrative security credentials and monitor system audit logs.
              </p>
            </div>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#F0EBE1] text-pitch-black rounded-xl font-bold hover:shadow-sm hover:border-sage-green transition-all text-sm">
              <Download size={16} />
              Export System Logs
            </button>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left Column: Security & Password */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30">
                <h2 className="text-xl font-bold text-pitch-black font-heading flex items-center gap-2">
                  <KeyRound className="text-pitch-black" size={24} /> 
                  Security Settings
                </h2>
              </div>
              
              <div className="p-6">
                <form className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">Current Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-golden-chestnut hover:text-pitch-black"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">New Password</label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter new password" 
                      className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">Confirm New Password</label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Confirm new password" 
                      className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
                    />
                  </div>

                  <button 
                    type="button"
                    className="w-full py-3 mt-4 bg-pitch-black text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={18} /> Update Password
                  </button>
                </form>

                <div className="mt-6 p-4 bg-sage-green/10 border border-sage-green/20 rounded-xl flex gap-3">
                  <AlertCircle size={18} className="text-sage-green shrink-0" />
                  <p className="text-xs font-medium text-pitch-black leading-relaxed">
                    Changing your administrative password will immediately terminate all other active sessions across your devices.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: System Audit Logs */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden flex flex-col h-full">
              <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-pitch-black font-heading flex items-center gap-2">
                    <Terminal className="text-pitch-black" size={24} /> 
                    System Audit Logs
                  </h2>
                  <p className="text-xs font-medium text-golden-chestnut mt-1">Immutable record of system actions and authentications.</p>
                </div>
              </div>
              
              <div className="overflow-x-auto flex-grow">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-floral-white/50 border-b border-[#F0EBE1]">
                      <th className="p-4 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Timestamp & ID</th>
                      <th className="p-4 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Action Executed</th>
                      <th className="p-4 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Actor / IP</th>
                      <th className="p-4 font-bold text-xs uppercase tracking-wider text-golden-chestnut text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EBE1]">
                    {systemLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-floral-white/30 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-pitch-black text-sm">{log.time}</p>
                          <span className="text-[10px] font-bold text-golden-chestnut bg-[#F0EBE1] px-2 py-0.5 rounded-md mt-1 inline-block">
                            {log.id}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="text-sm font-medium text-pitch-black">{log.action}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-sm font-bold text-pitch-black">{log.user}</p>
                          <p className="text-xs font-medium text-golden-chestnut mt-0.5 font-mono">{log.ip}</p>
                        </td>
                        <td className="p-4 text-right">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            log.status === "Success" ? "bg-sage-green/10 text-sage-green" : "bg-orange-500/10 text-orange-600"
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 border-t border-[#F0EBE1] bg-floral-white/30 flex justify-center">
                <button className="text-sm font-bold text-golden-chestnut hover:text-sage-green transition-colors">
                  Load Older Logs
                </button>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
