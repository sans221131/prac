# Image upscale script

Usage:

Install dependencies (use a virtualenv if you like):

```bash
python -m pip install -r scripts/requirements.txt
```

Run the script (default target 3840 long-side -> ~4K):

```bash
python scripts/upscale_images.py --input-dir public/intro --output-dir public/intro-upscaled --target-long-side 3840
```

Options:
- `--overwrite` : overwrite existing files in output dir
- `--quality N` : JPEG quality (0-100)
- `--pattern` : glob pattern (default `ezgif-frame-*.jpg`)

Notes:
- This performs a simple Lanczos upscale. For best results use a neural super-resolution tool.
