import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:8000/api/auth"
})

const addToken = (token) => ({
  headers: {Authorization : `Bearer ${token}`}
})

export const getAllUsers = (token) => authApi.get("/getUsers", addToken(token))
export const getMembers = (department, token) => authApi.get(`/getMembers/${department}`, addToken(token))
export const getUserId = (id, token) => authApi.get(`/getUserId/${id}`, addToken(token))
export const deleteUser = (id, token) => authApi.delete(`/user/${id}`, addToken(token))
export const updateUser = (id, body, token) => authApi.patch(`/user/${id}`, body, addToken(token))