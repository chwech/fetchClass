// ts使用'接口'定义对象的类型
// 约定接口名字一般是首字母大写，有些语言建议有前面加I前缀
// TODO: 待求证，纯对象的定义 plain object（纯对象）：是指 JSON 形式定义的普通对象或者 new Object() 创建的简单对象；
// TODO:无格式对象(plain object)是这样定义吗？待求证
interface PlainObject {
  [propName: string]: any;
}
interface Config {
  url: string;
  baseUrl?: string;
  method?: string; // 名字后加问号表示可选属性
  params?: PlainObject | URLSearchParams; // params是一个无格式对象(plain object)或 URLSearchParams 对象
}
// 默认配置对象
let defaultConfig: Config = {
  url: '',
  method: 'GET',
  params: {},
  baseUrl: ''
}

class Fetch {
  // 公有实例属性
  public defaults: Config = defaultConfig;
  // 静态属性
  static defaults: Config = defaultConfig; // 全局的默认配置

  constructor (opts: Config = defaultConfig) {
    // 实例属性赋值
    this.defaults.baseUrl = opts.baseUrl
  }
  public request (config: Config = defaultConfig) {
    let sendUrl: string = this.defaults.baseUrl + config.url
    let init = {
      method: config.method
    }
    fetch(sendUrl, init)
      .then(function(response) {
        return response.json();
      })
  }
  public get (url: string, config: Config = defaultConfig) {
    let sendConfig: Config = this.mergeConfig({ ...config, url })
    this.request(sendConfig)
  }

  public post () {
    
  }
  // protected修饰的属性或方法，可以在类与子类中访问
  // 合并配置对象
  protected mergeConfig(config: Config): Config {
    let sendConfig: Config = {
      ...Fetch.defaults,
      ...defaultConfig,
      ...this.defaults,
      ...config
    }
    return sendConfig
  }
}

let axios = new Fetch()
// axios.get('/test')