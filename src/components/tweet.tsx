import React from "react";
import Image, { ImageLoader } from "next/image";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { TweetSkeleton, EmbeddedTweet, TweetNotFound } from "react-tweet";
import { getTweet as _getTweet } from "react-tweet/api";
import { Tweet } from "react-tweet";
import {
  StaticImport,
  PlaceholderValue,
  OnLoadingComplete,
} from "next/dist/shared/lib/get-img-props";

const getTweet = unstable_cache(async (id) => _getTweet(id), ["tweet"], {
  revalidate: 3600 * 24,
});

export const Tweetcomponents = {
  AvatarImg: (
    props: React.JSX.IntrinsicAttributes &
      Omit<
        React.DetailedHTMLProps<
          React.ImgHTMLAttributes<HTMLImageElement>,
          HTMLImageElement
        >,
        "ref" | "height" | "width" | "loading" | "alt" | "src" | "srcSet"
      > & {
        src: string | StaticImport;
        alt: string;
        width?: number | `${number}`;
        height?: number | `${number}`;
        fill?: boolean;
        loader?: ImageLoader;
        quality?: number | `${number}`;
        priority?: boolean;
        loading?: "eager" | "lazy";
        placeholder?: PlaceholderValue;
        blurDataURL?: string;
        unoptimized?: boolean;
        onLoadingComplete?: OnLoadingComplete;
        layout?: string;
        objectFit?: string;
        objectPosition?: string;
        lazyBoundary?: string;
        lazyRoot?: string;
      } & React.RefAttributes<HTMLImageElement>,
  ) => <Image {...props} />,
  MediaImg: (
    props: React.JSX.IntrinsicAttributes &
      Omit<
        React.DetailedHTMLProps<
          React.ImgHTMLAttributes<HTMLImageElement>,
          HTMLImageElement
        >,
        "ref" | "height" | "width" | "loading" | "alt" | "src" | "srcSet"
      > & {
        src: string | StaticImport;
        alt: string;
        width?: number | `${number}`;
        height?: number | `${number}`;
        fill?: boolean;
        loader?: ImageLoader;
        quality?: number | `${number}`;
        priority?: boolean;
        loading?: "eager" | "lazy";
        placeholder?: PlaceholderValue;
        blurDataURL?: string;
        unoptimized?: boolean;
        onLoadingComplete?: OnLoadingComplete;
        layout?: string;
        objectFit?: string;
        objectPosition?: string;
        lazyBoundary?: string;
        lazyRoot?: string;
      } & React.RefAttributes<HTMLImageElement>,
  ) => <Image {...props} fill unoptimized />,
};

const TweetPage = async (props: { id: any }) => {
  const tweet = await getTweet(props.id);
  return tweet ? (
    <EmbeddedTweet tweet={tweet} components={Tweetcomponents} />
  ) : (
    <TweetNotFound />
  );
};

const stable = true;

export default function TweetBox(id: string) {
  return (
    <>
      {stable ? (
        <div className="light flex justify-center items-center">
          <Tweet id={id} components={Tweetcomponents} />
        </div>
      ) : (
        <Suspense fallback={<TweetSkeleton />}>
          <TweetPage id={id} />
        </Suspense>
      )}
    </>
  );
}
