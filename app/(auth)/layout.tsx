export default function ({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4">
      <section className="w-full max-w-88">{children}</section>
    </main>
  );
}
