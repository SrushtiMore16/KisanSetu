// app/farmer/profile/page.tsx
"use client";

import { motion } from "framer-motion";
import { 
  User, 
  MapPin, 
  Phone, 
  Tractor, 
  Sprout, 
  ChevronLeft, 
  Edit3,
  Calendar,
  Ruler,
  Leaf
} from "lucide-react";
import Link from "next/link";

// Mock Profile Data
const profileData = {
  fullName: "Prathamesh Bhil",
  phone: "+91 98765 43210",
  address: "Pune, Maharashtra, India",
  farmDetails: {
    totalArea: "15 Acres",
    soilType: "Black Cotton Soil",
    irrigation: "Drip & Sprinkler",
    activeCropsCount: 2
  },
  activeCycles: [
    {
      id: "cyc-1",
      cropName: "Soybean (JS 335)",
      area: "10 Acres",
      sownDate: "15 June 2026",
      expectedHarvest: "10 Oct 2026",
      stage: "Flowering",
      health: "Optimal"
    },
    {
      id: "cyc-2",
      cropName: "Cotton (Bt)",
      area: "5 Acres",
      sownDate: "02 June 2026",
      expectedHarvest: "20 Nov 2026",
      stage: "Vegetative",
      health: "Monitoring"
    }
  ]
};

export default function FarmerProfilePage() {
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
            href="/farmer/dashboard" 
            className="w-fit text-golden-chestnut hover:text-sage-green flex items-center gap-1 font-medium transition-colors text-sm"
          >
            <ChevronLeft size={16} /> Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-pitch-black font-heading flex items-center gap-3">
                <User className="text-sage-green" size={32} />
                My Profile
              </h1>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#F0EBE1] text-pitch-black rounded-xl font-bold hover:border-sage-green hover:text-sage-green transition-all text-sm shadow-sm">
              <Edit3 size={16} />
              Edit Profile
            </button>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Left Column: Personal Identification */}
          <motion.div variants={itemVariants} className="md:col-span-1 space-y-6">
            
            {/* Identity Card */}
            <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden text-center relative pt-12 pb-6 px-6">
              <div className="absolute top-0 left-0 w-full h-24 bg-sage-green/10" />
              <div className="relative mx-auto w-24 h-24 bg-sage-green text-white rounded-full flex items-center justify-center border-4 border-white shadow-md mb-4 mt-[-40px]">
                <span className="text-3xl font-bold font-heading">
                  {profileData.fullName.charAt(0)}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-pitch-black font-heading">
                {profileData.fullName}
              </h2>
              <span className="inline-block px-3 py-1 bg-sage-green/10 text-sage-green text-xs font-bold uppercase tracking-wider rounded-full mt-2">
                Verified Farmer
              </span>

              <div className="mt-8 space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-golden-chestnut shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-golden-chestnut uppercase tracking-wider">Mobile</p>
                    <p className="text-sm font-bold text-pitch-black">{profileData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-golden-chestnut shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-golden-chestnut uppercase tracking-wider">Location</p>
                    <p className="text-sm font-bold text-pitch-black">{profileData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Quick Stats */}
            <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm p-6 space-y-6">
              <h3 className="font-bold text-pitch-black font-heading text-lg border-b border-[#F0EBE1] pb-3">
                Farm Overview
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 p-3 bg-floral-white/50 rounded-xl border border-[#F0EBE1]">
                  <Ruler size={18} className="text-sage-green mb-1" />
                  <span className="text-xs font-medium text-golden-chestnut">Total Area</span>
                  <span className="text-sm font-bold text-pitch-black">{profileData.farmDetails.totalArea}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 bg-floral-white/50 rounded-xl border border-[#F0EBE1]">
                  <Leaf size={18} className="text-sage-green mb-1" />
                  <span className="text-xs font-medium text-golden-chestnut">Active Crops</span>
                  <span className="text-sm font-bold text-pitch-black">{profileData.farmDetails.activeCropsCount} currently grown</span>
                </div>
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-golden-chestnut">Soil Type</span>
                  <span className="font-bold text-pitch-black">{profileData.farmDetails.soilType}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-golden-chestnut">Irrigation</span>
                  <span className="font-bold text-pitch-black">{profileData.farmDetails.irrigation}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Active Crop Cycles */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden flex flex-col h-full">
              <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30 flex items-center justify-between">
                <h2 className="text-xl font-bold text-pitch-black font-heading flex items-center gap-2">
                  <Tractor className="text-pitch-black" size={24} /> 
                  Active Crop Cycles
                </h2>
                <button className="text-sage-green text-sm font-bold hover:underline">
                  + Add New Crop
                </button>
              </div>
              
              <div className="p-6 flex-grow flex flex-col gap-6">
                {profileData.activeCycles.map((cycle) => (
                  <div key={cycle.id} className="p-5 border border-[#F0EBE1] rounded-2xl hover:border-sage-green/40 transition-colors group">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4">
                      <div className="flex gap-4">
                        <div className="p-3 bg-sage-green/10 text-sage-green rounded-xl h-fit">
                          <Sprout size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-pitch-black text-lg group-hover:text-sage-green transition-colors">
                            {cycle.cropName}
                          </h3>
                          <p className="text-sm font-medium text-golden-chestnut mt-0.5">
                            Allocated Area: <span className="font-bold text-pitch-black">{cycle.area}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-row sm:flex-col gap-2 items-center sm:items-end">
                        <span className="px-3 py-1 bg-[#F0EBE1] text-pitch-black text-xs font-bold rounded-full w-fit">
                          Stage: {cycle.stage}
                        </span>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full w-fit ${
                          cycle.health === 'Optimal' ? 'bg-sage-green/10 text-sage-green' : 'bg-orange-500/10 text-orange-600'
                        }`}>
                          Health: {cycle.health}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#F0EBE1]/50">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-golden-chestnut" />
                        <div>
                          <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">Sown Date</p>
                          <p className="text-sm font-bold text-pitch-black">{cycle.sownDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-golden-chestnut" />
                        <div>
                          <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">Est. Harvest</p>
                          <p className="text-sm font-bold text-pitch-black">{cycle.expectedHarvest}</p>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full mt-5 py-2.5 bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl font-bold hover:bg-sage-green hover:text-white hover:border-sage-green transition-all text-sm">
                      Manage Crop Lifecycle
                    </button>
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
