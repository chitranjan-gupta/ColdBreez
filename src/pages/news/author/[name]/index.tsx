import React from "react";
import groq from "groq";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Error from "@/components/404";
import { client, urlFor } from "@/lib/sanity";
import { getMonth, getDay, getYear } from "@/lib/nav";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { WEBSITE_TITLE } from "@/lib/name";

export default function Index({ author, posts }) {
  if (!author) {
    return <Error />;
  }
  return (
    <>
      <Head>
        <title>{`${WEBSITE_TITLE} - ${author.name ? author.name : "author"}`}</title>
      </Head>
      <div className="bg-white py-10">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center px-4 gap-x-5 lg:grid-rows-2 lg:grid-cols-2 lg:max-w-7xl">
          <div className="order-2 md:order-1">
            <h2 className="text-5xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {author.name ? (
                <>
                  {author.name}
                  <CheckBadgeIcon
                    className="h-10 w-10 inline text-blue-500"
                    aria-hidden="true"
                  />
                </>
              ) : (
                <></>
              )}
            </h2>
            <p className="mt-1 text-gray-500 text-xl font-bold">
              {author.bio ? author.bio : <></>}
            </p>
            <span className="text-xl font-bold">Stories</span>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 border-t border-gray-200 pt-5 lg:mx-0 lg:max-w-none">
              {posts.map(
                (post: {
                  subcategories: any;
                  categories: any;
                  mainImage: SanityImageSource;
                  _id: React.Key;
                  publishedAt: string | Date;
                  slug: { current: string };
                  title: string;
                  description: string;
                }) => (
                  <article
                    key={post._id}
                    className="flex max-w-xl max-h-[220px] lg:max-h-[165px] overflow-hidden flex-row gap-2 items-center justify-between"
                  >
                    <div className="flex max-w-xl flex-col items-start justify-between">
                      <div className="flex items-center justify-between flex-row gap-x-4 text-xs w-full">
                        <div className="flex items-start flex-col">
                          <time
                            dateTime={post.publishedAt.toString()}
                            className="text-gray-500 flex items-start flex-col gap-1"
                          >
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              {`${new Date(post.publishedAt).getDate()} / ${new Date(post.publishedAt).getMonth()} / ${new Date(post.publishedAt).getFullYear()}`}
                            </span>
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              {`${getDay(new Date(post.publishedAt).getDay())} ${getMonth(new Date(post.publishedAt).getMonth())} ${getYear(new Date(post.publishedAt).getFullYear())}`}
                            </span>
                          </time>
                        </div>
                        <div className="flex items-end flex-col gap-1">
                          <Link
                            rel="noopener noreferrer"
                            href={`/news/${post.categories[0].trim().toLowerCase()}`}
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
                            href={`/news/${post.categories[0].toLowerCase()}/${post.subcategories[0].toLowerCase()}`}
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
                      </div>
                      <div className="group relative">
                        <h3 className="mt-2 text-lg line-clamp-2 font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <Link
                            href={`/news/${post.categories[0].toLowerCase()}/${post.subcategories[0].toLowerCase()}/${encodeURIComponent(
                              post.slug.current,
                            )}`}
                            prefetch={false}
                          >
                            <span className="absolute inset-0" />
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                          {post.description}
                        </p>
                      </div>
                    </div>
                    <div className="relative h-36 w-36 min-h-[144px] min-w-[144px]">
                      <Image
                        src={
                          post.mainImage
                            ? urlFor(post.mainImage).url()
                            : "/android-chrome-512x512.png"
                        }
                        alt={`${post.title}`}
                        fill={true}
                        className="rounded-lg bg-gray-100 w-full h-full"
                      />
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
          <div className="sticky grid grid-cols-2 grid-rows-2 gap-4 w-full self-start order-1 md:order-2">
            <div className="relative h-48 md:h-64 w-full">
              <Image
                src={urlFor(author.image).url()}
                alt={`${author.name}'s photo`}
                className="rounded-lg bg-gray-100"
                fill={true}
              />
            </div>
            <div className="relative h-48 md:h-64 w-full">
              <Image
                src={urlFor(author.image).url()}
                alt={`${author.name}'s photo`}
                className="rounded-lg bg-gray-100"
                fill={true}
              />
            </div>
            <div className="relative h-48 md:h-64 w-full">
              <Image
                src={urlFor(author.image).url()}
                alt={`${author.name}'s photo`}
                className="rounded-lg bg-gray-100"
                fill={true}
              />
            </div>
            <div className="relative h-48 md:h-64 w-full">
              <Image
                src={urlFor(author.image).url()}
                alt={`${author.name}'s photo`}
                className="rounded-lg bg-gray-100"
                fill={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const query = groq`*[_type == "author" && slug.current == $name][0]{
  _id,
  name,
  "bio": bio[0].children[0].text,
  slug,
  image
}`;

export async function getStaticProps(context: { params: { name?: "" } }) {
  const { name = "" } = context.params;
  const author = await client.fetch(query, { name });
  const posts = await client.fetch(groq`
  *[_type == "post" && references(*[_type == "author" && slug.current == "${name}"]._id)] | order(publishedAt desc)[0...10]{
      _id,
      title,
      description,
      "categories": categories[]->title,
      "subcategories": subcategories[]->title,
      publishedAt,
      slug,
      mainImage,
    }
  `);
  return {
    props: {
      author,
      posts,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const authors = await client.fetch(
    groq`*[_type == "author" && defined(slug.current)][]{
      slug
    }`,
  );
  const paths = [];
  authors.forEach((author: { slug: any }) => {
    paths.push({
      params: {
        name: author.slug.current,
      },
    });
  });
  return {
    paths: paths,
    fallback: true,
  };
}
