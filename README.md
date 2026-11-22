# Guardrail Labs

Automated red-team and hardening pipeline for chatbot system prompts.
Paste a system prompt → attacks are generated → a target bot answers → a judge scores → a fixer rewrites the prompt → everything is re-tested, and you see the before/after.

Full spec: [`docs/PRD.md`](docs/PRD.md)

## Quick start (local)

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local     # then edit .env.local and add your keys
npm run dev                    # http://localhost:3000
```

Click **Load demo bot (CampusBot)**, pick a test size, then **Run red-team and harden**.
If something is not configured, the page shows a "Setup needed" box telling you which variable is missing.

## Configure API keys

Keys are only read on the server (API routes). They are never sent to the browser.

| Variable | What it does |
|---|---|
| `STRONG_PROVIDER` | `anthropic`, `gemini` or `openai-compatible`. Runs attacker, judge and fixer. |
| `STRONG_MODEL` | Model name for the strong model. |
| `ANTHROPIC_API_KEY` or `GEMINI_API_KEY` | Key for the strong provider. |
| `STRONG_BASE_URL` + `STRONG_API_KEY` | Only if the strong model is OpenAI-compatible. |
| `TARGET_PROVIDER` | Usually `openai-compatible`. The chatbot under test. |
| `TARGET_MODEL`, `TARGET_BASE_URL`, `TARGET_API_KEY` | e.g. Llama on Groq, Together, OpenRouter or Fireworks. |
| `APP_ACCESS_CODE` | Optional. Protects the app with a passcode (recommended when deployed). |
| `MAX_ATTACKS_PER_CALL` | Optional cost guard. Default 10. |

Use a **different model family** for the target than for the judge, so the judge is not grading its own style of output.
Model names change over time. Check them in your provider's docs before you deploy.

**Local Ollama for the target (development only):**

```
TARGET_PROVIDER=openai-compatible
TARGET_BASE_URL=http://localhost:11434/v1
TARGET_MODEL=llama3.1
TARGET_API_KEY=ollama
```

Ollama cannot run on Vercel, so a deployed app needs a hosted target model.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repo. Framework is detected as Next.js. Leave the build settings alone.
3. Before deploying, open **Environment Variables** and add the same variables as in your `.env.local` (at least the strong model key, the target model settings, and `APP_ACCESS_CODE`).
4. Click **Deploy**. Open the URL and check that no "Setup needed" box appears.

With the CLI instead: `npm i -g vercel`, then `vercel` and `vercel env add NAME` for each variable, then `vercel --prod`.

After changing environment variables you must **redeploy** for them to take effect.

**Before sharing the URL:** set `APP_ACCESS_CODE` and set spend limits in each model provider's dashboard. Anyone with access can otherwise use your API credits.

## How it works

The browser runs the pipeline and calls small API routes one step at a time. Each route finishes in seconds, so it fits inside Vercel's function time limit however long the whole run takes. Keep the tab open while a run is in progress.

| Route | Purpose |
|---|---|
| `POST /api/attack` | Generate attacks for one category (training or held-out set) |
| `POST /api/benign` | Generate harmless in-scope questions for the over-refusal check |
| `POST /api/target` | Run one message against the bot defined by the system prompt |
| `POST /api/judge` | Score a reply (planted-secret check first, then the judge model) |
| `POST /api/fix` | Rewrite the prompt from training failures |
| `GET /api/health` | Shows which models are configured (never shows keys) |

Where to edit things:

- **All prompts and their versions:** `src/lib/prompts.ts`
- **Pipeline order, set sizes:** `src/lib/pipeline.ts`, presets in `src/app/page.tsx`
- **Model providers:** `src/lib/llm.ts`, env handling in `src/lib/config.ts`

## Reading the results

- **Held-out attack success** is the honest number: those attacks were never shown to the fixer.
- **Training attack success** will usually improve more, because the fixer saw those failures.
- **Over-refusal** should not go up much. A prompt that refuses everything is not a win.
- Click any row in the attack log to see the attack, the bot's reply and the judge's reason.

Single runs are noisy. Repeat a run a few times before quoting a number.

## Scripts

```bash
npm run dev         # local dev server
npm run build       # production build
npm run start       # run the production build
npm run typecheck   # TypeScript check
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| "Setup needed" box | Add the missing variable (shown in the box) and reload or redeploy. |
| `401 Invalid or missing access code` | Enter the value of `APP_ACCESS_CODE` in the form. |
| `Model API returned 404` | The model name is wrong or not available to your key. Check `STRONG_MODEL` / `TARGET_MODEL`. |
| `Model API returned 429` | Rate limit. Use a Quick run, or a provider tier with higher limits. |
| Run stops partway | A call failed after retries. Check the error message and run again. |
| Works locally, fails on Vercel | Variables were added after the last deploy, or the target points to `localhost`. Redeploy and use a hosted target. |

## Safety

Defensive testing for chatbots you own. Use fictional data only: no real personal or sensitive information in prompts, secrets or logs. Prompt hardening reduces risk but cannot guarantee a bot is safe.
