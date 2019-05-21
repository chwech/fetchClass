(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["fetchClass"] = factory();
	else
		root["fetchClass"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// 默认配置对象
var defaultConfig = {
    url: '',
    baseUrl: '',
    method: 'GET',
    params: {},
    responseType: 'json',
    data: {},
    transformRequest: [
        function (data) {
            return data;
        }
    ]
};
function transformRequest(config, data) {
    var temp = data;
    if (config.transformRequest) {
        for (var _i = 0, _a = config.transformRequest; _i < _a.length; _i++) {
            var fn = _a[_i];
            temp = fn(temp);
        }
    }
    return temp;
}
// 合并配置对象
function mergeConfig(config, instanceDefaults, FetchDefaults) {
    var sendConfig = __assign({}, defaultConfig, FetchDefaults, instanceDefaults, config);
    return sendConfig;
}
var Fetch = /** @class */ (function () {
    function Fetch(opts) {
        if (opts === void 0) { opts = defaultConfig; }
        // 公有实例属性
        this.defaults = defaultConfig; // 实例的默认配置
        // 实例属性赋值
        this.defaults.baseUrl = opts.baseUrl;
    }
    // protected修饰的属性或方法，可以在类与子类中访问
    // 对外接口 start==========================================================================
    // 静态方法
    // 静态方法this表示的是类，而不是实例
    Fetch.request = function (config) {
        if (config === void 0) { config = defaultConfig; }
        var sendUrl = config.baseUrl + config.url;
        var init = {
            method: config.method,
        };
        // 查询字符串处理
        var searchParams = new URLSearchParams();
        Object.keys(config.params).forEach(function (key) { return searchParams.append(key, config.params[key]); });
        sendUrl += '?' + searchParams.toString();
        return fetch(sendUrl, init)
            .then(function (response) {
            if (config.responseType === 'json') {
                return response.json().then(function (data) {
                    return {
                        data: data,
                        status: response.status,
                        headers: response.headers,
                        statusText: response.statusText,
                        config: config
                    };
                });
            }
        });
    };
    Fetch.get = function (url, config) {
        if (config === void 0) { config = defaultConfig; }
        var sendConfig = mergeConfig(__assign({}, config, { url: url }), undefined, this.defaults);
        return this.request(sendConfig);
    };
    Fetch["delete"] = function (url, config) {
        if (config === void 0) { config = defaultConfig; }
        var sendConfig = mergeConfig(__assign({}, config, { url: url, method: 'DELETE' }), undefined, this.defaults);
        return this.request(sendConfig);
    };
    Fetch.head = function (url, config) {
        if (config === void 0) { config = defaultConfig; }
        var sendConfig = mergeConfig(__assign({}, config, { url: url, method: 'HEAD' }), undefined, this.defaults);
        return this.request(sendConfig);
    };
    Fetch.put = function (url, data, config) {
        if (config === void 0) { config = defaultConfig; }
        data = transformRequest(config, data); // 转换数据
        var sendConfig = mergeConfig(__assign({}, config, { url: url, method: 'PUT', data: data }), undefined, this.defaults);
        return this.request(sendConfig);
    };
    Fetch.patch = function (url, data, config) {
        if (config === void 0) { config = defaultConfig; }
        data = transformRequest(config, data); // 转换数据
        var sendConfig = mergeConfig(__assign({}, config, { url: url, method: 'PATCH', data: data }), undefined, this.defaults);
        return this.request(sendConfig);
    };
    Fetch.post = function (url, data, config) {
        if (config === void 0) { config = defaultConfig; }
        data = transformRequest(config, data); // 转换数据
        var sendConfig = mergeConfig(__assign({}, config, { url: url, method: 'POST', data: data }), undefined, this.defaults);
        return this.request(sendConfig);
    };
    // 实例方法
    Fetch.prototype.request = function (config) {
        if (config === void 0) { config = defaultConfig; }
        return Fetch.request(config);
    };
    Fetch.prototype.get = function (url, config) {
        if (config === void 0) { config = defaultConfig; }
        var sendConfig = mergeConfig(__assign({}, config, { url: url }), this.defaults, Fetch.defaults);
        return this.request(sendConfig);
    };
    Fetch.prototype["delete"] = function (url, config) {
        if (config === void 0) { config = defaultConfig; }
        var sendConfig = mergeConfig(__assign({}, config, { url: url, method: 'DELETE' }), this.defaults, Fetch.defaults);
        return this.request(sendConfig);
    };
    Fetch.prototype.head = function (url, config) {
        if (config === void 0) { config = defaultConfig; }
        var sendConfig = mergeConfig(__assign({}, config, { url: url, method: 'HEAD' }), this.defaults, Fetch.defaults);
        return this.request(sendConfig);
    };
    Fetch.prototype.put = function (url, data, config) {
        if (config === void 0) { config = defaultConfig; }
        var sendConfig = mergeConfig(__assign({}, config, { url: url, data: data, method: 'PUT' }), this.defaults, Fetch.defaults);
        return this.request(sendConfig);
    };
    Fetch.prototype.patch = function (url, data, config) {
        if (config === void 0) { config = defaultConfig; }
        var sendConfig = mergeConfig(__assign({}, config, { url: url, data: data, method: 'PATCH' }), this.defaults, Fetch.defaults);
        return this.request(sendConfig);
    };
    Fetch.prototype.post = function (url, data, config) {
        if (config === void 0) { config = defaultConfig; }
        var sendConfig = mergeConfig(__assign({}, config, { url: url, data: data, method: 'POST' }), this.defaults, Fetch.defaults);
        return this.request(sendConfig);
    };
    // 静态属性
    Fetch.defaults = defaultConfig; // 全局的默认配置
    return Fetch;
}());
var axios = new Fetch();
axios.get('/test', {
    params: {
        a: 1,
        b: 2
    }
}).then(function (res) {
    console.log(res);
});
exports["default"] = Fetch;


/***/ })
/******/ ]);
});