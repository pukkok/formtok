import authAxios from "@/utils/authAxios"
import axios from "axios"

export const submitAnswer = async (url, answers) => {
  const { data } = await authAxios.post(`/api/answer/submit/?url=${url}`, {answers})
  return data
}

export const getResultAnswers = async (url) => {
  const { data } = await axios.get(`/api/answer/form-result`, {params: {url}})
  return data
}