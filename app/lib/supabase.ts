import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;

// Null while Supabase env is absent so pages render empty instead of crashing builds
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
