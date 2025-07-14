import {create} from "zustand"
import { persist } from "zustand/middleware"
import useUserStore from "./userStore"
import { assignProject, createProject, getAllProjects, getProject } from "../api/projectApi"

let token = useUserStore.getState().token

const projectManageStore = create(persist((set,get) => ({
  projects : [],
  getAllProjects : async() => {
    const result = await getAllProjects(token)
    set({projects: result.data.projects})
    return result
  },
  getProject : async(id) => {
    const result = await getProject(id, token)
    set({projects: result.data.result})
    return result

  },
  assignProject : async(id) => {
    const result = await assignProject(id, token)
    set({projects: result.data.result})
    return result

  },
  createProject : async(id, body, token) => {
    const result = await createProject(id, body, token)
    get().getAllProjects()
    return result
  }
})))

export default projectManageStore