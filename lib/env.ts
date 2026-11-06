import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    ENABLE_SIGNUP: z.string().optional(),
    SHOW_LANDING_PAGE: z.string().optional(),
    RESEND_API_KEY: z.string().startsWith("re").optional(),

    DATABASE_URL: z.string(),
  },
  runtimeEnv: {
    ENABLE_SIGNUP: process.env.ENABLE_SIGNUP,
    SHOW_LANDING_PAGE: process.env.SHOW_LANDING_PAGE,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
});
