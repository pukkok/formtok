import authAxios from "@/utils/authAxios"
import axios from "axios"

export const getMyForm = async (url) => {
  const { data } = await authAxios.post('/api/form/my-form/one', {url})
  return data
}

export const getAllMyForms = async (filter = {}) => {
  const { data } = await authAxios.post('/api/form/my-form/load', { filter })
  return data
}

export const copyForm = async (url) => {
  const { data } = await authAxios.post('/api/form/my-form/copy', {url})
  return data
}

export const deleteForm = async (url) => {
  const { data } = await authAxios.post('/api/form/my-form/delete', {url})
  return data
}

export const saveForm = async (url, title, pages, endingMent, listStyle, options) => {
  const { data } = await authAxios.post('/api/form/edit', 
    {url, title, pages, endingMent, listStyle, options}
  )
  return data
}

export const getAvailableForms = async () => {
  const { data } = await axios.get('/api/form/all-forms')
  return data
}