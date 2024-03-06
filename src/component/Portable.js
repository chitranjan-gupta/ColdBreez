import React from "react";
import Image from "next/image";
import ReactPlayer from "react-player";
import { Tweetcomponents } from "@/component/tweet";
import { Tweet } from "react-tweet";

export const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-96 object-contain">
          <Image alt="" loading="lazy" src={urlFor(value).url()} fill={true} />
        </div>
      );
    },
    youtube: ({ value }) => {
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
    twitter: ({ value }) => {
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
      const { rows, _key } = value;
      return (
        <div className="tableview">
          <table key={_key} className="border">
            {rows.map(({ cells, _key }, i) => (
              <tr key={_key} className="border text-center">
                {i == 0
                  ? cells.map((d) => <th key={d} className="border p-1">{d}</th>)
                  : cells.map((d) => <td key={d} className="border p-1">{d}</td>)}
              </tr>
            ))}
          </table>
        </div>
      );
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
};
