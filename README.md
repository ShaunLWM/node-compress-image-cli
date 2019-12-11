# node-compress-images-cli

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

## Installation

```sh
$ npm install -g node-compress-images-cli
```

```sh
$ yarn global add node-compress-images-cli
```

## Quick Start

Compress files from `C:/MyPics/` to `C:/MyPics/compress/`

```bash
$ compress -i C:/MyPics/ -o C:/MyPics/compress/
```

## Note

- Please use forward slashes, _not_ backslashes. Enclose the directory in apostrophe if needed (directory with spacing etc).
- To use additional parameters for the given engines, enclose them in double apostrophe and spaces. Look at example 4 below.

## Command Line Options

```
	Usage:
		$ compress

	Compulsory Arguments
		--input, -i         Input directory (compulsory)
		--output, -o        Output directory (compulsory)

	Optional Arguments
		--force, -f         Force compress already compressed images        (default: true)
		--debug, -d         Print debug message                             (default: true)
		--print, -p         Print stats when done                           (default: true)

		--enginejpg, -ej    Engine for jpeg (use + to join multiple engine) (default: mozjpeg)
		--jpgopts,   -jo    Additional arguments for jpeg engine            (default: "-quality 60")

		--enginepng, -ep    Engine for png (use + to join multiple engine)  (default: pngquant)
		--pngopts,   -po    Additional arguments for png engine             (default: "--quality=20-50"])

		--enginesvg, -es    Engine for svg (use + to join multiple engine)  (default: svgo)
		--svgopts,   -so    Additional arguments for svg engine             (default: "--multipass"])

		--enginegif, -eg    Engine for gif (use + to join multiple engine)  (default: gifsicle)
		--gifopts,   -go    Additional arguments for gif engine             (default: "--colors 64 --use-col=web")

		Engines for JPEG: [jpegtran, mozjpeg, webp, guetzli, jpegRecompress, jpegoptim, tinify]
		Engines for PNG:  [pngquant, optipng, pngout, webp, pngcrush, tinify]
		Engines for SVG:  [svgo]
		Engines for GIF:  [gifsicle, giflossy, gif2webp]

	Examples
		$ compress --input "C:/MyPics/" --output "C:/MyPicsCompressed/"
		# Compress all image in MyPics into MyPicsCompressed

		$ compress --input "C:/MyPics/" --output "C:/MyPicsCompressed/" --force
		# Compress all image in MyPics into MyPicsCompressed and force already compressed images

		$ compress --input "C:/MyPics/" --output "C:/MyPicsCompressed/" --enginegif "gifsicle+giflossy"
		# Compress all image in MyPics into MyPicsCompressed with gif engines of gifsicle and giflossy

		$ compress --input "C:/MyPics/" --output "C:/MyPicsCompressed/" --enginejpg "jpegtran" --jpgopts "-trim -progressive -copy none -optimize"
		# Compress all image in MyPics into MyPicsCompressed with jpg engine of jpegtran and custom options
```

## Related

- [compress-images](https://www.npmjs.com/package/compress-images) - API for this module

## License

[MIT](LICENSE) ShaunLWM 2019

[npm-image]: https://img.shields.io/npm/v/node-compress-images-cli.svg
[npm-url]: https://npmjs.org/package/node-compress-images-cli
[downloads-image]: https://img.shields.io/npm/dm/node-compress-images-cli.svg
[downloads-url]: https://npmjs.org/package/node-compress-images-cli
