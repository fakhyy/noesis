"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toastManager } from "@/components/ui/toast";
import { authClient } from "@/lib/auth/client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { emailSchema, passwordSchema } from "@/schemas";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(value, {
        onSuccess: () => router.replace("/app"),
        onError: ({ error }) => {
          toastManager.add({
            title: error.message,
            type: "error",
          });
        },
      });
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
              placeholder="name@domain.com"
              autoComplete="off"
              required
            />
          </Field>
        )}
      </form.Field>
      <form.Field
        name="password"
        validators={{
          onBlur: passwordSchema,
        }}
      >
        {(field) => (
          <Field>
            <FieldLabel className="justify-between">
              <span>Password</span>
              <Link className="text-xs hover:underline" href="/forgot-password">Forgot Password?</Link>
            </FieldLabel>
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
            {isSubmitting ? <Spinner className="animate-spin" /> : "Login"}
          </Button>
        )}
      />
    </form>
  );
}
