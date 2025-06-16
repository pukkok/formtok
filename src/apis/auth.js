import axios from "axios"

export const login = async (userId, password) => {
  const { data } = await axios.post('/api/user/login', { userId, password })
  return data
}

export const idDuplicateCheck = async (userId) => {
  const { data } = await axios.post('/api/user/join/id-check', { userId })
  return data
}

export const join = async ({ name, userId, email, phone, password, confirmPassword }) => {
  const { data } = await axios.post('/api/user/join', {
    name, userId, email, phone, password, confirmPassword
  })
  return data
}

export const sendOtp = async (email) => {
  const { data } = await axios.post('/api/confirm/send-otp', { email })
  return data
}

export const verifyOtp = async (email, otp) => {
  const { data } = await axios.post('/api/confirm/verify-otp', { email, otp })
  return data
}