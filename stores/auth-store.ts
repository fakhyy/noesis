import { create } from "zustand";
import type { Nullable, Session, User } from "@/types";

type AuthData = {
  user: Nullable<User>;
  session: Nullable<Session>;
};

export const useAuthStore = create<AuthData>(() => ({
  user: null,
  session: null,
}));

// ================== Actions =================== //
export function setUser(user: Nullable<User>) {
  useAuthStore.setState({ user });
}

export function setSession(session: Nullable<Session>) {
  useAuthStore.setState({ session });
}
