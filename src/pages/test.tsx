import React from "react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { commentApi } from "@/state/api/comment.api";
import Comments from "@/components/comments";
import { AuthContextProvider } from "@/context/AuthContext";

export default function Index() {
  return (
    <>
      <AuthContextProvider>
        <ApiProvider api={commentApi}>
          <Comments />
        </ApiProvider>
      </AuthContextProvider>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
