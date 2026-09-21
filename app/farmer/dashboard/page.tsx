// app/farmer/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import { 
  Sprout, 
  CloudSun, 
  Droplets, 
  Wind, 
  ChevronRight, 
  Leaf, 
  TrendingUp, 
  AlertCircle,
  Plus
} from "lucide-react";
import Link from "next/link";

export default function FarmerDashboard() {
  // Animation variants for staggered rendering
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
              Welcome back, Farmer
            </h1>
            <p className="text-golden-chestnut font-medium mt-2">
              Here is what's happening on your farm today.
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-sage-green text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all w-fit">
            <Plus size={20} />
            <span>Log Crop Event</span>
          </button>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          
          {/* Main Column (2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Active Crops", value: "3", icon: Leaf, color: "text-sage-green", bg: "bg-sage-green/10" },
                { title: "Pending Offers", value: "2", icon: TrendingUp, color: "text-pitch-black", bg: "bg-pitch-black/10" },
                { title: "AI Alerts", value: "1", icon: AlertCircle, color: "text-golden-chestnut", bg: "bg-golden-chestnut/10" }
              ].map((stat, i) => (
                <motion.div key={i} variants={itemVariants} className="bg-white p-6 rounded-2xl border border-[#F0EBE1] shadow-sm flex items-center gap-4">
                  <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-golden-chestnut">{stat.title}</p>
                    <p className="text-2xl font-bold text-pitch-black">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active Crop Cycles */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-[#F0EBE1] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-pitch-black font-heading">Active Crops</h2>
                <Link href="/farmer/crops" className="text-sage-green text-sm font-bold flex items-center hover:underline">
                  View All <ChevronRight size={16} />
                </Link>
              </div>

              <div className="space-y-4">
                {/* Crop Item 1 */}
                <div className="p-4 border border-[#F0EBE1] rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-sage-green/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-sage-green/10 text-sage-green rounded-lg">
                      <Sprout size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-pitch-black text-lg group-hover:text-sage-green transition-colors">Soybean (JS 335)</h3>
                      <p className="text-sm font-medium text-golden-chestnut">North Field • 12 Acres</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <span className="text-sm font-bold text-pitch-black bg-[#F0EBE1] px-3 py-1 rounded-full mb-2 w-fit">Flowering Stage</span>
                    <div className="w-full sm:w-32 h-2 bg-[#F0EBE1] rounded-full overflow-hidden">
                      <div className="h-full bg-sage-green w-[60%] rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Crop Item 2 */}
                <div className="p-4 border border-[#F0EBE1] rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-sage-green/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-sage-green/10 text-sage-green rounded-lg">
                      <Sprout size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-pitch-black text-lg group-hover:text-sage-green transition-colors">Cotton (Bt)</h3>
                      <p className="text-sm font-medium text-golden-chestnut">South Field • 8 Acres</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <span className="text-sm font-bold text-pitch-black bg-[#F0EBE1] px-3 py-1 rounded-full mb-2 w-fit">Vegetative</span>
                    <div className="w-full sm:w-32 h-2 bg-[#F0EBE1] rounded-full overflow-hidden">
                      <div className="h-full bg-sage-green w-[35%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Side Column (1/3 width on desktop) */}
          <div className="space-y-6">
            
            {/* Weather Widget */}
            <motion.div variants={itemVariants} className="bg-sage-green text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] opacity-10">
                <CloudSun size={150} />
              </div>
              <h2 className="text-lg font-bold font-heading mb-4 relative z-10">Farm Weather</h2>
              
              <div className="flex items-end gap-2 mb-6 relative z-10">
                <span className="text-5xl font-bold tracking-tighter">28°</span>
                <span className="text-lg font-medium opacity-80 mb-1">Partly Cloudy</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="flex items-center gap-2 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <Droplets size={20} className="opacity-80" />
                  <div>
                    <p className="text-xs opacity-80 uppercase tracking-wider">Humidity</p>
                    <p className="font-bold">64%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <Wind size={20} className="opacity-80" />
                  <div>
                    <p className="text-xs opacity-80 uppercase tracking-wider">Wind</p>
                    <p className="font-bold">12 km/h</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Marketplace Offers */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-[#F0EBE1] shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-pitch-black font-heading">Recent Offers</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-floral-white border border-[#F0EBE1] rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-pitch-black text-sm">Ramesh Trading Co.</h4>
                      <p className="text-xs font-medium text-golden-chestnut">For: Soybean (25 Qtl)</p>
                    </div>
                    <span className="text-sage-green font-bold text-sm">₹5,100/qtl</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-2 bg-pitch-black text-white text-xs font-bold rounded-lg hover:bg-opacity-90 transition-all">Accept</button>
                    <button className="flex-1 py-2 bg-white border border-[#F0EBE1] text-pitch-black text-xs font-bold rounded-lg hover:border-golden-chestnut transition-all">Counter</button>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 py-3 text-sm font-bold text-golden-chestnut hover:text-sage-green transition-colors flex items-center justify-center gap-1 border-t border-[#F0EBE1]">
                Go to Marketplace <ChevronRight size={16} />
              </button>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}