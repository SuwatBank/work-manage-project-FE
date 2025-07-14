import { create } from "zustand";
import { persist } from "zustand/middleware";
import useUserStore from "./userStore";
import { createTask, getTask } from "../api/taskApi";

const taskManageStore = create(persist((set, get) => ({
  tasks: [],
  getTask: async () => {
    const result = await getTask(token)
    set({ projects: result.data.tasks })
    return result
  },
  createTask: async () => {
    const result = await createTask(token)

  }
})))