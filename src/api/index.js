import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'

function parseResponse (response) {
  return Promise.all([response.status, response.statusText, response.data])
}

function checkStatus ([status, statusText, data]) {
  if (status >= 200 && status < 300) {
    return data
  } else {
    let error = new Error(statusText)
    error.status = status
    error.error_message = data
    return Promise.reject(error)
  }
}

function handleError (error) {
  console.log(error)
}

const get = (url, param = {}) => {
  let query = []
  let initParam = {
    'tn': 'resultjsonavatarnew',
    'ie': 'utf-8',
    'cg': '',
    'itg': '',
    'z': '0',
    'fr': '',
    'width': '',
    'height': 1000,
    'lm': '-1',
    'ic': '0',
    's': '0',
    'word': '',
    'st': '-1',
    'gsm': '',
    'rn': '60',
    'pn': 0
  }
  param = Object.assign({}, initParam, param)
  Object.keys(param).forEach(item => {
    query.push(`${item}=${encodeURIComponent(param[item])}`)
  })
  let params = query.length ? '?' + query.join('&') : ''
  return axios.get(url + params).then(parseResponse).then(checkStatus).catch(error => handleError(error))
}

const api = {
  // 注册
  getData (payload) {
    return get('/search/avatarjson', payload)
  }
}

export default api
