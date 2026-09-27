// app/trader/deals/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { 
  Handshake, ChevronLeft, ArrowRightLeft, Truck, MapPin, 
  Clock, CheckCircle2, AlertCircle, XCircle, CreditCard, FileText
} from "lucide-react";
import Link from "next/link";
import DealTabs from "./DealTabs"; // We will extract the tab logic to a client component

export default async function DealManagementPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch Active Negotiations (Bids + Listing details)
  const { data: activeBids } = await supabase
    .from("bids")
    .select(`
      *,
      listings (
        crop_name,
        price,
        users!farmer_id (full_name, phone),
        farmer_profiles!farmer_id (address)
      )
    `)
    .eq("trader_id", user.id)
    .in("status", ["Awaiting Farmer Response", "Farmer Countered"])
    .order("updated_at", { ascending: false });

  // Fetch Deal History (Trades)
  const { data: dealHistory } = await supabase
    .from("trades")
    .select("*")
    .eq("trader_id", user.id)
    .order("created_at", { ascending: false });

  // Format Active Bids Data
  const formattedBids = activeBids?.map(bid => {
    // @ts-expect-error - Complex Supabase Join Types
    const listing = bid.listings;
    // @ts-expect-error - Complex Supabase Join Types
    const farmerAddress = Array.isArray(listing.farmer_profiles) ? listing.farmer_profiles[0]?.address : listing.farmer_profiles?.address;

    return {
      id: bid.id,
      crop: listing.crop_name,
      farmer: listing.users.full_name,
      location: farmerAddress || "Location pending",
      qty: bid.quantity,
      askingPrice: `₹${listing.price}`,
      yourBid: `₹${bid.bid_amount}`,
      counterPrice: bid.counter_amount ? `₹${bid.counter_amount}` : null,
      terms: bid.logistics_terms,
      status: bid.status,
      lastUpdated: new Date(bid.updated_at).toLocaleDateString()
    };
  }) || [];

  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-12 font-body">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex flex-col gap-4">
          <Link 
            href="/trader/dashboard" 
            className="w-fit text-golden-chestnut hover:text-sage-green flex items-center gap-1 font-medium transition-colors text-sm"
          >
            <ChevronLeft size={16} /> Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-pitch-black font-heading flex items-center gap-3">
                <Handshake className="text-sage-green" size={32} />
                Deal Management
              </h1>
              <p className="text-golden-chestnut font-medium mt-2">
                Track active negotiations, logistics terms, and historical trade settlements.
              </p>
            </div>
          </div>
        </div>

        {/* Pass data to interactive Client Component */}
        <DealTabs activeNegotiations={formattedBids} dealHistory={dealHistory || []} />
        
      </div>
    </div>
  );
}