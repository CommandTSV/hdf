import axios from 'axios'

const connect = axios.create({
  baseURL: 'http://10.30.20.138:5000/api/',
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})


export function fetchProduct(id: number) {
  return axios.get(`/product/${id}`);
}

export function fetchProducts(from: number, onpage: number) {
  return axios.get(`/product?on_from${from}&on_page=${onpage}`);
}