import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import groq from "groq";
import { client, urlFor } from "@/lib/sanity";
import { Pagination } from "@/components/pagination";
import Header from "@/components/header";
import { navigation } from "@/lib/nav";
import { WEBSITE_TITLE } from "@/lib/name";

function Author({ author }) {
  return (
    <li key={author._id}>
      <Link href={`/news/author/${author.slug.current}`} prefetch={false}>
        <div className="flex items-center gap-x-6">
          <div className="h-16 w-16 relative">
            <Image
              className="rounded-full"
              src={urlFor(author.image).url()}
              alt={`${author.name}'s photo`}
              fill={true}
            />
          </div>
          <div>
            <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
              {author.name}
            </h3>
            <p className="text-sm font-semibold leading-6 text-indigo-600">
              Author
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default function Index({ authors }) {
  return (
    <>
      <Head>
        <title>{`${WEBSITE_TITLE} - authors`}</title>
      </Head>
      <Header options={navigation} />
      <div className="bg-white mt-10 overflow-y-scroll md:overflow-hidden">
        <div className="bg-white py-7">
          <div className="mx-auto grid max-w-7xl gap-x-5 gap-y-10 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Meet our Author
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Welcome to the &quot;Meet Our Author&quot; page, where you can
                learn more about the brilliant mind behind our captivating
                stories. Our author brings a unique perspective to their work,
                weaving intricate narratives that transport readers to new
                worlds and evoke a myriad of emotions. With a passion for
                storytelling and a dedication to craftmanship, our author&apos;s
                words provoke to inspire, entertain and provoke thought. Join us
                on a journey discover the creative genius behind the pages, and
                delve into the imagination of our extraordinary author.
              </p>
            </div>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              {authors.map((author: { _id: React.Key }) => (
                <Author key={author._id} author={author} />
              ))}
            </ul>
          </div>
        </div>
        <Pagination />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const authors = await client.fetch(groq`*[_type == "author"]{
        _id,
      name,
      slug,
      image
    }`);
  return {
    props: {
      authors,
    },
  };
}
