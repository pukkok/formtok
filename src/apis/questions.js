import authAxios from "@/utils/authAxios"

export const getAllMyQuestions = async () => {
  const { data } = await authAxios.post('/api/form/question/load')
  return data
}

export const saveQuestion = async (question) => {
  const { data } = await authAxios.post('/api/form/question/save', 
    {...question}
  )
  return data
}

export const deleteQuesiton = async (id) => {
  const { data } = await authAxios.post('/api/form/question/delete', {id})
  return data
}

export const deleteManyQuestions = async (ids) => {
  const { data } = await authAxios.post('/api/form/question/delete-multiple', {ids})
  return data
}