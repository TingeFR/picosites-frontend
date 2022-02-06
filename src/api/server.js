import axios from "axios";

var prefix = ""
if(process.env.NODE_ENV === "production"){
  prefix = "/api"
}

export async function postAuthLogin(email, password){
  const body = {email, password}
  const res = await axios.post(prefix + "/auth/login", body)
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