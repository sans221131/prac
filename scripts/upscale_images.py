#!/usr/bin/env python3
"""
Simple image upscaler using Pillow.

By default this will read images from `public/intro` and write upscaled
copies into `public/intro-upscaled` preserving filenames.

Notes:
- This performs a single-pass upscale using Lanczos resampling. For
  best visual quality consider dedicated super-resolution tools
  (Real-ESRGAN, waifu2x, etc.).
"""
from __future__ import annotations
import argparse
from pathlib import Path
from PIL import Image
import sys


def upscale_image(src: Path, dst: Path, target_long_side: int, quality: int = 96, overwrite: bool = False) -> bool:
    if dst.exists() and not overwrite:
        print(f"Skipping existing: {dst}")
        return False

    im = Image.open(src)
    w, h = im.size

    # Determine scale so the longer side equals target_long_side
    long = max(w, h)
    if long >= target_long_side:
        # If already >= target, keep original size (optionally you could still resample)
        new_w, new_h = w, h
    else:
        scale = target_long_side / float(long)
        new_w = int(round(w * scale))
        new_h = int(round(h * scale))

    # Convert to RGB for JPEG output
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")

    # Perform resize with high-quality Lanczos filter
    if (new_w, new_h) != (w, h):
        im = im.resize((new_w, new_h), Image.LANCZOS)

    # Ensure parent dir
    dst.parent.mkdir(parents=True, exist_ok=True)

    # Save with better defaults to avoid visible JPEG artifacts.
    # If destination looks like JPEG, force RGB and write progressive with no chroma subsampling.
    suffix = dst.suffix.lower()
    if suffix in (".jpg", ".jpeg"):
        if im.mode in ("RGBA", "LA"):
            # Composite alpha onto black to avoid halos when converting to JPEG
            bg = Image.new("RGB", im.size, (0, 0, 0))
            alpha = im.split()[-1]
            bg.paste(im, mask=alpha)
            im_to_save = bg
        else:
            im_to_save = im.convert("RGB")

        im_to_save.save(
            dst,
            format="JPEG",
            quality=quality,
            optimize=True,
            progressive=True,
            subsampling=0,
        )
    else:
        # Preserve non-JPEG formats (PNG for alpha or when user keeps extension)
        im.save(dst, format="PNG", optimize=True)
    print(f"Saved: {dst} ({new_w}x{new_h})")
    return True


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Upscale images to a target long-side size using Pillow")
    p.add_argument("--input-dir", default="public/intro", help="Source folder with frames")
    p.add_argument("--output-dir", default="public/intro-upscaled", help="Destination folder")
    p.add_argument("--pattern", default="ezgif-frame-*.jpg", help="Glob pattern for files")
    p.add_argument("--target-long-side", type=int, default=3840, help="Desired long-side in pixels (e.g. 3840 for 4k)")
    p.add_argument("--quality", type=int, default=92, help="JPEG quality (0-100)")
    p.add_argument("--overwrite", action="store_true", help="Overwrite existing output files")

    args = p.parse_args(argv)

    inp = Path(args.input_dir)
    out = Path(args.output_dir)

    if not inp.exists() or not inp.is_dir():
        print(f"Input directory not found: {inp}")
        return 2

    files = sorted(inp.glob(args.pattern))
    if not files:
        print(f"No files matching {args.pattern} in {inp}")
        return 3

    for f in files:
        # dest keep same name under out
        dst = out / f.name
        try:
            upscale_image(f, dst, args.target_long_side, quality=args.quality, overwrite=args.overwrite)
        except Exception as e:
            print(f"Failed {f}: {e}")

    print("Done")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
