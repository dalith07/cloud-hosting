import { z } from "zod";

export const createArtcilesSchema = z.object({
  title: z.string().min(2).max(200),
  body: z.string().min(10, "desc must be more than 10 characters please"),
});
