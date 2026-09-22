// app/trader/marketplace/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Store, 
  ChevronLeft, 
  Search, 
  Filter,
  MapPin, 
  Bookmark, 
  TrendingUp,
  Scale,
  Calendar,
  Award,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

// Mock Data: Live Mandi Pricing Benchmark
const mandiInsights = [
  { crop: "Soybean (JS 335)", avgPrice: "₹5,150", trend: "+1.2%", status: "up" },
  { crop: "Cotton (Bt)", avgPrice: "₹6,800", trend: "-0.5%", status: "down" },
  { crop: "Wheat (Lokwan)", avgPrice: "₹2,350", trend: "+0.8%", status: "up" },
  { crop: "Tur (Arhar)", avgPrice: "₹6,100", trend: "+2.1%", status: "up" },
];

// Mock Data: Marketplace Listings
const marketplaceListings = [
  {
    id: "LST-9021",
    crop: "Soybean (JS 335)",
    farmer: "Ramesh Patil",
    location: "Latur, Maharashtra (12 km away)",
    qty: "25 Qtl",
    grade: "Grade A",
    askingPrice: 5200,
    mandiBenchmark: 5150,
    harvestDate: "Available Now",
    isSaved: false,
  },
  {
    id: "LST-9022",
    crop: "Cotton (Bt)",
    farmer: "Suresh Pawar",
    location: "Yavatmal, Maharashtra (85 km away)",
    qty: "40 Qtl",
    grade: "Premium Long Staple",
    askingPrice: 6750,
    mandiBenchmark: 6800,
    harvestDate: "Expected 20 Nov",
    isSaved: true,
  },
  {
    id: "LST-9023",
    crop: "Onion (Nashik Red)",
    farmer: "Vijay Kale",
    location: "Nashik, Maharashtra (140 km away)",
    qty: "150 Qtl",
    grade: "Grade B",
    askingPrice: 1900,
    mandiBenchmark: 1850,
    harvestDate: "Available Now",
    isSaved: false,
  },
  {
    id: "LST-9024",
    crop: "Wheat (Lokwan)",
    farmer: "Amit Deshmukh",
    location: "Pune, Maharashtra (45 km away)",
    qty: "80 Qtl",
    grade: "Grade A",
    askingPrice: 2400,
    mandiBenchmark: 2350,
    harvestDate: "Expected 05 Dec",
    isSaved: true,
  },
  {
    id: "LST-9025",
    crop: "Tur (Arhar)",
    farmer: "Sanjay Bhosale",
    location: "Solapur, Maharashtra (110 km away)",
    qty: "30 Qtl",
    grade: "Grade A",
    askingPrice: 6050,
    mandiBenchmark: 6100,
    harvestDate: "Available Now",
    isSaved: false,
  }
];

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<"explore" | "saved">("explore");
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

  const filteredListings = marketplaceListings.filter(listing => {
    const matchesTab = activeTab === "explore" || (activeTab === "saved" && listing.isSaved);
    const matchesSearch = listing.crop.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          listing.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-12 font-body">
      <div className="max-w-7xl mx-auto space-y-8">
        
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
                <Store className="text-sage-green" size={32} />
                Commodity Marketplace
              </h1>
              <p className="text-golden-chestnut font-medium mt-2">
                Discover verified produce, compare with mandi benchmarks, and negotiate directly.
              </p>
            </div>
            
            {/* Action Tabs */}
            <div className="flex p-1 bg-white border border-[#F0EBE1] rounded-xl shadow-sm w-fit">
              <button 
                onClick={() => setActiveTab("explore")}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                  activeTab === "explore" ? "bg-sage-green text-white shadow-md" : "text-golden-chestnut hover:text-pitch-black"
                }`}
              >
                Explore Listings
              </button>
              <button 
                onClick={() => setActiveTab("saved")}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === "saved" ? "bg-pitch-black text-white shadow-md" : "text-golden-chestnut hover:text-pitch-black"
                }`}
              >
                Watchlist <Bookmark size={14} className={activeTab === "saved" ? "fill-white" : ""} />
              </button>
            </div>
          </div>
        </div>

        {/* Live Mandi Insights Ticker/Cards */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-pitch-black rounded-2xl shadow-md p-4 flex flex-col md:flex-row items-center gap-4 overflow-hidden"
        >
          <div className="flex items-center gap-2 text-white shrink-0 md:border-r border-white/20 md:pr-4">
            <TrendingUp size={20} className="text-sage-green" />
            <span className="font-bold font-heading text-lg">Mandi Benchmarks</span>
          </div>
          <div className="flex overflow-x-auto gap-6 w-full hide-scrollbar pb-2 md:pb-0">
            {mandiInsights.map((insight, idx) => (
              <div key={idx} className="flex flex-col shrink-0 min-w-[140px]">
                <span className="text-xs font-medium text-white/70 uppercase tracking-wider">{insight.crop}</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-white font-bold">{insight.avgPrice}</span>
                  <span className={`text-xs font-bold ${insight.status === 'up' ? 'text-sage-green' : 'text-orange-400'}`}>
                    {insight.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[#F0EBE1] shadow-sm p-4 flex flex-col lg:flex-row gap-4"
        >
          <div className="relative flex-grow">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by crop name or district..." 
              className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-3 pl-10 pr-4 outline-none focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 transition-all placeholder:text-golden-chestnut/50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-golden-chestnut/50" size={18} />
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap gap-3">
            {['Crop Type', 'Quality Grade', 'Expected Harvest'].map((filter) => (
              <button key={filter} className="flex-1 md:flex-none flex items-center justify-between gap-2 px-4 py-3 bg-floral-white border border-[#F0EBE1] rounded-xl text-sm font-bold text-pitch-black hover:border-sage-green transition-all">
                {filter} <ChevronDown size={16} className="text-golden-chestnut" />
              </button>
            ))}
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-pitch-black text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all">
              <Filter size={16} /> Filters
            </button>
          </div>
        </motion.div>

        {/* Listings Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredListings.map((listing) => {
              // Calculate if the asking price is fair (within 2% of Mandi)
              const diffPercentage = ((listing.askingPrice - listing.mandiBenchmark) / listing.mandiBenchmark) * 100;
              const isFairPrice = diffPercentage <= 2 && diffPercentage >= -2;
              const isBelowMarket = diffPercentage < -2;

              return (
                <motion.div 
                  key={listing.id}
                  variants={itemVariants}
                  layout
                  className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group"
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-[#F0EBE1] bg-floral-white/30 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider bg-[#F0EBE1] px-2 py-0.5 rounded-md">
                          {listing.id}
                        </span>
                      </div>
                      <h3 className="font-bold text-pitch-black text-xl group-hover:text-sage-green transition-colors">
                        {listing.crop}
                      </h3>
                      <p className="text-sm font-medium text-golden-chestnut mt-0.5">{listing.farmer}</p>
                    </div>
                    
                    <button className="p-2 bg-white rounded-full shadow-sm border border-[#F0EBE1] hover:border-sage-green transition-colors">
                      <Bookmark size={18} className={listing.isSaved ? "fill-sage-green text-sage-green" : "text-golden-chestnut"} />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-grow flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <Award size={16} className="text-sage-green shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">Quality</p>
                          <p className="text-sm font-bold text-pitch-black">{listing.grade}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar size={16} className="text-golden-chestnut shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">Availability</p>
                          <p className="text-sm font-bold text-pitch-black">{listing.harvestDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-2 border-t border-[#F0EBE1]/50">
                      <MapPin size={16} className="text-golden-chestnut shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-pitch-black leading-tight">{listing.location}</p>
                    </div>
                  </div>

                  {/* Price & Action Footer */}
                  <div className="p-5 bg-floral-white border-t border-[#F0EBE1] flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider mb-1">Lot Quantity</p>
                        <p className="text-xl font-bold text-pitch-black">{listing.qty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider mb-1">Asking Price</p>
                        <p className="text-2xl font-bold font-heading text-pitch-black">₹{listing.askingPrice.toLocaleString()}<span className="text-sm font-medium text-golden-chestnut">/qtl</span></p>
                      </div>
                    </div>

                    {/* Fair Price Indicator */}
                    <div className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold ${
                      isBelowMarket ? "bg-sage-green/10 text-sage-green" : 
                      isFairPrice ? "bg-blue-500/10 text-blue-600" : 
                      "bg-orange-500/10 text-orange-600"
                    }`}>
                      <span className="flex items-center gap-1.5">
                        <Scale size={14} />
                        {isBelowMarket ? "Below Market Avg" : isFairPrice ? "Fair Market Price" : "Above Market Avg"}
                      </span>
                      <span>Mandi: ₹{listing.mandiBenchmark}</span>
                    </div>

                    <button className="w-full py-3 mt-1 bg-sage-green text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2">
                      Make an Offer <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {filteredListings.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-[#F0EBE1]">
              <Search size={48} className="text-golden-chestnut/30 mb-4" />
              <h3 className="text-xl font-bold text-pitch-black mb-2">No listings found</h3>
              <p className="text-golden-chestnut font-medium">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
