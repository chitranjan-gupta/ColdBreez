import React from "react";
import styles from "@/styles/insta.module.css";

export function InstaPost({ url }) {
  return (
    <div className="instagramview flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={`${url}/?utm_source=ig_embed&amp;utm_campaign=loading`}
        data-instgrm-version="14"
        styles={styles.blockquote}
      ></blockquote>
    </div>
  );
}
