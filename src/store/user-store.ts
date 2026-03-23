"use client";

import { create } from "zustand";

type UserState = {
  user: {
    userId: string;
    role: "ADMIN" | "MANAGER" | "ANNOTATOR";
  } | null;
  setUser: (user: UserState["user"]) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
