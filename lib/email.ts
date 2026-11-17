import { env } from "./env";
import { Resend } from "resend";
import { createEmail, defineTemplates } from "@fakhyy/retemp";
import {
  AccountDeletedEmail,
  PasswordChangedEmail,
  ResetPasswordEmail,
  VerifyEmail,
  WelcomeEmail,
} from "@/components/templates";

const provider = new Resend(env.RESEND_API_KEY);

export const email = createEmail({
  provider,
  defaults: { from: "Noesis <noreply@fakhyy.com>" },
  templates: defineTemplates({
    accountDeleted: {
      component: AccountDeletedEmail,
      subject: "Your Noesis account has been deleted",
    },
    passwordChanged: {
      component: PasswordChangedEmail,
      subject: "Your Noesis password has been changed",
    },
    resetPassword: {
      component: ResetPasswordEmail,
      subject: "Reset your password",
    },
    verifyEmail: {
      component: VerifyEmail,
      subject: "Verify your email",
    },
    welcome: {
      component: WelcomeEmail,
      subject: "Noesis Welcome",
    },
  }),
});
