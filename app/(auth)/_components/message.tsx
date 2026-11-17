import { cn } from "cn";
import { ComponentProps } from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthMessageProps {
  icon: LucideIcon;
  message: string;
  buttonProps?: ComponentProps<"button">;
}

export function AuthMessage({
  icon: Icon,
  message,
  buttonProps,
}: AuthMessageProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
        <Icon className="size-6 text-muted-foreground" />
      </div>
      <p>{message}</p>
      {buttonProps && (
        <Button
          className={cn("px-6", buttonProps.className)}
          {...buttonProps}
        />
      )}
    </div>
  );
}
