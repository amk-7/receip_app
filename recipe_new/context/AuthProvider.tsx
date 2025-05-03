"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any; // Remplacez `any` par le type utilisateur si nécessaire
  loading: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  const login = (userData: any) => {
    console.log(userData);
    
    setUser(userData);
    localStorage.setItem("authToken", userData.token); // Stocke le token dans le localStorage
    router.push("/"); // Redirige après connexion
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken"); // Supprime le token

    router.push("/login"); // Redirige après déconnexion
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};