import { ResetPasswordForm } from "./ResetPasswordForm";

interface ResetPasswordPageProps {
  searchParams: Record<string, string>;
}

export function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  if (searchParams.error)
    return <p className="text-muted-foreground">{searchParams.error}</p>;

  if (!searchParams.token)
    return <p className="text-muted-foreground text-center">Reset token not found!</p>;

  return (
    <div className="space-y-4">
      <div className="space-y-1 text-center mb-8">
        <h3 className="text-2xl font-medium">Reset Password</h3>
        <p className="text-muted-foreground">
          Enter your new password to reset
        </p>
      </div>
      <ResetPasswordForm token={searchParams.token} />
    </div>
  );
}
