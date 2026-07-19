export default async function GameConceptDecisionGraphPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  console.log('id', id);

  return <></>;
}
