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

        --version           output the version number
    -i, --input             input directory
    -o, --output            output directory
    -f, --force             Force compress compressed images
    -p, --print             Print stats when done
    -ej, --enginejpg        Type of engine to use for jpeg compression [jpegtran,mozjpeg,webp,guetzli,jpegRecompress,jpegoptim,tinify,imagemagick] (Use multiple with "+")
    -ep, --enginepng        Type of engine to use for png compression [pngquant,optipng,pngout,webp,pngcrush,tinify,imagemagick] (Use multiple with "+")
    -es, --enginesvg        Type of engine to use for svg compression [svgo,imagemagick] (Use multiple with "+")
    -eg, --enginegif        Type of engine to use for gif compression [gifsicle,giflossy,gif2webp,imagemagick] (Use multiple with "+")

## Related

- [compress-images](https://www.npmjs.com/package/compress-images) - API for this module

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/node-compress-images-cli.svg
[npm-url]: https://npmjs.org/package/node-compress-images-cli
[downloads-image]: https://img.shields.io/npm/dm/node-compress-images-cli.svg
[downloads-url]: https://npmjs.org/package/node-compress-images-cli
