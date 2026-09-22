// app/admin/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  ArrowRightLeft, 
  ShieldAlert, 
  Sprout,
  CheckCircle,
  XCircle,
  Search,
  MoreVertical,
  TrendingUp
} from "lucide-react";

export default function AdminDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-12 font-body">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-pitch-black font-heading">
              Welcome back, Admin Prathamesh
            </h1>
            <p className="text-golden-chestnut font-medium mt-2">
              Platform overview and moderation control center.
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search users, IDs, or trades..." 
              className="w-full bg-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-3 pl-10 pr-4 outline-none focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 transition-all placeholder:text-golden-chestnut/50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-golden-chestnut/50" size={18} />
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          
          {/* Top Stats Row */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Total Users", value: "12,450", change: "+14%", icon: Users, color: "text-sage-green", bg: "bg-sage-green/10" },
              { title: "Active Listings", value: "842", change: "+5%", icon: Sprout, color: "text-pitch-black", bg: "bg-pitch-black/10" },
              { title: "Trade Volume", value: "₹4.2M", change: "+22%", icon: TrendingUp, color: "text-sage-green", bg: "bg-sage-green/10" },
              { title: "Open Reports", value: "14", change: "-2%", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-500/10" }
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="bg-white p-6 rounded-2xl border border-[#F0EBE1] shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-xl ${stat.bg}${stat.color}`}>
                    <stat.icon size={22} />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-sage-green/10 text-sage-green' : 'bg-red-500/10 text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-pitch-black">{stat.value}</p>
                  <p className="text-sm font-medium text-golden-chestnut">{stat.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Grid: Left Column (Recent Transactions) */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-[#F0EBE1] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#F0EBE1] flex justify-between items-center">
                <h2 className="text-xl font-bold text-pitch-black font-heading">Recent Marketplace Trades</h2>
                <button className="text-sage-green text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-floral-white text-golden-chestnut text-xs uppercase tracking-wider">
                      <th className="p-4 font-bold">Transaction ID</th>
                      <th className="p-4 font-bold">Crop & Qty</th>
                      <th className="p-4 font-bold">Farmer / Trader</th>
                      <th className="p-4 font-bold">Amount</th>
                      <th className="p-4 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      { id: "TRD-8829", crop: "Soybean (25 Qtl)", users: "R. Patil → Metro Agro", amount: "₹1,27,500", status: "Completed", sColor: "text-sage-green bg-sage-green/10" },
                      { id: "TRD-8830", crop: "Cotton (10 Qtl)", users: "S. Pawar → TexCorp", amount: "₹68,000", status: "In Transit", sColor: "text-blue-600 bg-blue-600/10" },
                      { id: "TRD-8831", crop: "Wheat (50 Qtl)", users: "A. Deshmukh → Navin Traders", amount: "₹1,15,000", status: "Pending", sColor: "text-orange-500 bg-orange-500/10" },
                      { id: "TRD-8832", crop: "Onion (100 Qtl)", users: "V. Kale → FreshMart", amount: "₹1,80,000", status: "Disputed", sColor: "text-red-500 bg-red-500/10" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-[#F0EBE1] last:border-none hover:bg-floral-white/50 transition-colors">
                        <td className="p-4 font-medium text-pitch-black">{row.id}</td>
                        <td className="p-4 font-bold text-pitch-black">{row.crop}</td>
                        <td className="p-4 text-golden-chestnut">{row.users}</td>
                        <td className="p-4 font-bold text-pitch-black">{row.amount}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.sColor}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Main Grid: Right Column (Moderation Queue) */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-[#F0EBE1] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-pitch-black font-heading">Trader KYC Approvals</h2>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3 New</span>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "AgriTech Supplies", doc: "GST Certificate", time: "2h ago" },
                  { name: "Shivaji Traders", doc: "Trade License", time: "5h ago" },
                  { name: "MahaAgro Co.", doc: "GST Certificate", time: "1d ago" }
                ].map((req, i) => (
                  <div key={i} className="p-4 border border-[#F0EBE1] rounded-xl flex justify-between items-center bg-floral-white/50">
                    <div>
                      <h4 className="font-bold text-pitch-black text-sm">{req.name}</h4>
                      <p className="text-xs font-medium text-golden-chestnut mt-1">{req.doc} • {req.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 text-sage-green hover:bg-sage-green/10 rounded-lg transition-colors">
                        <CheckCircle size={18} />
                      </button>
                      <button className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                        <XCircle size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* System Status */}
            <motion.div variants={itemVariants} className="bg-pitch-black text-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-bold font-heading mb-4">System Status</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-80">Database Latency</span>
                  <span className="text-sm font-bold text-sage-green">24ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-80">AI Diagnosis API</span>
                  <span className="text-sm font-bold text-sage-green">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-80">Supabase Auth</span>
                  <span className="text-sm font-bold text-sage-green">Operational</span>
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}