import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import groq from "groq";
import { client } from "@/lib/sanity";
import Meta from "@/components/meta";
import Header from "@/components/header";
import { Posts } from "@/components/posts";
import { navigation } from "@/lib/nav";
import { abs } from "@/lib/utils";
import { WEBSITE_TITLE } from "@/lib/name";

export default function Search({ posts }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(router.query as unknown as string);
    if (searchParams.has("q")) {
      setQuery(searchParams.get("q"));
    }
  }, [router.query]);
  return (
    <>
      <Meta />
      <Head>
        <title>{`${WEBSITE_TITLE}`}</title>
      </Head>
      <Header options={navigation} />
      <Posts posts={posts} query={query} setQuery={setQuery} />
    </>
  );
}

export async function getServerSideProps(context: { query: unknown }) {
  const searchParams = new URLSearchParams(context.query as unknown as string);
  let posts = [];
  if (searchParams.has("q")) {
    posts = await client.fetch(groq`
      *[_type == "post" && (title match "*${searchParams.get("q")}*" || title match "*${abs(searchParams.get("q"))}*") && publishedAt < now()] | order(publishedAt desc){
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
  }
  return {
    props: {
      posts,
    },
  };
}
