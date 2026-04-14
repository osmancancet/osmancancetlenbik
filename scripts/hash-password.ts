// Generate an ADMIN_PASSWORD_HASH for .env
//
// Usage:
//   npx tsx scripts/hash-password.ts 'your-strong-password'
//   npx tsx scripts/hash-password.ts        # prompts via stdin
//
// Copy the printed value into ADMIN_PASSWORD_HASH (and remove ADMIN_PASSWORD).

import { hashPassword } from "../src/lib/password";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

async function main() {
  let pw = process.argv[2];
  if (!pw) {
    const rl = createInterface({ input: stdin, output: stdout });
    pw = await rl.question("Password: ");
    rl.close();
  }
  if (!pw || pw.length < 10) {
    console.error("Password must be at least 10 characters.");
    process.exit(1);
  }
  const hash = await hashPassword(pw);
  console.log("\nADMIN_PASSWORD_HASH=" + JSON.stringify(hash));
  console.log("\nPaste the line above into your .env / Vercel env vars.\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
