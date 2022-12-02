import { z } from "zod";

export const update = z.object({
  firstName: z.string().trim().min(1).optional(),
  lastName: z.string().trim().min(1).optional(),
});

export const create = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
});
