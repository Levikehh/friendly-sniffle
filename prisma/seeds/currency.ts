import { Currency, Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DATA: Prisma.CurrencyCreateInput[] = [
  {
    code: "EUR",
    num: 978,
    decimals: 2,
    name: "Euro",
  },
  {
    code: "USD",
    num: 840,
    decimals: 2,
    name: "United States dollar",
  },
  {
    code: "GBP",
    num: 826,
    decimals: 2,
    name: "Pound sterling",
  },
  {
    code: "HUF",
    num: 348,
    decimals: 2,
    name: "Hungarian forint",
  },
];

export async function create(data: Prisma.CurrencyCreateInput[] = DATA) {
  console.log(`Currency seed - Started`);
  const currencies: Currency[] = [];
  for (const a of data) {
    const created = await prisma.currency.upsert({
      where: { code: a.code },
      update: {},
      create: a,
    });
    currencies.push(created);
    console.log(`Created currency with code: ${created.code}`);
  }
  console.log(`Currency seed - Finished`);
  return currencies;
}
