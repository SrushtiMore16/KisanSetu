// app/farmer/schemes/page.tsx
"use client";

import { motion } from "framer-motion";
import { 
  Landmark, 
  ChevronLeft, 
  AlertCircle, 
  ExternalLink, 
  FileText, 
  CheckCircle2,
  ArrowRight,
  Info,
  ScrollText
} from "lucide-react";
import Link from "next/link";

// Mock Data for Schemes
const recommendedSchemes = [
  {
    id: "pm-kisan",
    title: "PM-KISAN Samman Nidhi",
    authority: "Central Government",
    matchLevel: "High Match",
    description: "Minimum income support of ₹6,000 per year for all landholding farmer families, provided in three equal installments.",
    eligibilityFactor: "Matches your registered landholding size (< 2 Hectares) and active bank account status.",
    documents: [
      "Land ownership records (7/12 extract)",
      "Bank account details (Passbook copy)",
      "Active mobile number linked to bank"
    ],
    nextSteps: [
      "Verify land records on MahaBhulekh portal.",
      "Ensure e-KYC is completed via official PM-KISAN portal.",
      "Submit application through local CSC or online."
    ],
    link: "https://pmkisan.gov.in/"
  },
  {
    id: "pmfby",
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    authority: "Central/State Government",
    matchLevel: "Action Required",
    description: "Comprehensive crop insurance against non-preventable natural risks from pre-sowing to post-harvest.",
    eligibilityFactor: "Triggered by your active Soybean and Cotton crop cycles (Kharif season).",
    documents: [
      "Sowing certificate from Talathi / Gram Panchayat",
      "Land records (7/12 & 8A extracts)",
      "Bank account details"
    ],
    nextSteps: [
      "Obtain sowing certificate within 15 days of sowing.",
      "Pay the nominal 2% premium for Kharif crops.",
      "Register policy on the National Crop Insurance Portal."
    ],
    link: "https://pmfby.gov.in/"
  },
  {
    id: "kcc",
    title: "Kisan Credit Card (KCC)",
    authority: "Banking Initiative",
    matchLevel: "Eligible",
    description: "Provides farmers with timely access to adequate credit for agricultural expenses at concessional interest rates.",
    eligibilityFactor: "Based on your active farming status and clear credit history.",
    documents: [
      "Identity and Address Proof",
      "Land holding documents",
      "Recent passport size photographs"
    ],
    nextSteps: [
      "Download the KCC application form.",
      "Visit your nearest commercial bank branch or cooperative bank.",
      "Submit land documents for loan limit assessment."
    ],
    link: "https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan/kisan-credit-card"
  }
];

export default function SchemeGuidancePage() {
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
                <Landmark className="text-sage-green" size={32} />
                Scheme Eligibility Guidance
              </h1>
              <p className="text-golden-chestnut font-medium mt-2">
                Discover government subsidies, grants, and insurance policies you may qualify for.
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Legal Disclaimer Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-500/10 border-l-4 border-orange-500 p-5 rounded-r-2xl flex gap-4"
        >
          <AlertCircle className="text-orange-600 shrink-0 mt-0.5" size={24} />
          <div>
            <h3 className="text-orange-800 font-bold text-sm uppercase tracking-wider mb-1">
              Guidance Only — Not a Legal Claim
            </h3>
            <p className="text-orange-900/80 font-medium text-sm leading-relaxed">
              The schemes listed below are algorithmic recommendations based on the farm profile, crop types, and location data you have provided to KisanSetu. This does not guarantee eligibility or approval. Always verify final requirements, deadlines, and eligibility criteria directly on the respective official government portals.
            </p>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {recommendedSchemes.map((scheme) => (
            <motion.div 
              key={scheme.id}
              variants={itemVariants}
              className="bg-white rounded-2xl border border-[#F0EBE1] shadow-sm overflow-hidden"
            >
              {/* Scheme Header */}
              <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="p-3 bg-sage-green/10 text-sage-green rounded-xl h-fit">
                    <ScrollText size={28} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-golden-chestnut uppercase tracking-wider mb-1 block">
                      {scheme.authority}
                    </span>
                    <h2 className="text-2xl font-bold text-pitch-black font-heading">
                      {scheme.title}
                    </h2>
                    <p className="text-pitch-black font-medium text-sm mt-2 max-w-2xl leading-relaxed">
                      {scheme.description}
                    </p>
                  </div>
                </div>
                
                {/* Match Badge */}
                <div className="shrink-0">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit
                    ${scheme.matchLevel === 'High Match' ? 'bg-sage-green/10 text-sage-green border border-sage-green/20' : 
                      scheme.matchLevel === 'Action Required' ? 'bg-orange-500/10 text-orange-600 border border-orange-500/20' : 
                      'bg-pitch-black/5 text-pitch-black border border-pitch-black/10'}`}
                  >
                    <Info size={14} /> {scheme.matchLevel}
                  </span>
                </div>
              </div>

              {/* Match Reason */}
              <div className="px-6 py-3 bg-sage-green/5 border-b border-[#F0EBE1] flex items-center gap-3">
                <CheckCircle2 size={18} className="text-sage-green shrink-0" />
                <span className="text-sm font-medium text-pitch-black">
                  <strong className="text-sage-green">Why this matched:</strong> {scheme.eligibilityFactor}
                </span>
              </div>

              {/* Requirements & Next Steps Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Documents List */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-pitch-black uppercase tracking-wider flex items-center gap-2">
                    <FileText size={18} className="text-golden-chestnut" /> Required Documents
                  </h3>
                  <ul className="space-y-3">
                    {scheme.documents.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm font-medium text-golden-chestnut">
                        <div className="w-1.5 h-1.5 rounded-full bg-golden-chestnut shrink-0 mt-1.5" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Steps List */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-pitch-black uppercase tracking-wider flex items-center gap-2">
                    <ArrowRight size={18} className="text-sage-green" /> Immediate Next Steps
                  </h3>
                  <ul className="space-y-3">
                    {scheme.nextSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sage-green/10 text-sage-green text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-medium text-pitch-black">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Footer CTA */}
              <div className="p-6 pt-0 flex justify-end">
                <a 
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-pitch-black text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2"
                >
                  Verify on Official Portal <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}