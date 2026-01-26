import React from "react";

type Props = {};

export default function Footer(_: Props) {
  return (
    <footer className="container-max py-8 text-sm text-muted-foreground">
      <div className="divider" />
      <div className="mt-4 flex items-center justify-between">
        <div>© {new Date().getFullYear()} — Built with care</div>
        <div className="text-muted-foreground">Privacy · Terms</div>
      </div>
    </footer>
  );
}
