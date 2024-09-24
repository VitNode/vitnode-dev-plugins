import gql from 'graphql-tag';

import * as Types from '../../../../graphql/types';
export type Blog_Categories__ShowQueryVariables = Types.Exact<
  Record<string, never>
>;

export interface Blog_Categories__ShowQuery {
  __typename?: 'Query';
  blog_categories__show: {
    __typename?: 'ShowBlogCategoriesObj';
    edges: {
      __typename?: 'ShowBlogCategories';
      color?: string;
      id: number;
      name: {
        __typename?: 'StringLanguage';
        language_code: string;
        value: string;
      }[];
    }[];
  };
}

export const Blog_Categories__Show = gql`
  query Blog_categories__show {
    blog_categories__show {
      edges {
        color
        id
        name {
          language_code
          value
        }
      }
    }
  }
`;
