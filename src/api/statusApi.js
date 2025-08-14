import axios from "axios";

export const taskApi = axios.create({
  baseURL: "http://localhost:8000/api/status"
});


const addToken = (token) => ({
  headers : {Authorization : `Bearer ${token}`}
});

export const submitTask = (id, body, token) => taskApi.patch(`/submitTask/${id}`, body, addToken(token));
export const pendingTask = (id, body, token) => taskApi.patch(`/pendingTask/${id}`, body, addToken(token));