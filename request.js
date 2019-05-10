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
// 默认配置对象
var defaultConfig = {
    url: '',
    method: 'GET',
    params: {},
    baseUrl: ''
};
var Fetch = /** @class */ (function () {
    function Fetch(opts) {
        var _newTarget = this.constructor;
        if (opts === void 0) { opts = defaultConfig; }
        // 实例属性赋值
        this.baseUrl = opts.baseUrl;
        if (_newTarget !== void 0) {
            // 构造函数是使用new调用的
        }
        else {
            // 构造函数不是使用new调用的
        }
    }
    Fetch.prototype.request = function (config) {
        if (config === void 0) { config = defaultConfig; }
        var sendUrl = this.baseUrl + config.url;
        var init = {
            method: config.method
        };
        fetch(sendUrl, init)
            .then(function (response) {
            return response.json();
        });
    };
    Fetch.prototype.get = function (url, config) {
        if (config === void 0) { config = defaultConfig; }
        var sendConfig = __assign({}, defaultConfig, config, { url: url });
        this.request(sendConfig);
    };
    Fetch.prototype.post = function () {
    };
    // 静态属性
    Fetch["default"] = defaultConfig; // 全局的默认配置
    return Fetch;
}());
var axios = new Fetch();
// axios.get('/test')
function testNew() {
    var _newTarget = this && this instanceof testNew ? this.constructor : void 0;
    if (_newTarget !== void 0) {
        // 构造函数是使用new调用的
        console.log('new call');
    }
    else {
        // 构造函数不是使用new调用的
        console.log('not new call');
    }
}
testNew();
