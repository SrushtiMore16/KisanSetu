// app/farmer/profile/add-crop/page.tsx
import { addCropCycle } from "../../actions";
import { ChevronLeft, Sprout } from "lucide-react";
import Link from "next/link";

export default function AddCropPage() {
  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-12 font-body flex justify-center">
      <div className="w-full max-w-2xl space-y-8">
        
        <Link 
          href="/farmer/profile" 
          className="w-fit text-golden-chestnut hover:text-sage-green flex items-center gap-1 font-medium transition-colors text-sm"
        >
          <ChevronLeft size={16} /> Back to Profile
        </Link>

        <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#F0EBE1]">
            <div className="p-3 bg-sage-green/10 text-sage-green rounded-xl">
              <Sprout size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-pitch-black font-heading">Add New Crop Cycle</h1>
              <p className="text-golden-chestnut text-sm font-medium">Track a new crop from sowing to harvest.</p>
            </div>
          </div>

          <form action={addCropCycle} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="cropName" className="text-sm font-bold text-pitch-black uppercase tracking-wider">Crop Name</label>
              <input 
                type="text" 
                id="cropName" 
                name="cropName" 
                required 
                placeholder="e.g., Soybean (JS 335)"
                className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="areaAllocated" className="text-sm font-bold text-pitch-black uppercase tracking-wider">Area Allocated</label>
              <input 
                type="text" 
                id="areaAllocated" 
                name="areaAllocated" 
                required 
                placeholder="e.g., 5 Acres"
                className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="sownDate" className="text-sm font-bold text-pitch-black uppercase tracking-wider">Sown Date</label>
                <input 
                  type="date" 
                  id="sownDate" 
                  name="sownDate" 
                  required 
                  className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="expectedHarvest" className="text-sm font-bold text-pitch-black uppercase tracking-wider">Expected Harvest</label>
                <input 
                  type="date" 
                  id="expectedHarvest" 
                  name="expectedHarvest" 
                  required 
                  className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 mt-4 bg-sage-green text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Start Crop Cycle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
