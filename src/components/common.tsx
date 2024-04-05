import React from "react";
import Head from "next/head";
import { WEBSITE_KEYWORDS } from "@/lib/name";
/**
 *
 * @returns Head tag containing common tags
 */
export default function Common() {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="keywords" content={WEBSITE_KEYWORDS} />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta
        name="google-site-verification"
        content="4eb1eN_ax5ch5dCYpluofAZ4e4LuUr5389PWYTxy2Js"
      />
      <meta name="monetag" content="7481950218d5d89759211425b4bffe8e"></meta>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
    </Head>
  );
}
