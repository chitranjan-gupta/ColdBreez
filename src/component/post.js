import Image from "next/image";
import Link from "next/link";
import { WEBSITE_URL } from "@/lib/name";
import { getMonth } from "@/lib/nav";
import { urlFor } from "@/lib/sanity";
export default function PostCard({ post, postType }) {
  return (
    <div
      className="relative flex flex-col justify-between w-full bg-center bg-cover h-96"
      style={{
        backgroundImage: `url("${
          post.mainImage
            ? urlFor(post.mainImage).width(600).height(600).url()
            : "android-chrome-512x512.png"
        }")`,
      }}
      onClick={() =>
        window.open(
          `${WEBSITE_URL}/${postType}/${post.categories[0].toLowerCase()}/${post.subcategories[0].toLowerCase()}/${encodeURIComponent(
            post.slug.current
          )}`,
          "_blank"
        )
      }
    >
      <div className="w-full flex items-center justify-between p-5">
        <div className="flex flex-col">
          <a
            rel="noopener noreferrer"
            href={`/${postType}/${post.categories[0].toLowerCase()}`}
            className="text-md font-bold uppercase text-black"
            onClick={(event) => event.stopPropagation()}
          >
            {post.categories &&
              post.categories.map((category) => (
                <span key={category}> {category}</span>
              ))}
          </a>
          <a
            rel="noopener noreferrer"
            href={`/${postType}/${post.categories[0].toLowerCase()}/${post.subcategories[0].toLowerCase()}`}
            className="text-md font-bold uppercase text-black"
            onClick={(event) => event.stopPropagation()}
          >
            {post.subcategories &&
              post.subcategories.map((subcategory) => (
                <span key={subcategory}> {subcategory}</span>
              ))}
          </a>
        </div>
        <div className="flex flex-col justify-start text-center text-black">
          <span className="text-3xl font-semibold">
            {new Date(post.publishedAt).getDate()}
          </span>
          <span className="uppercase">
            {getMonth(new Date(post.publishedAt).getMonth())}
          </span>
        </div>
      </div>
      <div className="w-full p-5">
        <div className="relative flex items-center gap-x-4 mb-1">
          <Image
            src={urlFor(post.authorImage).url()}
            alt={`${post.name}'s picture`}
            width={460}
            height={460}
            className="h-10 w-10 rounded-full bg-gray-50"
          />
          <div className="text-md leading-6">
            <p className="font-bold text-black">
              <Link
                href={`/${postType}/author`}
                onClick={(event) => event.stopPropagation()}
              >
                {post.name}
              </Link>
            </p>
          </div>
        </div>
        <Link
          href={`/${postType}/${post.categories[0].toLowerCase()}/${post.subcategories[0].toLowerCase()}/${encodeURIComponent(
            post.slug.current
          )}`}
          onClick={(event) => event.stopPropagation()}
        >
          <h2 className="font-bold text-lg hover:underline text-black">
            {post.title}
          </h2>
        </Link>
      </div>
    </div>
  );
}
