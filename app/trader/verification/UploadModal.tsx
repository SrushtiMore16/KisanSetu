// app/trader/verification/UploadModal.tsx
"use client";

import { useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { uploadKycDocument } from "../actions";

export default function UploadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await uploadKycDocument(formData);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-pitch-black text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
      >
        <UploadCloud size={16} /> Upload New Document
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-golden-chestnut hover:text-pitch-black">
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-bold text-pitch-black font-heading mb-4">Upload KYC Document</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-pitch-black uppercase">Document Type</label>
                <select name="documentType" required className="w-full mt-1 bg-floral-white border border-[#F0EBE1] rounded-xl py-2 px-3 outline-none">
                  <option value="GST Certificate">GST Certificate</option>
                  <option value="APMC Trade License">APMC Trade License</option>
                  <option value="Director PAN">Director PAN</option>
                  <option value="Bank Statement">Bank Statement</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-pitch-black uppercase">Document Number (Optional)</label>
                <input type="text" name="documentNumber" className="w-full mt-1 bg-floral-white border border-[#F0EBE1] rounded-xl py-2 px-3 outline-none" />
              </div>

              <div>
                <label className="text-xs font-bold text-pitch-black uppercase">File</label>
                <input type="file" name="file" required accept=".pdf,.jpg,.png" className="w-full mt-1 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-sage-green/10 file:text-sage-green cursor-pointer text-xs" />
              </div>

              <button type="submit" disabled={isUploading} className="w-full py-3 bg-sage-green text-white rounded-xl font-bold mt-4 flex justify-center items-center gap-2">
                {isUploading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : 'Submit Document'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
