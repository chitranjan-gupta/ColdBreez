import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UnAuthorized from "./unauthorized";

let ready = false;

export default function DeleteAccount() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number>(401);
  async function deleteaccount() {
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts
    try {
      const response = await fetch("/api/user/delete", {
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
        router.replace("/signup");
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
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      if (typeof window !== "undefined") {
        void deleteaccount();
      }
    } else if (process.env.NODE_ENV === "development") {
      if (ready) {
        if (typeof window !== "undefined") {
          void deleteaccount();
        }
      }
      if (ready) {
        ready = false;
      } else {
        ready = true;
      }
    }
  }, []);
  return (
    <>
      {isLoading && <p>We will miss you...</p>}
      {error && <UnAuthorized error={error} errorCode={errorCode} />}
    </>
  );
}
