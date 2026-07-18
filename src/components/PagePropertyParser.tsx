import { PageObjectResponse } from '@notionhq/client';
import RichTextParser from './RichTextParser';

export interface PagePropertyParserProps {
  item: PageObjectResponse['properties'][string];
}

export const PagePropertyParser: React.FC<PagePropertyParserProps> = ({
  item,
}) => {
  switch (item?.type) {
    case 'title':
      return <RichTextParser richText={item.title} />;
  }

  return null;
};
