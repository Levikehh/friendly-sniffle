import { Author, Book, Category, Currency, Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DATA: Prisma.BookCreateInput[] = [
  {
    title: "Minél véresebb",
    price: 1500,
  },
  {
    title: "Alaska nyomában",
    price: 1200,
  },
  {
    title: "Kezdő hackerek kézikönyve",
    price: 900,
  },
  {
    title: "Az iPhone könyv",
    price: 700,
  },
  {
    title: "Will & Will",
    price: 1000,
  },
];

export async function create(
  categories: Category[],
  authors: Author[],
  currencies: Currency[],
  data: Prisma.BookCreateInput[] = DATA
) {
  console.log(`Book seed - Started`);
  const books: Book[] = [];
  for (const a of data) {
    const created = await prisma.book.create({
      data: {
        ...a,
        categories: {
          connect: [
            {
              id: categories[Math.floor(Math.random() * categories.length)].id,
            },
          ],
        },
        authors: {
          connect: [
            {
              id: authors[Math.floor(Math.random() * authors.length)].id,
            },
          ],
        },
        currency:
          currencies[Math.floor(Math.random() * currencies.length)].code,
      },
    });
    books.push(created);
    console.log(`Created book with id: ${created.id}`);
  }
  console.log(`Book seed - Finished`);
  return books;
}
