import { ShowBlogCategories } from '@/plugins/blog/categories/show/show.dto';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AdminAuthGuards } from 'vitnode-backend';

import { CreateEditAdminCategoriesBlogArgs } from './create-edit.dto';
import { CreateEditAdminCategoriesBlogService } from './create-edit.service';

@Resolver()
export class CreateEditAdminBlogCategoriesResolver {
  constructor(private readonly service: CreateEditAdminCategoriesBlogService) {}

  @Mutation(() => ShowBlogCategories)
  @UseGuards(AdminAuthGuards)
  async admin__blog_categories__create_edit(
    @Args() args: CreateEditAdminCategoriesBlogArgs,
  ): Promise<ShowBlogCategories> {
    return await this.service.createEdit(args);
  }
}
