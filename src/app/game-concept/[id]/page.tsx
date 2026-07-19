import { PageShell } from '@/components/Pages/PageShell';
import RichTextParser from '@/components/RichTextParser';
import { DecisionDatasource, GameConceptDatasource } from '@/lib/notion';
import Link from 'next/link';
import { IoIosCodeWorking } from 'react-icons/io';

const gameConceptDatasource = new GameConceptDatasource();
const decisionDataSource = new DecisionDatasource();

export default async function getPageView(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const page = await gameConceptDatasource.getPage(id);

  const gameDecisions = await decisionDataSource.queryDecisionsForGameConcept(
    id,
    {
      lifecycle: { operator: 'equals', value: 'Open' },
    }
  );

  return (
    <>
      <PageShell page={page}>
        {gameDecisions.results.length > 0 && (
          <div className="px-4 py-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold mb-2">Open Decisions</h2>
              <Link
                href={`/game-concept/${id}/decision-graph`}
                className="flex items-center space-x-1"
              >
                <IoIosCodeWorking className="size-5 text-gray-500 hover:text-gray-700 transition-all duration-150" />
                <span className="text-sm text-gray-500 hover:text-gray-700 transition-all duration-150">
                  Graph View
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gameDecisions.results.map((decision) => {
                return (
                  <div
                    key={decision.id}
                    className="mb-2 flex flex-col border border-black/30 rounded-md p-2 bg-gray-50 hover:bg-gray-100 transition-all duration-150"
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {decision.icon?.emoji && (
                        <span>{decision.icon?.emoji}</span>
                      )}
                      {decision.properties.Name?.title && (
                        <RichTextParser
                          richText={decision.properties.Name.title}
                        />
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {decision.properties.Lifecycle?.select?.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PageShell>
    </>
  );
}
