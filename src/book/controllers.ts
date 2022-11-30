import { Book } from "@prisma/client";
import { Request, Response } from "express";
import { create, update } from "./schema";

const prisma = require("@/utils/db");

module.exports = {
  get: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const book: Book = await prisma.book.findUnique({
      where: { id: id },
    });
    return res.json(book);
  },
  all: async (req: Request, res: Response) => {
    const books: Book[] = await prisma.book.findMany();
    return res.json(books);
  },
  update: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const schema = update.safeParse(req.body);
    if (!schema.success) return res.status(400).json(schema.error);
    const updatedBook: Book = await prisma.book.update({
      where: { id: id },
      data: schema.data,
    });
    return res.json(updatedBook);
  },
  delete: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const deletedBook: Book = await prisma.book.delete({
      where: { id: id },
    });
    return res.json(deletedBook);
  },
  create: async (req: Request, res: Response) => {
    const schema = create.safeParse(req.body);
    if (!schema.success) return res.status(400).json(schema.error);
    const newBook: Book = await prisma.book.create({
      data: schema.data,
    });
    return res.json(newBook);
  },
};
