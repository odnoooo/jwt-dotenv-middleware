"use client";

import { api } from "@/lib/";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const AuthContext = createContext();

const authPaths = ["/login", "/register"];

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      setUser(res.data.user);

      router.replace("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const register = async (username, email, password) => {
    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });
      router.push("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
};
