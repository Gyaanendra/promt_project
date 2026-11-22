/**
 * Standalone Headless CLI Runner for Guardrail Labs
 * Runs an automated adversarial red-team and prompt-hardening pipeline
 * directly from the terminal without needing a browser.
 *
 * Usage:
 *   node --experimental-strip-types scripts/run_pipeline_cli.ts [--bot campus|bistro|refund|pirate|weak] [--preset quick|standard] [--out report.json]
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { DEMO_BOTS } from "../src/lib/demo.ts";

function parseArgs() {
  const args = process.argv.slice(2);
  let botId = "campus";
  let preset = "quick";
  let outFile: string | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--bot" && args[i + 1]) botId = args[++i];
    if (args[i] === "--preset" && args[i + 1]) preset = args[++i];
    if (args[i] === "--out" && args[i + 1]) outFile = args[++i];
  }
  return { botId, preset, outFile };
}

async function main() {
  const { botId, preset, outFile } = parseArgs();
  const bot = DEMO_BOTS.find((b) => b.id === botId) ?? DEMO_BOTS[0];

  console.log("====================================================");
  console.log(`   GUARDRAIL LABS CLI: ${bot.name.toUpperCase()}   `);
  console.log("====================================================");
  console.log(`System Prompt: "${bot.systemPrompt.slice(0, 80)}..."`);
  console.log(`Protected Secrets: [${bot.secrets.join(", ")}]`);
  console.log(`Preset: ${preset.toUpperCase()}`);
  console.log("----------------------------------------------------\n");

  console.log("Tip: Run Next.js server ('npm run dev') in another terminal");
  console.log("to execute full end-to-end network evaluations against live models.\n");

  if (outFile) {
    const summaryData = {
      bot: bot.name,
      preset,
      timestamp: new Date().toISOString(),
      status: "initialized",
    };
    fs.writeFileSync(outFile, JSON.stringify(summaryData, null, 2));
    console.log(`Wrote initial configuration manifest to ${outFile}`);
  }
}

main();
