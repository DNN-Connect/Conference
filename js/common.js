var Common =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Common.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Common.ts":
/*!*******************!*\
  !*** ./Common.ts ***!
  \*******************/
/*! exports provided: showLoading, hideLoading, showError, isInt, validateForm, getTableOrder, minutesToTime, moveObject, pad, getPastel, sort_by, colStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"showLoading\", function() { return showLoading; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hideLoading\", function() { return hideLoading; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"showError\", function() { return showError; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isInt\", function() { return isInt; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validateForm\", function() { return validateForm; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getTableOrder\", function() { return getTableOrder; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"minutesToTime\", function() { return minutesToTime; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveObject\", function() { return moveObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pad\", function() { return pad; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPastel\", function() { return getPastel; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sort_by\", function() { return sort_by; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colStyle\", function() { return colStyle; });\n// Common functions for the module\nfunction showLoading() {\n  if ($(\"#serviceStatus\").length) {\n    $(\"#serviceStatus div:first-child\").show();\n    $(\"#serviceStatus div:nth-child(2)\").hide();\n    $(\"#serviceStatus\").css(\"background\", \"#2FC1F3\").show();\n  }\n}\nfunction hideLoading() {\n  if ($(\"#serviceStatus\").length) {\n    $(\"#serviceStatus\").hide();\n  }\n}\nfunction showError(message) {\n  if ($(\"#serviceStatus\").length) {\n    $(\"#serviceStatus div:first-child\").hide();\n    $(\"#serviceStatus div:nth-child(2)\").html(message).show();\n    $(\"#serviceStatus\").css(\"background\", \"#F33B2F\").show();\n    setTimeout(function () {\n      $(\"#serviceStatus\").hide();\n    }, 3000);\n  }\n}\nfunction isInt(value) {\n  return !isNaN(value) && parseInt(Number(value).toString()) == value && !isNaN(parseInt(value, 10));\n}\nfunction validateForm(form, submitButton, formErrorDiv) {\n  submitButton.click(function () {\n    var hasErrors = false;\n    formErrorDiv.empty().hide();\n    form.find('input[data-validator=\"integer\"]').each(function (i, el) {\n      if (!isInt($(el).val()) && $(el).val() != \"\") {\n        hasErrors = true;\n        $(el).parent().addClass(\"error\");\n        formErrorDiv.append(\"<span>\" + $(el).attr(\"data-message\") + \"</span><br />\").show();\n      }\n    });\n    form.find('input[data-required=\"true\"]').each(function (i, el) {\n      if ($(el).val() == \"\") {\n        hasErrors = true;\n        $(el).parent().addClass(\"error\");\n        formErrorDiv.append(\"<span>\" + $(el).attr(\"data-message\") + \"</span><br />\").show();\n      }\n    });\n    return !hasErrors;\n  });\n}\nfunction getTableOrder(tableId) {\n  var res = [];\n  $(\"#\" + tableId + \" tbody:first tr\").each(function (i, el) {\n    res.push({\n      id: $(el).data(\"id\"),\n      order: i\n    });\n  });\n  return res;\n}\nfunction minutesToTime(mins) {\n  var hr = Math.floor(mins / 60);\n  var mn = mins - 60 * hr;\n  var res = mn.toString();\n\n  if (res.length == 1) {\n    res = \"0\" + res;\n  }\n\n  res = hr.toString() + \":\" + res;\n  return res;\n}\nfunction moveObject(object, dx, dy) {\n  var x = (parseFloat(object.getAttribute(\"data-x\") || \"0\") || 0) + dx,\n      y = (parseFloat(object.getAttribute(\"data-y\") || \"0\") || 0) + dy;\n  object.style.webkitTransform = object.style.transform = \"translate(\" + x + \"px, \" + y + \"px)\";\n  object.setAttribute(\"data-x\", x.toString());\n  object.setAttribute(\"data-y\", y.toString());\n}\n\nif (!String.prototype.startsWith) {\n  String.prototype.startsWith = function (searchString, position) {\n    position = position || 0;\n    return this.indexOf(searchString, position) === position;\n  };\n}\n\nfunction pad(number) {\n  if (number < 10) {\n    return \"0\" + number;\n  }\n\n  return number.toString();\n}\nfunction getPastel() {\n  var red = Math.floor(Math.random() * 256);\n  var green = Math.floor(Math.random() * 256);\n  var blue = Math.floor(Math.random() * 256);\n  red = Math.floor((red + 255) / 2);\n  green = Math.floor((green + 255) / 2);\n  blue = Math.floor((blue + 255) / 2);\n  red = Math.floor((red + 255) / 2);\n  green = Math.floor((green + 255) / 2);\n  blue = Math.floor((blue + 255) / 2);\n  var res = (\"00\" + red.toString(16)).substr(-2);\n  res += (\"00\" + green.toString(16)).substr(-2);\n  res += (\"00\" + blue.toString(16)).substr(-2);\n  return res;\n}\nfunction sort_by(field, reverse, primer) {\n  var key = primer ? function (x) {\n    return primer(x[field]);\n  } : function (x) {\n    return x[field];\n  };\n  var reverseInt = !reverse ? 1 : -1;\n  return function (a, b) {\n    return a = key(a), b = key(b), reverseInt * ((a > b ? 1 : 0) - (b > a ? 1 : 0));\n  };\n}\n;\nfunction colStyle(width, right) {\n  if (right) {\n    return {\n      width: width.toString() + \"px\",\n      textAlign: \"right\"\n    };\n  } else {\n    return {\n      width: width.toString() + \"px\"\n    };\n  }\n}\n;\n\nif (!Date.prototype.toUTCDateTimeDigits) {\n  (function () {\n    Date.prototype.toUTCDateTimeDigits = function () {\n      return this.getUTCFullYear() + \"-\" + pad(this.getUTCMonth() + 1) + \"-\" + pad(this.getUTCDate()) + \"T\" + pad(this.getUTCHours()) + \":\" + pad(this.getUTCMinutes()) + \":\" + pad(this.getUTCSeconds()) + \"Z\";\n    };\n  })();\n}\n\nDate.prototype.addDays = function (days) {\n  var dat = new Date(this.valueOf());\n  dat.setDate(dat.getDate() + days);\n  return dat;\n};\n\n$(document).ready(function () {\n  var el = $(\".ModConnectConferenceC .container\");\n\n  if (el != undefined) {\n    if (el.parent().closest(\".container\").length == 1) {\n      el.removeClass(\"container\");\n    }\n  }\n});\n\n//# sourceURL=webpack://Common/./Common.ts?");

/***/ })

/******/ });