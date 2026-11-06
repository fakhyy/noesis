"use client";

import { Markdown } from "@tiptap/markdown";
import { StarterKit } from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";

export function ThoughtPage() {
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: `
    <p>I want to study philosophy, physics, mathematics, and computer science to give new ideas to the world, to want to know that is unknown for me or for the living world. But the situation is different, my family want from me to do something financial.</p>
    <p>But I have a fear If I goes into this, I will start chasing money, and it will throw me far away from my ambitions, from my thoughts, and from my curiosity that gives power to me to do anything. My thoughts give me wings to fly from one corner of the universe of feelings, logic and from imaginations to the realm of reality that I can never achieve in real life.</p>
    <p>The joy of imaginations, thoughts is far beyond the happiness. It like a beautiful flower, may be a beautiful women who gives the music to live. Who gives the power to forgot what surrounds you. </p>
    <p>Thoughts may be thea only thing that have truth. That show truth, that find truth or may be help me to reach closer to truth. I want to continue my journey, I want to know something but don't know what ...</p>`,
  });

  return (
    <div className="h-full">
      <EditorContent
        className="mt-20 [&_div]:h-full [&_div]:outline-none [&_p]:mb-6 max-w-2xl mx-auto h-full text-muted-foreground"
        editor={editor}
        autoFocus
      />
    </div>
  );
}
