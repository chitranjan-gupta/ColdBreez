import React, { useEffect } from "react";
import CommentContext from "@/context/CommentContext";
import MyModal from "@/components/diallog";
import Comments from "@/components/comment";

export default function Index() {
  useEffect(() => {}, []);
  return (
    <>
      <CommentContext>
        <Comments />
      </CommentContext>
    </>
  );
}
