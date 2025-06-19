import authAxios from "@/utils/authAxios"

export const getMyFormList = async () => {
  const { data } = await authAxios.post('/api/form/my-form/load')
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