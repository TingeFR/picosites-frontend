import axios from "axios";
import { User } from "./user";

var prefix = ""
if(process.env.NODE_ENV === "production"){
  prefix = "/api"
}

export const postAuthLogin = async (email: string, password: string): Promise<{token: string}> => {
  const body = {email, password}
  const res = await axios.post(prefix + "/auth/login", body)
  return res.data
}

export const getUserByEMail = async (token: string, email: string): Promise<User> => {
  const res = await axios.get(prefix + `/users/email/${email}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res.data
}
