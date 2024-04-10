import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import groq from "groq";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from "@portabletext/react";
import Error from "@/components/404";
import { client, urlFor } from "@/lib/sanity";
import { logo as poster } from "@/img/index";
import { WEBSITE_NAME, WEBSITE_URL, WEBSITE_TYPE } from "@/lib/name";
import { ptComponents } from "@/components/Portable";
import { navigation } from "@/lib/nav";
import Header from "@/components/header";
import { ArticleSchema, ArticleType } from "@/lib/schema";
import { abs } from "@/lib/utils";

const Post = ({ post, posts }) => {
  if (!post) return <Error />;
  const {
    title = "Missing title",
    description = "Missing description",
    name = "Missing name",
    bio = "Missing Bio",
    categories,
    subcategories,
    publishedAt,
    authorImage,
    body = [],
  } = post;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta
          name="og:image"
          content={post.mainImage ? urlFor(post.mainImage).url() : poster.src}
        />
        <meta
          name="og:url"
          content={`${WEBSITE_URL}/${WEBSITE_TYPE}/${abs(post.categories[0])}/${abs(post.subcategories[0])}/${abs(post.slug.current)}`}
        />
        <meta name="og:site_name" content={WEBSITE_NAME} />
        <meta name="og:locale" content="en_US" />
        <meta name="og:type" content="article" />
        <script type="application/ld+json">
          {`${ArticleSchema({ domain: WEBSITE_NAME, url: WEBSITE_URL, type: WEBSITE_TYPE, articleType: ArticleType[WEBSITE_TYPE], post: post })}`}
        </script>
      </Head>
      <Header options={navigation} />
      <div className="flex flex-row justify-center items-center p-2 sm:px-0 mt-14">
        <article className="prose prose-stone sm:prose-sm lg:prose-xl bg-white">
          <h1 className="">{title}</h1>
          <h4 className=" text-slate-600">{description}</h4>
          <div className="not-prose flex flex-row justify-between items-center border-y w-full mt-3 mb-3 p-1">
            <div className="flex flex-row items-center">
              {authorImage && (
                <div className="relative h-10 w-10 bg-gray-50">
                  <Image
                    src={urlFor(authorImage).url()}
                    alt={`${name}'s picture`}
                    fill={true}
                    sizes="100w"
                    className="rounded-full"
                  />
                </div>
              )}
              <div className="ml-2 flex flex-col items-start justify-around">
                <Link
                  href={`/${WEBSITE_TYPE}/author/${abs(post.authorSlug.current)}`}
                >
                  <p className="font-semibold text-gray-900">{name}</p>
                </Link>
                <div className="flex flex-col items-start lg:flex-row lg:items-center">
                  {categories && (
                    <p className="text-gray-600">
                      Posted in
                      {categories.map((category: string) => (
                        <span key={category}> {category}</span>
                      ))}{" "}
                      -
                      {subcategories.map((subcategory: string) => (
                        <span key={subcategory}> {subcategory}</span>
                      ))}
                    </p>
                  )}
                  <span className="hidden lg:block mx-2">.</span>
                  <time
                    className="text-gray-500"
                    dateTime={new Date(publishedAt).toDateString()}
                  >
                    {new Date(publishedAt).toDateString()}
                  </time>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full h-96 object-contain">
            <Image
              src={post.mainImage ? urlFor(post.mainImage).url() : poster}
              alt={`${title}'s image`}
              fill={true}
              sizes="100w"
            />
          </div>
          <div className="w-full pt-3">
            <PortableText value={body} components={ptComponents} />
          </div>
        </article>
      </div>
      <div className="w-full flex flex-col justify-center items-center px-2 md:px-10 mt-10">
        <div>
          <div>
            <div className="relative mt-2 flex items-center gap-x-4 min-w-[360px] md:min-w-[800px]">
              <Image
                src={urlFor(authorImage).url()}
                alt={`${name}'s picture`}
                width={460}
                height={460}
                className="h-20 w-20 rounded-full bg-gray-50"
              />
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <Link
                    href={`/${WEBSITE_TYPE}/author/${abs(post.authorSlug.current)}`}
                    prefetch={false}
                  >
                    <span className="absolute inset-0" />
                    {name}
                  </Link>
                </p>
                <p className="text-gray-600">{bio}</p>
              </div>
            </div>
          </div>
          <span className="font-semibold text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-1">
            <Link href={`/${WEBSITE_TYPE}`} prefetch={false}>
              Latest {WEBSITE_TYPE} :
            </Link>
          </span>
        </div>
        <div className="ml-3 md:ml-0">
          <div className="flex flex-row flex-wrap justify-center p-2 overflow-x-scroll overflow-y-hidden -ml-4 sm:ml-0">
            {posts.map(
              (post: {
                _id: React.Key;
                mainImage: SanityImageSource;
                title: string;
                publishedAt: string | Date;
                categories: string[];
                subcategories: string[];
                slug: { current: string };
                description: string;
              }) => (
                <div key={post._id} className="w-full md:w-1/2 lg:w-1/3 mx-7">
                  <div className="max-w-[370px] min-w-[370px] mx-auto mb-10">
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
                          src={poster}
                          alt="Missing Image"
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
                        href={`/${WEBSITE_TYPE}/${abs(post.categories[0])}`}
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
                        href={`/${WEBSITE_TYPE}/${abs(post.categories[0])}/${abs(post.subcategories[0])}`}
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
                          href={`/${WEBSITE_TYPE}/${abs(post.categories[0])}/${abs(post.subcategories[0])}/${abs(post.slug.current)}`}
                          className="mt-2 text-lg line-clamp-2 font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                          prefetch={false}
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  description,
  "name": author->name,
  "authorSlug": author->slug,
  "bio": author->bio[0].children[0].text,
  "categories": categories[]->title,
  "subcategories": subcategories[]->title,
  publishedAt,
  "modifiedAt": _updatedAt,
  "authorImage": author->image,
  mainImage,
  slug,
  body
}`;

export async function getStaticProps(context: { params: { slug?: "" } }) {
  const { slug = "" } = context.params;
  const post = await client.fetch(query, { slug });
  let posts = [];
  if (post && post.authorSlug && post.authorSlug.current.trim()) {
    posts = await client.fetch(
      groq`
    *[_type == "post" && author->slug.current == $authorSlug][0...4] | order(publishedAt desc){
      _id,
      title,
      description,
      "name": author->name,
      "categories": categories[]->title,
      "subcategories": subcategories[]->title,
      publishedAt,
      slug,
      "authorImage": author->image,
      mainImage
    }
  `,
      { authorSlug: post.authorSlug.current.trim() },
    );
  }
  return {
    props: {
      post,
      posts,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const posts = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][]{
      "slug": slug.current,
      "category": categories[0]->title,
      "subcategory": subcategories[0]->title
    }`,
  );
  const paths = [];
  posts.forEach(
    (post: { category: string; subcategory: string; slug: any }) => {
      paths.push({
        params: {
          category: post.category.toLowerCase(),
          subcategory: post.subcategory.toLowerCase(),
          slug: post.slug,
        },
      });
    },
  );
  return {
    paths: paths,
    fallback: true,
  };
}

export default Post;
