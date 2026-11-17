import { env } from "@/lib/env";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { ResendNotConfigured } from "../_components/resend-not-configured";
import { Suspense } from "react";

export const instant = false;

export default async function ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  let params = await searchParams;
  if (!env.RESEND_API_KEY)
    return (
      <Suspense fallback={"loading"}>
        <ResendNotConfigured />
      </Suspense>
    );

  return (
    <Suspense fallback={"loading"}>
      <ResetPasswordPage searchParams={params} />
    </Suspense>
  );
}

export const metadata = {
  title: "Reset Password",
  description: "Reset your account password",
};
