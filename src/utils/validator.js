import {string, object} from "yup"

export const loginSchema = object({
  userName: string().required(),
  password: string().min(6, "Password should have letter at least 6 character")
})

export const registerSchema = object({
  userName: string().required(),
  password: string().min(6, "Password should have letter at least 6 character"),
  firstName: string().required(),
  lastName: string().required(),
  phoneNo: string().required(),
  email: string().required(),
  role: string().required(),
  department: string().required(),
})

export const updateSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  phoneNo: string().required(),
  email: string().required(),
  role: string().required(),
  department: string().required(),
})

