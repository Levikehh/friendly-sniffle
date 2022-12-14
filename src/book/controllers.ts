import { Book } from "@prisma/client";
import { Request, Response } from "express";
import { create, update } from "./schema";

const prisma = require("@/utils/db");

module.exports = {
  get: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const single: Book = await prisma.book.findUnique({
      where: { id: id },
      include: {
        categories: true,
        authors: true,
      },
    });
    return res.json(single);
  },
  all: async (req: Request, res: Response) => {
    const all: Book[] = await prisma.book.findMany({
      include: {
        categories: true,
        authors: true,
      },
    });
    return res.json(all);
  },
  update: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const schema = update.safeParse(req.body);
    if (!schema.success) return res.status(400).json(schema.error);
    const updated: Book = await prisma.book.update({
      where: { id: id },
      data: schema.data,
      include: {
        categories: true,
        authors: true,
      },
    });
    return res.json(updated);
  },
  delete: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const deleted: Book = await prisma.book.delete({
      where: { id: id },
      include: {
        categories: true,
        authors: true,
      },
    });
    return res.json(deleted);
  },
  create: async (req: Request, res: Response) => {
    const schema = create.safeParse(req.body);
    if (!schema.success) return res.status(400).json(schema.error);
    const created: Book = await prisma.book.create({
      data: schema.data,
      include: {
        categories: true,
        authors: true,
      },
    });
    return res.json(created);
  },
};
