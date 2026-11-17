import { MailIcon } from "lucide-react";
import { AuthMessage } from "../_components/message";

export default function () {
  return (
    <AuthMessage
      icon={MailIcon}
      message="Check your inbox. We have sent you an email with verification link."
    />
  );
}

export const metadata = {
  title: "Verify Email",
};
