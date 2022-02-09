import { User } from "./user";

export interface Project {
  id: number,
  name: string,
  url: string,
  date: Date,
  expirationDate: Date,
  user: User,
  fields?: any,
  deliveries?: any,
  requests?: any,
}