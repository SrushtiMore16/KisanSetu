// app/farmer/diagnosis/page.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UploadCloud, 
  ImageIcon, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Syringe, 
  ChevronLeft,
  Sprout,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";

// Mock AI Response Type
type DiagnosisResult = {
  condition: string;
  status: "Healthy" | "Infected" | "Critical";
  confidence: number;
  description: string;
  treatments: string[];
};

export default function DiagnosisPage() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local URL for the preview
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setResult(null);
      
      // Simulate AI processing
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setResult({
          condition: "Early Blight (Alternaria solani)",
          status: "Infected",
          confidence: 94.2,
          description: "Fungal infection detected. Typically causes brown spots with concentric rings on lower leaves first. Can spread rapidly in warm, humid conditions.",
          treatments: [
            "Apply Copper Oxychloride (50% WP) at 2.5g/liter of water.",
            "Remove and safely destroy severely infected lower leaves.",
            "Ensure proper spacing between plants to improve air circulation.",
            "Avoid overhead irrigation; use drip irrigation if possible."
          ]
        });
      }, 3000); // 3 second simulated delay
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const resetDiagnosis = () => {
    setImage(null);
    setResult(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-12 font-body">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex flex-col gap-4">
          <Link 
            href="/farmer/dashboard" 
            className="w-fit text-golden-chestnut hover:text-sage-green flex items-center gap-1 font-medium transition-colors text-sm"
          >
            <ChevronLeft size={16} /> Back to Dashboard
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-pitch-black font-heading">
              Plant Doctor
            </h1>
            <p className="text-golden-chestnut font-medium mt-2">
              Upload a clear photo of the affected leaf or plant for instant AI diagnosis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Upload & Preview */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden flex flex-col h-full min-h-[400px]"
          >
            <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30">
              <h2 className="text-xl font-bold text-pitch-black font-heading flex items-center gap-2">
                <ImageIcon className="text-sage-green" size={24} /> Image Input
              </h2>
            </div>
            
            <div className="p-6 flex-grow flex flex-col items-center justify-center relative">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleImageUpload}
              />
              
              <AnimatePresence mode="wait">
                {!image ? (
                  <motion.div 
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={triggerFileInput}
                    className="w-full h-full min-h-[300px] border-2 border-dashed border-[#F0EBE1] hover:border-sage-green/50 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer bg-floral-white/20 hover:bg-sage-green/5 transition-all group"
                  >
                    <div className="p-4 bg-sage-green/10 rounded-full text-sage-green group-hover:scale-110 transition-transform">
                      <UploadCloud size={40} />
                    </div>
                    <div className="text-center">
                      <p className="text-pitch-black font-bold text-lg">Click to upload image</p>
                      <p className="text-golden-chestnut text-sm font-medium mt-1">or drag and drop here</p>
                      <p className="text-golden-chestnut/60 text-xs mt-4">Supports JPG, PNG (Max 5MB)</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full relative rounded-2xl overflow-hidden group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={image} 
                      alt="Crop upload preview" 
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    
                    {/* Scanning Overlay Animation */}
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-pitch-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-10">
                        <motion.div 
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                          className="absolute w-full h-1 bg-sage-green shadow-[0_0_15px_rgba(125,159,48,1)]"
                        />
                        <Activity className="text-sage-green animate-pulse mb-4" size={48} />
                        <p className="text-white font-bold tracking-wider animate-pulse">ANALYZING CROP...</p>
                      </div>
                    )}

                    {!isAnalyzing && result && (
                      <div className="absolute bottom-4 right-4 z-10">
                        <button 
                          onClick={resetDiagnosis}
                          className="px-4 py-2 bg-pitch-black text-white text-sm font-bold rounded-lg shadow-lg hover:bg-pitch-black/80 transition-colors"
                        >
                          Scan Another
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: Results & Recommendations */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden flex flex-col h-full min-h-[400px]"
          >
            <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30">
              <h2 className="text-xl font-bold text-pitch-black font-heading flex items-center gap-2">
                <Activity className="text-pitch-black" size={24} /> Diagnostic Report
              </h2>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              {!image && !isAnalyzing && !result && (
                <div className="flex-grow flex flex-col items-center justify-center text-center opacity-50">
                  <ShieldAlert size={64} className="text-golden-chestnut mb-4 opacity-50" />
                  <p className="text-pitch-black font-bold text-lg">No Data Available</p>
                  <p className="text-golden-chestnut text-sm font-medium">Upload an image to generate a report.</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="flex-grow flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-sage-green/20 border-t-sage-green rounded-full animate-spin mb-6" />
                  <p className="text-pitch-black font-bold text-lg">Consulting AI Knowledge Base...</p>
                  <p className="text-golden-chestnut text-sm font-medium mt-1">Cross-referencing symptoms with 10,000+ plant diseases.</p>
                </div>
              )}

              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 flex-grow"
                >
                  {/* Status Banner */}
                  <div className={`p-4 rounded-xl flex items-start gap-4 ${
                    result.status === 'Infected' ? 'bg-orange-500/10 border border-orange-500/20' : 
                    result.status === 'Critical' ? 'bg-red-500/10 border border-red-500/20' : 
                    'bg-sage-green/10 border border-sage-green/20'
                  }`}>
                    {result.status === 'Healthy' ? (
                      <CheckCircle2 className="text-sage-green shrink-0 mt-1" size={28} />
                    ) : (
                      <AlertTriangle className="text-orange-500 shrink-0 mt-1" size={28} />
                    )}
                    <div>
                      <h3 className={`text-xl font-bold ${
                        result.status === 'Infected' ? 'text-orange-600' : 
                        result.status === 'Critical' ? 'text-red-600' : 'text-sage-green'
                      }`}>
                        {result.condition}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm font-bold text-pitch-black px-2 py-1 bg-white rounded-md shadow-sm">
                          Confidence: {result.confidence}%
                        </span>
                        <span className="text-sm font-bold text-pitch-black px-2 py-1 bg-white rounded-md shadow-sm">
                          Severity: {result.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-bold text-pitch-black flex items-center gap-2 mb-2">
                      <Sprout size={18} className="text-sage-green" /> Overview
                    </h4>
                    <p className="text-golden-chestnut font-medium text-sm leading-relaxed">
                      {result.description}
                    </p>
                  </div>

                  {/* Treatments */}
                  <div className="bg-floral-white rounded-2xl p-5 border border-[#F0EBE1]">
                    <h4 className="font-bold text-pitch-black flex items-center gap-2 mb-4">
                      <Syringe size={18} className="text-pitch-black" /> Recommended Action Plan
                    </h4>
                    <ul className="space-y-3">
                      {result.treatments.map((treatment, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sage-green/20 text-sage-green text-xs font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-sm font-medium text-pitch-black leading-relaxed">
                            {treatment}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full py-4 bg-pitch-black text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2">
                    Save Report to Crop Timeline
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}