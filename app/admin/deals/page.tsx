// app/admin/deals/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scale, 
  ChevronLeft, 
  AlertOctagon, 
  Handshake, 
  Search, 
  Filter, 
  Snowflake, 
  RefreshCcw, 
  ShieldAlert,
  ArrowRightLeft,
  Clock,
  CheckCircle2,
  FileText
} from "lucide-react";
import Link from "next/link";

// Mock Data
const activeDeals = [
  {
    id: "TRD-9012",
    crop: "Soybean (JS 335)",
    farmer: "Ramesh Patil",
    trader: "Metro Agro Trading",
    value: "₹1,27,500",
    status: "In Transit",
    lastUpdated: "2 hours ago"
  },
  {
    id: "TRD-9013",
    crop: "Cotton (Bt)",
    farmer: "Amit Deshmukh",
    trader: "TexCorp Industries",
    value: "₹3,40,000",
    status: "Awaiting Payment",
    lastUpdated: "5 hours ago"
  },
  {
    id: "TRD-9014",
    crop: "Wheat (Lokwan)",
    farmer: "Vijay Kale",
    trader: "Navin Traders",
    value: "₹85,000",
    status: "Inspection Pending",
    lastUpdated: "1 day ago"
  }
];

const disputeQueue = [
  {
    id: "DSP-401",
    dealId: "TRD-8955",
    raisedBy: "Metro Agro Trading (Buyer)",
    issue: "Quality Mismatch",
    description: "Delivered soybean contains 15% moisture content, exceeding the agreed 10% limit. Requesting price adjustment or return.",
    status: "Open Investigation",
    valueAtStake: "₹2,10,000",
    date: "12 Oct 2026"
  },
  {
    id: "DSP-402",
    dealId: "TRD-8940",
    raisedBy: "Suresh Pawar (Seller)",
    issue: "Payment Not Received",
    description: "Crop was delivered and weighed 48 hours ago. Buyer has stopped responding and payment is pending.",
    status: "Critical Escelation",
    valueAtStake: "₹68,500",
    date: "10 Oct 2026"
  },
  {
    id: "DSP-403",
    dealId: "TRD-8921",
    raisedBy: "System (Escrow)",
    issue: "Cancelled Deal - Refund Hold",
    description: "Deal cancelled by mutual agreement, but platform fees and logistics advance need manual reconciliation before refunding.",
    status: "Pending Settlement",
    valueAtStake: "₹15,000",
    date: "09 Oct 2026"
  }
];

export default function AdminDealsPage() {
  const [activeTab, setActiveTab] = useState<"deals" | "disputes">("disputes");
  const [searchQuery, setSearchQuery] = useState("");

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
                <Scale className="text-sage-green" size={32} />
                Deal & Dispute Resolution
              </h1>
              <p className="text-golden-chestnut font-medium mt-2">
                Monitor platform liquidity and intervene in escalated transactions.
              </p>
            </div>
            
            {/* Tab Switcher */}
            <div className="flex p-1 bg-white border border-[#F0EBE1] rounded-xl shadow-sm w-fit">
              <button 
                onClick={() => setActiveTab("deals")}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === "deals" ? "bg-sage-green text-white shadow-md" : "text-golden-chestnut hover:text-pitch-black"
                }`}
              >
                Active Deals
              </button>
              <button 
                onClick={() => setActiveTab("disputes")}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === "disputes" ? "bg-pitch-black text-white shadow-md" : "text-golden-chestnut hover:text-pitch-black"
                }`}
              >
                Dispute Queue <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{disputeQueue.length}</span>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          
          {/* TAB 1: ACTIVE DEALS LEDGER */}
          {activeTab === "deals" && (
            <motion.div 
              key="deals"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-[#F0EBE1] bg-floral-white/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md">
                  <input 
                    type="text" 
                    placeholder="Search by Deal ID, Farmer, or Trader..." 
                    className="w-full bg-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-sage-green transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-golden-chestnut/50" size={16} />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#F0EBE1] rounded-xl text-sm font-bold text-pitch-black hover:border-sage-green transition-all w-full sm:w-auto">
                  <Filter size={16} /> Filters
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-floral-white/50 border-b border-[#F0EBE1]">
                      <th className="p-5 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Deal ID & Crop</th>
                      <th className="p-5 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Counterparties</th>
                      <th className="p-5 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Value</th>
                      <th className="p-5 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Current Status</th>
                      <th className="p-5 font-bold text-xs uppercase tracking-wider text-golden-chestnut text-right">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EBE1]">
                    {activeDeals.map((deal) => (
                      <tr key={deal.id} className="hover:bg-floral-white/30 transition-colors">
                        <td className="p-5">
                          <span className="text-[10px] font-bold text-golden-chestnut bg-[#F0EBE1] px-2 py-0.5 rounded-md mb-1 inline-block">
                            {deal.id}
                          </span>
                          <p className="font-bold text-pitch-black">{deal.crop}</p>
                        </td>
                        <td className="p-5">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-pitch-black"><span className="text-xs text-golden-chestnut">S:</span> {deal.farmer}</span>
                            <span className="text-sm font-medium text-pitch-black"><span className="text-xs text-golden-chestnut">B:</span> {deal.trader}</span>
                          </div>
                        </td>
                        <td className="p-5 font-bold text-pitch-black text-lg">{deal.value}</td>
                        <td className="p-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            deal.status === "In Transit" ? "bg-blue-500/10 text-blue-600" :
                            deal.status === "Awaiting Payment" ? "bg-orange-500/10 text-orange-600" :
                            "bg-sage-green/10 text-sage-green"
                          }`}>
                            <Clock size={14} /> {deal.status}
                          </span>
                        </td>
                        <td className="p-5 text-right text-sm font-medium text-golden-chestnut">
                          {deal.lastUpdated}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 2: DISPUTE QUEUE */}
          {activeTab === "disputes" && (
            <motion.div 
              key="disputes"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="space-y-6"
            >
              {disputeQueue.map((dispute) => (
                <motion.div key={dispute.id} variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm flex flex-col lg:flex-row overflow-hidden">
                  
                  {/* Dispute Info (Left Side) */}
                  <div className="p-6 lg:w-2/3 border-b lg:border-b-0 lg:border-r border-[#F0EBE1]">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold text-white bg-red-500 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <AlertOctagon size={12} /> {dispute.id}
                          </span>
                          <span className="text-xs font-bold text-golden-chestnut">Deal Ref: <Link href="#" className="hover:text-sage-green hover:underline">{dispute.dealId}</Link></span>
                        </div>
                        <h3 className="font-bold text-pitch-black text-xl">{dispute.issue}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit text-center ${
                        dispute.status === "Critical Escelation" ? "bg-red-500/10 text-red-600 border border-red-500/20" : "bg-orange-500/10 text-orange-600 border border-orange-500/20"
                      }`}>
                        {dispute.status}
                      </span>
                    </div>

                    <div className="bg-floral-white/50 p-4 rounded-xl border border-[#F0EBE1] mb-4">
                      <p className="text-xs font-bold text-golden-chestnut uppercase tracking-wider mb-1">Issue Description</p>
                      <p className="text-sm font-medium text-pitch-black leading-relaxed">
                        {dispute.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm">
                      <div>
                        <p className="text-xs font-bold text-golden-chestnut uppercase tracking-wider mb-0.5">Raised By</p>
                        <p className="font-bold text-pitch-black">{dispute.raisedBy}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-golden-chestnut uppercase tracking-wider mb-0.5">Value at Stake</p>
                        <p className="font-bold text-red-500">{dispute.valueAtStake}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-golden-chestnut uppercase tracking-wider mb-0.5">Date Raised</p>
                        <p className="font-bold text-pitch-black">{dispute.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Manual Intervention Tools (Right Side) */}
                  <div className="p-6 lg:w-1/3 bg-floral-white/30 flex flex-col justify-center gap-4">
                    <h4 className="text-sm font-bold text-pitch-black uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Scale size={16} className="text-pitch-black" />
                      Intervention Tools
                    </h4>
                    
                    <button className="w-full flex items-center justify-between p-3 bg-white border border-[#F0EBE1] rounded-xl hover:border-blue-500 hover:bg-blue-500/5 transition-all group">
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          <Snowflake size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-pitch-black text-sm">Freeze Deal</p>
                          <p className="text-[10px] font-medium text-golden-chestnut">Lock escrow funds & actions</p>
                        </div>
                      </div>
                    </button>

                    <button className="w-full flex items-center justify-between p-3 bg-white border border-[#F0EBE1] rounded-xl hover:border-orange-500 hover:bg-orange-500/5 transition-all group">
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 bg-orange-500/10 text-orange-600 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          <RefreshCcw size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-pitch-black text-sm">Force Refund</p>
                          <p className="text-[10px] font-medium text-golden-chestnut">Return funds to buyer</p>
                        </div>
                      </div>
                    </button>

                    <button className="w-full flex items-center justify-between p-3 bg-white border border-[#F0EBE1] rounded-xl hover:border-red-500 hover:bg-red-500/5 transition-all group">
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 bg-red-500/10 text-red-600 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
                          <ShieldAlert size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-pitch-black text-sm">Escalate to Legal</p>
                          <p className="text-[10px] font-medium text-golden-chestnut">Flag for fraud/authorities</p>
                        </div>
                      </div>
                    </button>

                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
