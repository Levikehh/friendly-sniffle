import { PrismaClient } from "@prisma/client";
import { create as createAuthors } from "./seeds/author";
import { create as createBook } from "./seeds/book";
import { create as createCategory } from "./seeds/category";
import { create as createCurrencies } from "./seeds/currency";

const prisma = new PrismaClient();

async function main() {
  const categories = await createCategory();
  const authors = await createAuthors();
  const currencies = await createCurrencies();
  await createBook(categories, authors, currencies);
  console.log("Seeding finished");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
