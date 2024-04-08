import React, { useState } from "react";
import groq from "groq";
import Head from "next/head";
import Link from "next/link";
import { client } from "@/lib/sanity";
import Meta from "@/components/meta";
import Header from "@/components/header";
import { navigation } from "@/lib/nav";
import { Posts } from "@/components/posts";
import { WEBSITE_TITLE, WEBSITE_TYPE } from "@/lib/name";

export default function Index({ posts }) {
  const [query, setQuery] = useState("");
  return (
    <>
      <Meta />
      <Head>
        <title>{`${WEBSITE_TITLE} - ${WEBSITE_TYPE}`}</title>
      </Head>
      <Header options={navigation}>
        <Link href="/news/author" prefetch={false}>
          Authors
        </Link>
      </Header>
      <Posts posts={posts} query={query} setQuery={setQuery} />
    </>
  );
}

export async function getServerSideProps() {
  const posts = await client.fetch(groq`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc){
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
      mainImage
    }
  `);
  return {
    props: {
      posts,
    },
  };
}
