export interface AuthPort {
  signInWithEmail(email: string): Promise<{ error?: string }>;
  signOut(): Promise<{ error?: string }>;
}
