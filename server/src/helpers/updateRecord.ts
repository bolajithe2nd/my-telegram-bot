import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const updateRecord = async (
  msisdn: string,
  tableName: keyof PrismaClient
) => {
  const table: any = prisma[tableName];

  try {
    if (table) {
      await table.update({
        where: { msisdn },
        data: { status: 1 },
      });
    }
  } catch (error) {
    console.error("Failed to update record.");
  }
};
