<div id="top"></div>

# Simba Grid

Infinite grid scroll.

## [View Online Demo](https://rodgath.github.io/simba-grid/demo/)

<br>

[![NPM Version](https://img.shields.io/npm/v/simba-grid.svg?color=00BAB8)]()
[![NPM License](https://img.shields.io/npm/l/all-contributors.svg?color=00a7a6)](https://github.com/Rodgath/simba-grid/blob/master/LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dw/simba-grid.svg?color=009593)]() 
![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/simba-grid/latest?color=008281)

![GitHub issues](https://img.shields.io/github/issues-raw/Rodgath/simba-grid?color=37bf4c)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/Rodgath/simba-grid.svg?color=32ac44)]()
[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?color=278635)](http://makeapullrequest.com) 

# Table of Contents

- [Installation](#installation)
- [Implementation](#implementation)
  - [Method 1](#method-1)
  - [Method 2](#method-2)
  - [Method 3](#method-3)
- [Options](#options)
- [License](#license)

# Installation

**[A]** Download 

+ [simba-grid.min.js](https://unpkg.com/simba-grid@latest/dist/js/simba-grid.min.js) - Minified
+ [simba-grid.js](https://unpkg.com/simba-grid@latest/dist/js/simba-grid.min.js) - Unminified

**[B]** Package

+ Install with [npm](https://www.npmjs.com/package/simba-grid): `npm install simba-grid` 
* Install with [yarn](https://yarnpkg.com/): `yarn add simba-grid`

* [![NPM](https://nodei.co/npm/simba-grid.png?downloads=true)](https://www.npmjs.com/package/simba-grid)

**[C]** Get a local working copy of the development repository _(Optional)_ <br />
`git clone https://github.com/Rodgath/simba-grid.git`


# Implementation
There are several methods you can use to add Simba Grid into your project.

## Method 1

#### Initializing with `simbaGrid` function. [View Demo](https://rodgath.github.io/simba-grid/demo/index.html)
Your HTML code with images
```html
<div class="my-simba-grid">
  <img src="./images/01.jpg" alt="Image 01">
  <img src="./images/02.jpg" alt="Image 02">

  <!-- More Images Here -->
  
  <img src="./images/20.jpg" alt="Image 20">
  <img src="./images/21.jpg" alt="Image 21">
</div>
```

#### Call the `simbaGrid()` function with two arguments.
...**1)** The element _'class'_ or _'id'_ holding the images 

...**2)** The _'options'_ object
```javascript
document.addEventListener('DOMContentLoaded', function () {
  simbaGrid('.my-simba-grid', {
    animationStyle : 'rotate'
  });
});
```

#### Enqueue the simbaGrid script at the bottom of your markup
+ Using local script file.
```html
<script src="simba-grid.min.js"></script>
<!-- OR -->
<script src="./node_modules/simba-grid/dist/js/simba-grid.min.js"></script>
```
+ Using CDN file. _(Optional)_
```html
<script src="https://cdn.jsdelivr.net/npm/simba-grid@latest/dist/js/simba-grid.min.js"></script>
```

##### <div align="right"><a href="#top">&uarr; TOP &uarr;</a></div>

---
## Method 2

#### Using `data-simba-grid` attribute. [View Demo](https://rodgath.github.io/simba-grid/demo/index3.html)
Your HTML code with images
```html
<div data-simba-grid='{ "animationStyle": "zoomRotate", "cols": "4" }'>
  <img src="./images/01.jpg" alt="Image 01">
  <img src="./images/02.jpg" alt="Image 02">

  <!-- More Images Here -->
  
  <img src="./images/20.jpg" alt="Image 20">
  <img src="./images/21.jpg" alt="Image 21">
</div>
```

#### Enqueue the simbaGrid script at the bottom of your markup
+ Using local script file.
```html
<script src="simba-grid.min.js"></script>
<!-- OR -->
<script src="./node_modules/simba-grid/dist/js/simba-grid.min.js"></script>
```
+ Using CDN file. _(Optional)_
```html
<script src="https://cdn.jsdelivr.net/npm/simba-grid@latest/dist/js/simba-grid.min.js"></script>
```

##### <div align="right"><a href="#top">&uarr; TOP &uarr;</a></div>

---
## Method 3

#### Using JSON object of images
...**[A]** - Adding the JSON object inside the `data-simba-grid` attribute. [View Demo](https://rodgath.github.io/simba-grid/demo/index4.html)

```html
<div data-simba-grid='{ "animationStyle": "zoom", 
    "cols": "4", 
    "rows": "4", 
    "gap": "4", 
    "rowHeight": "150", 
    "images": [
      { "src": "./images/01.jpg", "title": "Image 01" },
      { "src": "./images/02.jpg", "title": "Image 02" },
      
      // More Images Here

      { "src": "./images/20.jpg", "title": "Image 20" },
      { "src": "./images/21.jpg", "title": "Image 21" }
    ]
  }'></div>
```

...**[B]** - Add the JSON object inside the `simbaGrid` function. [View Demo](https://rodgath.github.io/simba-grid/demo/index5.html)

HTML code.
```html
<div class="image-rotation-box image-spin-demo"></div>
```
JavaScript code

```javascript
document.addEventListener('DOMContentLoaded', function() {
   simbaGrid('.image-rotation-box', {
        animationStyle: 'zoom', 
        width: 1300, 
        cols: 6, 
        rows: 4, 
        gap: 10, 
        rowHeight: 200, 
        images: [
          { "src": "./images/01.jpg", "title": "Image 01" },
          { "src": "./images/02.jpg", "title": "Image 02" },
        
        // More Images Here

          { "src": "./images/20.jpg", "title": "Image 20" },
          { "src": "./images/21.jpg", "title": "Image 21" }
        ]
    });
});
```
##### <div align="right"><a href="#top">&uarr; TOP &uarr;</a></div>

---
# Options 

Name | Type | Default | Description
:--- | :--- | :------ | :----------
`width` | _number_ | **1200** | Width of each grid group.
`cols` | _number_ | **3** | Grid columns for each grid group.
`rows` | _number_ | **3** | Grid rows for each grid group.
`rowHeight` | _number_ | **280** | Grid row height.
`gap` | _number_ | **0** | Space between grid items.
`scrollSpeed` | _number_ | **1** | Grid scrolling speed. Min is `1`.
`scrollDirection` | _string_ | **'left'** | Scroll direction. <br> Possible values: `'left'` or `'right'`.
`pauseOnHover` | _boolean_ | **true** | Whether to pause scrolling movement when grid is hovered on.
`shuffle` | _boolean_ | **false** | Whether to shuffle grid items when grid is loaded.
`animationStyle` | _string_ | **'zoom'** | Grid items entry animations. <br> Possible values: `'zoom'`, `'rotate'`, `'zoomRotate'`

## License
simbaGrid is an open-source project released under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

---

Crafted by [Rodgath](https://twitter.com/Rodgath)
##### <div align="right"><a href="#top">&uarr; TOP &uarr;</a></div>