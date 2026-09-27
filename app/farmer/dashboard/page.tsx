// app/farmer/dashboard/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Sprout, IndianRupee, Handshake, TrendingUp, Plus, Package } from "lucide-react";
import Link from "next/link";

export default async function FarmerDashboard() {
  // 1. Authenticate the user on the server
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Fetch Dashboard Data securely (RLS ensures they only get their data)
  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: deals } = await supabase
    .from("deals")
    .select("*, listings(crop_name)")
    .order("created_at", { ascending: false });

  // 3. Calculate Stats
  const activeListingsCount = listings?.filter(l => l.status === 'Active').length || 0;
  const pendingDealsCount = deals?.filter(d => d.status === 'Pending').length || 0;
  
  // Calculate total revenue from 'Completed' deals
  const totalRevenue = deals?.reduce((sum, deal) => {
    return deal.status === 'Completed' ? sum + Number(deal.amount) : sum;
  }, 0) || 0;

  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-10 font-body">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-pitch-black font-heading">
              Welcome back, {user.user_metadata?.full_name || "Farmer"}
            </h1>
            <p className="text-golden-chestnut font-medium mt-1">Here is what is happening with your farm today.</p>
          </div>
          <Link 
            href="/farmer/listings/new" 
            className="flex items-center gap-2 px-6 py-3 bg-sage-green text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all w-fit"
          >
            <Plus size={20} /> Create New Listing
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#F0EBE1] shadow-sm flex items-center gap-4">
            <div className="p-4 bg-sage-green/10 text-sage-green rounded-2xl"><Package size={28} /></div>
            <div>
              <p className="text-sm font-bold text-golden-chestnut uppercase tracking-wider">Active Listings</p>
              <p className="text-3xl font-bold text-pitch-black">{activeListingsCount}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#F0EBE1] shadow-sm flex items-center gap-4">
            <div className="p-4 bg-orange-500/10 text-orange-500 rounded-2xl"><Handshake size={28} /></div>
            <div>
              <p className="text-sm font-bold text-golden-chestnut uppercase tracking-wider">Pending Deals</p>
              <p className="text-3xl font-bold text-pitch-black">{pendingDealsCount}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#F0EBE1] shadow-sm flex items-center gap-4">
            <div className="p-4 bg-green-500/10 text-green-500 rounded-2xl"><IndianRupee size={28} /></div>
            <div>
              <p className="text-sm font-bold text-golden-chestnut uppercase tracking-wider">Total Revenue</p>
              <p className="text-3xl font-bold text-pitch-black">₹{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Listings */}
          <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#F0EBE1] flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-pitch-black font-heading">Your Active Crops</h2>
              <Link href="/farmer/listings" className="text-sage-green text-sm font-bold hover:underline">View All</Link>
            </div>
            <div className="p-6 flex-1">
              {!listings || listings.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <Sprout size={40} className="text-[#F0EBE1] mb-3" />
                  <p className="text-golden-chestnut font-medium">You haven't listed any crops yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {listings.slice(0, 4).map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-4 rounded-2xl border border-[#F0EBE1] hover:border-sage-green/30 transition-colors">
                      <div>
                        <p className="font-bold text-pitch-black">{listing.crop_name}</p>
                        <p className="text-sm text-golden-chestnut">{listing.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sage-green">₹{listing.price}</p>
                        <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-lg">{listing.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Deals */}
          <div className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#F0EBE1] flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-pitch-black font-heading">Recent Negotiations</h2>
              <Link href="/farmer/deals" className="text-sage-green text-sm font-bold hover:underline">View All</Link>
            </div>
            <div className="p-6 flex-1">
              {!deals || deals.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <Handshake size={40} className="text-[#F0EBE1] mb-3" />
                  <p className="text-golden-chestnut font-medium">No active negotiations right now.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {deals.slice(0, 4).map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between p-4 rounded-2xl border border-[#F0EBE1] hover:border-sage-green/30 transition-colors">
                      <div>
                        {/* @ts-expect-error - Supabase join typing */}
                        <p className="font-bold text-pitch-black">Offer on {deal.listings?.crop_name}</p>
                        <p className="text-sm text-golden-chestnut">From Trader</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-pitch-black">₹{deal.amount}</p>
                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                          deal.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {deal.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}