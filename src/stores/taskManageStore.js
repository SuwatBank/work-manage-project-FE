import { create } from "zustand";
import { persist } from "zustand/middleware";
import useUserStore from "./userStore";
import { createTask, getAllTasks, getAllUserTask, removeTask, submitTask, submitTaskList, updateTask } from "../api/taskApi";

let token = useUserStore.getState().token

const taskManageStore = create(persist((set, get) => ({
  tasks: [],
  submitList: [],
  userTasks: [],
  getAllTasks: async (id) => {
    const result = await getAllTasks(id, token)
    set({ tasks: result.data.tasks})
    return result
  },
  getAllUserTask: async (id) => {
    const result = await getAllUserTask(id, token)
    set({ userTasks: result.data.tasks})
    console.log("resulttttt", result.data.tasks);
    
    return result
  },
  createTask: async (id, body, token) => {
    console.log(id);
    const result = await createTask(id, body, token)
    get().getAllTasks(id, token)
    return result
  },
  submitTask: async (id, body, token) => {
    const result = await submitTask(id, body, token)
    get().getAllTasks(id, token)
    return result
  },
  removeTask: async (id, token) => {
    const result = await removeTask(id, token)
    get().getAllTasks(id, token)
    return result
  },
  submitTaskList: async(id, token) => {
    const result = await submitTaskList(id, token)
    set({ submitList: result.data.result})
    return result
  },
  updateTask: async(id, body, token) => {
    console.log('status', body)
    const result = await updateTask(id, body, token)
    get().getAllTasks(id, token)
    return result
  }
})));

export default taskManageStore;