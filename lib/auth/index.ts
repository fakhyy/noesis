import { betterAuth } from "better-auth";
import { apiKey } from "@better-auth/api-key";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

import { db } from "@/db";
import { env } from "@/lib/env";
import { email } from "@/lib/email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ url, user }) => {
      await email.send("resetPassword", {
        to: user.email,
        props: {
          name: user.name,
          url,
        },
      });
    },
    onPasswordReset: async ({ user }) => {
      await email.send("passwordChanged", {
        to: user.email,
        props: {
          name: user.name,
          url: env.NEXT_PUBLIC_APP_URL,
        },
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void email.send("verifyEmail", {
        to: user.email,
        props: {
          name: user.name,
          verificationUrl: url,
        },
      });
    },
    afterEmailVerification: async (user) => {
      await email.send("welcome", {
        to: user.email,
        props: {
          name: user.name,
          appUrl: env.NEXT_PUBLIC_APP_URL,
        },
      });
    },
  },
  plugins: [openAPI(), apiKey(), nextCookies()],
});
