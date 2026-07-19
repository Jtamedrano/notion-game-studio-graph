import Link from 'next/link';
import { GameConceptDatasource } from '@/lib/notion';
import RichTextParser from '@/components/RichTextParser';

const gameConceptDatasource = new GameConceptDatasource();

export default async function Home() {
  const gameConcepts = await gameConceptDatasource.query();

  return (
    <>
      <h1 className="text-3xl font-bold py-2 px-4">Game Studio</h1>
      <h2 className="text-xl font-semibold py-2 px-4">Game Concepts</h2>
      <nav className="list-disc list-inside px-4">
        {gameConcepts.results.map((concept) => {
          const nameProp = concept.properties.Name;
          return (
            <Link
              key={concept.id}
              href={`/game-concept/${concept.id}`}
              className="block py-1 text-blue-400 hover:underline hover:text-blue-500 transition-all duration-150"
            >
              {concept.icon && concept.icon.type === 'emoji' && (
                <span className="mr-2">{concept.icon.emoji}</span>
              )}
              <RichTextParser richText={nameProp.title} />
            </Link>
          );
        })}
      </nav>
    </>
  );
}
