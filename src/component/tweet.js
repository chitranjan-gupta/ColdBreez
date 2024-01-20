import Image from "next/image";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { TweetSkeleton, EmbeddedTweet, TweetNotFound } from "react-tweet";
import { getTweet as _getTweet } from "react-tweet/api";
import { Tweet } from "react-tweet";

const getTweet = unstable_cache(async (id) => _getTweet(id), ["tweet"], {
  revalidate: 3600 * 24,
});

export const Tweetcomponents = {
  AvatarImg: (props) => <Image {...props} />,
  MediaImg: (props) => <Image {...props} fill unoptimized />,
};

const TweetPage = async (props) => {
  const tweet = await getTweet(props.id);
  return tweet ? (
    <EmbeddedTweet tweet={tweet} components={Tweetcomponents} />
  ) : (
    <TweetNotFound />
  );
};

const stable = true;

export default function TweetBox(id) {
  return (
    <>
      {stable ? (
        <div className="light flex justify-center items-center">
          <Tweet id={id} components={Tweetcomponents}/>
        </div>
      ) : (
        <Suspense fallback={<TweetSkeleton />}>
          <TweetPage id={id} />
        </Suspense>
      )}
    </>
  );
}
