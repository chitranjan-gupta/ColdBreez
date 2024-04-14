import React from "react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { commentApi } from "@/state/api/comment.api";
import Comments from "@/components/comments";

export default function Index() {
  return (
    <>
      <ApiProvider api={commentApi}>
        <Comments />
      </ApiProvider>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
