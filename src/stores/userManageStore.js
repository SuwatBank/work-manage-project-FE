import { create } from "zustand";
import { authApi, getAllUsers, deleteUser, updateUser, getMembers } from "../api/authApi";
import { persist } from "zustand/middleware";
import useUserStore from "./userStore";

let token = useUserStore.getState().token

const userManageStore = create(persist((set,get) => ({
  users: [],
  getAllUsers : async() => {
    const result = await getAllUsers(token)
    set({users: result.data.users})
    return result
  },
  getMembers : async(department) => {
    const result = await getMembers(department, token)
    set({users: result.data.users})
    console.log(result)
    return result
  },
  deleteUser : async(id) => {
    const response = await deleteUser(id, token)
    get().getAllUsers()
    return response
  },
  updateUser : async(id, body) => {
    const token = useUserStore.getState().token
    const response = await updateUser(id, body, token)
    get().getAllUsers()
    return response
  }
})))

export default userManageStore