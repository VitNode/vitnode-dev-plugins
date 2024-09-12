import { core_users } from '@/plugins/core/admin/database/schema/users';
import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
} from 'drizzle-orm/pg-core';

import { blog_categories } from './categories';

export const blog_articles = pgTable(
  'blog_articles',
  {
    id: serial('id').primaryKey(),
    author_id: integer('author_id').references(() => core_users.id, {
      onDelete: 'cascade',
    }),
    category_id: integer('category_id').references(() => blog_categories.id, {
      onDelete: 'cascade',
    }),
    created: timestamp('created').notNull().defaultNow(),
    update: timestamp('update').notNull().defaultNow(),
  },
  table => ({
    author_id_idx: index('blog_articles_author_id_idx').on(table.author_id),
    category_id_idx: index('blog_articles_category_id_idx').on(
      table.category_id,
    ),
  }),
);

export const blog_articles_relations = relations(blog_articles, ({ one }) => ({
  author: one(core_users, {
    fields: [blog_articles.author_id],
    references: [core_users.id],
  }),
  category: one(blog_categories, {
    fields: [blog_articles.category_id],
    references: [blog_categories.id],
  }),
}));
