// app/auth/callback/route.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );

    // Exchange code for session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data?.user) {
      const user = data.user;
      const role = user.user_metadata?.role;
      const googleAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture;
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name;

      // Auto-sync Google avatar and metadata into tables on login
      if (role === 'Trader') {
        // Check if trader profile exists, if not create/update with Google avatar
        await supabase.from("trader_profiles").upsert({
          user_id: user.id,
          business_name: fullName ? `${fullName}'s Enterprise` : "My Business",
          owner_name: fullName || "Trader",
          avatar_url: googleAvatar,
        }, { onConflict: 'user_id', ignoreDuplicates: true });
      } else if (role === 'Farmer') {
        await supabase.from("users").upsert({
          id: user.id,
          full_name: fullName,
          role: 'Farmer'
        }, { onConflict: 'id', ignoreDuplicates: true });
      }

      // Route based on role
      if (role === "Farmer") {
        return NextResponse.redirect(`${origin}/farmer/dashboard`);
      } else if (role === "Trader") {
        return NextResponse.redirect(`${origin}/trader/dashboard`);
      } else if (role === "Admin") {
        return NextResponse.redirect(`${origin}/admin/dashboard`);
      }
      
      return NextResponse.redirect(`${origin}/`); 
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Could not authenticate`);
}