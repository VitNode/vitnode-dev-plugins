import { core_users } from '@/plugins/core/admin/database/schema/users';
import { relations } from 'drizzle-orm';
import { index, pgTable } from 'drizzle-orm/pg-core';

import { blog_categories } from './categories';

export const blog_articles = pgTable(
  'blog_articles',
  t => ({
    id: t.serial().primaryKey(),
    author_id: t.integer().references(() => core_users.id, {
      onDelete: 'cascade',
    }),
    category_id: t.integer().references(() => blog_categories.id, {
      onDelete: 'cascade',
    }),
    created: t.timestamp().notNull().defaultNow(),
    update: t.timestamp().notNull().defaultNow(),
  }),
  table => {
    return {
      authorIdx: index('blog_articles_author_id_idx').on(table.author_id),
      categoryIdx: index('blog_articles_category_id_idx').on(table.category_id),
    };
  },
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
