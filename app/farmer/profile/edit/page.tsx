// app/farmer/profile/edit/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ChevronLeft, Edit3 } from "lucide-react";
import Link from "next/link";
import { updateFarmerProfile } from "../../actions";

export default async function EditProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Fetch existing data
  const { data: userData } = await supabase
    .from("users")
    .select("*, farmer_profiles(*)")
    .eq("id", user.id)
    .single();

  const dynamicName = user.user_metadata?.full_name || user.user_metadata?.name || userData?.full_name || "";
  
  // FIX: Safely handle the 1-to-1 relationship object
  const farmProfile = Array.isArray(userData?.farmer_profiles) 
    ? userData.farmer_profiles[0] 
    : userData?.farmer_profiles;

  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-12 font-body flex justify-center">
      <div className="w-full max-w-3xl space-y-8">
        
        <Link 
          href="/farmer/profile" 
          className="w-fit text-golden-chestnut hover:text-sage-green flex items-center gap-1 font-medium transition-colors text-sm"
        >
          <ChevronLeft size={16} /> Back to Profile
        </Link>

        <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#F0EBE1]">
            <div className="p-3 bg-sage-green/10 text-sage-green rounded-xl">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-pitch-black font-heading">Edit Profile</h1>
              <p className="text-golden-chestnut text-sm font-medium">Update your personal and farm details.</p>
            </div>
          </div>

          <form action={updateFarmerProfile} className="space-y-8">
            
            {/* Personal Details Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-pitch-black font-heading text-lg">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-bold text-pitch-black uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" id="fullName" name="fullName" required 
                    defaultValue={dynamicName}
                    className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-bold text-pitch-black uppercase tracking-wider">Mobile Number</label>
                  <input 
                    type="tel" id="phone" name="phone" required 
                    defaultValue={userData?.phone || ""}
                    placeholder="+91 00000 00000"
                    className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="address" className="text-sm font-bold text-pitch-black uppercase tracking-wider">Farm Address / Location</label>
                  <input 
                    type="text" id="address" name="address" required 
                    defaultValue={farmProfile?.address || ""}
                    className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Farm Overview Section */}
            <div className="space-y-4 pt-6 border-t border-[#F0EBE1]">
              <h3 className="font-bold text-pitch-black font-heading text-lg">Farm Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="totalArea" className="text-sm font-bold text-pitch-black uppercase tracking-wider">Total Area</label>
                  <input 
                    type="text" id="totalArea" name="totalArea" required 
                    defaultValue={farmProfile?.total_area || ""}
                    placeholder="e.g., 15 Acres"
                    className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="soilType" className="text-sm font-bold text-pitch-black uppercase tracking-wider">Soil Type</label>
                  <input 
                    type="text" id="soilType" name="soilType" required 
                    defaultValue={farmProfile?.soil_type || ""}
                    placeholder="e.g., Black Cotton"
                    className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="irrigation" className="text-sm font-bold text-pitch-black uppercase tracking-wider">Irrigation</label>
                  <input 
                    type="text" id="irrigation" name="irrigation" required 
                    defaultValue={farmProfile?.irrigation_type || ""}
                    placeholder="e.g., Drip & Sprinkler"
                    className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 mt-6 bg-sage-green text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}