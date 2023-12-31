const { src, dest, series, parallel, watch, task } = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const header = require('gulp-header');
const shell = require('gulp-shell');
const pkg = require('./package.json');

const sourceBranch = 'main';
const targetBranch = 'gh-pages';
const folderToCopy = 'demo';

/* Copy folder between branches */
const copyFolder = () => {
  return shell.task([
    `git checkout ${targetBranch}`,
    `git checkout ${sourceBranch} -- ${folderToCopy}`,
    `git add ${folderToCopy}`,
    `git commit -m "Copy '${folderToCopy}' folder from ${sourceBranch}"`,
    `git push origin ${targetBranch}`,
    `git checkout ${sourceBranch}`
  ]);
}

/* Set banner for dist files */
const setBanner = () => {
	const banner = [
    '/**',
    ` * Simba Grid`,
    ` * @name        ${pkg.name}`,
    ` * @description ${pkg.description}`,
    ` * @link        ${pkg.homepage}`,
    ` * @author      ${pkg.author.name}, ${pkg.author.web}`,
    ` * @version     v${pkg.version}`,
    ` * @created     Jul 22, 2023`,
    ` * @updated     ${pkg.versionDate}`,
    ` * @copyright   Copyright (C) 2023-${new Date().getFullYear()}, ${pkg.author.name}`,
    ` * @license     ${pkg.license}`,
    ` * @licenseMIT  ${pkg.homepage}/blob/main/LICENSE`,
    ` * @demoExample https://rodgath.github.io/simba-grid/demo/`,  
    ' */',
    ''
  ].join('\n');
  
	return src('./dist/{css,js}/**/*.{js,css}')
  .pipe(header(banner))
  .pipe(dest('./dist'))
}

const compressJs = () => {
  return src('./src/*.js')
        .pipe(dest('./demo/js')) // Send original script file to /demo
        .pipe(dest('./dist/js')) // Send original script file to /dist
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename( { suffix: '.min' } ))
        .pipe(dest('./demo/js'))
        .pipe(dest('./dist/js'))
}

const buildTask = () => {
  return series(compressJs, setBanner)
}

const watchTask = () => {
  watch(['./src/*.js', './demo/*.html'], { events: 'all' }, buildTask())
}


/* Set tasks */
task('copy:demo', copyFolder());
task('set:banner', setBanner)
task('compress:js', compressJs);
task('watch', watchTask);
task('build', buildTask());

exports.default = buildTask();