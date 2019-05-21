const FetchClass = require("../static/request.js")

test('测试get请求并返回正确的data', () => {
  const axios = new FetchClass()
  return axios.get('/test').then(response => {
    expect(response.data).toEqual({a: 1, b: 2})
  })
});