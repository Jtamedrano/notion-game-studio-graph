import Link from 'next/link';
import { getFullDatabase } from '@/lib/notion';

export default async function Home() {
  const db = await getFullDatabase();

  return (
    <>
      <h1 className="text-3xl font-bold py-2 px-4">Game Studio</h1>
      <h2 className="text-xl font-semibold py-2 px-4">Datasources</h2>
      <nav className="list-disc list-inside px-4">
        {db.data_sources.map((dataSource) => (
          <Link
            key={dataSource.id}
            href={`/datasource/${dataSource.id}`}
            className="block py-1 text-blue-400 hover:underline hover:text-blue-500 transition-all duration-150"
          >
            {dataSource.name}
          </Link>
        ))}
      </nav>
    </>
  );
}
