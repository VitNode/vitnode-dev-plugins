import { DatabaseService } from '@/database/database.service';
import { ShowBlogCategories } from '@/plugins/blog/categories/show/show.dto';
import { Injectable } from '@nestjs/common';
import { inArray, sql, SQL } from 'drizzle-orm';
import { NotFoundError, StringLanguageHelper } from 'vitnode-backend';

import { blog_categories } from '../../database/schema/categories';
import { CreateEditAdminCategoriesBlogArgs } from './create-edit.dto';

@Injectable()
export class CreateEditAdminCategoriesBlogService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
  ) {}

  async createEdit({
    id,
    color,
    name,
    position,
  }: CreateEditAdminCategoriesBlogArgs): Promise<ShowBlogCategories> {
    if (id) {
      const items =
        await this.databaseService.db.query.blog_categories.findMany({
          orderBy: (table, { asc }) => asc(table.position),
        });
      const item = items.find(item => item.id === id);

      if (!item) {
        throw new NotFoundError('Category');
      }

      if (item.position !== position) {
        // Process the position
        let index = 0;
        const newIndexes: { id: number; position: number }[] = [];
        items
          .filter(item => item.id !== id)
          .forEach(item => {
            // Skip the position that we want to move
            if (position === index) {
              index++;
            }

            newIndexes.push({
              id: item.id,
              position: index,
            });
            index++;
          });

        const sqlChunks: SQL[] = [];
        sqlChunks.push(sql`(case`);
        newIndexes.forEach(({ id, position }) => {
          sqlChunks.push(sql`when ${id} then ${position}`);
        });
        sqlChunks.push(sql`end)`);
        const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '));
        await this.databaseService.db
          .update(blog_categories)
          .set({
            position: finalSql,
          })
          .where(
            inArray(
              blog_categories.id,
              newIndexes.map(i => i.id),
            ),
          );
      }

      const [update] = await this.databaseService.db
        .update(blog_categories)
        .set({
          color,
          position,
        })
        .returning();

      const updateName = await this.stringLanguageHelper.parse({
        data: name,
        database: blog_categories,
        plugin_code: 'blog',
        item_id: id,
        variable: 'name',
      });

      return {
        ...update,
        name: updateName,
      };
    }

    const [create] = await this.databaseService.db
      .insert(blog_categories)
      .values({
        color,
      })
      .returning();

    const createName = await this.stringLanguageHelper.parse({
      data: name,
      database: blog_categories,
      plugin_code: 'blog',
      item_id: create.id,
      variable: 'name',
    });

    return {
      ...create,
      name: createName,
    };
  }
}
