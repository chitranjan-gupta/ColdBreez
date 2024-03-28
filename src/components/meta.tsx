import React from "react";
import Head from "next/head";
import {
  WEBSITE_TITLE,
  WEBSITE_DESCRIPTION,
  WEBSITE_POSTER_URL,
  WEBSITE_URL,
  WEBSITE_NAME,
} from "@/lib/name";
/**
 *
 * @returns Head tag containing meta tags required for SEO
 */
export default function Meta() {
  return (
    <Head>
      <title>{WEBSITE_TITLE}</title>
      <meta name="title" content={WEBSITE_TITLE} />
      <meta name="description" content={WEBSITE_DESCRIPTION} />
      <meta name="image" content={WEBSITE_POSTER_URL} />
      <meta itemProp="name" content={WEBSITE_TITLE} />
      <meta itemProp="description" content={WEBSITE_DESCRIPTION} />
      <meta itemProp="image" content={WEBSITE_POSTER_URL} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={WEBSITE_TITLE} />
      <meta name="twitter:description" content={WEBSITE_DESCRIPTION} />
      <meta name="og:title" content={WEBSITE_TITLE} />
      <meta name="og:description" content={WEBSITE_DESCRIPTION} />
      <meta name="og:image" content={WEBSITE_POSTER_URL} />
      <meta name="og:url" content={WEBSITE_URL} />
      <meta name="og:site_name" content={WEBSITE_NAME} />
      <meta name="og:locale" content="en_US" />
      <meta name="og:type" content="website" />
    </Head>
  );
}
