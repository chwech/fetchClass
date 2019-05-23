const fetchClass = require("../static/request.js").default
jest.mock('node-fetch')
test('测试get请求并返回正确的data', () => {
  const axios = new fetchClass()
  const resp = {
    json: jest.fn(() => Promise.resolve({a: 1, b: 2}))
  };
  fetch.mockResolvedValue(resp);
  return axios.get('/test').then(response => {
    expect(response.data).toEqual({a: 1, b: 2})
  })
});