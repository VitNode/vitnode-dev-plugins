import { Module } from '@nestjs/common';

import { AdminBlogModule } from './admin/admin.module';
import { ArticlesBlogModule } from './articles/articles.module';
import { CategoriesBlogModule } from './categories/categories.module';

@Module({
  imports: [AdminBlogModule, CategoriesBlogModule, ArticlesBlogModule],
})
export class BlogModule {}
