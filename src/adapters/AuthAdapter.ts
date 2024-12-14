import { AuthPort } from "@/ports/AuthPort";
import { createClient } from "@/lib/supabase/client";

export class AuthAdapter implements AuthPort {
  async signInWithEmail(email: string): Promise<{ error?: string }> {
    const { error } = await createClient().auth.signInWithOtp({ email });
    return { error: error ? error.message : undefined };
  }

  async signOut(): Promise<{ error?: string }> {
    const { error } = await createClient().auth.signOut();
    return { error: error ? error.message : undefined };
  }
}
