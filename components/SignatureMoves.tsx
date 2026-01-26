import React from "react";

type Props = {};

export default function SignatureMoves(_: Props) {
  return (
    <section className="container-max my-12" aria-label="Signature moves">
      <h2 className="text-xl font-semibold">Signature Moves</h2>
      <p className="mt-2 text-sm text-muted-foreground">Core capabilities and differentiators.</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        <li className="badge">Design</li>
        <li className="badge">Engineering</li>
        <li className="badge">Product Strategy</li>
        <li className="badge">Performance</li>
      </ul>
    </section>
  );
}
