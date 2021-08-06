import axios from "axios";

var prefix = ""
if(process.env.NODE_ENV === "production"){
  prefix = "/api"
}

export async function getAuthLogin(email, password){
  const params = { email, password }
  const res = await axios.get(prefix + "/auth/login", { params })
  return res.data
}

export async function getUserByEMail(token, email){
  const res = await axios.get(prefix + `/users/email/${email}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res.data
}