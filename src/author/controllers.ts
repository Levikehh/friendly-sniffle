import { Author } from "@prisma/client";
import { Request, Response } from "express";
import { create, update } from "./schema";

const prisma = require("@/utils/db");

module.exports = {
  get: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const single: Author = await prisma.author.findUnique({
      where: { id: id },
    });
    return res.json(single);
  },
  all: async (req: Request, res: Response) => {
    const all: Author[] = await prisma.author.findMany();
    return res.json(all);
  },
  update: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const schema = update.safeParse(req.body);
    if (!schema.success) return res.status(400).json(schema.error);
    const updated: Author = await prisma.author.update({
      where: { id: id },
      data: schema.data,
    });
    return res.json(updated);
  },
  delete: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const deleted: Author = await prisma.author.delete({
      where: { id: id },
    });
    return res.json(deleted);
  },
  create: async (req: Request, res: Response) => {
    const schema = create.safeParse(req.body);
    if(!schema.success) return res.status(400).json(schema.error)
    const created: Author = await prisma.author.create({
      data: schema.data
    })
    return res.json(created);
  },
};
