import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import groq from "groq";
import { BoltIcon } from "@heroicons/react/20/solid";
import { client } from "@/lib/sanity";
import Meta from "@/components/meta";
import { navigation } from "@/lib/nav";
import { poster, instagram, threads, twitter, facebook } from "@/img/index";
import { WEBSITE_TITLE, WEBSITE_URL } from "@/lib/name";
import Header from "@/components/header";
import { Post } from "@/components/post";
import { BreadcrumbSchema, SearchBoxSchema } from "@/lib/schema";
import { Breadcrumbs, WEBSITE_NAME, WEBSITE_TYPE } from "@/lib/name";

export default function Main({ posts }) {
  return (
    <>
      <Meta />
      <Head>
        <script type="application/ld+json">
          {`${BreadcrumbSchema(Breadcrumbs)}`}
        </script>
        <script type="application/ld+json">
          {`${SearchBoxSchema({ domain: WEBSITE_NAME, url: WEBSITE_URL, type: WEBSITE_TYPE })}`}
        </script>
      </Head>
      <section id="hero">
        <div className="bg-white">
          <div className="relative isolate px-6 pt-14 lg:px-8">
            <div
              className="absolute inset-x-0 -top-40 -z-20 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ff8bfb] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] background-design" />
            </div>
            <Header options={navigation} />
            <div className="relative grid grid-cols-1 gap-5 lg:grid-cols-3 my-12 -z-10 overflow-x-hidden">
              {posts.length > 0 &&
                posts.map((post: { _id: React.Key }) => (
                  <Post
                    key={post._id}
                    post={post}
                    postType="news"
                    showAuthor={true}
                  />
                ))}
            </div>
            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-20 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#80ff8bfb] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] background-design" />
            </div>
          </div>
        </div>
      </section>
      <section id="newsletter">
        <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="max-w-xl lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Subscribe to our newsletter.
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-300">
                  Don&apos;t Miss out: Exclusive Articles.
                </p>
                <form
                  className="mt-6 flex max-w-md gap-x-4"
                  method="POST"
                  action="/api"
                >
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                    <BoltIcon className="h-5 w-5 text-amber-500" />
                  </div>
                  <dt className="mt-4 font-semibold text-white">
                    Daily articles
                  </dt>
                  <dd className="mt-2 leading-7 text-gray-400">
                    Every day we post news articles.
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                    <BoltIcon className="h-5 w-5 text-amber-500" />
                  </div>
                  <dt className="mt-4 font-semibold text-white">No spam</dt>
                  <dd className="mt-2 leading-7 text-gray-400">
                    We do not send spam emails.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div
            className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
            aria-hidden="true"
          >
            <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#80ff8bfb] to-[#9089fc] opacity-30 background-design" />
          </div>
        </div>
      </section>
      <h1 className="w-full text-center font-bold text-xl">{`${WEBSITE_TITLE}`}</h1>
      <footer className="bg-white rounded-lg shadow m-4">
        <div className="w-full mx-auto p-4 md:py-8">
          <div className="w-full flex flex-col justify-between items-start md:flex-row">
            <div className="w-full h-32 md:w-1/4 md:mb-0">
              <div className="w-full h-full">
                <Link
                  href="/"
                  className="relative block h-32 w-70"
                  prefetch={false}
                >
                  <Image
                    alt={`${WEBSITE_TITLE}'s poster`}
                    src={poster}
                    fill={true}
                    sizes="100w"
                    className="w-auto h-auto object-cover object-center"
                  />
                </Link>
              </div>
            </div>
            <ul className="grid grid-cols-1 grid-rows-4 justify-start gap-y-2 md:w-1/2 md:grid-rows-2 md:grid-cols-2">
              <li className="flex">
                <Link
                  target="_blank"
                  className="flex flex-row items-center"
                  href="https://instagram.com/coldbreez_"
                  prefetch={false}
                >
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-black/10">
                    <Image
                      src={instagram}
                      alt="Instagram "
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className="ml-2">instagram.com/coldbreez_</span>
                </Link>
              </li>
              <li className="flex">
                <Link
                  target="_blank"
                  className="flex flex-row items-center"
                  href="https://www.threads.net/@coldbreez_"
                  prefetch={false}
                >
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-black/10">
                    <Image src={threads} alt="Threads" width={20} height={20} />
                  </div>
                  <span className="ml-2">threads.net/@coldbreez_</span>
                </Link>
              </li>
              <li className="flex">
                <Link
                  target="_blank"
                  className="flex flex-row items-center"
                  href="https://x.com/@coldbreez_"
                  prefetch={false}
                >
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-black/10">
                    <Image src={twitter} alt="X" width={20} height={20} />
                  </div>
                  <span className="ml-2">x.com/@coldbreez_</span>
                </Link>
              </li>
              <li className="flex">
                <Link
                  target="_blank"
                  className="flex flex-row items-center"
                  href="https://www.facebook.com/profile.php?id=61555122121402"
                  data-href="https://www.facebook.com/profile.php?id="
                  prefetch={false}
                >
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-black/10">
                    <Image
                      src={facebook}
                      alt="Facebook"
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className="ml-2">facebook.com/coldbreez</span>
                </Link>
              </li>
            </ul>
            <ul className="md:w-1/4 flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 ">
              <li>
                <Link
                  href="/about"
                  className="mr-4 hover:underline md:mr-6"
                  prefetch={false}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacypolicy"
                  className="mr-4 hover:underline md:mr-6"
                  prefetch={false}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contactus"
                  className="hover:underline"
                  prefetch={false}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="hover:underline ml-2"
                  prefetch={false}
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:underline ml-2"
                  prefetch={false}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
          <span className="block text-sm sm:text-center">
            <Link
              href={WEBSITE_URL}
              className="hover:underline"
              prefetch={false}
            >
              © 2024 {WEBSITE_TITLE}™
            </Link>
          </span>
        </div>
      </footer>
    </>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(groq`
  *[_type == "post"] | order(publishedAt desc)[0...20]{
        _id,
        title,
        description,
        "name": author->name,
        "authorSlug": author->slug,
        "categories": categories[]->title,
        "subcategories": subcategories[]->title,
        publishedAt,
        slug,
        "authorImage": author->image,
        mainImage,
      }
    `);
  return {
    props: {
      posts,
      revalidate: 10,
    },
  };
}
