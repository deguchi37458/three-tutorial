/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const canvas = document.getElementById('noiseBg');\nif (canvas) {\n  const ctx = canvas.getContext('2d');\n\n  // Canvasのサイズを取得\n  const width = canvas.width;\n  const height = canvas.height;\n\n  // ImageDataオブジェクトを作成\n  const imageData = ctx.createImageData(width, height);\n  const data = imageData.data;\n  function generateNoise() {\n    for (let i = 0; i < data.length; i += 4) {\n      const isWhite = Math.random() > 0.5;\n      const r = isWhite ? 255 : 204;\n      const g = isWhite ? 255 : 204;\n      const b = isWhite ? 255 : 204;\n      data[i] = r;\n      data[i + 1] = g;\n      data[i + 2] = b;\n      data[i + 3] = 100;\n    }\n    ctx.putImageData(imageData, 0, 0);\n    requestAnimationFrame(generateNoise);\n  }\n  generateNoise();\n}\n\n//# sourceURL=webpack://three-shader-env01/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;