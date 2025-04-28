// Make sure to install the 'pg' package 
import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv'
dotenv.config();

const db = drizzle({ connection: { connectionString: process.env.DATABASE_URL, } });

// async function main() {
//     const result = await db.execute('select 1');
//     console.log(result.rows)
// }

// main();

export default db;