import { createContext, useEffect, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import UnAuthorized from "@/components/unauthorized";

type AuthProps = {
  isAuthenticated?: boolean;
  setIsAuthenticated?: Dispatch<SetStateAction<boolean>>;
  userId?: string;
  setUserId?: Dispatch<SetStateAction<string>>;
  email?: string;
  setEmail?: Dispatch<SetStateAction<string>>;
};

type AuthContextProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthProps>({});

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number>(401);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>();
  const [email, setEmail] = useState<string>();
  useEffect(() => {
    async function checkAuthentication(url: string, refresh: boolean) {
      setIsLoading(true);
      setError(null); // Clear previous errors when a new request starts
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          if (data.message == "TOKEN_EXPIRED" && refresh == true) {
            setErrorCode(response.status);
            throw new Error(data.message);
          } else if (data.message == "TOKEN_EXPIRED" && refresh == false) {
            await checkAuthentication("/api/auth/refresh", true);
          } else {
            setErrorCode(response.status);
            throw new Error(data.message);
          }
        }
        if (response.ok) {
          setIsAuthenticated(true);
          console.log(data);
        }
      } catch (error) {
        setIsAuthenticated(false);
        // Capture the error message to display to the user
        setError(error.message);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    void checkAuthentication("/api/auth/", false);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userId,
        setUserId,
        email,
        setEmail,
      }}
    >
      {isAuthenticated ? (
        children
      ) : (
        <UnAuthorized error={error} errorCode={errorCode} />
      )}
    </AuthContext.Provider>
  );
};
