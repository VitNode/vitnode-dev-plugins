import { useTranslations } from 'next-intl';
import { Card } from 'vitnode-frontend/components/ui/card';
import { HeaderContent } from 'vitnode-frontend/components/ui/header-content';

export default function Page() {
  const t = useTranslations('admin_blog.nav');

  return (
    <>
      <HeaderContent desc="Description for the page." h1={t('title')} />
      <Card className="p-6">Content for the page.</Card>
    </>
  );
}
