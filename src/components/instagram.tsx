import React from "react";
import Script from "next/script";
import styles from "@/styles/insta.module.css";

export function InstaPost({ url }: { url: string }) {
  //if the script not work for more thank one instagram post then puts script tag on main page
  return (
    <>
      <Script
        async
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onReady={() => {
          console.log("loading instagram post");
        }}
      ></Script>
      <div className="instagramview flex justify-center">
        <blockquote
          className={`instagram-media ${styles.blockquote}`}
          data-instgrm-captioned
          data-instgrm-permalink={`${url}/?utm_source=ig_embed&amp;utm_campaign=loading`}
          data-instgrm-version="14"
        ></blockquote>
      </div>
    </>
  );
}
