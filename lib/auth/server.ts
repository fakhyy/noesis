import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UnauthorizedError } from "@/lib/error";

export async function getUser() {
  let session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new UnauthorizedError();
  }

  return session.user;
}
