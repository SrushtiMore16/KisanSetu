// app/trader/verification/page.tsx
"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  ChevronLeft, 
  FileText, 
  Building, 
  Star, 
  AlertOctagon, 
  CheckCircle2,
  Clock,
  ThumbsUp,
  UploadCloud,
  Lock
} from "lucide-react";
import Link from "next/link";

// Mock Data: Trader Verification Profile
const verificationData = {
  trustScore: 94,
  trustLevel: "Excellent",
  businessInfo: {
    entityType: "Private Limited Company",
    registrationNo: "MH-2018-PTC-123456",
    yearsActive: "6 Years",
    registeredState: "Maharashtra"
  },
  kycDocuments: [
    { name: "GST Certificate", id: "27AADCM1234E1Z5", status: "Verified", date: "Jan 2024" },
    { name: "APMC Trade License", id: "APMC/VSH/2024-89", status: "Verified", date: "Mar 2024" },
    { name: "Director Aadhar/PAN", id: "Ending in ****4321", status: "Verified", date: "Jan 2024" },
    { name: "Bank Account Check", id: "HDFC Bank (****9090)", status: "Pending Update", date: "Action Required" }
  ],
  reviews: [
    { farmer: "Amit Deshmukh", rating: 5, date: "14 Oct 2026", comment: "Very fast payment clearance. Fair weighing process at the yard.", tag: "Fast Payer" },
    { farmer: "Suresh Pawar", rating: 4, date: "28 Sep 2026", comment: "Good pricing, but transport truck arrived 2 hours late for pickup.", tag: "Fair Price" },
    { farmer: "Ramesh Patil", rating: 5, date: "10 Sep 2026", comment: "Transparent negotiation. Will trade again next season.", tag: "Transparent" }
  ],
  disputes: [
    { id: "DSP-112", date: "15 Aug 2026", issue: "Quality mismatch on delivery", resolution: "Resolved via partial refund (Agreed by both parties)", status: "Closed" }
  ]
};

export default function TraderVerificationPage() {
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
                <ShieldCheck className="text-sage-green" size={32} />
                Verification & Trust Profile
              </h1>
              <p className="text-golden-chestnut font-medium mt-2">
                Manage your compliance documents and monitor your public reputation.
              </p>
            </div>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-pitch-black text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
              <UploadCloud size={16} />
              Upload New Document
            </button>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left Column: Trust Score & Business Info */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Trust Score Card */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-sage-green" />
              <h2 className="text-sm font-bold text-golden-chestnut uppercase tracking-wider mb-6">KisanSetu Trust Score</h2>
              
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#F0EBE1]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-sage-green"
                    strokeDasharray={`${verificationData.trustScore}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-pitch-black font-heading">{verificationData.trustScore}</span>
                  <span className="text-[10px] font-bold text-sage-green uppercase tracking-wider">/ 100</span>
                </div>
              </div>
              
              <p className="mt-4 font-bold text-pitch-black text-lg">{verificationData.trustLevel}</p>
              <p className="text-xs font-medium text-golden-chestnut mt-2">
                Farmers see this score. It is based on your completed trades, payment speed, and reviews.
              </p>
            </motion.div>

            {/* Business Information */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-pitch-black font-heading text-lg flex items-center gap-2 border-b border-[#F0EBE1] pb-3">
                <Building size={20} className="text-sage-green" /> Business Details
              </h3>
              
              <div className="space-y-4 pt-2">
                <div>
                  <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">Entity Type</p>
                  <p className="text-sm font-bold text-pitch-black">{verificationData.businessInfo.entityType}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">Registration Number</p>
                  <p className="text-sm font-bold text-pitch-black">{verificationData.businessInfo.registrationNo}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">Years Active</p>
                    <p className="text-sm font-bold text-pitch-black">{verificationData.businessInfo.yearsActive}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">State</p>
                    <p className="text-sm font-bold text-pitch-black">{verificationData.businessInfo.registeredState}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Documents, Reviews, Disputes */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* KYC Documents */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30 flex justify-between items-center">
                <h2 className="text-xl font-bold text-pitch-black font-heading flex items-center gap-2">
                  <FileText className="text-pitch-black" size={24} /> 
                  KYC & Legal Documents
                </h2>
                <div className="flex items-center gap-1 text-xs font-bold text-golden-chestnut">
                  <Lock size={12} /> Secure Vault
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {verificationData.kycDocuments.map((doc, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[#F0EBE1] flex flex-col gap-3 bg-floral-white/50 hover:bg-white hover:border-sage-green/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-pitch-black text-sm">{doc.name}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        doc.status === "Verified" ? "bg-sage-green/10 text-sage-green" : "bg-orange-500/10 text-orange-600 animate-pulse"
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end mt-auto pt-2">
                      <div>
                        <p className="text-xs font-bold text-pitch-black font-mono">{doc.id}</p>
                        <p className="text-[10px] font-medium text-golden-chestnut mt-1">Last Updated: {doc.date}</p>
                      </div>
                      {doc.status !== "Verified" && (
                        <button className="text-xs font-bold text-orange-600 hover:underline">Update Now</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Farmer Reviews */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#F0EBE1] flex justify-between items-center">
                <h2 className="text-lg font-bold text-pitch-black font-heading flex items-center gap-2">
                  <Star className="text-orange-500" size={20} fill="currentColor" /> 
                  Farmer Reviews (Public)
                </h2>
                <span className="text-sm font-bold text-pitch-black">4.8 / 5.0 Avg</span>
              </div>
              
              <div className="divide-y divide-[#F0EBE1]">
                {verificationData.reviews.map((review, idx) => (
                  <div key={idx} className="p-6 hover:bg-floral-white/30 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-pitch-black">{review.farmer}</h4>
                        <p className="text-xs font-medium text-golden-chestnut mt-0.5">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? "text-orange-500" : "text-[#F0EBE1]"} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-pitch-black leading-relaxed italic">"{review.comment}"</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-sage-green bg-sage-green/10 px-2 py-1 rounded-md">
                        <ThumbsUp size={12} /> {review.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Dispute History */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30">
                <h2 className="text-lg font-bold text-pitch-black font-heading flex items-center gap-2">
                  <AlertOctagon className="text-pitch-black" size={20} /> 
                  Dispute Transparency Log
                </h2>
                <p className="text-xs font-medium text-golden-chestnut mt-1">
                  We maintain a transparent log of trade disputes to build trust in the ecosystem.
                </p>
              </div>
              
              <div className="p-6">
                {verificationData.disputes.map((dispute, idx) => (
                  <div key={idx} className="p-4 border-l-2 border-sage-green bg-floral-white/50 rounded-r-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-pitch-black text-sm">{dispute.issue}</h4>
                      <span className="text-[10px] font-bold text-sage-green uppercase tracking-wider bg-sage-green/10 px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 size={12} /> {dispute.status}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-golden-chestnut flex items-center gap-1 mb-2">
                      <Clock size={12} /> {dispute.date} • ID: {dispute.id}
                    </p>
                    <p className="text-sm font-medium text-pitch-black">
                      <span className="font-bold">Resolution:</span> {dispute.resolution}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
