import { ThoughtPage } from "./ThoughtPage";

export default async function ({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let { id } = await params;
  return <ThoughtPage />;
}
