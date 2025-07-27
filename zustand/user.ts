import { create } from "zustand";
import { UserEntity } from "../entities/user";
import { getMe } from "@/services/auth";

interface AuthStore {
  user: UserEntity | null
  setUser: (user: UserEntity | ((prev: UserEntity) => UserEntity) | null) => void
  loading: boolean
  isOpenLogin: boolean
  setIsOpenLogin: (isOpen: boolean) => void
  getMe: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  loading: false,
  setUser: (item) =>
    set((state) => ({
      user: typeof item === "function" ? item(state.user!) : item,
    })),
  isOpenLogin: false,
  setIsOpenLogin: (isOpen) => set(() => ({ isOpenLogin: isOpen })),
  getMe: async () => {
    try {
        const res = await getMe()
        set({ user: res.user })
    } catch (err) {
      console.log(err)
    }
  }
}))