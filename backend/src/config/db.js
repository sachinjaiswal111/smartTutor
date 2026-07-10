
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL);

console.log(db);
// const result = await db.execute('select 1');
