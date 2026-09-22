// app/trader/deals/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Handshake, 
  ChevronLeft, 
  ArrowRightLeft, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  CreditCard,
  FileText
} from "lucide-react";
import Link from "next/link";

// Mock Data
const activeNegotiations = [
  {
    id: "NEG-4091",
    crop: "Soybean (JS 335)",
    farmer: "Ramesh Patil",
    location: "Latur, Maharashtra",
    qty: "25 Qtl",
    askingPrice: "₹5,200",
    yourBid: "₹5,100",
    terms: "Buyer Pickup (Ex-Farm)",
    status: "Awaiting Farmer Response",
    lastUpdated: "2 hours ago"
  },
  {
    id: "NEG-4095",
    crop: "Cotton (Bt)",
    farmer: "Suresh Pawar",
    location: "Yavatmal, Maharashtra",
    qty: "10 Qtl",
    askingPrice: "₹6,900",
    yourBid: "₹6,800",
    terms: "Seller Delivery (To APMC)",
    status: "Farmer Countered",
    counterPrice: "₹6,850",
    lastUpdated: "15 mins ago"
  }
];

const dealHistory = [
  {
    id: "TRD-8829",
    crop: "Wheat (Lokwan)",
    farmer: "Amit Deshmukh",
    qty: "50 Qtl",
    finalPrice: "₹1,15,000",
    date: "14 Oct 2026",
    dealStatus: "Completed",
    paymentStatus: "Confirmed"
  },
  {
    id: "TRD-8810",
    crop: "Onion (Nashik Red)",
    farmer: "Vijay Kale",
    qty: "100 Qtl",
    finalPrice: "₹1,80,000",
    date: "10 Oct 2026",
    dealStatus: "Disputed",
    paymentStatus: "Pending Hold"
  },
  {
    id: "TRD-8755",
    crop: "Tur (Arhar)",
    farmer: "Sanjay Bhosale",
    qty: "20 Qtl",
    finalPrice: "₹1,24,000",
    date: "02 Oct 2026",
    dealStatus: "Cancelled",
    paymentStatus: "Refunded"
  }
];

export default function DealManagementPage() {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

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
      <div className="max-w-6xl mx-auto space-y-8">
        
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
                <Handshake className="text-sage-green" size={32} />
                Deal Management
              </h1>
              <p className="text-golden-chestnut font-medium mt-2">
                Track active negotiations, logistics terms, and historical trade settlements.
              </p>
            </div>
            
            {/* Tab Switcher */}
            <div className="flex p-1 bg-white border border-[#F0EBE1] rounded-xl shadow-sm w-fit">
              <button 
                onClick={() => setActiveTab("active")}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                  activeTab === "active" ? "bg-sage-green text-white shadow-md" : "text-golden-chestnut hover:text-pitch-black"
                }`}
              >
                Active Negotiations
              </button>
              <button 
                onClick={() => setActiveTab("history")}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                  activeTab === "history" ? "bg-pitch-black text-white shadow-md" : "text-golden-chestnut hover:text-pitch-black"
                }`}
              >
                Deal History
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: ACTIVE NEGOTIATIONS */}
          {activeTab === "active" && (
            <motion.div 
              key="active"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {activeNegotiations.map((neg) => (
                <motion.div key={neg.id} variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden flex flex-col">
                  {/* Card Header */}
                  <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider bg-[#F0EBE1] px-2 py-0.5 rounded-md">
                          {neg.id}
                        </span>
                        <span className="text-xs font-bold text-golden-chestnut flex items-center gap-1">
                          <Clock size={12} /> {neg.lastUpdated}
                        </span>
                      </div>
                      <h3 className="font-bold text-pitch-black text-xl">{neg.crop}</h3>
                      <p className="text-sm font-medium text-golden-chestnut mt-1">Farmer: <span className="text-pitch-black font-bold">{neg.farmer}</span></p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit text-center ${
                      neg.status === "Farmer Countered" ? "bg-orange-500/10 text-orange-600" : "bg-sage-green/10 text-sage-green"
                    }`}>
                      {neg.status}
                    </span>
                  </div>

                  {/* Negotiation Details */}
                  <div className="p-6 flex-grow flex flex-col gap-6">
                    <div className="flex items-center justify-between px-4 py-3 bg-floral-white rounded-xl border border-[#F0EBE1]">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider mb-1">Quantity</span>
                        <span className="font-bold text-pitch-black text-lg">{neg.qty}</span>
                      </div>
                      <div className="h-8 w-px bg-[#F0EBE1]"></div>
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider mb-1">Asking</span>
                        <span className="font-bold text-pitch-black text-lg">{neg.askingPrice}</span>
                      </div>
                      <ArrowRightLeft size={16} className="text-golden-chestnut" />
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-sage-green uppercase tracking-wider mb-1">Your Bid</span>
                        <span className="font-bold text-sage-green text-lg">
                          {neg.counterPrice || neg.yourBid}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin size={18} className="text-golden-chestnut" />
                        <span className="font-medium text-pitch-black">{neg.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Truck size={18} className="text-golden-chestnut" />
                        <span className="font-medium text-pitch-black">Logistics: <span className="font-bold">{neg.terms}</span></span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto pt-4 flex gap-3 border-t border-[#F0EBE1]">
                      {neg.status === "Farmer Countered" ? (
                        <>
                          <button className="flex-1 py-3 bg-sage-green text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
                            Accept ₹6,850
                          </button>
                          <button className="flex-1 py-3 bg-pitch-black text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
                            Counter Offer
                          </button>
                        </>
                      ) : (
                        <button className="w-full py-3 bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl font-bold hover:border-sage-green hover:text-sage-green transition-all text-sm">
                          Withdraw Bid
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* TAB 2: DEAL HISTORY */}
          {activeTab === "history" && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-floral-white/50 border-b border-[#F0EBE1]">
                      <th className="p-5 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Deal Info</th>
                      <th className="p-5 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Counterparty</th>
                      <th className="p-5 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Amount & Qty</th>
                      <th className="p-5 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Deal Status</th>
                      <th className="p-5 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Payment</th>
                      <th className="p-5 font-bold text-xs uppercase tracking-wider text-golden-chestnut text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EBE1]">
                    {dealHistory.map((deal) => (
                      <tr key={deal.id} className="hover:bg-floral-white/30 transition-colors">
                        <td className="p-5">
                          <p className="font-bold text-pitch-black">{deal.crop}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-golden-chestnut bg-[#F0EBE1] px-2 py-0.5 rounded">
                              {deal.id}
                            </span>
                            <span className="text-xs font-medium text-golden-chestnut">{deal.date}</span>
                          </div>
                        </td>
                        <td className="p-5 font-medium text-pitch-black">{deal.farmer}</td>
                        <td className="p-5">
                          <p className="font-bold text-pitch-black">{deal.finalPrice}</p>
                          <p className="text-xs font-medium text-golden-chestnut mt-1">{deal.qty}</p>
                        </td>
                        <td className="p-5">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            deal.dealStatus === "Completed" ? "bg-sage-green/10 text-sage-green" :
                            deal.dealStatus === "Disputed" ? "bg-red-500/10 text-red-600" :
                            "bg-pitch-black/5 text-pitch-black"
                          }`}>
                            {deal.dealStatus === "Completed" && <CheckCircle2 size={14} />}
                            {deal.dealStatus === "Disputed" && <AlertCircle size={14} />}
                            {deal.dealStatus === "Cancelled" && <XCircle size={14} />}
                            {deal.dealStatus}
                          </div>
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-2">
                            <CreditCard size={16} className={deal.paymentStatus === "Confirmed" ? "text-sage-green" : "text-orange-500"} />
                            <span className="text-sm font-bold text-pitch-black">{deal.paymentStatus}</span>
                          </div>
                        </td>
                        <td className="p-5 text-right">
                          <button className="text-sage-green font-bold text-sm hover:underline flex items-center justify-end gap-1 w-full">
                            <FileText size={16} /> Docs
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
