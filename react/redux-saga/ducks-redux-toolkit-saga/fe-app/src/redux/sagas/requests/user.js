import axios from 'axios'

export const requestGetUser = (id) => {
  console.log('requestGetUser param test:', id)
  return axios.request({
    method: 'get',
    url: 'http://localhost:8081/user'
    // url: 'https://my-json-server.typicode.com/dvll13/typicode-json-server-demo/user'
  })
}
