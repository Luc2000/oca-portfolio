# OCA Blog Generator

Generates and publishes one blog post per run into Supabase, using the Claude CLI
(Max subscription, no API key). Adapted from
[ai-blog-generator-template](https://github.com/Luc2000/ai-blog-generator-template).

The site (`app/blog`) reads the same tables with ISR (1h), so posts appear without
a deploy.

## How a run works

1. Audience picked by wall-clock hour (`devsHours: [11, 17]` → 11h/17h runs write for
   devs/partner network, any other hour writes for clients).
2. `post-queue.json` checked first; queued themes jump the line and are consumed.
3. Otherwise category round-robin (least used in the last 60 posts) + writer round-robin.
4. Prompt = `ecosystem.md` + `writers/<persona>.md` + rules from `blog-config.ts`,
   with the last 60 titles injected to avoid repetition.
5. Claude CLI generates the post JSON, Unsplash provides the cover, post is inserted
   as `published`.

No retry, no alerting by design: a failed run exits 1 and the next scheduled run
publishes normally.

## Setup

1. **Supabase**: create a project and run `../supabase/schema.sql` in the SQL editor.
2. **Env**: create `generator/.env`:

   ```
   SUPABASE_URL=https://<project>.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<service role key>
   UNSPLASH_ACCESS_KEY=<optional, for cover images>
   ```

   The site (Vercel) needs `SUPABASE_URL` and `SUPABASE_ANON_KEY` (reads are
   RLS-limited to published posts).

3. **Install**: `cd generator && npm install`
4. **Claude CLI**: make sure you are logged in (`claude /login`).
5. **Test**: `npm run generate:dry` (no insert), then `npm run generate` for a real post.

## Scheduling (launchd, macOS)

Four runs per day: 9h and 15h for clients, 11h and 17h for devs. Single plist in
`launchd/`.

IMPORTANT: macOS TCC blocks launchd agents from reading anything inside
~/Desktop, ~/Documents and ~/Downloads. The agent runs a standalone copy of this
directory at `~/Projects/oca-blog-generator` (same pattern as the other blog
generators on this machine). After editing personas/config here, re-sync:

```bash
rsync -a --delete --exclude node_modules --exclude generator.log --exclude post-queue.json \
  generator/ ~/Projects/oca-blog-generator/
```

`post-queue.json` is excluded because the runtime copy holds the live queue state.

```bash
cp launchd/br.dev.oca.blog-generator.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/br.dev.oca.blog-generator.plist
```

Logs land in `generator/generator.log`. To stop: `launchctl unload` the same paths.

## Steering content

- **Priority topics**: add entries to `post-queue.json` (theme, keyword, category,
  audience, notes). Consumed one per run, matching the run's audience.
- **Voice**: edit `src/config/writers/*.md`.
- **Business context**: edit `src/config/ecosystem.md`.
- **Categories, CTAs, style/SEO rules, themes**: edit `src/config/blog-config.ts`.
  Category slugs must match the `blog_categories` rows in Supabase.
