import { betterAuth } from "better-auth";
import { apiKey } from "@better-auth/api-key";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import { env } from "@/lib/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: Boolean(env.ENABLE_SIGNUP),
  },
  plugins: [apiKey(), nextCookies()],
});
