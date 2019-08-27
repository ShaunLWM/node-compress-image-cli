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

Compress files from ```C:/Users/Administrator/Desktop/1/``` to ```C:/Users/Administrator/Desktop/1/compress/```

```bash
$ compress -i C:/Users/Administrator/Desktop/1/ -o C:/Users/Administrator/Desktop/1/compress/
```

Note: Please use forward slashes, *not* backslashes. Enclose the directory in apostrophe if needed (directory with spacing etc).

## Command Line Options
```
	Usage:
        $ compress
    Options
        --input, -i         Input directory (compulsory)
        --output, -o        Output directory (compulsory)
        --force, -f         Force compress already compressed images (default: true)
        --debug, -d         Print debug message (default: true)
        --print, -p         Print stats when done (default: true)
        --enginejpg, -ej    Engine for jpeg (use + to join multiple engine) (default: mozjpeg)
        --enginepng, -ep    Engine for png (use + to join multiple engine) (default: pngquant)
        --enginesvg, -es    Engine for svg (use + to join multiple engine) (default: svgo)
        --enginegif, -eg    Engine for gif (use + to join multiple engine) (default: gifsicle)

        Engines for JPEG: [jpegtran,mozjpeg,webp,guetzli,jpegRecompress,jpegoptim,tinify,imagemagick]
        Engines for PNG:  [pngquant,optipng,pngout,webp,pngcrush,tinify,imagemagick]
        Engines for SVG:  [svgo,imagemagick]
        Engines for GIF:  [gifsicle,giflossy,gif2webp,imagemagick]

	Examples
        $ compress --input "C:/MyPics/" --output "C:/MyPicsCompressed/"
        # Compress all image in MyPics into MyPicsCompressed

        $ compress --input "C:/MyPics/" --output "C:/MyPicsCompressed/" --force
        # Compress all image in MyPics into MyPicsCompressed and force already compressed images

        $ compress --input "C:/MyPics/" --output "C:/MyPicsCompressed/" -enginegif "gifsicle+giflossy"
        # Compress all image in MyPics into MyPicsCompressed with gif engines of gifsicle and giflossy
```
## Related

- [compress-images](https://www.npmjs.com/package/compress-images) - API for this module

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/node-compress-images-cli.svg
[npm-url]: https://npmjs.org/package/node-compress-images-cli
[downloads-image]: https://img.shields.io/npm/dm/node-compress-images-cli.svg
[downloads-url]: https://npmjs.org/package/node-compress-images-cli
