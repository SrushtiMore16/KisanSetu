// app/trader/profile/page.tsx
"use client";

import { motion } from "framer-motion";
import { 
  Building, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  ChevronLeft, 
  Edit3,
  Star,
  TrendingUp,
  FileText,
  BadgeCheck,
  ShoppingBag
} from "lucide-react";
import Link from "next/link";

// Mock Profile Data for Trader
const traderData = {
  businessName: "Metro Agro Trading Co.",
  ownerName: "Rahul Desai",
  phone: "+91 98765 11223",
  address: "Shop No. 42, APMC Market, Vashi, Navi Mumbai",
  gstNumber: "27AADCM1234E1Z5",
  verificationStatus: "Verified Buyer",
  businessStats: {
    totalVolume: "₹2.4 Cr+",
    tradesCompleted: 142,
    rating: 4.8,
    activeNegotiations: 8
  },
  recentTrades: [
    {
      id: "TRD-8829",
      cropName: "Soybean (JS 335)",
      farmer: "Ramesh Patil",
      qty: "25 Qtl",
      amount: "₹1,27,500",
      date: "14 Oct 2026",
      status: "Completed"
    },
    {
      id: "TRD-8790",
      cropName: "Wheat (Lokwan)",
      farmer: "Amit Deshmukh",
      qty: "50 Qtl",
      amount: "₹1,15,000",
      date: "10 Oct 2026",
      status: "Completed"
    },
    {
      id: "TRD-8755",
      cropName: "Onion (Nashik Red)",
      farmer: "Vijay Kale",
      qty: "100 Qtl",
      amount: "₹1,80,000",
      date: "05 Oct 2026",
      status: "Completed"
    }
  ]
};

export default function TraderProfilePage() {
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
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex flex-col gap-4">
          <Link 
            href="/trader/dashboard" 
            className="w-fit text-golden-chestnut hover:text-sage-green flex items-center gap-1 font-medium transition-colors text-sm"
          >
            <ChevronLeft size={16} /> Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-pitch-black font-heading flex items-center gap-3">
                <Building className="text-sage-green" size={32} />
                Business Profile
              </h1>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#F0EBE1] text-pitch-black rounded-xl font-bold hover:border-sage-green hover:text-sage-green transition-all text-sm shadow-sm">
              <Edit3 size={16} />
              Edit Details
            </button>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Left Column: Business Identification */}
          <motion.div variants={itemVariants} className="md:col-span-1 space-y-6">
            
            {/* Identity Card */}
            <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden text-center relative pt-12 pb-6 px-6">
              <div className="absolute top-0 left-0 w-full h-24 bg-pitch-black" />
              <div className="relative mx-auto w-24 h-24 bg-white text-pitch-black rounded-full flex items-center justify-center border-4 border-white shadow-md mb-4 mt-[-40px]">
                <Building size={40} className="text-sage-green" />
              </div>
              
              <h2 className="text-2xl font-bold text-pitch-black font-heading">
                {traderData.businessName}
              </h2>
              <p className="text-sm font-bold text-golden-chestnut mt-1">Proprietor: {traderData.ownerName}</p>
              
              <div className="flex items-center justify-center gap-1 mt-3">
                <BadgeCheck size={18} className="text-sage-green" />
                <span className="text-sage-green text-xs font-bold uppercase tracking-wider">
                  {traderData.verificationStatus}
                </span>
              </div>

              <div className="mt-8 space-y-4 text-left p-4 bg-floral-white/50 border border-[#F0EBE1] rounded-2xl">
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-golden-chestnut shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">Contact</p>
                    <p className="text-sm font-bold text-pitch-black">{traderData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText size={16} className="text-golden-chestnut shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">GSTIN</p>
                    <p className="text-sm font-bold text-pitch-black">{traderData.gstNumber}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-golden-chestnut shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">Registered Address</p>
                    <p className="text-sm font-bold text-pitch-black leading-tight">{traderData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Quick Stats */}
            <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm p-6 space-y-6">
              <h3 className="font-bold text-pitch-black font-heading text-lg border-b border-[#F0EBE1] pb-3">
                Performance Metrics
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 p-3 bg-floral-white/50 rounded-xl border border-[#F0EBE1]">
                  <TrendingUp size={18} className="text-sage-green mb-1" />
                  <span className="text-xs font-medium text-golden-chestnut">Total Volume</span>
                  <span className="text-sm font-bold text-pitch-black">{traderData.businessStats.totalVolume}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 bg-floral-white/50 rounded-xl border border-[#F0EBE1]">
                  <Star size={18} className="text-orange-500 mb-1" fill="currentColor" />
                  <span className="text-xs font-medium text-golden-chestnut">Buyer Rating</span>
                  <span className="text-sm font-bold text-pitch-black">{traderData.businessStats.rating} / 5.0</span>
                </div>
              </div>
              
              <div className="space-y-3 pt-2 border-t border-[#F0EBE1]">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-golden-chestnut">Successful Trades</span>
                  <span className="font-bold text-pitch-black">{traderData.businessStats.tradesCompleted}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-golden-chestnut">Active Negotiations</span>
                  <span className="font-bold text-sage-green">{traderData.businessStats.activeNegotiations}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Transaction History */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden flex flex-col h-full">
              <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30 flex items-center justify-between">
                <h2 className="text-xl font-bold text-pitch-black font-heading flex items-center gap-2">
                  <ShoppingBag className="text-pitch-black" size={24} /> 
                  Recent Completed Trades
                </h2>
                <button className="text-sage-green text-sm font-bold hover:underline">
                  View Full Ledger
                </button>
              </div>
              
              <div className="p-6 flex-grow flex flex-col gap-4">
                {traderData.recentTrades.map((trade) => (
                  <div key={trade.id} className="p-5 border border-[#F0EBE1] rounded-2xl hover:border-sage-green/40 transition-colors group">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider bg-[#F0EBE1] px-2 py-0.5 rounded-md">
                            {trade.id}
                          </span>
                          <span className="text-xs font-bold text-golden-chestnut">{trade.date}</span>
                        </div>
                        <h3 className="font-bold text-pitch-black text-lg group-hover:text-sage-green transition-colors">
                          {trade.cropName}
                        </h3>
                        <p className="text-sm font-medium text-golden-chestnut mt-0.5">
                          Purchased from: <span className="font-bold text-pitch-black">{trade.farmer}</span>
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-start sm:items-end gap-1">
                        <span className="text-xl font-bold text-pitch-black font-heading">
                          {trade.amount}
                        </span>
                        <span className="px-3 py-1 bg-sage-green/10 text-sage-green text-xs font-bold rounded-full w-fit flex items-center gap-1">
                          <ShieldCheck size={12} /> {trade.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F0EBE1]/50">
                      <div className="text-sm font-medium text-golden-chestnut">
                        Quantity Settled: <span className="font-bold text-pitch-black">{trade.qty}</span>
                      </div>
                      <button className="text-sage-green font-bold text-sm flex items-center gap-1 hover:underline">
                        Download Invoice <FileText size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
