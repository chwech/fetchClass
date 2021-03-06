// ts使用'接口'定义对象的类型
// 约定接口名字一般是首字母大写，有些语言建议有前面加I前缀
// TODO: 待求证，纯对象的定义 plain object（纯对象）：是指 JSON 形式定义的普通对象或者 new Object() 创建的简单对象；
// TODO:无格式对象(plain object)是这样定义吗？待求证
interface PlainObject {
  [propName: string]: any;
}
// 类型别名, 这样就可以很方便使用和复用啦， 联合类型比较常用
type data = PlainObject | URLSearchParams | string | ArrayBuffer | ArrayBufferView | FormData | File | Blob;
enum responseType {
  json,
  arraybuffer,
  blob,
  document,
  text,
  stream
}
interface Config {
  url?: string;
  baseUrl?: string;
  method?: string; // 名字后加问号表示可选属性
  params?: PlainObject | URLSearchParams; // params是一个无格式对象(plain object)或 URLSearchParams 对象
  responseType?: string; // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  data?: data;
  transformRequest?: Array<Function>;
}
// 响应结构
interface ResponseObject {
  data: any;
  status: number;
  statusText: string;
  headers: Object;
  config: Config;
}
// 默认配置对象
let defaultConfig: Config = {
  url: '',
  baseUrl: '',
  method: 'GET',
  params: {},
  responseType: 'json',
  data: {},
  transformRequest: [
    function (data) {
      return data
    }
  ]
}
function transformRequest (config: Config, data: data): data {
  let temp: data = data
  if (config.transformRequest) {
    for (let fn of config.transformRequest) {
      temp = fn(temp)
    }
  }
  return temp
}
// 合并配置对象
function mergeConfig(config: Config, instanceDefaults?: Config, FetchDefaults?: Config): Config {
  let sendConfig: Config = {
    ...defaultConfig,
    ...FetchDefaults,
    ...instanceDefaults,
    ...config
  }
  return sendConfig
}

export class Fetch {
  // 公有实例属性
  public defaults: Config = defaultConfig; // 实例的默认配置
  // 静态属性
  static defaults: Config = defaultConfig; // 全局的默认配置

  constructor (opts: Config = defaultConfig) {
    // 实例属性赋值
    this.defaults.baseUrl = opts.baseUrl
  }
  // protected修饰的属性或方法，可以在类与子类中访问
 
  // 对外接口 start==========================================================================
  // 静态方法
  // 静态方法this表示的是类，而不是实例
  public static request (config: Config = defaultConfig): Promise<ResponseObject> {
    let sendUrl: string = config.baseUrl + config.url
    let init = {
      method: config.method,
      // body: config.data
    }
    // 查询字符串处理
    let searchParams = new URLSearchParams()
    Object.keys(config.params).forEach(key => searchParams.append(key, config.params[key]))
    sendUrl += '?' + searchParams.toString()
    return fetch(sendUrl, init)
      .then(function(response) {
        if (responseType[config.responseType] === responseType.json) {
          return response.json().then(function (data) {
            return {
              data: data,
              status: response.status,
              headers: response.headers,
              statusText: response.statusText,
              config: config
            }
          })
        }
      })
  }
  public static get (url: string, config: Config = defaultConfig): Promise<ResponseObject> {
    let sendConfig: Config = mergeConfig({ ...config, url }, undefined, this.defaults)
    return this.request(sendConfig)
  }
  public static delete (url: string, config: Config = defaultConfig): Promise<ResponseObject> {
    let sendConfig: Config = mergeConfig({ ...config, url, method: 'DELETE' }, undefined, this.defaults)
    return this.request(sendConfig)
  }
  public static head (url: string, config: Config = defaultConfig): Promise<ResponseObject> {
    let sendConfig: Config = mergeConfig({ ...config, url, method: 'HEAD' }, undefined, this.defaults)
    return this.request(sendConfig)
  }
  public static put (url: string, data: data, config: Config = defaultConfig): Promise<ResponseObject> {
    data = transformRequest(config, data) // 转换数据
    let sendConfig: Config = mergeConfig({ ...config, url, method: 'PUT', data }, undefined, this.defaults)
    return this.request(sendConfig)
  }
  public static patch (url: string, data: data, config: Config = defaultConfig): Promise<ResponseObject> {
    data = transformRequest(config, data) // 转换数据
    let sendConfig: Config = mergeConfig({ ...config, url, method: 'PATCH', data }, undefined, this.defaults)
    return this.request(sendConfig)
  }
  public static post (url: string, data: data, config: Config = defaultConfig): Promise<ResponseObject> {
    data = transformRequest(config, data) // 转换数据
    let sendConfig: Config = mergeConfig({ ...config, url, method: 'POST', data }, undefined, this.defaults)
    return this.request(sendConfig)
  }
  // 实例方法
  public request (config: Config = defaultConfig): Promise<ResponseObject> {
    return Fetch.request(config)
  }
  public get (url: string, config: Config = defaultConfig): Promise<ResponseObject> {
    let sendConfig: Config = mergeConfig({ ...config, url }, this.defaults, Fetch.defaults)
    return this.request(sendConfig)
  }
  public delete (url: string, config: Config = defaultConfig): Promise<ResponseObject> {
    let sendConfig: Config = mergeConfig({ ...config, url, method: 'DELETE' }, this.defaults, Fetch.defaults)
    return this.request(sendConfig)
  }
  public head (url: string, config: Config = defaultConfig): Promise<ResponseObject> {
    let sendConfig: Config = mergeConfig({ ...config, url, method: 'HEAD' }, this.defaults, Fetch.defaults)
    return this.request(sendConfig)    
  }
  public put (url: string, data: data, config: Config = defaultConfig): Promise<ResponseObject> {
    let sendConfig: Config = mergeConfig({ ...config, url, data, method: 'PUT' }, this.defaults, Fetch.defaults)
    return this.request(sendConfig)    
  }
  public patch (url: string, data: data, config: Config = defaultConfig): Promise<ResponseObject> {
    let sendConfig: Config = mergeConfig({ ...config, url, data, method: 'PATCH' }, this.defaults, Fetch.defaults)
    return this.request(sendConfig)    
  }
  public post (url: string, data: data, config: Config = defaultConfig): Promise<ResponseObject> {
    let sendConfig: Config = mergeConfig({ ...config, url, data, method: 'POST' }, this.defaults, Fetch.defaults)
    return this.request(sendConfig)    
  }
  // 对外接口 end ==========================================================================
}
