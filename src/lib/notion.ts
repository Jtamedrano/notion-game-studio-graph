import 'server-only';
import {
  Client,
  isFullDatabase,
  isFullDataSource,
  isFullPageOrDataSource,
} from '@notionhq/client';

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY is not defined');
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

export const getFullDatabase = async () => {
  if (!NOTION_DATABASE_ID) {
    throw new Error('NOTION_DATABASE_ID is not defined');
  }

  const response = await notion.databases.retrieve({
    database_id: NOTION_DATABASE_ID,
  });

  if (!isFullDatabase(response)) {
    throw new Error('Failed to retrieve full database');
  }

  const db = response;

  return db;
};

export const getDatasource = async (data_source_id: string) => {
  const response = await notion.dataSources.retrieve({
    data_source_id,
  });

  if (!isFullDataSource(response)) {
    throw new Error('Failed to retrieve full data source');
  }

  if (!isFullPageOrDataSource(response)) {
    throw new Error('Failed to retrieve full page or data source');
  }

  return response;
};

export const queryDataset = async (data_source_id: string) => {
  const response = await notion.dataSources.query({
    data_source_id,
    result_type: 'page',
  });

  return response;
};
