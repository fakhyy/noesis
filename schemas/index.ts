import z from "zod";

export let searchQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(5).max(20),
});

// ================= Thoughts Related ================== //

export let thoughtInsertSchema = z.object({
  title: z
    .string({
      error: "Title is required",
    })
    .min(1),
  content: z.string().optional(),
});
