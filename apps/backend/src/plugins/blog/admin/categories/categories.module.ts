import { Module } from '@nestjs/common';

import { CreateEditAdminBlogCategoriesResolver } from './create-edit/create-edit.resolver';
import { CreateEditAdminCategoriesBlogService } from './create-edit/create-edit.service';

@Module({
  providers: [
    CreateEditAdminCategoriesBlogService,
    CreateEditAdminBlogCategoriesResolver,
  ],
})
export class AdminCategoriesBlogModule {}
