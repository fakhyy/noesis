import { betterAuth } from "better-auth";
import { apiKey } from "@better-auth/api-key";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

import { db } from "@/db";
import { env } from "@/lib/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    // disableSignUp: Boolean(env.DISABLE_SIGNUP),
  },
  plugins: [openAPI(), apiKey(), nextCookies()],
});
