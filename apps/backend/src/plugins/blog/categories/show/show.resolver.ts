import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowBlogCategoriesArgs, ShowBlogCategoriesObj } from './show.dto';
import { ShowBlogCategoriesService } from './show.service';

@Resolver()
export class ShowBlogCategoriesResolver {
  constructor(private readonly service: ShowBlogCategoriesService) {}

  @Query(() => ShowBlogCategoriesObj)
  async blog_categories__show(
    @Args() args: ShowBlogCategoriesArgs,
  ): Promise<ShowBlogCategoriesObj> {
    return await this.service.show(args);
  }
}
