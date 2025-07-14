import { create } from "zustand";
import { authApi, getAllUsers } from "../api/authApi";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(persist((set, get) => ({
  user: null,
  token: "",
  role: "",
  login: async (input) => {
    const result = await authApi.post("/login", input)
    set({token: result.data.token, user: result.data.user, role: result.data.role})
    return result
  },
  logout: () => set({token: "", user: null, role: ""})
}),{
  name: "userState",
  storage: createJSONStorage(() => localStorage)
}
))

export default useUserStore