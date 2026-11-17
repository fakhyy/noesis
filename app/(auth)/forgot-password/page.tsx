import { env } from "@/lib/env";
import { ForgotPasswordPage } from "./ForgotPasswordPage";
import { ResendNotConfigured } from "../_components/resend-not-configured";

export default function () {
  if (!env.RESEND_API_KEY) return <ResendNotConfigured />;
  return <ForgotPasswordPage />;
}

export const metadata = {
  title: "Forgot Password",
  description: "Request to reset your password",
};
