import { db } from "@/db";
import { thoughts } from "@/db/schemas/core.schema";
import { DrizzleQueryError, NotFoundError } from "@/lib/error";
import { thoughtUpdateSchema } from "@/schemas";
import type { NewThought, SearchQuery } from "@/types";
import { and, eq, isNull } from "drizzle-orm";
import z from "zod";

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
  } catch (error) {
    console.log(error);
    
    throw new DrizzleQueryError("Failed to get thoughts");
  }
}

export async function get(userId: string, thoughtId: string) {
  try {
    let records = await db
      .select({
        id: thoughts.id,
        title: thoughts.title,
        content: thoughts.content,
        createdAt: thoughts.createdAt,
        updatedAt: thoughts.updatedAt,
      })
      .from(thoughts)
      .where(
        and(
          eq(thoughts.id, thoughtId),
          eq(thoughts.userId, userId),
          isNull(thoughts.archivedAt),
          isNull(thoughts.deletedAt),
        ),
      );

    if (records.length === 0) throw new NotFoundError("Thought not found");

    return records[0];
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new DrizzleQueryError("Failed to get thought");
  }
}

export async function _delete(userId: string, thoughtId: string) {
  try {
    let records = await db
      .update(thoughts)
      .set({
        deletedAt: new Date(),
      })
      .where(
        and(
          eq(thoughts.id, thoughtId),
          eq(thoughts.userId, userId),
          isNull(thoughts.archivedAt),
          isNull(thoughts.deletedAt),
        ),
      )
      .returning({
        id: thoughts.id,
        title: thoughts.title,
        content: thoughts.content,
        createdAt: thoughts.createdAt,
        updatedAt: thoughts.updatedAt,
      });

    if (records.length === 0) throw new NotFoundError("Thought not found");

    return records[0];
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new DrizzleQueryError("Failed to delete thought");
  }
}

export async function update(
  userId: string,
  thoughtId: string,
  updates: z.infer<typeof thoughtUpdateSchema>,
) {
  try {
    let records = await db
      .update(thoughts)
      .set(updates)
      .where(
        and(
          eq(thoughts.id, thoughtId),
          eq(thoughts.userId, userId),
          isNull(thoughts.archivedAt),
          isNull(thoughts.deletedAt),
        ),
      )
      .returning({
        id: thoughts.id,
        title: thoughts.title,
        content: thoughts.content,
        createdAt: thoughts.createdAt,
        updatedAt: thoughts.updatedAt,
      });

    if (records.length === 0) throw new NotFoundError("Thought not found");

    return records[0];
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new DrizzleQueryError("Failed to update thought");
  }
}

export const thoughtRepository = {
  create,
  list,
  get,
  delete: _delete,
  update,
};
