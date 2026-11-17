import { Button } from "@/components/ui/button";
import { LoginForm } from "./LoginForm";
import { Google } from "@/components/ui/svgs/google";
import { Github } from "@/components/ui/svgs/github";
import Link from "next/link";

export function LoginPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-1 text-center mb-8">
        <h3 className="text-2xl font-medium">Welcome Back</h3>
        <p className="text-muted-foreground">
          Enter email and password to continue
        </p>
      </div>
      <LoginForm />
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
          <span>Don't have an account?</span>
          <Link href="/signup" className="font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
