import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  const adapter = new PrismaBetterSqlite3({ url: 'file:dev.db' });
  prisma = new PrismaClient({ adapter });
} else {
  // In development, use a global variable to preserve the value across hot reloads
  if (!(global as any).prisma) {
    const adapter = new PrismaBetterSqlite3({ url: 'file:dev.db' });
    (global as any).prisma = new PrismaClient({ adapter });
  }
  prisma = (global as any).prisma;
}

export default prisma;
