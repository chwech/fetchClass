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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchClass", function() { return _request__WEBPACK_IMPORTED_MODULE_0__["Fetch"]; });




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fetch", function() { return Fetch; });
var responseType;
(function (responseType) {
    responseType[responseType["json"] = 0] = "json";
    responseType[responseType["arraybuffer"] = 1] = "arraybuffer";
    responseType[responseType["blob"] = 2] = "blob";
    responseType[responseType["document"] = 3] = "document";
    responseType[responseType["text"] = 4] = "text";
    responseType[responseType["stream"] = 5] = "stream";
})(responseType || (responseType = {}));
// 默认配置对象
let defaultConfig = {
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
    let temp = data;
    if (config.transformRequest) {
        for (let fn of config.transformRequest) {
            temp = fn(temp);
        }
    }
    return temp;
}
// 合并配置对象
function mergeConfig(config, instanceDefaults, FetchDefaults) {
    let sendConfig = Object.assign({}, defaultConfig, FetchDefaults, instanceDefaults, config);
    return sendConfig;
}
class Fetch {
    constructor(opts = defaultConfig) {
        // 公有实例属性
        this.defaults = defaultConfig; // 实例的默认配置
        // 实例属性赋值
        this.defaults.baseUrl = opts.baseUrl;
    }
    // protected修饰的属性或方法，可以在类与子类中访问
    // 对外接口 start==========================================================================
    // 静态方法
    // 静态方法this表示的是类，而不是实例
    static request(config = defaultConfig) {
        let sendUrl = config.baseUrl + config.url;
        let init = {
            method: config.method,
        };
        // 查询字符串处理
        let searchParams = new URLSearchParams();
        Object.keys(config.params).forEach(key => searchParams.append(key, config.params[key]));
        sendUrl += '?' + searchParams.toString();
        return fetch(sendUrl, init)
            .then(function (response) {
            if (responseType[config.responseType] === responseType.json) {
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
    }
    static get(url, config = defaultConfig) {
        let sendConfig = mergeConfig(Object.assign({}, config, { url }), undefined, this.defaults);
        return this.request(sendConfig);
    }
    static delete(url, config = defaultConfig) {
        let sendConfig = mergeConfig(Object.assign({}, config, { url, method: 'DELETE' }), undefined, this.defaults);
        return this.request(sendConfig);
    }
    static head(url, config = defaultConfig) {
        let sendConfig = mergeConfig(Object.assign({}, config, { url, method: 'HEAD' }), undefined, this.defaults);
        return this.request(sendConfig);
    }
    static put(url, data, config = defaultConfig) {
        data = transformRequest(config, data); // 转换数据
        let sendConfig = mergeConfig(Object.assign({}, config, { url, method: 'PUT', data }), undefined, this.defaults);
        return this.request(sendConfig);
    }
    static patch(url, data, config = defaultConfig) {
        data = transformRequest(config, data); // 转换数据
        let sendConfig = mergeConfig(Object.assign({}, config, { url, method: 'PATCH', data }), undefined, this.defaults);
        return this.request(sendConfig);
    }
    static post(url, data, config = defaultConfig) {
        data = transformRequest(config, data); // 转换数据
        let sendConfig = mergeConfig(Object.assign({}, config, { url, method: 'POST', data }), undefined, this.defaults);
        return this.request(sendConfig);
    }
    // 实例方法
    request(config = defaultConfig) {
        return Fetch.request(config);
    }
    get(url, config = defaultConfig) {
        let sendConfig = mergeConfig(Object.assign({}, config, { url }), this.defaults, Fetch.defaults);
        return this.request(sendConfig);
    }
    delete(url, config = defaultConfig) {
        let sendConfig = mergeConfig(Object.assign({}, config, { url, method: 'DELETE' }), this.defaults, Fetch.defaults);
        return this.request(sendConfig);
    }
    head(url, config = defaultConfig) {
        let sendConfig = mergeConfig(Object.assign({}, config, { url, method: 'HEAD' }), this.defaults, Fetch.defaults);
        return this.request(sendConfig);
    }
    put(url, data, config = defaultConfig) {
        let sendConfig = mergeConfig(Object.assign({}, config, { url, data, method: 'PUT' }), this.defaults, Fetch.defaults);
        return this.request(sendConfig);
    }
    patch(url, data, config = defaultConfig) {
        let sendConfig = mergeConfig(Object.assign({}, config, { url, data, method: 'PATCH' }), this.defaults, Fetch.defaults);
        return this.request(sendConfig);
    }
    post(url, data, config = defaultConfig) {
        let sendConfig = mergeConfig(Object.assign({}, config, { url, data, method: 'POST' }), this.defaults, Fetch.defaults);
        return this.request(sendConfig);
    }
}
// 静态属性
Fetch.defaults = defaultConfig; // 全局的默认配置


/***/ })
/******/ ]);
});