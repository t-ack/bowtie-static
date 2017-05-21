# bowtie-static
Starter for a static Foundation site with Gulp and Webpack

## Usage

Install using yarn or npm.

```
$ yarn install
$ npm install
```

Update the BrowserSync proxy URL in `gulpfile.js` or remove browser-sync from the default task to disable it.

```
$ gulp
```

JS files in `assets/js` will be compiled to `assets/dist/js`.

Non-partial SCSS files in `assets/sass` will be compiled to `assets/dist/css`.
