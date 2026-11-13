import { supabase } from './client.js';
import { createAuthService } from './auth-service.js';

// The app's auth calls, bound to the real Supabase client.
export const { sendSignInLink, onSignedIn, signOut, deleteMyData } = createAuthService(supabase);
