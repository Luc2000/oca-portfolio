# PostHog setup report

PostHog browser analytics, anonymous portfolio event capture, exception autocapture, and a starter dashboard were added to the Next.js portfolio.

## Installed and initialized

- Installed `posthog-js` 1.409.4 with Yarn V1; `package.json` and `yarn.lock` were updated. No server-side event routes were found, so `posthog-node` was not added.
- Initialized the browser SDK once in `instrumentation-client.ts`, using `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` from the environment.
- `.env.example` documents both required public variable names. The real values were configured in `.env.local` through wizard tools, and the review confirmed both keys are present without exposing their values.
- Default capture behavior remains enabled. Exception autocapture is enabled with `capture_exceptions: true`.
- No CSP changes were needed: no CSP was found in the reviewed integration paths.

## Events instrumented

These five anonymous browser events were added to real submit, click, and filter handlers. The run verified their static wiring, but did not run a browser session or observe events arriving in PostHog.

| Event | What it measures | File |
|---|---|---|
| `contact_form_submitted` | A visitor submits the contact form and starts a WhatsApp conversation; only bounded project type is included. | `app/components/ContactForm.tsx` |
| `whatsapp_cta_clicked` | A visitor starts a WhatsApp conversation from a primary CTA, with placement. | `app/components/Hero.tsx`, `app/components/Navbar.tsx`, `app/components/ContactCTA.tsx` |
| `project_opened` | A visitor opens a portfolio project detail page, with slug and category. | `app/components/ProjectCard.tsx` |
| `project_filter_selected` | A visitor filters the portfolio grid by category. | `app/components/ProjectsGrid.tsx` |
| `blog_article_opened` | A visitor opens a blog article from a listing card, with slug and category. | `app/components/BlogPostCard.tsx` |

The event contract is recorded in `.posthog-wizard-cache/.posthog-events.json`. Event properties intentionally exclude visitor-entered name, email, phone, company, and message.

## Identification

User identification was skipped. This is a public portfolio with no authentication, account, session, or stable non-PII user identifier available to the client. Captures therefore remain anonymous. If authentication is introduced later, call `posthog.identify(stableUserId, personProperties)` after login and `posthog.reset()` on logout.

## Error tracking

Global browser exception autocapture was enabled in `instrumentation-client.ts` with `capture_exceptions: true`. No manual error calls, route edits, or `error.tsx` boundary were added because no application boundary existed.

## Verification and limitations

Verified by the run:

- `yarn install` completed successfully and dependencies were current.
- `yarn build` compiled, typechecked, collected data, and generated all 48 static pages successfully.
- `yarn lint` completed successfully.
- Required environment keys were present.
- Static review found the captures in actual handlers, consistent client-component boundaries, no PII in event properties, and no additional SDK initialization.

Not verified by the run:

- No browser session was run, so event delivery, received payloads, distinct IDs, and exception arrival in PostHog remain unconfirmed.
- WhatsApp message delivery cannot be observed from the site.
- Dashboard insights were created without querying ingestion; empty initial results are expected until events arrive.

## Dashboard

[Analytics basics (wizard)](https://us.posthog.com/project/536531/dashboard/1934793)

The dashboard contains four tagged insights covering lead conversion activity, lead intent funnel, project interest by category, and content and portfolio exploration. They use the instrumented event names and a last-30-days range.

## Build conflict

Yarn emits a pre-existing mixed-lockfile warning because both `package-lock.json` and `yarn.lock` exist. The warning did not affect installation, build, or lint. No other build conflict was reported; the production build succeeded.

## Before you merge

- [ ] Run a full production build and fix any lint or type errors introduced by the instrumentation; review the changed integration files, especially `instrumentation-client.ts` and the files listed in the events table.
- [ ] Run the test suite and update mocks or fixtures for the new `posthog-js` imports and capture calls in `app/components/ContactForm.tsx`, `app/components/Hero.tsx`, `app/components/Navbar.tsx`, `app/components/ContactCTA.tsx`, `app/components/ProjectCard.tsx`, `app/components/ProjectsGrid.tsx`, and `app/components/BlogPostCard.tsx`.
- [ ] Set `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` in every deployment environment, not only `.env.local`; verify the names against `.env.example`.
- [ ] Exercise each instrumented click, filter, and submit path in a browser and confirm the five named events arrive in PostHog; the run did not observe event delivery.
- [ ] Decide whether to remove the pre-existing `package-lock.json` or standardize on one package manager; Yarn currently warns about the mixed lockfiles.
