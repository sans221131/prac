You are implementing a portfolio website UI theme called “Obsidian Door” (cinematic noir-tech) that must match a dark, moody door hero background.

Requirements:
- Use Tailwind + global CSS variables from globals.css.
- Apply consistent styling across ALL components: Navbar, buttons, links, inputs, cards, badges, sections, headings, footers.
- Use the provided component classes: .btn, .btn-primary, .btn-secondary, .btn-ghost, .input, .textarea, .card, .badge, .nav-glass, .divider, .hero-tint.
- Primary accent is Ion Blue (#00D1FF). All CTAs use .btn-primary with subtle glow; secondary CTAs use .btn-secondary; tertiary uses .btn-ghost.
- Inputs use dark surface (#11111A) with white/10 border and Ion Blue focus ring.
- Cards are glass-ish: bg white/0.04, border white/10, backdrop blur, soft shadow; hover slightly lifts and border brightens.
- Typography: headings should be high-contrast, tight leading, and look premium. Body text is muted white/70.
- Accessibility: all interactive elements must have visible focus states (keyboard), good contrast, and no “invisible” hover-only affordances.
- Hero: keep the door image as background. Add overlay tint using .hero-tint; place headline/subtext/CTAs on top; ensure readability.
- Do NOT introduce random new colors. Only use theme tokens and subtle white/opacity variations.

Deliverables:
1) Refactor existing components to use these classes.
2) Ensure consistent spacing/radius (14px buttons/inputs, 2xl cards).
3) Provide a small Button component wrapper if needed that maps variants to these classes.
