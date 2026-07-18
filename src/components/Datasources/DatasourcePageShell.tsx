'use client';

import { useState } from 'react';
import RichTextParser from '../RichTextParser';
import {
  DataSourceObjectResponse,
  QueryDataSourceResponse,
} from '@notionhq/client';
import { PagesList } from './PagesList';

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
      <div className="bg-white z-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold py-2 px-4">
            <RichTextParser richText={datasource.title} />
          </h1>
          <div className="px-4">
            <RichTextParser richText={datasource.description} />
          </div>
        </div>
        <div className="flex space-x-4 px-4 py-2">
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
