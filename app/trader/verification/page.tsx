// app/trader/verification/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { 
  ShieldCheck, ChevronLeft, FileText, Building, Star, 
  AlertOctagon, CheckCircle2, Clock, ThumbsUp, Lock
} from "lucide-react";
import Link from "next/link";
import UploadModal from "./UploadModal";

export default async function TraderVerificationPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect("/login");

  // Fetch Trader Profile
  const { data: userData } = await supabase
    .from("users")
    .select("*, trader_profiles(*)")
    .eq("id", user.id)
    .single();

  const traderProfile = Array.isArray(userData?.trader_profiles) ? userData.trader_profiles[0] : userData?.trader_profiles;

  // Fetch KYC Docs
  const { data: kycDocs } = await supabase
    .from("kyc_documents")
    .select("*")
    .eq("trader_id", user.id);

  // Fetch Reviews
  const { data: reviews } = await supabase
    .from("trader_reviews")
    .select("*")
    .eq("trader_id", user.id)
    .order('created_at', { ascending: false });

  // Fetch Disputes
  const { data: disputes } = await supabase
    .from("disputes")
    .select("*")
    .eq("trader_id", user.id)
    .order('created_at', { ascending: false });


  // Setup default document structure required for verification
  const defaultDocs = [
    { type: "GST Certificate", id: traderProfile?.gst_number || "Not Provided" },
    { type: "APMC Trade License", id: "Not Provided" },
    { type: "Director PAN", id: "Not Provided" },
    { type: "Bank Account Check", id: "Not Provided" }
  ];

  // Merge database docs with defaults
  const displayDocs = defaultDocs.map(defaultDoc => {
    const uploadedDoc = kycDocs?.find(doc => doc.document_type === defaultDoc.type || (defaultDoc.type === "Director PAN" && doc.document_type === "Director PAN"));
    return {
      name: defaultDoc.type,
      id: uploadedDoc?.document_number || defaultDoc.id,
      status: uploadedDoc?.status || "Pending Update",
      date: uploadedDoc ? new Date(uploadedDoc.updated_at).toLocaleDateString() : "Action Required",
      url: uploadedDoc?.file_url
    };
  });

  // Calculate dynamic trust score (mock logic for demo)
  const baseScore = 60;
  const verificationBonus = traderProfile?.is_verified ? 20 : 0;
  const docsBonus = (kycDocs?.filter(d => d.status === 'Verified').length || 0) * 5;
  const dynamicScore = Math.min(baseScore + verificationBonus + docsBonus, 100);
  
  let trustLevel = "Fair";
  if (dynamicScore > 85) trustLevel = "Excellent";
  else if (dynamicScore > 70) trustLevel = "Good";

  const verificationData = {
    trustScore: dynamicScore,
    trustLevel: trustLevel,
    businessInfo: {
      entityType: "Private Limited Company", // Could be added to profile later
      registrationNo: traderProfile?.gst_number || "Not Available",
      yearsActive: "N/A", // Could be calculated from created_at
      registeredState: traderProfile?.address?.split(',').pop() || "Not Available"
    },
    kycDocuments: displayDocs,
    reviews: reviews || [],
    disputes: disputes || []
  };

  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-12 font-body">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header Navigation */}
        <div className="flex flex-col gap-4">
          <Link href="/trader/dashboard" className="w-fit text-golden-chestnut hover:text-sage-green flex items-center gap-1 font-medium transition-colors text-sm">
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
            
            <UploadModal />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Trust Score & Business Info */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Trust Score Card */}
            <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-sage-green" />
              <h2 className="text-sm font-bold text-golden-chestnut uppercase tracking-wider mb-6">KisanSetu Trust Score</h2>
              
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-[#F0EBE1]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-sage-green" strokeDasharray={`${verificationData.trustScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
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
            </div>

            {/* Business Information */}
            <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-pitch-black font-heading text-lg flex items-center gap-2 border-b border-[#F0EBE1] pb-3">
                <Building size={20} className="text-sage-green" /> Business Details
              </h3>
              
              <div className="space-y-4 pt-2">
                <div>
                  <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">Entity Type</p>
                  <p className="text-sm font-bold text-pitch-black">{verificationData.businessInfo.entityType}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">Registration Number / GST</p>
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
            </div>
          </div>

          {/* Right Column: Documents, Reviews, Disputes */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* KYC Documents */}
            <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden flex flex-col">
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
                        doc.status === "Verified" ? "bg-sage-green/10 text-sage-green" : 
                        doc.status === "Under Review" ? "bg-blue-500/10 text-blue-600" : "bg-orange-500/10 text-orange-600"
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end mt-auto pt-2">
                      <div>
                        <p className="text-xs font-bold text-pitch-black font-mono">{doc.id}</p>
                        <p className="text-[10px] font-medium text-golden-chestnut mt-1">Status: {doc.date}</p>
                      </div>
                      {doc.url && (
                         <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-sage-green hover:underline">View File</a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Farmer Reviews */}
            <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#F0EBE1] flex justify-between items-center">
                <h2 className="text-lg font-bold text-pitch-black font-heading flex items-center gap-2">
                  <Star className="text-orange-500" size={20} fill="currentColor" /> 
                  Farmer Reviews (Public)
                </h2>
              </div>
              
              <div className="divide-y divide-[#F0EBE1]">
                {verificationData.reviews.length === 0 ? (
                   <div className="p-6 text-center text-golden-chestnut text-sm">No reviews yet.</div>
                ) : (
                  verificationData.reviews.map((review, idx) => (
                    <div key={idx} className="p-6 hover:bg-floral-white/30 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-pitch-black">{review.farmer_name}</h4>
                          <p className="text-xs font-medium text-golden-chestnut mt-0.5">{new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < review.rating ? "text-orange-500" : "text-[#F0EBE1]"} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-pitch-black leading-relaxed italic">"{review.comment}"</p>
                      {review.tag && (
                        <div className="mt-3 flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-sage-green bg-sage-green/10 px-2 py-1 rounded-md">
                            <ThumbsUp size={12} /> {review.tag}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Dispute History */}
            <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden">
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
                {verificationData.disputes.length === 0 ? (
                  <div className="text-center text-golden-chestnut text-sm">No disputes recorded. Excellent record!</div>
                ) : (
                  verificationData.disputes.map((dispute, idx) => (
                    <div key={idx} className="p-4 border-l-2 border-sage-green bg-floral-white/50 rounded-r-xl mb-4 last:mb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-pitch-black text-sm">{dispute.issue}</h4>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 ${
                           dispute.status === "Closed" ? "bg-sage-green/10 text-sage-green" : "bg-orange-500/10 text-orange-600"
                        }`}>
                          <CheckCircle2 size={12} /> {dispute.status}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-golden-chestnut flex items-center gap-1 mb-2">
                        <Clock size={12} /> {new Date(dispute.created_at).toLocaleDateString()} • ID: {dispute.id.slice(0,8)}
                      </p>
                      {dispute.resolution && (
                         <p className="text-sm font-medium text-pitch-black">
                           <span className="font-bold">Resolution:</span> {dispute.resolution}
                         </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
