import { integer, pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core'
import db from '.';
import { and, eq } from 'drizzle-orm';

export const recordsTable = pgTable('records', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255}).notNull(),
  amount: integer('amount').notNull(), // amount in cents
  title: varchar('title', { length: 255}).notNull(),
  date: timestamp('date').notNull(),
  createAt: timestamp('created_at').notNull().defaultNow(),
});

export async function createRecord(row: RecordModel) {
  const amountInCents = row.amount * 100;
  try {
    row.amount = amountInCents;
    row.date = new Date(row.date);
    const record = await db.insert(recordsTable).values(row);
    return record;
  } catch (error) {
    console.error('[Insert Record Failed]', error)
    return null;
  }
}

export async function getRecords(userId: RecordModel['userId'], date: RecordModel['date']) {
  try {
    date = new Date(date);
    const records = await db.select().from(recordsTable).where(and(eq(recordsTable.userId, userId), eq(recordsTable.date, date)));
    return records;
  } catch (error) {
    console.error('[Select Records Failed]', error);
    return null;
  }
}

export type RecordModel = typeof recordsTable.$inferInsert