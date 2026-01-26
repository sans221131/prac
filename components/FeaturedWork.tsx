import React from "react";

type Props = {};

export default function FeaturedWork(_: Props) {
  return (
    <section className="container-max my-12" aria-label="Featured work">
      <h2 className="text-xl font-semibold">Featured Work</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card p-4">Project 1</div>
        <div className="card p-4">Project 2</div>
        <div className="card p-4">Project 3</div>
      </div>
    </section>
  );
}
