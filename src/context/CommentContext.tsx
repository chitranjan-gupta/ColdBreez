import React, { useState } from "react";
import { comment } from "@/components/comment";

type CommentContextProps = {
  comments: comment[];
  setComments: React.Dispatch<React.SetStateAction<comment[]>>;
};

const CommentContext = React.createContext<CommentContextProps>(null);

export function useComment() {
  return React.useContext(CommentContext);
}

export default function CommentProvider({ children }) {
  const [comments, setComments] = useState<comment[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    async function getComments() {
      setLoading(true);
      setError(null); // Clear previous errors when a new request starts
      try {
        const res = await fetch("/api/comment/read", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: "d116ded5-268f-4971-a85a-0c9925a0af03",
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data);
          throw new Error(res.statusText);
        }
        if (res.ok) {
          setComments(data);
        }
      } catch (err) {
        // Capture the error message to display to the user
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    void getComments();
  }, []);
  return (
    <CommentContext.Provider value={{ comments, setComments }}>
      {error && <p>{error}</p>}
      {loading ? <p>Loading...</p> : children}
    </CommentContext.Provider>
  );
}
