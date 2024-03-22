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

/***/ "./JS/assets.js":
/*!**********************!*\
  !*** ./JS/assets.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var bs58__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bs58 */ \"./node_modules/bs58/index.js\");\n/* harmony import */ var bs58__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bs58__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals.js */ \"./JS/globals.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var loadDataButton = document.getElementById('loadDataButton');\n  var transactionsTable = document.getElementById('transactionsTable').querySelector('tbody');\n  loadDataButton.addEventListener('click', function () {\n    // Generar la clave pública utilizando la lógica de generación de claves\n    var publicKey = generatePublicKey();\n\n    // Construir la URL de la solicitud GET con la clave pública\n    var url = \"\".concat(_globals_js__WEBPACK_IMPORTED_MODULE_1__.API_PATH, \"outputs?public_key=\").concat(publicKey);\n    fetch(url, {\n      method: 'GET',\n      headers: {\n        'Accept': 'application/json',\n        'Content-Type': 'application/json'\n      }\n    }).then(function (response) {\n      if (!response.ok) {\n        throw new Error(\"Network response was not ok: \".concat(response.status, \" - \").concat(response.statusText));\n      }\n      return response.json();\n    }).then(function (outputs) {\n      renderTransactions(outputs);\n    })[\"catch\"](function (error) {\n      console.error('Error al obtener transacciones:', error);\n    });\n  });\n  function renderTransactions(outputs) {\n    transactionsTable.innerHTML = ''; // Limpiar la tabla antes de cargar nuevos datos\n    if (outputs.length === 0) {\n      transactionsTable.innerHTML = '<tr><td colspan=\"4\">No hay transacciones disponibles</td></tr>';\n      return;\n    }\n    outputs.forEach(function (output) {\n      var row = document.createElement('tr');\n      row.innerHTML = \"\\n                <td>\".concat(output.transaction_id, \"</td>\\n                <td>\").concat(output.output_index, \"</td>\\n            \");\n      transactionsTable.appendChild(row);\n    });\n  }\n\n  // Función para generar la clave pública utilizando la codificación Base58\n  function generatePublicKey() {\n    // Generar una clave privada aleatoria\n    var privateKey = crypto.getRandomValues(new Uint8Array(32)); // Se utiliza la API de Crypto para generar una clave privada aleatoria\n\n    // Codificar la clave privada en Base58\n    var privateKeyBase58 = bs58__WEBPACK_IMPORTED_MODULE_0___default().encode(privateKey);\n    return privateKeyBase58;\n  }\n});\n\n//# sourceURL=webpack://public_html/./JS/assets.js?");

/***/ }),

/***/ "./JS/globals.js":
/*!***********************!*\
  !*** ./JS/globals.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   API_PATH: () => (/* binding */ API_PATH)\n/* harmony export */ });\nvar API_PATH = 'http://192.168.31.136:9984/api/v1/';\n// export const API_PATH = 'http://192.168.1.13:9984/api/v1/';\n// a64833be2f708c8df98a0d2e23aff220a15620b1bde5c52212dc568e96f15c55\n// e81d084ce2a7c9b83466f0dddb13ab29ff4d1c0f83ab3c02240f692202c0f26d\n\n//# sourceURL=webpack://public_html/./JS/globals.js?");

/***/ }),

/***/ "./node_modules/base-x/src/index.js":
/*!******************************************!*\
  !*** ./node_modules/base-x/src/index.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";
eval("\n// base-x encoding / decoding\n// Copyright (c) 2018 base-x contributors\n// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)\n// Distributed under the MIT software license, see the accompanying\n// file LICENSE or http://www.opensource.org/licenses/mit-license.php.\nfunction base (ALPHABET) {\n  if (ALPHABET.length >= 255) { throw new TypeError('Alphabet too long') }\n  var BASE_MAP = new Uint8Array(256)\n  for (var j = 0; j < BASE_MAP.length; j++) {\n    BASE_MAP[j] = 255\n  }\n  for (var i = 0; i < ALPHABET.length; i++) {\n    var x = ALPHABET.charAt(i)\n    var xc = x.charCodeAt(0)\n    if (BASE_MAP[xc] !== 255) { throw new TypeError(x + ' is ambiguous') }\n    BASE_MAP[xc] = i\n  }\n  var BASE = ALPHABET.length\n  var LEADER = ALPHABET.charAt(0)\n  var FACTOR = Math.log(BASE) / Math.log(256) // log(BASE) / log(256), rounded up\n  var iFACTOR = Math.log(256) / Math.log(BASE) // log(256) / log(BASE), rounded up\n  function encode (source) {\n    if (source instanceof Uint8Array) {\n    } else if (ArrayBuffer.isView(source)) {\n      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength)\n    } else if (Array.isArray(source)) {\n      source = Uint8Array.from(source)\n    }\n    if (!(source instanceof Uint8Array)) { throw new TypeError('Expected Uint8Array') }\n    if (source.length === 0) { return '' }\n        // Skip & count leading zeroes.\n    var zeroes = 0\n    var length = 0\n    var pbegin = 0\n    var pend = source.length\n    while (pbegin !== pend && source[pbegin] === 0) {\n      pbegin++\n      zeroes++\n    }\n        // Allocate enough space in big-endian base58 representation.\n    var size = ((pend - pbegin) * iFACTOR + 1) >>> 0\n    var b58 = new Uint8Array(size)\n        // Process the bytes.\n    while (pbegin !== pend) {\n      var carry = source[pbegin]\n            // Apply \"b58 = b58 * 256 + ch\".\n      var i = 0\n      for (var it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {\n        carry += (256 * b58[it1]) >>> 0\n        b58[it1] = (carry % BASE) >>> 0\n        carry = (carry / BASE) >>> 0\n      }\n      if (carry !== 0) { throw new Error('Non-zero carry') }\n      length = i\n      pbegin++\n    }\n        // Skip leading zeroes in base58 result.\n    var it2 = size - length\n    while (it2 !== size && b58[it2] === 0) {\n      it2++\n    }\n        // Translate the result into a string.\n    var str = LEADER.repeat(zeroes)\n    for (; it2 < size; ++it2) { str += ALPHABET.charAt(b58[it2]) }\n    return str\n  }\n  function decodeUnsafe (source) {\n    if (typeof source !== 'string') { throw new TypeError('Expected String') }\n    if (source.length === 0) { return new Uint8Array() }\n    var psz = 0\n        // Skip and count leading '1's.\n    var zeroes = 0\n    var length = 0\n    while (source[psz] === LEADER) {\n      zeroes++\n      psz++\n    }\n        // Allocate enough space in big-endian base256 representation.\n    var size = (((source.length - psz) * FACTOR) + 1) >>> 0 // log(58) / log(256), rounded up.\n    var b256 = new Uint8Array(size)\n        // Process the characters.\n    while (source[psz]) {\n            // Decode character\n      var carry = BASE_MAP[source.charCodeAt(psz)]\n            // Invalid character\n      if (carry === 255) { return }\n      var i = 0\n      for (var it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {\n        carry += (BASE * b256[it3]) >>> 0\n        b256[it3] = (carry % 256) >>> 0\n        carry = (carry / 256) >>> 0\n      }\n      if (carry !== 0) { throw new Error('Non-zero carry') }\n      length = i\n      psz++\n    }\n        // Skip leading zeroes in b256.\n    var it4 = size - length\n    while (it4 !== size && b256[it4] === 0) {\n      it4++\n    }\n    var vch = new Uint8Array(zeroes + (size - it4))\n    var j = zeroes\n    while (it4 !== size) {\n      vch[j++] = b256[it4++]\n    }\n    return vch\n  }\n  function decode (string) {\n    var buffer = decodeUnsafe(string)\n    if (buffer) { return buffer }\n    throw new Error('Non-base' + BASE + ' character')\n  }\n  return {\n    encode: encode,\n    decodeUnsafe: decodeUnsafe,\n    decode: decode\n  }\n}\nmodule.exports = base\n\n\n//# sourceURL=webpack://public_html/./node_modules/base-x/src/index.js?");

/***/ }),

/***/ "./node_modules/bs58/index.js":
/*!************************************!*\
  !*** ./node_modules/bs58/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const basex = __webpack_require__(/*! base-x */ \"./node_modules/base-x/src/index.js\")\nconst ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'\n\nmodule.exports = basex(ALPHABET)\n\n\n//# sourceURL=webpack://public_html/./node_modules/bs58/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./JS/assets.js");
/******/ 	
/******/ })()
;