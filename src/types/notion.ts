import { PageObjectResponse, QueryDataSourceResponse } from '@notionhq/client';

type PageProperty =
  PageObjectResponse['properties'][keyof PageObjectResponse['properties']];

export interface DecisionProperties {
  Name: PageProperty & { type: 'title' };
  Lifecycle: PageProperty & { type: 'select' };
}

export interface GameConceptProperties {
  Name: PageProperty & { type: 'title' };
  Decisions: PageProperty & { type: 'relation' };
}

export interface GameConceptPage extends PageObjectResponse {
  icon: PageObjectResponse['icon'] & { type: 'emoji' };
  properties: PageObjectResponse['properties'] & GameConceptProperties;
  parent: PageObjectResponse['parent'] & { type: 'data_source_id' };
}

export interface GameConceptQueryResponse extends QueryDataSourceResponse {
  results: GameConceptPage[];
}

export interface DecisionPage extends PageObjectResponse {
  icon: (PageObjectResponse['icon'] & { type: 'emoji' }) | null;
  properties: PageObjectResponse['properties'] & DecisionProperties;
  parent: PageObjectResponse['parent'] & { type: 'data_source_id' };
}

export interface DecisionQueryResponse extends QueryDataSourceResponse {
  results: DecisionPage[];
}
