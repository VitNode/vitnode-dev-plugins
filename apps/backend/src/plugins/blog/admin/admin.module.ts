import { Module } from '@nestjs/common';

import { AdminCategoriesBlogModule } from './categories/categories.module';

@Module({
  imports: [AdminCategoriesBlogModule],
})
export class AdminBlogModule {}
