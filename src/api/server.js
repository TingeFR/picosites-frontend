import axios from "axios";

export async function getAuthLogin(email, password){
  const params = { email, password }
  const res = await axios.get("/auth/login", { params })
  return res.data
}