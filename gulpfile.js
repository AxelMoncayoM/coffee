const { src, dest, watch, series } = require("gulp");
//CSS y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");
// Imagenes
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(done) {
  //compilar sass

  //pasos:  1- identificar archivo, 2- compilarlo, 3- guardar el archivo .css

  // prettier-ignore
  src("src/scss/app.scss") //1- identificar archivo
    .pipe(sourcemaps.init())
    .pipe(sass()) //2- compilar archivo
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css")); //3- guardar archivo

  done();
}

function imagenes(done) {
  //prettier-ignore
  src('src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest('build/img'))

  done();
}

function imageWebp(done) {
  //prettier-ignore
  src("src/img/**/*.{png,jpg}")
    .pipe(webp())
    .pipe(dest('build/img'))

  done();
}

function imageAvif(done) {
  //prettier-ignore
  src('src/img/**/*.{png,jpg}')
    .pipe(avif())
    .pipe(dest('build/img'))

  done();
}

//Compilar el archivo scss continuamente para evitar ejecutarlo cada que se modifica
function dev(done) {
  //2 parametros, el archivo que se modifica y la funcion que lo compila
  watch("src/scss/**/*.scss", css); //los * indican todas las carpetas y todos los archivos .scss
  //watch("src/scss/app.scss", css);
  watch("src/img/**/*", imagenes);
  done();
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.imageWebp = imageWebp;
exports.imageAvif = imageAvif;
exports.default = series(imagenes, imageWebp, imageAvif, css, dev);
