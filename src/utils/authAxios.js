import axios from 'axios'
import { useAuthStore } from '@/stores/useAuthStore'

const ensureToken = async (token) => {
  return await new Promise((resolve, reject) => {
    if (token) resolve(true)
    if (!token) reject('tokenless request')
  })
}

const axiosWithAuth = (method) => {
  return async (url, data = {}) => {
    const token = useAuthStore.getState().token
    const hasToken = await ensureToken(token)

    if(!hasToken) return

    const headers = {
      Authorization: `Bearer ${token}`
    }

    if (['post', 'put'].includes(method)) {
      return await axios[method](url, data, { headers })
    } else {
      return await axios[method](url, { headers })
    }
  }
}

const authAxios = {
  get: axiosWithAuth('get'),               // authAxios.get(url)
  delete: axiosWithAuth('delete'),         // authAxios.delete(url)
  post: axiosWithAuth('post'),             // authAxios.post(url, data)
  put: axiosWithAuth('put')                // authAxios.put(url, data)
}

export default authAxios
