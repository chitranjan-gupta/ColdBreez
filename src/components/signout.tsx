import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UnAuthorized from "./unauthorized";
export default function SignOut() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number>(401);
  useEffect(() => {
    async function signout() {
      setIsLoading(true);
      setError(null); // Clear previous errors when a new request starts
      try {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          setErrorCode(response.status);
          throw new Error(data.message);
        }
        if (response.ok) {
          router.replace("/signin");
          console.log(data);
        }
      } catch (error) {
        // Capture the error message to display to the user
        setError(error.message);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    void signout();
  }, []);
  return (
    <>
      {isLoading && <p>Signing out...</p>}
      {error && <UnAuthorized error={error} errorCode={errorCode}/>}
    </>
  );
}
