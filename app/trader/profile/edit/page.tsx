// app/trader/profile/edit/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ChevronLeft, Edit3 } from "lucide-react";
import Link from "next/link";
import { updateTraderProfile } from "../../actions"; // Adjust path if necessary

export default async function EditTraderProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Fetch existing data to prefill form
  const { data: userData } = await supabase
    .from("users")
    .select("*, trader_profiles(*)")
    .eq("id", user.id)
    .single();

  // Safely handle the 1-to-1 relationship mapping
  const traderProfile = Array.isArray(userData?.trader_profiles) 
    ? userData.trader_profiles[0] 
    : userData?.trader_profiles;

  // Set default values 
  const dynamicName = user.user_metadata?.full_name || userData?.full_name || "Prathamesh Bhil";

  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-12 font-body flex justify-center">
      <div className="w-full max-w-3xl space-y-8">
        
        <Link 
          href="/trader/profile" 
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
              <h1 className="text-2xl font-bold text-pitch-black font-heading">Edit Business Profile</h1>
              <p className="text-golden-chestnut text-sm font-medium">Update your company and contact details. Your avatar is synced with your Google account.</p>
            </div>
          </div>

          <form action={updateTraderProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label htmlFor="businessName" className="text-sm font-bold text-pitch-black uppercase tracking-wider">Business Name</label>
                <input 
                  type="text" id="businessName" name="businessName" required 
                  defaultValue={traderProfile?.business_name || ""}
                  className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="ownerName" className="text-sm font-bold text-pitch-black uppercase tracking-wider">Proprietor Name</label>
                <input 
                  type="text" id="ownerName" name="ownerName" required 
                  defaultValue={traderProfile?.owner_name || dynamicName}
                  className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-bold text-pitch-black uppercase tracking-wider">Mobile Number</label>
                <input 
                  type="tel" id="phone" name="phone" required 
                  defaultValue={userData?.phone || traderProfile?.phone || ""}
                  className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="gstNumber" className="text-sm font-bold text-pitch-black uppercase tracking-wider">GSTIN Number</label>
                <input 
                  type="text" id="gstNumber" name="gstNumber" required 
                  defaultValue={traderProfile?.gst_number || ""}
                  placeholder="e.g., 27AADCM1234E1Z5"
                  className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="address" className="text-sm font-bold text-pitch-black uppercase tracking-wider">Registered Address</label>
                <input 
                  type="text" id="address" name="address" required 
                  defaultValue={traderProfile?.address || ""}
                  className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black rounded-xl py-3 px-4 outline-none focus:border-sage-green"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 mt-6 bg-sage-green text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}