#!/usr/bin/env node

const meow = require("meow");
const compress_images = require("compress-images");

let debugMode = true;

function printDebug(msg) {
    if (debugMode) console.log(msg);
}

const cli = meow(`
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
        …
`, {
        flags: {
            input: {
                type: "string",
                alias: "i",
            },
            output: {
                type: "string",
                alias: "o",
            },
            force: {
                type: "boolean",
                alias: "f",
                default: true
            },
            print: {
                type: "boolean",
                alias: "p",
                default: true
            },
            debug: {
                type: "boolean",
                alias: "d",
                default: true
            },
            enginejpg: {
                type: "string",
                default: "mozjpeg",
                alias: "ej"
            },
            enginepng: {
                type: "string",
                alias: "ep",
                default: "pngquant"
            },
            enginesvg: {
                type: "string",
                alias: "es",
                default: "svgo"
            },
            enginegif: {
                type: "string",
                alias: "eg",
                default: "gifsicle"
            }
        }
    });


let { input, output, print, force, debug, enginejpg, enginepng, enginegif, enginesvg } = cli.flags;
debugMode = debug;
let options = {
    compress_force: force,
    statistic: print,
    autoupdate: false
};

printDebug("Input: " + input, "Output: " + output);
input += "*.{jpg,JPG,jpeg,JPEG,png,svg,gif}";
printDebug(input, output);

new Promise((resolve, reject) => {
    return compress_images(input, output, options, false,
        { jpg: { engine: enginejpg, command: ["-quality", "60"] } },
        { png: { engine: enginepng, command: ["--quality=20-50"] } },
        { svg: { engine: enginesvg, command: "--multipass" } },
        { gif: { engine: enginegif, command: ["--colors", "64", "--use-col=web"] } }, error => {
            if (error) { return reject(error) };
            return resolve();
        });
});