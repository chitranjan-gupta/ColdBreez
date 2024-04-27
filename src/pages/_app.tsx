import React from "react";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Common from "@/components/common";

const App = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false);
  const [isSWRegistred, setIsSWRegistred] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!loading) {
        if (!isSWRegistred) {
          import("@/lib/service").then((module) => {
            module.default();
            setIsSWRegistred(true);
          });
        }
      }
    }
  }, [isSWRegistred]);
  useEffect(() => {
    return function cleanup() {
      setLoading(true);
      console.log("[log] Cleanup");
    };
  }, []);
  return (
    <>
      <Common />
      {process.env.NODE_ENV === "production" ? (
        <>
          <GoogleTagManager gtmId={String(process.env.NEXT_PUBLIC_GTM_ID)} />
          <GoogleAnalytics gaId={String(process.env.NEXT_PUBLIC_GA_ID)} />
        </>
      ) : (
        <></>
      )}
      <Component {...pageProps} />
    </>
  );
};

export { useReportWebVitals } from "next-axiom";

export default App;
