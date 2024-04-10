import React from "react";
import type { PortableTextReactComponents } from "@portabletext/react";
import Image from "next/image";
import ReactPlayer from "react-player";
import { Tweet } from "react-tweet";
import { InstagramEmbed } from "react-social-media-embed";
import { Tweetcomponents } from "@/components/tweet";
import { Table } from "@/components/table";
import { urlFor } from "@/lib/sanity";

export const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-96 object-contain">
          <Image
            alt={value.asset._ref}
            loading="lazy"
            src={urlFor(value).fit("clip").url()}
            fill={true}
          />
        </div>
      );
    },
    youtubeembed: ({ value }) => {
      if (!value) {
        return null;
      }
      const { url } = value;
      return (
        <div className="youtubeview">
          <ReactPlayer url={url} width={"100%"} height={"100%"} />
        </div>
      );
    },
    instagramembed: ({ value }) => {
      if (!value) {
        return null;
      }
      const { url } = value;
      return (
        <div className="w-full flex flex-row justify-center items-center">
          <InstagramEmbed url={url} width={328} />
        </div>
      );
    },
    twitterembed: ({ value }) => {
      if (!value) {
        return null;
      }
      const { id } = value;
      return (
        <div className="light tweetview">
          <Tweet id={id} components={Tweetcomponents} />
        </div>
      );
    },
    table: ({ value }) => {
      if (!value) {
        return null;
      }
      const { rows } = value;
      return <Table rows={rows} />;
    },
  },
  block: {
    h1: ({ children }) => <h1 className="">{children}</h1>,
    h2: ({ children }) => <h2 className="">{children}</h2>,
    h3: ({ children }) => <h3 className="">{children}</h3>,
    h4: ({ children }) => <h4 className="">{children}</h4>,
    p: ({ children }) => <p className="">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-purple-500">{children}</blockquote>
    ),
  },
} as unknown as PortableTextReactComponents;
