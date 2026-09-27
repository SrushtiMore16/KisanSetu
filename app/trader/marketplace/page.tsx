// app/trader/marketplace/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MarketplaceClient from "./MarketplaceClient";

export default async function MarketplacePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch all Active Listings posted by Farmers
  const { data: listingsData } = await supabase
    .from("listings")
    .select(`
      id,
      crop_name,
      quantity,
      price,
      created_at,
      users!farmer_id (full_name),
      farmer_profiles!farmer_id (address)
    `)
    .eq("status", "Active")
    .order("created_at", { ascending: false });

  // Fetch the Trader's Saved Listings (Watchlist)
  const { data: savedData } = await supabase
    .from("saved_listings")
    .select("listing_id")
    .eq("trader_id", user.id);

  // Create a Set of saved listing IDs for fast lookup
  const savedListingIds = new Set(savedData?.map(item => item.listing_id));

  // Format data for the UI
  const formattedListings = listingsData?.map(listing => {
    // @ts-expect-error - Complex Join
    const farmerName = listing.users?.full_name || "Unknown Farmer";
    // @ts-expect-error - Complex Join
    const farmerAddress = Array.isArray(listing.farmer_profiles) ? listing.farmer_profiles[0]?.address : listing.farmer_profiles?.address;

    // Hardcoding Mandi prices for demo purposes since we don't have a live API
    const mandiPrices: Record<string, number> = {
      "Soybean (JS 335)": 5150,
      "Wheat (Lokwan)": 2350,
      "Cotton (Bt)": 6800,
      "Onion (Nashik Red)": 1850,
      "Tur (Arhar)": 6100
    };
    
    // Fallback to exactly what the farmer asked if no benchmark exists
    const benchmark = mandiPrices[listing.crop_name] || listing.price;

    return {
      id: listing.id,
      crop: listing.crop_name,
      farmer: farmerName,
      location: farmerAddress || "Location Not Provided",
      qty: listing.quantity,
      grade: "Standard", // Defaulting as we didn't add 'grade' to the farmers listing table
      askingPrice: Number(listing.price),
      mandiBenchmark: benchmark,
      harvestDate: new Date(listing.created_at).toLocaleDateString(),
      isSaved: savedListingIds.has(listing.id),
    };
  }) || [];

  return <MarketplaceClient listings={formattedListings} />;
}