import axios from "axios";

export const taskApi = axios.create({
  baseURL: "http://localhost:8000/api/task"
});


const addToken = (token) => ({
  headers : {Authorization : `Bearer ${token}`}
});

export const getAllTasks = (id, token) => taskApi.get(`/getTasks/${id}`, addToken(token));
export const getAllUserTask = (id, token) => taskApi.get(`/getUserTasks/${id}`, addToken(token));
export const createTask = (id, body, token) => taskApi.post(`/createTask/${id}`, body, addToken(token));
export const submitTask = (id, body, token) => taskApi.patch(`/submitTask/${id}`, body, addToken(token));
// export const pendingTask = (id, body, token) => taskApi.patch(`/pendingTask/${id}`, body, addToken(token));
export const updateTask = (id, body, token) => taskApi.patch(`/updateTask/${id}`, body,  addToken(token));
export const removeTask = (id, token) => taskApi.delete(`/deleteTask/${id}`, addToken(token));
export const submitTaskList = (id, token) => taskApi.get(`/submitTaskList/${id}`, addToken(token));
export const pendingTaskList = (id, token) => taskApi.get(`/pendingTaskList/${id}`, addToken(token));