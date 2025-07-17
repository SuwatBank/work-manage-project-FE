import axios from "axios";

export const taskApi = axios.create({
  baseURL: "http://localhost:8000/api/task"
})


const addToken = (token) => ({
  headers : {Authorization : `Bearer ${token}`}
})

export const getAllTasks = (id, token) => taskApi.get(`/getTasks/${id}`, addToken(token))
export const createTask = (id, body, token) => taskApi.post(`/createTask/${id}`, body, addToken(token))
export const submitTask = (id, body, token) => taskApi.patch(`/submitTask/${id}`, body, addToken(token))