"use client";
import React from "react";

type Props = {};

export default function PinnedDoorHero(_: Props) {
  return (
    <header className="pinned-door-hero hero-tint" style={{position: 'sticky', top: 0}}>
      <div className="container-max py-12">
        <div className="card p-6">
          <h1 className="text-2xl font-bold">Pinned Door Hero</h1>
          <p className="mt-2 text-sm text-muted-foreground">End frame background + tint + cursor look placeholder.</p>
        </div>
      </div>
    </header>
  );
}
