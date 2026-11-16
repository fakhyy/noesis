import { Suspense } from "react";
import { ThoughtPage } from "./ThoughtPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <ThoughtPage />
    </Suspense>
  );
}