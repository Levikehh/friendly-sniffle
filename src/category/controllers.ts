import { Category } from "@prisma/client";
import { Request, Response } from "express";
import { create, update } from "./schema";

const prisma = require("@/utils/db");

module.exports = {
  get: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const category: Category = await prisma.category.findUnique({
      where: { id: id },
    });
    return res.json(category);
  },
  all: async (req: Request, res: Response) => {
    const categories: Category[] = await prisma.category.findMany();
    return res.json(categories);
  },
  update: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const schema = update.safeParse(req.body);
    if (!schema.success) return res.status(400).json(schema.error);
    const updatedCategory: Category = await prisma.category.update({
      where: { id: id },
      data: schema.data,
    });
    return res.json(updatedCategory);
  },
  delete: async (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const deletedCategory: Category = await prisma.category.delete({
      where: { id: id },
    });
    return res.json(deletedCategory);
  },
  create: async (req: Request, res: Response) => {
    const schema = create.safeParse(req.body);
    if(!schema.success) return res.status(400).json(schema.error)
    const newCategory: Category = await prisma.category.create({
      data: schema.data
    })
    return res.json(newCategory);
  },
};
