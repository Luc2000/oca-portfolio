function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const config = {
  supabase: {
    url: required("SUPABASE_URL"),
    serviceRoleKey: required("SUPABASE_SERVICE_ROLE_KEY"),
  },
  unsplash: {
    accessKey: process.env.UNSPLASH_ACCESS_KEY || "",
  },
  dryRun: process.env.DRY_RUN === "true",
};
