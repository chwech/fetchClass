const fetchClass = require("../static/request.js").default

test('测试get请求并返回正确的data', () => {
  const axios = new fetchClass()
  return axios.get('/test').then(response => {
    expect(response.data).toEqual({a: 1, b: 2})
  })
});