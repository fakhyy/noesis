"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toastManager } from "@/components/ui/toast";
import { authClient } from "@/lib/auth/client";
import { useForm } from "@tanstack/react-form";
import { emailSchema } from "@/schemas";
import { env } from "@/lib/env";

export function ForgotPasswordForm({ onPasswordReset = () => {} }) {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.requestPasswordReset(
        {
          email: value.email,
          redirectTo: `${env.NEXT_PUBLIC_APP_URL}/reset-password`,
        },
        {
          onSuccess: onPasswordReset,
          onError: ({ error }) => {
            toastManager.add({
              title: error.message,
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field
        name="email"
        validators={{
          onBlur: emailSchema,
        }}
      >
        {(field) => (
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="john@domain.com"
              autoComplete="off"
              required
            />
          </Field>
        )}
      </form.Field>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" className="w-full" disabled={!canSubmit}>
            {isSubmitting ? <Spinner className="animate-spin" /> : "Submit"}
          </Button>
        )}
      />
    </form>
  );
}
