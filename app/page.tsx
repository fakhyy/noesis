
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Brain,
  Layers3,
  Search,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { NoesisDark } from "@/components/icons";
import { ModeToggle } from "@/components/shared/mode-toggle";

const features = [
  {
    icon: Brain,
    title: "Capture your thoughts",
    description:
      "Write down ideas as they come. No structure or pressure, just a place to think.",
  },
  {
    icon: Layers3,
    title: "Keep ideas together",
    description:
      "Organize your thoughts in one quiet space. Everything stays accessible.",
  },
  {
    icon: Search,
    title: "Find your thinking",
    description:
      "Return to old thoughts, revisit questions, and discover connections.",
  },
];

const thoughts = [
  "Beyond Thoughts",
  "Why should I believe in God?",
  "The nature of consciousness",
  "Understanding time",
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <NoesisDark width={25} height={25} />
          <span className="text-lg font-semibold tracking-tight">
            noesis
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a
            href="#features"
            className="transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#philosophy"
            className="transition-colors hover:text-foreground"
          >
            Philosophy
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign in</Link>
          </Button>

          <Button asChild className="rounded-full">
            <Link href="/app">
              Get started
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-28 text-center md:pt-36">
        <div className="mb-8 flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground">
          <Sparkles size={13} />
          A space for independent thinking
        </div>

        <h1 className="max-w-4xl text-5xl font-medium leading-[1.08] tracking-[-0.055em] sm:text-6xl md:text-8xl">
          Give your thoughts
          <br />
          <span className="text-muted-foreground">
            somewhere to exist.
          </span>
        </h1>

        <p className="mt-8 max-w-lg text-base leading-7 text-muted-foreground md:text-lg">
          An intentional space to capture ideas, explore questions,
          and make sense of what goes on in your mind.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ModeToggle />
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full px-7"
          >
            <Link href="/app">
              Start with a thought
              <ArrowRight />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full px-7"
          >
            <a href="#features">Explore Noesis</a>
          </Button>
        </div>

        <div className="mt-20 flex items-center gap-2 text-xs text-muted-foreground">
          <ArrowDown size={14} />
          A little closer to your thoughts
        </div>
      </section>

      {/* Product Preview */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-black/5">
          {/* Window Header */}
          <div className="flex h-12 items-center justify-between border-b border-border px-5">
            <div className="flex items-center gap-2">
              <NoesisDark width={17} height={17} />
              <span className="text-xs font-semibold">noesis</span>
            </div>

            <span className="text-xs text-muted-foreground">
              Your workspace
            </span>
          </div>

          <div className="grid min-h-[400px] md:grid-cols-[220px_1fr]">
            {/* Sidebar */}
            <aside className="hidden border-r border-border bg-muted/30 p-5 md:block">
              <p className="mb-4 text-[10px] uppercase tracking-widest text-muted-foreground">
                Thoughts
              </p>

              {thoughts.map((thought, index) => (
                <div
                  key={thought}
                  className={`mb-1 rounded-md px-3 py-2.5 text-xs transition-colors ${
                    index === 0
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50"
                  }`}
                >
                  {thought}
                </div>
              ))}
            </aside>

            {/* Editor */}
            <div className="flex flex-col justify-center px-8 py-14 sm:px-16">
              <span className="mb-6 text-xs text-muted-foreground">
                November 06, 2026
              </span>

              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
                Beyond Thoughts
              </h2>

              <div className="mt-8 max-w-xl space-y-5 text-sm leading-7 text-muted-foreground">
                <p>
                  Sometimes I wonder whether thinking is simply
                  the process of observing our own thoughts.
                </p>

                <p>
                  What makes an idea meaningful? Is it the question
                  itself, or the journey we take to understand it?
                </p>

                <p>
                  Perhaps the most interesting thoughts are the
                  ones that leave us with more questions.
                </p>
              </div>

              <div className="mt-10 text-xs text-muted-foreground/60">
                Your thoughts, in your own words.
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          A glimpse into a quieter way of thinking.
        </p>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-y border-border bg-muted/30 py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              What makes Noesis
            </p>

            <h2 className="mt-5 text-4xl font-medium tracking-tight sm:text-5xl">
              Less noise.
              <br />
              More thinking.
            </h2>

            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Noesis is built around a simple idea: your thoughts
              deserve a place without distractions.
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="border-t border-border pt-6"
              >
                <div className="mb-10 flex items-center justify-between">
                  <Icon size={21} strokeWidth={1.5} />

                  <span className="text-xs text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-medium">{title}</h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section
        id="philosophy"
        className="px-6 py-32"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            The philosophy
          </p>

          <h2 className="mt-8 text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
            Not everything needs an answer.
            Sometimes, a thought just needs room to grow.
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-muted-foreground">
            Noesis is a place for curiosity, unfinished ideas,
            questions, and reflections. A personal space to
            think without the pressure to be productive.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-6xl rounded-xl bg-primary px-8 py-20 text-center text-primary-foreground sm:py-28">
          <h2 className="text-4xl font-medium tracking-tight sm:text-6xl">
            Start with a thought.
          </h2>

          <p className="mt-5 text-sm text-primary-foreground/70">
            Your next idea might begin here.
          </p>

          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-9 rounded-full px-7"
          >
            <Link href="/app">
              Open Noesis
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground"
          >
            <NoesisDark width={17} height={17} />
            <span className="font-semibold">noesis</span>
          </Link>

          <p>A quiet place for your thoughts.</p>

          <p>© {new Date().getFullYear()} Noesis</p>
        </div>
      </footer>
    </main>
  );
}
