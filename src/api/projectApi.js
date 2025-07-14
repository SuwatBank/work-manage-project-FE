import axios from "axios";

export const projectApi = axios.create({
  baseURL: "http://localhost:8000/api/project"
})

const addToken = (token) => ({
  headers: {Authorization : `Bearer ${token}`}
})

export const getAllProjects = (token) => projectApi.get("/getProjects", addToken(token))
export const getProject = (id, token) => projectApi.get(`/getProject/${id}`, addToken(token))
export const assignProject = (id, token) => projectApi.get(`/assignProject/${id}`, addToken(token))
export const createProject = (id, body, token) => projectApi.post(`/leader/assignProject/${id}`, body, addToken(token))