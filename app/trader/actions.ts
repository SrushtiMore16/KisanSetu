// app/trader/actions.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateTraderProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // Extract all fields from the form (Removed avatarUrl)
  const businessName = formData.get("businessName") as string;
  const ownerName = formData.get("ownerName") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const gstNumber = formData.get("gstNumber") as string;

  // 1. Update main user record
  const { error: userError } = await supabase.from("users").upsert({ 
    id: user.id, 
    full_name: ownerName, 
    phone: phone, 
    role: 'Trader' 
  }, { onConflict: 'id' });

  if (userError) {
    console.error("User Table Error:", userError);
    throw new Error(`Failed to update user table: ${userError.message}`);
  }

  // 2. Update trader specific profile (Omitted avatar_url so it relies on Google)
  const { error: profileError } = await supabase.from("trader_profiles").upsert({
    user_id: user.id,
    business_name: businessName,
    owner_name: ownerName,
    phone: phone,
    address: address,
    gst_number: gstNumber
  }, { onConflict: 'user_id' });

  if (profileError) {
    console.error("Trader Profile Error:", profileError);
    throw new Error(`Database Error: ${profileError.message} \nDetails: ${profileError.details}`);
  }

  // Force cache refresh and redirect back to profile
  revalidatePath("/trader/profile");
  redirect("/trader/profile");
}
// app/trader/actions.ts
// Add this below your existing updateTraderProfile function

export async function uploadKycDocument(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  const documentType = formData.get("documentType") as string;
  const documentNumber = formData.get("documentNumber") as string;

  if (!file || file.size === 0) throw new Error("No file uploaded");

  // Create a secure file path: userId/timestamp_filename
  const fileExt = file.name.split('.').pop();
  const filePath = `${user.id}/${Date.now()}_${documentType.replace(/\s+/g, '_')}.${fileExt}`;

  // Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from("kyc_documents")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Upload error:", uploadError);
    throw new Error("Failed to upload document");
  }

  // Get signed URL (since bucket is private for security)
  const { data: { signedUrl } } = await supabase.storage
    .from("kyc_documents")
    .createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year expiry for demo purposes

  // Upsert into kyc_documents table
  const { error: dbError } = await supabase
    .from("kyc_documents")
    .upsert({
      trader_id: user.id,
      document_type: documentType,
      document_number: documentNumber || "Pending Review",
      file_url: signedUrl,
      status: 'Under Review',
      updated_at: new Date().toISOString()
    }, { onConflict: 'trader_id, document_type' });

  if (dbError) {
      console.error("DB Error:", dbError);
      throw new Error("Failed to save document record");
  }

  revalidatePath("/trader/verification");
}