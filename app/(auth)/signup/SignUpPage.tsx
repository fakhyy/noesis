import { Button } from "@/components/ui/button";
import { SignUpForm } from "./SignUpForm";
import { Google } from "@/components/ui/svgs/google";
import { Github } from "@/components/ui/svgs/github";
import Link from "next/link";

export function SignUpPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-1 text-center mb-8">
        <h3 className="text-2xl font-medium">Get Started</h3>
        <p className="text-muted-foreground">
          Enter your details to create an account
        </p>
      </div>
      <SignUpForm />
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="border-b w-full" />
          <p className="text-muted-foreground text-sm">Or</p>
          <div className="border-b w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="secondary">
            <Github />
            Continue with Github
          </Button>
          <Button variant="secondary">
            <Google />
            Continue with Google
          </Button>
        </div>
      </div>
      <div className="text-center">
        <p className="text-muted-foreground text-sm space-x-2">
          <span>Already have an account?</span>
          <Link href="/login" className="font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
