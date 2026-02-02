from PIL import Image
import glob
files = sorted(glob.glob('public/intro-upscaled/*.jpg'))
if not files:
    print('No files found in public/intro-upscaled')
    raise SystemExit(0)

for f in files[:20]:
    try:
        with Image.open(f) as im:
            print(f, im.size)
    except Exception as e:
        print(f, 'ERROR', e)
