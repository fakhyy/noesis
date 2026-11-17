"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toastManager } from "@/components/ui/toast";
import { authClient } from "@/lib/auth/client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { passwordSchema } from "@/schemas";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      if (value.newPassword !== value.confirmPassword) {
        return toastManager.add({
          title: "Password does not match",
          type: "error",
        });
      }
      await authClient.resetPassword(
        {
          ...value,
          token,
        },
        {
          onSuccess: () => {
            toastManager.add({
              title: "Password has been changed",
              type: "success",
            });
            setTimeout(() => {
              router.replace("/login");
            }, 1000);
          },
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
        name="newPassword"
        validators={{
          onBlur: passwordSchema,
        }}
      >
        {(field) => (
          <Field>
            <FieldLabel>New Password</FieldLabel>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="••••••••"
              autoComplete="off"
              required
            />
          </Field>
        )}
      </form.Field>
      <form.Field
        name="confirmPassword"
        validators={{
          onBlur: passwordSchema,
        }}
      >
        {(field) => (
          <Field>
            <FieldLabel>Confirm Password</FieldLabel>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="••••••••"
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
