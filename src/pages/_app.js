import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Common from "@/component/common";
import { useRouter } from "next/router";
import Script from "next/script";
import * as gtag from "@/lib/gtag";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  const [loading, setLoading] = useState(false);
  const [isSWRegistred, setIsSWRegistred] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!loading) {
        if(!isSWRegistred){
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
      <Script id="gtag">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        id="gtagafter"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  );
};

export { reportWebVitals } from 'next-axiom';

export default App;
