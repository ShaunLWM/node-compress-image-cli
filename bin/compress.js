#!/usr/bin/env node

const program = require('commander');
const compress_images = require('compress-images');

const VERSION = require('../package').version;

program
    .name('compress')
    .version(VERSION, '    --version')
    .option('-i, --input [input-dir]', 'Input directory [input-dir]', null)
    .option('-o, --output [output-dir]', 'Output directory [output-dir]', null)
    .option('-f, --force [true/false]', 'Force compress already compressed images', true)
    .option('-p, --print [true/false]', 'Print stats when done', true)
    .option('-ej, --enginejpg [jpegtran,mozjpeg,webp,guetzli,jpegRecompress,jpegoptim,tinify,imagemagick]', 'Engine for jpeg (use + to join multiple engine)', 'mozjpeg')
    .option('-ep, --enginepng [pngquant,optipng,pngout,webp,pngcrush,tinify,imagemagick]', 'Engine for png (use + to join multiple engine)', 'pngquant')
    .option('-es, --enginesvg [svgo,imagemagick]', 'Engine for svg (use + to join multiple engine)', 'svgo')
    .option('-eg, --enginegif [gifsicle,giflossy,gif2webp,imagemagick]', 'Engine for gif (use + to join multiple engine)', 'gifsicle')
    .parse(process.argv);

if (process.argv.length < 4) {
    return console.log('[-] 1Missing argument!\n[+] Usage: compress -i [input-directory] -o [output-directory]');
}

let input = program.input;
let output = program.output;
console.log("Input: " + input, "Output: " + output);
if (input === null || output === null) {
    return console.log('[-] 2Missing argument!\n[+] Usage: compress -i [input-directory] -o [output-directory]');
}


let force = program.force;
let print = program.print;
let jpeg = program.enginejpg;
let png = program.enginepng;
let svg = program.enginesvg;
let gif = program.enginegif;
let options = {
    compress_force: force,
    statistic: print,
    autoupdate: false
};

input += "*.{jpg,JPG,jpeg,JPEG,png,svg,gif}";
console.log(input, output);
new Promise((resolve, reject) => {
    return compress_images(input, output, options, false,
        { jpg: { engine: jpeg, command: ['-quality', '60'] } },
        { png: { engine: png, command: ['--quality=20-50'] } },
        { svg: { engine: svg, command: '--multipass' } },
        { gif: { engine: gif, command: ['--colors', '64', '--use-col=web'] } }, error => {
            if (error) { return reject(error) };
            return resolve();
        });
});