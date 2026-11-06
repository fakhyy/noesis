// ============ HELPER TYPES ================= //

export type Nullable<T> = T | null;

// ============ USER RELATED TYPE ================= //

import { session, user } from "@/db/schema";

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
