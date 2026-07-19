import 'server-only';
import {
  Client,
  DatabaseObjectResponse,
  DataSourceObjectResponse,
  isFullDatabase,
  isFullDataSource,
  isFullPage,
  isFullPageOrDataSource,
  PageObjectResponse,
  QueryDataSourceParameters,
  QueryDataSourceResponse,
} from '@notionhq/client';
import {
  DecisionPage,
  DecisionQueryResponse,
  GameConceptPage,
  GameConceptQueryResponse,
} from '@/types/notion';

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY is not defined');
}

export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getDatabase<
  T extends DatabaseObjectResponse = DatabaseObjectResponse,
>(database_id: string) {
  const response = await notionClient.databases.retrieve({
    database_id,
  });

  if (!isFullDatabase(response)) {
    throw new Error('Failed to retrieve full database');
  }

  const db = response;

  return db as T;
}

export async function getDatasource<
  T extends DataSourceObjectResponse = DataSourceObjectResponse,
>(data_source_id: string) {
  const response = await notionClient.dataSources.retrieve({
    data_source_id,
  });

  if (!isFullDataSource(response)) {
    throw new Error('Failed to retrieve full data source');
  }

  if (!isFullPageOrDataSource(response)) {
    throw new Error('Failed to retrieve full page or data source');
  }

  return response as T;
}

export async function getPage<T = PageObjectResponse>(
  page_id: string,
  filter_properties?: QueryDataSourceParameters['filter_properties']
) {
  const response = await notionClient.pages.retrieve({
    page_id,
    filter_properties,
  });

  if (!isFullPage(response)) {
    throw new Error('Failed to retrieve full page or data source');
  }

  return response as T;
}

export const queryDataset = async (
  data_source_id: string,
  params?: {
    filter?: QueryDataSourceParameters['filter'];
    filter_properties?: QueryDataSourceParameters['filter_properties'];
  }
) => {
  const response = await notionClient.dataSources.query({
    data_source_id,
    filter: params?.filter,
  });

  return response;
};

class GameStudioDatasource<
  QueryResponse extends QueryDataSourceResponse = QueryDataSourceResponse,
  PageResponse extends PageObjectResponse = PageObjectResponse,
> {
  datasource_id: string;

  constructor(datasource_id: string) {
    this.datasource_id = datasource_id;
  }

  async get() {
    const datasource = await getDatasource(this.datasource_id);
    return datasource;
  }

  async getPage(
    id: string,
    filter_properties?: QueryDataSourceParameters['filter_properties'] &
      keyof PageResponse['properties'][]
  ) {
    const page = await getPage<PageResponse>(id, filter_properties);
    return page;
  }

  async query(params?: {
    filter?: QueryDataSourceParameters['filter'];
    filter_properties?: QueryDataSourceParameters['filter_properties'];
  }) {
    const response = await notionClient.dataSources.query({
      data_source_id: this.datasource_id,
      filter: params?.filter,
    });

    return response as QueryResponse;
  }
}

export class GameConceptDatasource extends GameStudioDatasource<
  GameConceptQueryResponse,
  GameConceptPage
> {
  constructor() {
    super(process.env.NOTION_GAME_CONCEPTS_DATASOURCE_ID!);
  }
}

export class DecisionDatasource extends GameStudioDatasource<
  DecisionQueryResponse,
  DecisionPage
> {
  constructor() {
    super(process.env.NOTION_DECISIONS_DATASOURCE_ID!);
  }

  async queryDecisionsForGameConcept(
    gameConceptId: string,
    params?: {
      lifecycle?: {
        operator: 'equals';
        value: 'Open';
      };
    }
  ) {
    const response = await this.query({
      filter: {
        property: 'Authoritative Game Concept',
        relation: {
          contains: gameConceptId,
        },
        ...(params
          ? {
              and: [
                params.lifecycle
                  ? {
                      property: 'Lifecycle',
                      select: {
                        [params.lifecycle.operator]: params.lifecycle.value,
                      },
                    }
                  : null,
              ].filter(Boolean),
            }
          : {}),
      },
    });

    return response;
  }
}
