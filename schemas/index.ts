import z from "zod";

export const searchQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(5).max(20),
});

// ================= Thoughts Related ================== //

export const idSchema = z.uuid({ error: "Invalid thought id" });

export const thoughtInsertSchema = z.object({
  title: z
    .string({
      error: "Title is required",
    })
    .min(1),
  content: z.string().optional(),
});

export const thoughtUpdateSchema = z.object({
  title: z.string({ error: "Title is invalid" }).min(1).optional(),
  content: z.string().optional(),
});
