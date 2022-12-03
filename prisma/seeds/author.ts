import { Author, Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DATA: Prisma.AuthorCreateInput[] = [
  {
    firstName: "John",
    lastName: "Green",
  },
  {
    firstName: "Stephen",
    lastName: "King",
  },
  {
    firstName: "David",
    lastName: "Levithan",
  },
  {
    firstName: "Krisztián",
    lastName: "Fehér",
  },
  {
    firstName: "Gábor",
    lastName: "Baráth",
  },
];

export async function create(data: Prisma.AuthorCreateInput[] = DATA) {
  console.log(`Author seed - Started`);
  const authors: Author[] = [];
  for (const a of data) {
    const created = await prisma.author.create({
      data: a,
    });
    authors.push(created);
    console.log(`Created author with id: ${created.id}`);
  }
  console.log(`Author seed - Finished`);
  return authors;
}
