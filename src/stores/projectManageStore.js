import {create} from "zustand"
import useUserStore from "./userStore"
import { assignProject, createProject, getAllProjects, getProject, newComingProject, projectNearDue } from "../api/projectApi"

let token = useUserStore.getState().token

const projectManageStore = create((set,get) => ({
  projects : [],
  newProjects: [],
  getAllProjects : async() => {
    const result = await getAllProjects(token)
    console.log('result', result)
    set({projects: result.data.projects})
    return result
  },
  getProject : async(id) => {
    const result = await getProject(id, token)
    set({projects: result.data.result})
    return result
  },

  projectNearDue : async(id) => {
    const result = await projectNearDue(id, token)
    set({projects: result.data.result})
    return result
  },

  newComingProject : async(id) => {
    const result = await newComingProject(id, token)
    set({newProjects: result.data.result})
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
}))

export default projectManageStore