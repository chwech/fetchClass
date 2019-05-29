const fetchClass = require("../static/request.js").default

describe('测试get请求', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
  test('请求并返回正确的data', () => {
    fetch.mockResponseOnce(JSON.stringify({a: 1, b: 2}))

    const axios = new fetchClass()
    return axios.get('/test').then(response => {
      expect(response.data).toEqual({a: 1, b: 2})
    })
  })

  test('传params并返回正确的data', () => {
    fetch.mockResponseOnce(JSON.stringify({a: 1, b: 2}))

    const axios = new fetchClass()
    return axios.get('/test', {
      params: { a: 1 }
    }).then(response => {
      expect(response.data).toEqual({a: 1, b: 2})
      //assert on the times called and arguments given to fetch
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual('/test?a=1')
    })
  })
})