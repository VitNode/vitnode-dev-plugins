'use client';

import { Blog_Categories__ShowQuery } from '@/plugins/blog/graphql/queries/blog_categories__show.generated';
import React from 'react';
import { DragAndDropSortableList } from 'vitnode-frontend/components/drag&drop/sortable-list/list';
import { useTextLang } from 'vitnode-frontend/hooks/use-text-lang';

export const CategoriesBlogAdminView = ({
  blog_categories__show: { edges },
}: Blog_Categories__ShowQuery) => {
  const { convertText } = useTextLang();

  return (
    <DragAndDropSortableList
      componentItem={data => {
        return <div>{convertText(data.name)}</div>;
      }}
      data={edges.map(item => ({ ...item, children: [] }))}
    />
  );
};
