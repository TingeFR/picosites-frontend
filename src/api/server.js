import axios from "axios";

export async function getAuthLogin(email, password){
  const params = { email, password }
  const res = await axios.get("/auth/login", { params })
  return res.data
}

export async function getUserByEMail(token, email){
  const res = await axios.get(`/users/email/${email}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res.data
}