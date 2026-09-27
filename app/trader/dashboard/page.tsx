// app/trader/dashboard/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { 
  TrendingUp, Wallet, ShoppingBag, Clock, 
  ChevronRight, Search, Filter, ArrowRightLeft, MapPin
} from "lucide-react";
import Link from "next/link";

export default async function TraderDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 1. Fetch Trader's Active Bids (Negotiations)
  const { data: activeBids } = await supabase
    .from("bids")
    .select(`
      *,
      listings (crop_name, price),
      users!farmer_id (full_name)
    `)
    .eq("trader_id", user.id)
    .in("status", ["Awaiting Farmer Response", "Farmer Countered", "Accepted"])
    .order("updated_at", { ascending: false })
    .limit(3);

  // 2. Fetch Trader's Completed Trades (Deal History)
  const { data: completedTrades } = await supabase
    .from("trades")
    .select("amount")
    .eq("trader_id", user.id)
    .eq("trade_status", "Completed");

  // Calculate Quick Stats
  const activeBidsCount = activeBids?.length || 0;
  const completedTradesCount = completedTrades?.length || 0;
  const totalVolume = completedTrades?.reduce((sum, trade) => sum + Number(trade.amount), 0) || 0;

  // Format Total Volume (e.g., convert to Lakhs if large enough)
  const formattedVolume = totalVolume >= 100000 
    ? `₹${(totalVolume / 100000).toFixed(1)}L` 
    : `₹${totalVolume.toLocaleString()}`;

  // 3. Fetch Recommended Listings (Live Marketplace Data)
  const { data: recommendedListings } = await supabase
    .from("listings")
    .select(`
      id, crop_name, quantity, price,
      farmer_profiles!farmer_id (address)
    `)
    .eq("status", "Active")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-12 font-body">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-pitch-black font-heading">
              Trader Hub
            </h1>
            <p className="text-golden-chestnut font-medium mt-2">
              Manage your bids, explore listings, and finalize transactions.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <input 
                type="text" 
                placeholder="Search crops, locations..." 
                className="w-full bg-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-3 pl-10 pr-4 outline-none focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 transition-all placeholder:text-golden-chestnut/50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-golden-chestnut/50" size={18} />
            </div>
            <button className="p-3 bg-white border border-[#F0EBE1] text-pitch-black rounded-xl hover:border-sage-green hover:text-sage-green transition-all shadow-sm">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-[#F0EBE1] shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="p-4 rounded-xl bg-orange-500/10 text-orange-500">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-golden-chestnut">Active Bids</p>
                  <p className="text-2xl font-bold text-pitch-black">{activeBidsCount}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#F0EBE1] shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="p-4 rounded-xl bg-sage-green/10 text-sage-green">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-golden-chestnut">Completed Trades</p>
                  <p className="text-2xl font-bold text-pitch-black">{completedTradesCount}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#F0EBE1] shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="p-4 rounded-xl bg-pitch-black/10 text-pitch-black">
                  <Wallet size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-golden-chestnut">Total Volume</p>
                  <p className="text-2xl font-bold text-pitch-black">{formattedVolume}</p>
                </div>
              </div>
            </div>

            {/* Active Negotiations */}
            <div className="bg-white rounded-2xl border border-[#F0EBE1] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#F0EBE1] flex justify-between items-center bg-floral-white/30">
                <h2 className="text-xl font-bold text-pitch-black font-heading">Active Negotiations</h2>
                <Link href="/trader/deals" className="text-sage-green text-sm font-bold flex items-center hover:underline">
                  View All <ChevronRight size={16} />
                </Link>
              </div>

              <div className="divide-y divide-[#F0EBE1]">
                {!activeBids || activeBids.length === 0 ? (
                  <div className="p-10 text-center text-golden-chestnut font-medium">
                    No active negotiations. Start bidding on the marketplace!
                  </div>
                ) : (
                  activeBids.map((offer: any) => {
                    // @ts-expect-error - Complex Join
                    const farmerName = offer.users?.full_name;
                    // @ts-expect-error - Complex Join
                    const askingPrice = offer.listings?.price;
                    // @ts-expect-error - Complex Join
                    const cropName = offer.listings?.crop_name;

                    let sColor = "text-blue-500 bg-blue-500/10";
                    if (offer.status === "Farmer Countered") sColor = "text-orange-500 bg-orange-500/10";
                    if (offer.status === "Accepted") sColor = "text-sage-green bg-sage-green/10";

                    return (
                      <div key={offer.id} className="p-6 hover:bg-floral-white/50 transition-colors flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="flex flex-col gap-1">
                          <h3 className="font-bold text-pitch-black text-lg">{cropName}</h3>
                          <p className="text-sm font-medium text-golden-chestnut">Farmer: {farmerName} • Qty: {offer.quantity}</p>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="flex flex-col items-end sm:items-center">
                            <span className="text-xs font-bold text-golden-chestnut uppercase tracking-wider">Asking</span>
                            <span className="font-bold text-pitch-black">₹{askingPrice}</span>
                          </div>
                          <ArrowRightLeft size={16} className="text-[#F0EBE1]" />
                          <div className="flex flex-col items-start sm:items-center">
                            <span className="text-xs font-bold text-golden-chestnut uppercase tracking-wider">Your Bid</span>
                            <span className="font-bold text-sage-green">₹{offer.counter_amount || offer.bid_amount}</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${sColor}`}>
                            {offer.status}
                          </span>
                          {offer.status === "Farmer Countered" && (
                            <button className="text-xs font-bold text-white bg-pitch-black px-4 py-1.5 rounded-lg hover:bg-pitch-black/80 transition-colors">
                              Review Counter
                            </button>
                          )}
                          {offer.status === "Accepted" && (
                            <button className="text-xs font-bold text-white bg-sage-green px-4 py-1.5 rounded-lg hover:bg-sage-green/90 transition-colors shadow-sm">
                              Initiate Payment
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Side Column (1/3 width) */}
          <div className="space-y-6">
            
            {/* New Listings Widget */}
            <div className="bg-white p-6 rounded-2xl border border-[#F0EBE1] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-pitch-black font-heading">Recommended Listings</h2>
              </div>
              
              <div className="space-y-4">
                {!recommendedListings || recommendedListings.length === 0 ? (
                  <p className="text-sm text-golden-chestnut">No listings available right now.</p>
                ) : (
                  recommendedListings.map((listing: any) => {
                    // @ts-expect-error - Complex Join
                    const address = Array.isArray(listing.farmer_profiles) ? listing.farmer_profiles[0]?.address : listing.farmer_profiles?.address;
                    const city = address ? address.split(',')[0] : "Unknown";

                    return (
                      <div key={listing.id} className="p-4 border border-[#F0EBE1] rounded-xl hover:border-sage-green/40 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-pitch-black text-sm group-hover:text-sage-green transition-colors">{listing.crop_name}</h4>
                          <span className="text-pitch-black font-bold text-sm">₹{listing.price}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-medium text-golden-chestnut">
                          <span>Qty: {listing.quantity}</span>
                          <span className="flex items-center gap-1"><MapPin size={12} /> {city}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              
              <Link href="/trader/marketplace" className="block text-center w-full mt-4 py-3 bg-sage-green text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
                Browse Full Marketplace
              </Link>
            </div>

            {/* Market Trends Widget (Static for now) */}
            <div className="bg-pitch-black text-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-bold font-heading mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-sage-green" /> 
                Live Market Trends
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <span className="text-sm font-bold block">Soybean</span>
                    <span className="text-xs opacity-70">NCDEX</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold block">₹5,150</span>
                    <span className="text-xs text-sage-green font-bold">+1.2%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <span className="text-sm font-bold block">Cotton</span>
                    <span className="text-xs opacity-70">MCX</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold block">₹6,850</span>
                    <span className="text-xs text-orange-400 font-bold">-0.5%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-bold block">Wheat</span>
                    <span className="text-xs opacity-70">Mandi Avg</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold block">₹2,350</span>
                    <span className="text-xs text-sage-green font-bold">+0.8%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}