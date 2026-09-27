// app/farmer/listings/new/page.tsx
import { ChevronLeft, Package, IndianRupee, Sprout } from "lucide-react";
import Link from "next/link";
import { createListing } from "../../actions";

export default function NewListingPage() {
  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-12 font-body flex justify-center">
      <div className="w-full max-w-2xl space-y-8">
        
        <Link 
          href="/farmer/dashboard" 
          className="w-fit text-golden-chestnut hover:text-sage-green flex items-center gap-1 font-medium transition-colors text-sm"
        >
          <ChevronLeft size={16} /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#F0EBE1]">
            <div className="p-4 bg-sage-green/10 text-sage-green rounded-2xl">
              <Sprout size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-pitch-black font-heading">Post a New Crop</h1>
              <p className="text-golden-chestnut font-medium mt-1">List your harvest on the marketplace for traders to see.</p>
            </div>
          </div>

          <form action={createListing} className="space-y-6">
            
            {/* Crop Name */}
            <div className="space-y-2">
              <label htmlFor="cropName" className="text-sm font-bold text-pitch-black uppercase tracking-wider">
                Crop Name / Variety
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  id="cropName" 
                  name="cropName" 
                  required 
                  placeholder="e.g., Premium Wheat (Lokwan)"
                  className="w-full bg-floral-white border-2 border-[#F0EBE1] text-pitch-black rounded-xl py-3.5 px-4 outline-none focus:border-sage-green focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quantity */}
              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-bold text-pitch-black uppercase tracking-wider">
                  Available Quantity
                </label>
                <div className="relative flex items-center">
                  <Package className="absolute left-4 text-golden-chestnut" size={18} />
                  <input 
                    type="text" 
                    id="quantity" 
                    name="quantity" 
                    required 
                    placeholder="e.g., 50 Quintals"
                    className="w-full bg-floral-white border-2 border-[#F0EBE1] text-pitch-black rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sage-green focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-bold text-pitch-black uppercase tracking-wider">
                  Asking Price
                </label>
                <div className="relative flex items-center">
                  <IndianRupee className="absolute left-4 text-golden-chestnut" size={18} />
                  <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    required 
                    min="1"
                    step="0.01"
                    placeholder="Total amount (₹)"
                    className="w-full bg-floral-white border-2 border-[#F0EBE1] text-pitch-black rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sage-green focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 mt-8 border-t border-[#F0EBE1]">
              <button 
                type="submit" 
                className="w-full py-4 bg-sage-green text-white rounded-xl font-bold text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2"
              >
                Publish Listing
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
