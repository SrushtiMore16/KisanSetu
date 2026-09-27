// app/farmer/actions.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addCropCycle(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const cropName = formData.get("cropName") as string;
  const areaAllocated = formData.get("areaAllocated") as string;
  const sownDate = formData.get("sownDate") as string;
  const expectedHarvest = formData.get("expectedHarvest") as string;

  const { error } = await supabase.from("crop_cycles").insert({
    farmer_id: user.id,
    crop_name: cropName,
    area_allocated: areaAllocated,
    sown_date: sownDate,
    expected_harvest: expectedHarvest,
    stage: "Seedling",
    health_status: "Optimal"
  });

  if (error) {
    console.error("Error adding crop cycle:", error);
    throw new Error("Failed to add crop cycle");
  }

  // Refresh the profile page to show the new data
  revalidatePath("/farmer/profile");
  redirect("/farmer/profile");
}
// Add this to the bottom of app/farmer/actions.ts

export async function updateFarmerProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const totalArea = formData.get("totalArea") as string;
  const soilType = formData.get("soilType") as string;
  const irrigation = formData.get("irrigation") as string;

  // 1. Update the main users table
  const { error: userError } = await supabase
    .from("users")
    .upsert({ 
      id: user.id, 
      full_name: fullName, 
      phone: phone,
      role: 'Farmer' // Ensure role is maintained
    }, { onConflict: 'id' });

  if (userError) {
    console.error("Error updating user details:", userError);
    throw new Error("Failed to update user details");
  }

  // 2. Update the farmer_profiles table
  const { error: profileError } = await supabase
    .from("farmer_profiles")
    .upsert({
      user_id: user.id,
      address: address,
      total_area: totalArea,
      soil_type: soilType,
      irrigation_type: irrigation
    }, { onConflict: 'user_id' });

  if (profileError) {
    console.error("Error updating farm details:", profileError);
    throw new Error("Failed to update farm details");
  }

  revalidatePath("/farmer/profile");
  redirect("/farmer/profile");
}
// Add this to the bottom of app/farmer/actions.ts

export async function createListing(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const cropName = formData.get("cropName") as string;
  const quantity = formData.get("quantity") as string;
  const price = parseFloat(formData.get("price") as string);

  const { error } = await supabase.from("listings").insert({
    farmer_id: user.id,
    crop_name: cropName,
    quantity: quantity,
    price: price,
    status: 'Active'
  });

  if (error) {
    console.error("Error creating listing:", error);
    throw new Error("Failed to create listing");
  }

  // Clear cache and send the user back to the dashboard
  revalidatePath("/farmer/dashboard");
  redirect("/farmer/dashboard");
}
export async function updateTraderProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const businessName = formData.get("businessName") as string;
  const ownerName = formData.get("ownerName") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const gstNumber = formData.get("gstNumber") as string;

  await supabase.from("users").upsert({ id: user.id, full_name: ownerName, phone, role: 'Trader' });
  
  await supabase.from("trader_profiles").upsert({
    user_id: user.id,
    business_name: businessName,
    owner_name: ownerName,
    phone,
    address,
    gst_number: gstNumber
  }, { onConflict: 'user_id' });

  revalidatePath("/trader/profile");
  redirect("/trader/profile");
}
