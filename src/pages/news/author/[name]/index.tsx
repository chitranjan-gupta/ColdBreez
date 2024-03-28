import React from "react";
import groq from "groq";
import Image from "next/image";
import Link from "next/link";
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import Error from "@/components/404";
import { client, urlFor } from "@/lib/sanity";

export default function Index({ author, posts }) {
  if (!author || !posts) {
    return <Error />
  }
  return (
    <div className="bg-white py-10">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{author.name ? <>{author.name}<CheckBadgeIcon className="h-10 w-10 inline text-blue-500" aria-hidden="true" /></> : <></>}</h2>
          <p className="mt-4 text-gray-500">{author.bio ? author.bio : <></>}</p>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post._id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.publishedAt} className="text-gray-500">
                    {new Date(post.publishedAt).toString()}
                  </time>
                  <Link
                    href={""}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    prefetch={false}
                  >
                  </Link>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={post.slug.current} prefetch={false}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
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
  )
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
  *[_type == "post" && references(*[_type == "author" && slug.current == "${name}"]._id)][1...10]{
      _id,
      title,
      description,
      "categories": categories[]->title,
      "subcategories": subcategories[]->title,
      publishedAt,
      slug,
      mainImage
    }
  `);
  return {
    props: {
      author,
      posts,
      revalidate: 10,
    },
  };
}

export async function getStaticPaths() {
  const authors = await client.fetch(
    groq`*[_type == "author" && defined(slug.current)][]{
      slug
    }`,
  );
  const paths = [];
  authors.forEach(
    (author: { slug: any }) => {
      paths.push({
        params: {
          name: author.slug.current,
        },
      });
    },
  );
  return {
    paths: paths,
    fallback: true,
  };
}
