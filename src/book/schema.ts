import { z } from "zod";

const { SCHEMA_ERROR_MESSAGES } = require("@/constants");

export const update = z.object({
  title: z.string().trim().min(1).optional(),
  price: z
    .preprocess(
      (a) => parseInt(z.string().parse(a)),
      z.number().int().gte(0, { message: SCHEMA_ERROR_MESSAGES.PRICE_NEGATIVE })
    )
    .optional(),
  currency: z
    .string()
    .trim()
    .min(2)
    .max(6)
    .transform((a) => a.toUpperCase())
    .optional(),
  categories: z
    .preprocess((a) => JSON.parse(z.string().parse(a)), z.string().array())
    .transform((a) => ({
      connectOrCreate: a.map((category) => ({
        where: { name: category },
        create: { name: category },
      })),
    }))
    .optional(),
});

export const create = z.object({
  title: z.string().trim().min(1),
  price: z.preprocess(
    (a) => parseInt(z.string().parse(a)),
    z.number().int().gte(0, { message: SCHEMA_ERROR_MESSAGES.PRICE_NEGATIVE })
  ),
  currency: z
    .string()
    .trim()
    .min(2)
    .max(6)
    .transform((a) => a.toUpperCase()),
  categories: z
    .preprocess((a) => JSON.parse(z.string().parse(a)), z.string().array())
    .transform((a) => ({
      connectOrCreate: a.map((category) => ({
        where: { name: category },
        create: { name: category },
      })),
    })),
});
