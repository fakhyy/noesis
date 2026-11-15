import { db } from "@/db";
import { thoughts } from "@/db/schemas/core.schema";
import { DrizzleQueryError } from "@/lib/error";
import type { NewThought, SearchQuery } from "@/types";
import { and, eq, isNull } from "drizzle-orm";

export async function create(thought: NewThought) {
  try {
    let rows = await db.insert(thoughts).values(thought).returning({
      id: thoughts.id,
      title: thoughts.title,
      content: thoughts.content,
      createdAt: thoughts.createdAt,
      updatedAt: thoughts.updatedAt,
    });

    return rows[0];
  } catch {
    throw new DrizzleQueryError("Failed to create thought");
  }
}

export async function list(userId: string, query: SearchQuery) {
  try {
    return await db
      .select({
        id: thoughts.id,
        title: thoughts.title,
      })
      .from(thoughts)
      .where(
        and(
          eq(thoughts.userId, userId),
          isNull(thoughts.archivedAt),
          isNull(thoughts.deletedAt),
        ),
      )
      .limit(query.limit)
      .offset(query.page);
  } catch {
    throw new DrizzleQueryError("Failed to get thoughts");
  }
}

export const thoughtRepository = {
  create,
  list,
};
