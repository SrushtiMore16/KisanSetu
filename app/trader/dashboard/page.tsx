// app/trader/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Wallet, 
  ShoppingBag, 
  Clock, 
  ChevronRight, 
  Search, 
  Filter,
  ArrowRightLeft,
  MapPin
} from "lucide-react";
import Link from "next/link";

export default function TraderDashboard() {
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
              Trader Hub
            </h1>
            <p className="text-golden-chestnut font-medium mt-2">
              Manage your bids, explore listings, and finalize transactions.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <input 
                type="text" 
                placeholder="Search crops, locations..." 
                className="w-full bg-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-3 pl-10 pr-4 outline-none focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 transition-all placeholder:text-golden-chestnut/50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-golden-chestnut/50" size={18} />
            </div>
            <button className="p-3 bg-white border border-[#F0EBE1] text-pitch-black rounded-xl hover:border-sage-green hover:text-sage-green transition-all shadow-sm">
              <Filter size={20} />
            </button>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          
          {/* Main Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Active Bids", value: "8", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
                { title: "Completed Trades", value: "24", icon: ShoppingBag, color: "text-sage-green", bg: "bg-sage-green/10" },
                { title: "Total Volume", value: "₹4.8L", icon: Wallet, color: "text-pitch-black", bg: "bg-pitch-black/10" }
              ].map((stat, i) => (
                <motion.div key={i} variants={itemVariants} className="bg-white p-6 rounded-2xl border border-[#F0EBE1] shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className={`p-4 rounded-xl ${stat.bg}${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-golden-chestnut">{stat.title}</p>
                    <p className="text-2xl font-bold text-pitch-black">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active Negotiations */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-[#F0EBE1] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#F0EBE1] flex justify-between items-center bg-floral-white/30">
                <h2 className="text-xl font-bold text-pitch-black font-heading">Active Negotiations</h2>
                <Link href="/trader/offers" className="text-sage-green text-sm font-bold flex items-center hover:underline">
                  View All <ChevronRight size={16} />
                </Link>
              </div>

              <div className="divide-y divide-[#F0EBE1]">
                {[
                  { crop: "Soybean (JS 335)", farmer: "Ramesh Patil", qty: "25 Qtl", ask: "₹5,200", bid: "₹5,100", status: "Countered", sColor: "text-orange-500 bg-orange-500/10" },
                  { crop: "Cotton (Bt)", farmer: "Suresh Pawar", qty: "10 Qtl", ask: "₹6,800", bid: "₹6,800", status: "Accepted", sColor: "text-sage-green bg-sage-green/10" },
                  { crop: "Wheat (Lokwan)", farmer: "Amit Deshmukh", qty: "50 Qtl", ask: "₹2,400", bid: "₹2,300", status: "Pending", sColor: "text-blue-500 bg-blue-500/10" }
                ].map((offer, i) => (
                  <div key={i} className="p-6 hover:bg-floral-white/50 transition-colors flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-pitch-black text-lg">{offer.crop}</h3>
                      <p className="text-sm font-medium text-golden-chestnut">Farmer: {offer.farmer} • Qty: {offer.qty}</p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-end sm:items-center">
                        <span className="text-xs font-bold text-golden-chestnut uppercase tracking-wider">Asking</span>
                        <span className="font-bold text-pitch-black">{offer.ask}</span>
                      </div>
                      <ArrowRightLeft size={16} className="text-[#F0EBE1]" />
                      <div className="flex flex-col items-start sm:items-center">
                        <span className="text-xs font-bold text-golden-chestnut uppercase tracking-wider">Your Bid</span>
                        <span className="font-bold text-sage-green">{offer.bid}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${offer.sColor}`}>
                        {offer.status}
                      </span>
                      {offer.status === "Countered" && (
                        <button className="text-xs font-bold text-white bg-pitch-black px-4 py-1.5 rounded-lg hover:bg-pitch-black/80 transition-colors">
                          Review Counter
                        </button>
                      )}
                      {offer.status === "Accepted" && (
                        <button className="text-xs font-bold text-white bg-sage-green px-4 py-1.5 rounded-lg hover:bg-sage-green/90 transition-colors shadow-sm">
                          Initiate Payment
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Side Column (1/3 width) */}
          <div className="space-y-6">
            
            {/* New Listings / Watchlist */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-[#F0EBE1] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-pitch-black font-heading">Recommended Listings</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { crop: "Onion (Nashik Red)", qty: "100 Qtl", loc: "Nashik", price: "₹1,800/qtl" },
                  { crop: "Tur (Arhar)", qty: "40 Qtl", loc: "Latur", price: "₹6,200/qtl" },
                  { crop: "Gram (Chana)", qty: "60 Qtl", loc: "Ahmednagar", price: "₹5,400/qtl" }
                ].map((listing, i) => (
                  <div key={i} className="p-4 border border-[#F0EBE1] rounded-xl hover:border-sage-green/40 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-pitch-black text-sm group-hover:text-sage-green transition-colors">{listing.crop}</h4>
                      <span className="text-pitch-black font-bold text-sm">{listing.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-medium text-golden-chestnut">
                      <span>Qty: {listing.qty}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {listing.loc}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-3 bg-sage-green text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
                Browse Full Marketplace
              </button>
            </motion.div>

            {/* Market Trends Widget */}
            <motion.div variants={itemVariants} className="bg-pitch-black text-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-bold font-heading mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-sage-green" /> 
                Live Market Trends
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <span className="text-sm font-bold block">Soybean</span>
                    <span className="text-xs opacity-70">NCDEX</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold block">₹5,150</span>
                    <span className="text-xs text-sage-green font-bold">+1.2%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <span className="text-sm font-bold block">Cotton</span>
                    <span className="text-xs opacity-70">MCX</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold block">₹6,850</span>
                    <span className="text-xs text-orange-400 font-bold">-0.5%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-bold block">Wheat</span>
                    <span className="text-xs opacity-70">Mandi Avg</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold block">₹2,350</span>
                    <span className="text-xs text-sage-green font-bold">+0.8%</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}