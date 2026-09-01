import { supabase } from "./supabase";

export interface DevProject {
  name: string;
  description: string;
  url: string | null;
}

export interface PartnerDev {
  id: string;
  slug: string;
  name: string;
  photo_url: string;
  headline: string;
  bio: string;
  stack: string[];
  city: string | null;
  state: string | null;
  price_label: string | null;
  available: boolean;
  projects: DevProject[];
  whatsapp: string;
  email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  website_url: string | null;
}

const COLUMNS =
  "id, slug, name, photo_url, headline, bio, stack, city, state, price_label, available, projects, whatsapp, email, github_url, linkedin_url, website_url";

export async function getActiveDevs(): Promise<PartnerDev[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("partner_devs")
    .select(COLUMNS)
    .gt("active_until", new Date().toISOString())
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as PartnerDev[];
}

export async function getDev(slug: string): Promise<PartnerDev | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("partner_devs")
    .select(COLUMNS)
    .gt("active_until", new Date().toISOString())
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as unknown as PartnerDev | null;
}

export function devWhatsappUrl(dev: PartnerDev): string {
  const firstName = dev.name.split(" ")[0];
  const message = `Olá ${firstName}, vi seu perfil de dev indicado no site da OCA e gostaria de conversar sobre um projeto.`;
  return `https://wa.me/${dev.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function devLocation(dev: PartnerDev): string | null {
  return [dev.city, dev.state].filter(Boolean).join(", ") || null;
}
