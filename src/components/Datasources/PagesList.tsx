import { isFullPage, QueryDataSourceResponse } from '@notionhq/client';
import { PagePropertyParser } from '../PagePropertyParser';

export const PagesList: React.FC<{
  queryResult: QueryDataSourceResponse;
}> = ({ queryResult }) => {
  return (
    <>
      <h2 className="px-4 text-xl font-semibold py-2">Pages</h2>
      <section className="px-4 py-2 flex-1 flex-col overflow-y-auto">
        <div className="overflow-y-auto">
          {queryResult.results.map((result) => {
            if (isFullPage(result)) {
              return (
                <div key={result.id} className="mb-2">
                  <div className="font-semibold">
                    <PagePropertyParser item={result.properties['Name']} />
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </section>
    </>
  );
};
