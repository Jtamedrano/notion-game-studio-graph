import { RichTextItemResponse } from '@notionhq/client';

interface RichTextParserProps {
  richText: RichTextItemResponse[];
}

type RichTextRendererProps = RichTextItemResponse;

const RichTextItemRenderer: React.FC<RichTextRendererProps> = (item) => {
  switch (item.type) {
    case 'text':
      return <span>{item.text.content}</span>;
    case 'mention':
      return <span>{item.mention.type}</span>;
    case 'equation':
      return <span>{item.equation.expression}</span>;
    default:
      return null;
  }
};

const RichTextParser: React.FC<RichTextParserProps> = ({ richText }) => {
  return (
    <>
      {richText.map((item, index) => (
        <RichTextItemRenderer key={index} {...item} />
      ))}
    </>
  );
};

export default RichTextParser;
