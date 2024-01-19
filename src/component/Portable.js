import Image from "next/image";
import ReactPlayer from "react-player";
import { Tweet } from "react-tweet";
import { Tweetcomponents } from "@/component/tweet-components";

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
    youtube: ({ node }) => {
      const { url } = node;
      return <ReactPlayer url={url} />;
    },
    twitter: ({ node }) => {
      const { id } = node;
      return <Tweet id={id} components={Tweetcomponents} />;
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
