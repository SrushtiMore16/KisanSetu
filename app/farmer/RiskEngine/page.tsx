// app/farmer/RiskEngine/page.tsx
"use client";

import { motion } from "framer-motion";
import { 
  ShieldAlert, 
  CloudRain, 
  Bug, 
  Wind, 
  ThermometerSun,
  ChevronLeft,
  Activity,
  History,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  PhoneCall,
  BellRing,
  Sprout // Added missing import here
} from "lucide-react";
import Link from "next/link";

export default function RiskEngine() {
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
                <Activity className="text-sage-green" size={32} />
                Predictive Risk Engine
              </h1>
              <p className="text-golden-chestnut font-medium mt-2">
                Continuous monitoring of weather, soil, and crop stages.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-sage-green/10 text-sage-green px-4 py-2 rounded-full border border-sage-green/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sage-green"></span>
              </span>
              <span className="text-sm font-bold tracking-wide">System Active</span>
            </div>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main Column: Active Alerts & Monitoring Grid */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stage-Aware Alerts Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl font-bold text-pitch-black font-heading flex items-center gap-2">
                <AlertTriangle className="text-orange-500" size={24} /> 
                Stage-Aware Alerts
              </h2>
              
              {/* Critical Alert Card */}
              <div className="bg-white rounded-2xl border-2 border-red-500/20 shadow-lg overflow-hidden">
                <div className="bg-red-500/10 p-4 border-b border-red-500/20 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-red-600 font-bold">
                    <CloudRain size={20} />
                    <span>Rainfall Risk Detected</span>
                  </div>
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    Action Required
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-pitch-black text-lg">Soybean (North Field)</h3>
                      <p className="text-sm font-bold text-golden-chestnut bg-floral-white px-2 py-1 rounded-md w-fit mt-2 border border-[#F0EBE1]">
                        Current Stage: Flowering
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-golden-chestnut uppercase tracking-wider">Risk Threshold</p>
                      <p className="font-bold text-red-500 text-xl">85% Exceeded</p>
                    </div>
                  </div>
                  <p className="text-pitch-black font-medium text-sm leading-relaxed mb-6">
                    Forecast indicates heavy rainfall (45mm) within the next 24 hours. Because your Soybean crop is currently in the delicate <strong>Flowering Stage</strong>, this poses a high risk of flower drop and yield reduction.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 py-3 bg-pitch-black text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
                      Acknowledge Alert
                    </button>
                    <button className="flex-1 py-3 bg-white border border-[#F0EBE1] text-pitch-black rounded-xl font-bold hover:border-sage-green hover:text-sage-green transition-all text-sm">
                      View Preventive Measures
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Continuous Monitoring Grid */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-[#F0EBE1] shadow-sm p-6">
              <h2 className="text-lg font-bold text-pitch-black font-heading mb-6">Live Telemetry Models</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Weather Forecast", status: "Active", icon: ThermometerSun, data: "Updating hourly" },
                  { title: "Soil Moisture", status: "Optimal", icon: Wind, data: "Avg 42%" },
                  { title: "Disease Vectors", status: "Monitoring", icon: Bug, data: "Low Risk" },
                  { title: "Crop Stage Sync", status: "Synced", icon: Sprout, data: "2 Crops Tracked" }
                ].map((model, i) => (
                  <div key={i} className="p-4 rounded-xl bg-floral-white/50 border border-[#F0EBE1] flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-sage-green">
                        <model.icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sage-green bg-sage-green/10 px-2 py-1 rounded-full">
                        {model.status}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-pitch-black text-sm">{model.title}</h4>
                      <p className="text-xs font-medium text-golden-chestnut mt-1">{model.data}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Side Column: Escalation Audit Trail */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-[#F0EBE1] shadow-sm flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30">
              <h2 className="text-lg font-bold text-pitch-black font-heading flex items-center gap-2">
                <History className="text-pitch-black" size={20} /> 
                Escalation Audit Trail
              </h2>
            </div>
            
            <div className="p-6 flex-grow flex flex-col gap-6">
              {/* Audit Log Items */}
              <div className="relative border-l-2 border-[#F0EBE1] pl-6 space-y-8">
                
                {/* Event 1 */}
                <div className="relative">
                  <span className="absolute -left-[33px] top-1 bg-red-500 text-white p-1 rounded-full ring-4 ring-white">
                    <ShieldAlert size={14} />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-golden-chestnut">Today, 08:14 AM</span>
                    <h4 className="text-sm font-bold text-pitch-black">Rainfall Threshold Crossed (85%)</h4>
                    <p className="text-xs font-medium text-golden-chestnut mb-2">Timer threshold exceeded during Soybean Flowering stage.</p>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs font-bold bg-sage-green/10 text-sage-green w-fit px-2 py-1 rounded-md border border-sage-green/20">
                        <Smartphone size={12} /> SMS Delivered
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold bg-sage-green/10 text-sage-green w-fit px-2 py-1 rounded-md border border-sage-green/20">
                        <BellRing size={12} /> Push Alert Sent
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="relative">
                  <span className="absolute -left-[33px] top-1 bg-sage-green text-white p-1 rounded-full ring-4 ring-white">
                    <CheckCircle2 size={14} />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-golden-chestnut">Yesterday, 14:30 PM</span>
                    <h4 className="text-sm font-bold text-pitch-black">Pest Model: Safe</h4>
                    <p className="text-xs font-medium text-golden-chestnut">Risk timer reset. Continuous monitoring resumed.</p>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="relative">
                  <span className="absolute -left-[33px] top-1 bg-orange-500 text-white p-1 rounded-full ring-4 ring-white">
                    <Bug size={14} />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-golden-chestnut">Oct 12, 09:00 AM</span>
                    <h4 className="text-sm font-bold text-pitch-black">Aphid Threat Detected</h4>
                    <p className="text-xs font-medium text-golden-chestnut mb-2">Cotton (Vegetative). Threat level 60%.</p>
                    <div className="flex items-center gap-2 text-xs font-bold bg-sage-green/10 text-sage-green w-fit px-2 py-1 rounded-md border border-sage-green/20">
                      <PhoneCall size={12} /> Voice Call Executed
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}