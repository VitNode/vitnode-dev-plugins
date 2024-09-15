import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';
import {
  inputPaginationCursor,
  outputPagination,
  SortDirectionEnum,
  StringLanguageHelper,
} from 'vitnode-backend';

import { blog_categories } from '../../database/schema/categories';
import { ShowBlogCategoriesArgs, ShowBlogCategoriesObj } from './show.dto';

@Injectable()
export class ShowBlogCategoriesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
  ) {}

  async show({
    cursor,
    first,
    last,
  }: ShowBlogCategoriesArgs): Promise<ShowBlogCategoriesObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: blog_categories,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: 'id',
        schema: blog_categories.id,
      },
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: 'position',
      },
    });

    const edges = await this.databaseService.db.query.blog_categories.findMany({
      ...pagination,
    });
    const ids = edges.map(edge => edge.id);
    const i18n = await this.stringLanguageHelper.get({
      item_ids: ids,
      database: blog_categories,
      plugin_code: 'blog',
      variables: ['name'],
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(blog_categories);

    return outputPagination({
      edges: edges.map(edge => ({
        ...edge,
        name: i18n.filter(i => i.item_id === edge.id),
      })),
      totalCount,
      first,
      cursor,
      last,
    });
  }
}
