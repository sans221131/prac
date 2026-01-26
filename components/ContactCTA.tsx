"use client";
import React from "react";

type Props = {};

export default function ContactCTA(_: Props) {
  return (
    <section className="container-max my-12" aria-label="Contact">
      <div className="card p-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Get in touch</h3>
          <p className="text-sm text-muted-foreground">Interested in working together? Let’s talk.</p>
        </div>
        <button className="btn-primary">Contact</button>
      </div>
    </section>
  );
}
