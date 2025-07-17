import { create } from "zustand";
import { authApi, getAllUsers, deleteUser, updateUser, getMembers, getUserId } from "../api/authApi";
import { persist } from "zustand/middleware";
import useUserStore from "./userStore";

let token = useUserStore.getState().token

const userManageStore = create(persist((set,get) => ({
  users: [],
  members: [],
  getAllUsers : async(token) => {
    const result = await getAllUsers(token)
    set({users: result.data.users})
    return result
  },

  getMembers : async(department) => {
    const result = await getMembers(department, token)
    set({members: result.data.users})
    return result
  },

  getUserId : async(id) => {
    const result = await getUserId(id, token)
    return result
  },

  deleteUser : async(id) => {
    const response = await deleteUser(id, token)
    get().getAllUsers(token)
    return response
  },

  updateUser : async(id, body) => {
    const token = useUserStore.getState().token
    const response = await updateUser(id, body, token)
    get().getAllUsers(token)
    return response
  }
  
})))

export default userManageStore