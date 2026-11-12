import { ThoughtPage } from "./ThoughtPage";

export default async function ({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ThoughtPage />;
}
