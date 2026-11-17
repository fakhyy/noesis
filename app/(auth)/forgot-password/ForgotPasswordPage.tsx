"use client";

import { CheckIcon } from "lucide-react";

import { useState } from "react";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { AuthMessage } from "../_components/message";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ForgotPasswordPage() {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  return showMessage ? (
    <AuthMessage
      icon={CheckIcon}
      message="Check your inbox. We have sent you an email with reset link."
      buttonProps={{
        onClick: () => setShowMessage(false),
        children: "Send Again",
      }}
    />
  ) : (
    <div>
      <div className="flex flex-col gap-4 items-center mb-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-medium tracking-tight">
            Forgot Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>
      </div>

      <ForgotPasswordForm onPasswordReset={() => setShowMessage(true)} />
      <Button
        variant="link"
        className="w-full mt-2"
        onClick={() => router.push("/login")}
      >
        Back to login
      </Button>
    </div>
  );
}
