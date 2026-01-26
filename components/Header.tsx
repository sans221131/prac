"use client";
import React from "react";

type Props = {};

export default function Header(_: Props) {
  return (
    <header className="nav-glass">
      <div className="container-max flex items-center justify-between py-4">
        <div className="text-lg font-bold">Logo</div>
        <nav className="flex gap-4">
          <a href="#work" className="text-sm">Work</a>
          <a href="#about" className="text-sm">About</a>
          <a href="#contact" className="text-sm">Contact</a>
        </nav>
      </div>
    </header>
  );
}
