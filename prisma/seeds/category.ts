import { Category, Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DATA: Prisma.CategoryCreateInput[] = [
  {
    name: "Drama",
  },
  {
    name: "Crime",
  },
  {
    name: "Horror",
  },
  {
    name: "Fantasy",
  },
  {
    name: "Biography",
  },
];

export async function create(data: Prisma.CategoryCreateInput[] = DATA) {
  console.log(`Category seed - Started`);
  const categories: Category[] = [];
  for (const a of data) {
    const created = await prisma.category.upsert({
      where: { name: a.name },
      update: {},
      create: a,
    });
    categories.push(created);
    console.log(`Created category with id: ${created.id}`);
  }
  console.log(`Category seed - Finished`);
  return categories;
}
