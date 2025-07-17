import { create } from "zustand";
import { persist } from "zustand/middleware";
import useUserStore from "./userStore";
import { createTask, getAllTasks, submitTask } from "../api/taskApi";

let token = useUserStore.getState().token

const taskManageStore = create(persist((set, get) => ({
  tasks: [],
  getAllTasks: async (id) => {
    const result = await getAllTasks(id, token)
    set({ tasks: result.data.tasks})
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
  }
})))

export default taskManageStore