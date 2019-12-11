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
        jpgopts: {
            type: "string",
            default: "-quality 60",
            alias: "jo"
        },
        enginepng: {
            type: "string",
            alias: "ep",
            default: "pngquant"
        },
        pngopts: {
            type: "string",
            default: "--quality=20-50",
            alias: "po"
        },
        enginesvg: {
            type: "string",
            alias: "es",
            default: "svgo"
        },
        svgopts: {
            type: "string",
            default: "--multipass",
            alias: "so"
        },
        enginegif: {
            type: "string",
            alias: "eg",
            default: "gifsicle"
        },
        gifopts: {
            type: "string",
            default: "--colors 64 --use-col=web",
            alias: "go"
        }
    }
});


let { input, output, print, force, debug, enginejpg, jpgopts, enginepng, pngopts, enginegif, gifopts, enginesvg, svgopts } = cli.flags;
debugMode = debug;
let options = {
    compress_force: force,
    statistic: print,
    autoupdate: false
};

jpgopts = jpgopts.split(" ");
pngopts = pngopts.split(" ");
gifopts = gifopts.split(" ");
svgopts = svgopts.split(" ");

printDebug("Input: " + input, "Output: " + output);
input += "*.{jpg,JPG,jpeg,JPEG,png,svg,gif}";
printDebug(input, output);

new Promise((resolve, reject) => {
    return compress_images(input, output, options, false,
        { jpg: { engine: enginejpg, command: jpgopts } },
        { png: { engine: enginepng, command: pngopts } },
        { svg: { engine: enginesvg, command: svgopts } },
        { gif: { engine: enginegif, command: gifopts } }, error => {
            if (error) { return reject(error) }
            return resolve();
        });
});