import {
  Blog_Categories__Show,
  Blog_Categories__ShowQuery,
  Blog_Categories__ShowQueryVariables,
} from '@/plugins/blog/graphql/queries/blog_categories__show.generated';
import { CategoriesBlogAdminView } from '@/plugins/blog/templates/admin/categories/categories-admin-view';
import { getTranslations } from 'next-intl/server';
import { HeaderContent } from 'vitnode-frontend/components/ui/header-content';
import { fetcher } from 'vitnode-frontend/graphql/fetcher';

const getData = async () => {
  const data = await fetcher<
    Blog_Categories__ShowQuery,
    Blog_Categories__ShowQueryVariables
  >({
    query: Blog_Categories__Show,
    cache: 'force-cache',
  });

  return data;
};

export default async function Page() {
  const [t, data] = await Promise.all([
    getTranslations('admin_blog.categories'),
    getData(),
  ]);

  return (
    <>
      <HeaderContent desc={t('desc')} h1={t('title')} />
      <CategoriesBlogAdminView {...data} />
    </>
  );
}
