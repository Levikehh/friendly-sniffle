import { z } from "zod";

export const login = z.object({
  username: z.string().trim().min(1),
  password: z.string().trim().min(8),
});

export const register = z.object({
  username: z.string().trim().min(1),
  password: z.string().trim().min(8),
  email: z.string().trim().email(),
});
