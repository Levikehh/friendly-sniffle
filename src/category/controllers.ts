import { Category } from "@prisma/client";
import { Request, Response } from "express";
import { create, update } from "./schema";

const prisma = require("@/utils/db");

module.exports = {
  get: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const single: Category = await prisma.category.findUnique({
      where: { id: id },
    });
    return res.json(single);
  },
  all: async (req: Request, res: Response) => {
    const all: Category[] = await prisma.category.findMany();
    return res.json(all);
  },
  update: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const schema = update.safeParse(req.body);
    if (!schema.success) return res.status(400).json(schema.error);
    const updated: Category = await prisma.category.update({
      where: { id: id },
      data: schema.data,
    });
    return res.json(updated);
  },
  delete: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const deleted: Category = await prisma.category.delete({
      where: { id: id },
    });
    return res.json(deleted);
  },
  create: async (req: Request, res: Response) => {
    const schema = create.safeParse(req.body);
    if(!schema.success) return res.status(400).json(schema.error)
    const created: Category = await prisma.category.create({
      data: schema.data
    })
    return res.json(created);
  },
};
