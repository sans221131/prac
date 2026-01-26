import React from "react";

type Props = {};

export default function ScrollIntro(_: Props) {
  return (
    <section className="scroll-intro container-max" aria-label="Scroll intro">
      <div className="card p-6">
        <h2 className="text-xl font-semibold">Scroll Intro (Frame Sequence)</h2>
        <p className="mt-2 text-sm text-muted-foreground">Frame scrub / intro animation placeholder.</p>
      </div>
    </section>
  );
}
