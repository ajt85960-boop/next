"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";

type Props = {
  user: {
    userId: string;
    role: "ADMIN" | "MANAGER" | "ANNOTATOR";
  } | null;
};

export function UserBootstrap({ user }: Props) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  return null;
}
