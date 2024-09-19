import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfo, PaginationArgs, StringLanguage } from 'vitnode-backend';

@ArgsType()
export class ShowBlogCategoriesArgs extends PaginationArgs {}

@ObjectType()
export class ShowBlogCategories {
  @Field(() => String, { nullable: true })
  color: null | string;

  @Field(() => Int)
  id: number;

  @Field(() => [StringLanguage])
  name: StringLanguage[];
}

@ObjectType()
export class ShowBlogCategoriesObj {
  @Field(() => [ShowBlogCategories])
  edges: ShowBlogCategories[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
