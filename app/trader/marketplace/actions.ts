// app/trader/marketplace/actions.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleSavedListing(listingId: string, isSaved: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  if (isSaved) {
    // Remove from watchlist
    await supabase
      .from("saved_listings")
      .delete()
      .match({ trader_id: user.id, listing_id: listingId });
  } else {
    // Add to watchlist
    await supabase
      .from("saved_listings")
      .insert({ trader_id: user.id, listing_id: listingId });
  }

  revalidatePath("/trader/marketplace");
}
