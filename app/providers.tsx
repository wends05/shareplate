"use client";

import { auth } from "@/lib/firebase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext({
  user: null as User | null,
  loading: true,
});

export const useAuthContext = () => useContext(AuthContext);

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 2000,
          },
        },
      })
  );

  const [user, setUser] = useState<User | null>(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.displayName, " logged in");
        setUser(user)
      } else {
        setUser(null);
      }
      setloading(false);
      return () => unsubscribe();
    });
  });
  return (
    <AuthContext.Provider value={{ user, loading }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default Providers;
