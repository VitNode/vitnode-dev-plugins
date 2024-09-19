import { Module } from '@nestjs/common';

import { ShowBlogCategoriesResolver } from './show/show.resolver';
import { ShowBlogCategoriesService } from './show/show.service';

@Module({
  providers: [ShowBlogCategoriesResolver, ShowBlogCategoriesService],
})
export class CategoriesBlogModule {}
