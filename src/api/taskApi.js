import axios from "axios";

export const taskApi = axios.create({
  baseURL: "http://localhost:8000/api/task"
})


const addToken = (token) => ({
  headers : {Authorization : `Bearer ${token}`}
})

export const createTask = (id, body, token) => taskApi.post(`/createTask/${id}`, body, addToken(token))
export const getTask = (id, token) => taskApi.post(`/getTasks/${id}`, addToken(token))