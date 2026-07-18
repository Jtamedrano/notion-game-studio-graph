import { getDatasource, queryDataset } from '@/lib/notion';
import { DatasourcePageShell } from '@/components/Datasources/DatasourcePageShell';

export default async function DatasourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const datasource = await getDatasource(id);

  const queryResult = await queryDataset(id);

  return (
    <DatasourcePageShell datasource={datasource} queryResult={queryResult} />
  );
}
