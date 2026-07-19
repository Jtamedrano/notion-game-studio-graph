'use client';

import { GameConceptPage } from '@/types/notion';
import { IoIosArrowBack } from 'react-icons/io';
import RichTextParser from '../RichTextParser';

interface PageShellProps {
  page: GameConceptPage;
}

export const PageShell: React.FC<React.PropsWithChildren<PageShellProps>> = ({
  children,
  page,
}) => {
  return (
    <>
      <div className="box-border bg-white z-10 flex justify-between items-center border-b border-gray-200">
        <div className="flex space-x-4">
          <button
            className="flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 w-16"
            onClick={() => window.history.back()}
          >
            <IoIosArrowBack className="size-5" />
          </button>
          <div className="flex flex-col justify-center py-2">
            <h1 className="text-2xl font-bold px-4">
              {<span className="mr-2">{page.icon.emoji}</span>}
              <RichTextParser richText={page.properties.Name.title} />
            </h1>
          </div>
        </div>
      </div>
      <main className="p-4">{children}</main>
    </>
  );
};

export default PageShell;
