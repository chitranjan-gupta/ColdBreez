import React, { useState } from "react";
import groq from "groq";
import { client } from "@/lib/sanity";
import Meta from "@/components/meta";
import Header from "@/components/header";
import { Posts } from "@/components/posts";
import { navigation } from "@/lib/nav";
import { abs } from "@/lib/utils";

export default function Index({ posts }) {
  const [query, setQuery] = useState<string>("");
  return (
    <>
      <Meta />
      <Header options={navigation} />
      <Posts posts={posts} query={query} setQuery={setQuery} />
    </>
  );
}

export async function getServerSideProps(context: {
  params: { category: string };
}) {
  const { category } = context.params;
  const posts = await client.fetch(groq`
  *[_type == "post" && references(*[_type == "category" && (title match "*${category}*" || title match "*${abs(category)}*")]._id)]{
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
