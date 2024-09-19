import { ArgsType, Field } from '@nestjs/graphql';
import { StringLanguageInput } from 'vitnode-backend';

@ArgsType()
export class CreateEditAdminCategoriesBlogArgs {
  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => Number, { nullable: true })
  id?: number;

  @Field(() => [StringLanguageInput])
  name: StringLanguageInput[];

  @Field(() => Number, { nullable: true })
  position?: number;
}
