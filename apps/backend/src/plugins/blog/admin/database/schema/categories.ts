import { pgTable } from 'drizzle-orm/pg-core';

export const blog_categories = pgTable('blog_categories', t => ({
  id: t.serial().primaryKey(),
  color: t.varchar({ length: 6 }).notNull(),
  position: t.integer().notNull().default(0),
}));
