import React from "react";

type Props = {};

export default function ProofResultsStrip(_: Props) {
  return (
    <section className="container-max my-12" aria-label="Proof and results">
      <div className="card p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Proven Results</h3>
          <p className="text-sm text-muted-foreground">Key metrics and client outcomes.</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">+120%</div>
          <div className="text-sm text-muted-foreground">Avg. conversion uplift</div>
        </div>
      </div>
    </section>
  );
}
