import React from "react";

type Props = {};

export default function TechStackPerformance(_: Props) {
  return (
    <section className="container-max my-12" aria-label="Tech stack and performance">
      <h2 className="text-xl font-semibold">Tech Stack & Performance</h2>
      <p className="mt-2 text-sm text-muted-foreground">Tools, frameworks and performance highlights.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="badge">Next.js</span>
        <span className="badge">TypeScript</span>
        <span className="badge">Vercel</span>
        <span className="badge">Tailwind</span>
      </div>
    </section>
  );
}
