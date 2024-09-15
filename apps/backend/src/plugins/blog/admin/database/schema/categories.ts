import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const blog_categories = pgTable('blog_categories', {
  id: serial('id').primaryKey(),
  color: varchar('color', { length: 6 }),
  position: integer('position').notNull().default(0),
});
