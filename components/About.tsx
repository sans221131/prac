import React from "react";

type Props = {};

export default function About(_: Props) {
  return (
    <section className="container-max my-12" aria-label="About">
      <h2 className="text-xl font-semibold">About</h2>
      <p className="mt-2 text-sm text-muted-foreground">Brief about section describing mission and approach.</p>
    </section>
  );
}
