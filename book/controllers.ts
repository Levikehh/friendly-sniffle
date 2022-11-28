import { Book } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

const { SCHEMA_ERROR_MESSAGES } = require("@/constants");
const prisma = require("@/utils/db");

const updateBookSchema = z.object({
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
});

const createBookSchema = z.object({
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
});

module.exports = {
  getBook: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const book: Book = await prisma.book.findUnique({
      where: { id: id },
    });
    return res.json(book);
  },
  getAllBook: async (req: Request, res: Response) => {
    console.log("If cached you shouldn't see this.");
    const books: Book[] = await prisma.book.findMany();
    return res.json(books);
  },
  updateBook: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    console.log(id, req.body);
    const dataSchema = updateBookSchema.safeParse(req.body);
    if (!dataSchema.success) return res.status(400).json(dataSchema.error);
    const updatedBook: Book = await prisma.book.update({
      where: {
        id: id,
      },
      data: dataSchema.data,
    });
    return res.json(updatedBook);
  },
  deleteBook: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const deletedBook: Book = await prisma.book.delete({
      where: {
        id: id,
      },
    });
    return res.json(deletedBook);
  },
  createBook: async (req: Request, res: Response) => {
    const isSchemaValid = createBookSchema.safeParse(req.body);
    if (!isSchemaValid.success)
      return res.status(400).json(isSchemaValid.error);
    const newBook: Book = await prisma.book.create({
      data: isSchemaValid.data,
    });
    return res.json(newBook);
  },
};
