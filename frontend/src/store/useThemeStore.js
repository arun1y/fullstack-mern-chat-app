import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "cupcake",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "chat-theme",
      getStorage: () => localStorage,
    }
  )
);
