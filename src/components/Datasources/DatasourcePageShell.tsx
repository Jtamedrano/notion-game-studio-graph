'use client';

import { useState } from 'react';
import RichTextParser from '../RichTextParser';
import {
  DataSourceObjectResponse,
  QueryDataSourceResponse,
} from '@notionhq/client';
import { PagesList } from './PagesList';
import { IoIosArrowBack } from 'react-icons/io';

interface DatasourcePageShellProps {
  datasource: DataSourceObjectResponse;
  queryResult: QueryDataSourceResponse;
}

type Tab = 'pages' | 'graph';

export const DatasourcePageShell: React.FC<DatasourcePageShellProps> = ({
  datasource,
  queryResult,
}) => {
  const [tab, setTab] = useState<Tab>('pages');

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
              <RichTextParser richText={datasource.title} />
            </h1>
            <div className="text-sm px-4">
              <RichTextParser richText={datasource.description} />
            </div>
          </div>
        </div>
        <div className="flex space-x-2 px-4 py-2 text-sm">
          <button
            className={`px-4 py-2 rounded ${tab === 'pages' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTab('pages')}
          >
            Pages
          </button>
          <button
            className={`px-4 py-2 rounded ${tab === 'graph' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTab('graph')}
          >
            Graph
          </button>
        </div>
      </div>
      {tab === 'pages' && <PagesList queryResult={queryResult} />}
    </>
  );
};
