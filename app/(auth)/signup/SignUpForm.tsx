"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toastManager } from "@/components/ui/toast";

import { authClient } from "@/lib/auth/client";
import { emailSchema, nameSchema, passwordSchema } from "@/schemas";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      try {
        await authClient.signUp.email(value, {
          onSuccess: async () => {
            await authClient.sendVerificationEmail(
              {
                email: value.email,
                callbackURL: "/app",
              },
              {
                onSuccess: () => {
                  router.push("/verify-email");
                },

                onError: ({ error }) => {
                  toastManager.add({
                    title: "Account created, but email failed",
                    description:
                      error.message ||
                      "We couldn't send your verification email. Please try again later.",
                    type: "error",
                  });
                },
              },
            );

            form.reset();
          },

          onError: ({ error }) => {
            toastManager.add({
              title: "Sign up failed",
              description: error.message,
              type: "error",
            });
          },
        });
      } catch {
        toastManager.add({
          title: "Something went wrong",
          description: "Please try again later.",
          type: "error",
        });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
      noValidate
    >
      {/* Name */}
      <form.Field
        name="name"
        validators={{
          onBlur: nameSchema,
          onSubmit: nameSchema,
        }}
      >
        {(field) => {
          const hasError =
            field.state.meta.isTouched && field.state.meta.errors.length > 0;

          return (
            <Field>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>

              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="John Doe"
                autoComplete="name"
                aria-invalid={hasError}
                aria-describedby={hasError ? `${field.name}-error` : undefined}
              />
            </Field>
          );
        }}
      </form.Field>

      {/* Email */}
      <form.Field
        name="email"
        validators={{
          onBlur: emailSchema,
          onSubmit: emailSchema,
        }}
      >
        {(field) => {
          const hasError =
            field.state.meta.isTouched && field.state.meta.errors.length > 0;

          return (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>

              <Input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="john@domain.com"
                autoComplete="email"
                aria-invalid={hasError}
                aria-describedby={hasError ? `${field.name}-error` : undefined}
              />
            </Field>
          );
        }}
      </form.Field>

      {/* Password */}
      <form.Field
        name="password"
        validators={{
          onBlur: passwordSchema,
          onSubmit: passwordSchema,
        }}
      >
        {(field) => {
          const hasError =
            field.state.meta.isTouched && field.state.meta.errors.length > 0;

          return (
            <Field>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  name={field.name}
                  type={showPassword ? "text" : "password"}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  aria-invalid={hasError}
                  aria-describedby={
                    hasError ? `${field.name}-error` : undefined
                  }
                  className="pr-16"
                />
                <InputGroupAddon align="inline-end">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          );
        }}
      </form.Field>

      {/* Submit */}
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            className="w-full"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner className="animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
