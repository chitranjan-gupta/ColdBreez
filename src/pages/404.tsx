import Head from "next/head";
import Error from "@/components/404";

export default function error() {
  return (
    <>
      <Head>
        <title>{`404 | Not Found`}</title>
      </Head>
      <Error />
    </>
  );
}
