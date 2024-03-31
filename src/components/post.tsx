import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WEBSITE_URL } from "@/lib/name";
import { getMonth } from "@/lib/nav";
import { urlFor } from "@/lib/sanity";

export function Post({ post, postType, showAuthor }) {
  return (
    <div
      key={post._id}
      className="max-w-[320px] min-w-[320px] lg:max-w-[370px] lg:min-w-[370px] mx-auto"
      onClick={() =>
        window.open(
          `${WEBSITE_URL}/${postType}/${post.categories[0].toLowerCase()}/${post.subcategories[0].toLowerCase()}/${encodeURIComponent(
            post.slug.current,
          )}`,
          "_blank",
        )
      }
    >
      <div className="w-full h-full">
        <div className="rounded overflow-hidden mb-2 h-[250px] max-h-[250px] min-h-[250px]">
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src="/android-chrome-512x512.png"
              alt={post.title}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex items-center gap-x-4 text-xs">
          <time
            className="text-gray-500"
            dateTime={new Date(post.publishedAt).toDateString()}
          >
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {new Date(post.publishedAt).toDateString()}
            </span>
          </time>
          <Link
            rel="noopener noreferrer"
            href={`/${postType}/${post.categories[0].trim().toLowerCase()}`}
            className="text-md font-bold uppercase text-black"
            onClick={(event) => event.stopPropagation()}
            prefetch={false}
          >
            {post.categories &&
              post.categories.map((category: string) => (
                <span
                  key={category}
                  className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                >
                  {" "}
                  {category}
                </span>
              ))}
          </Link>
          <Link
            rel="noopener noreferrer"
            href={`/${postType}/${post.categories[0].toLowerCase()}/${post.subcategories[0].toLowerCase()}`}
            className="text-md font-bold uppercase text-black"
            onClick={(event) => event.stopPropagation()}
            prefetch={false}
          >
            {post.subcategories &&
              post.subcategories.map((subcategory: string) => (
                <span
                  key={subcategory}
                  className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                >
                  {" "}
                  {subcategory}
                </span>
              ))}
          </Link>
        </div>
        <div className="max-h-[110px] min-h-[110px] overflow-hidden overflow-ellipsis">
          <h3>
            <Link
              href={`/${postType}/${post.categories[0].toLowerCase()}/${post.subcategories[0].toLowerCase()}/${encodeURIComponent(
                post.slug.current,
              )}`}
              className="mt-2 text-lg line-clamp-2 font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
              prefetch={false}
              onClick={(event) => event.stopPropagation()}
            >
              {post.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
            {post.description}
          </p>
        </div>
        {showAuthor ? (
          <div className="relative mt-2 flex items-center gap-x-4">
            <Image
              src={urlFor(post.authorImage).url()}
              alt={`${post.name}'s picture`}
              width={460}
              height={460}
              className="h-10 w-10 rounded-full bg-gray-50"
            />
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <Link
                  href={`/${postType}/author/${post.authorSlug.current.trim().toLowerCase()}`}
                  prefetch={false}
                  onClick={(event) => event.stopPropagation()}
                >
                  <span className="absolute inset-0" />
                  {post.name}
                </Link>
              </p>
              <p className="text-gray-600"></p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default function PostCard({ post, postType }) {
  return (
    <div
      className="relative flex flex-col justify-between w-full bg-center bg-cover h-96 background-shadow text-white"
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
            post.slug.current,
          )}`,
          "_blank",
        )
      }
    >
      <div className="w-full flex items-center justify-between p-5">
        <div className="flex flex-col">
          <Link
            rel="noopener noreferrer"
            href={`/${postType}/${post.categories[0].trim().toLowerCase()}`}
            className="text-md font-bold uppercase"
            onClick={(event) => event.stopPropagation()}
            prefetch={false}
          >
            {post.categories &&
              post.categories.map((category: string) => (
                <span key={category}> {category}</span>
              ))}
          </Link>
          <Link
            rel="noopener noreferrer"
            href={`/${postType}/${post.categories[0].toLowerCase()}/${post.subcategories[0].toLowerCase()}`}
            className="text-md font-bold uppercase"
            onClick={(event) => event.stopPropagation()}
            prefetch={false}
          >
            {post.subcategories &&
              post.subcategories.map((subcategory: string) => (
                <span key={subcategory}> {subcategory}</span>
              ))}
          </Link>
        </div>
        <div className="flex flex-col justify-start text-center">
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
            <p className="font-bold">
              <Link
                href={`/${postType}/author/${post.authorSlug.current.trim().toLowerCase()}`}
                onClick={(event) => event.stopPropagation()}
                prefetch={false}
              >
                {post.name}
              </Link>
            </p>
          </div>
        </div>
        <Link
          href={`/${postType}/${post.categories[0].toLowerCase()}/${post.subcategories[0].toLowerCase()}/${encodeURIComponent(
            post.slug.current,
          )}`}
          onClick={(event) => event.stopPropagation()}
          prefetch={false}
        >
          <h2 className="font-bold text-lg hover:underline">{post.title}</h2>
        </Link>
      </div>
    </div>
  );
}
