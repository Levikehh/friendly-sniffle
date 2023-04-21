import { Request, Response } from "express";
import { login, register } from "./schema";
import { Prisma, User } from "@prisma/client";

const prisma = require("@/utils/db");

module.exports = {
  login: async (req: Request, res: Response) => {
    const schema = login.safeParse(req.body);
    if (!schema.success) return res.status(400).json(schema.error);

    const user = await prisma.user.findFirst({
      where: {
        email: schema.data.username,
        AND: { password: schema.data.password },
      },
    });

    return res.json(user);
  },
  register: async (req: Request, res: Response) => {
    const schema = register.safeParse(req.body);
    if (!schema.success) return res.status(400).json(schema.error);
    let user: User;

    // Create user or throw error if already exists
    // TODO: check for other errors as it could be on "id" field as well
    try {
      user = await prisma.user.create({
        data: schema.data,
      });
      console.log("TODO: create user in db");
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(400).send("User already exists");
        }
      }
      throw error;
    }

    // TODO: store user in session with one time token
    return res.json(user);
  },
};
