import { z } from "zod";

export const update = z.object({
  name: z.string().trim().min(1).optional(),
});

export const create = z.object({
  name: z.string().trim().min(1),
});
