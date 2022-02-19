import { Project } from "./project";

export interface User {
  id: number,
  group: 'admin' | 'user',
  email:	string,
  hashedPassword: string,
  firstName: string,
  lastName: string,
  isActive: boolean,
  projects?: Project[],
  requests?: any,
  comments?: any,
}