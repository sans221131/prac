import React from "react";

type Props = {};

export default function ProcessTimeline(_: Props) {
  return (
    <section className="container-max my-12" aria-label="Process timeline">
      <h2 className="text-xl font-semibold">Process</h2>
      <ol className="mt-4 list-decimal pl-6 text-sm text-muted-foreground">
        <li>Discover</li>
        <li>Design</li>
        <li>Deliver</li>
        <li>Iterate</li>
      </ol>
    </section>
  );
}
