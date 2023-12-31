import { useState } from "react";
import groq from "groq";
import { client } from "@/lib/sanity";
import Meta from "@/component/meta";
import Header from "@/component/header";
import PostCard from "@/component/post";
import { navigation, capitalize } from "@/lib/nav";

export default function Index({ posts }) {
  const [query, setQuery] = useState("");
  function search() {}
  return (
    <>
      <Meta />
      <Header options={navigation} />
      <div className="w-full h-full p-5 mt-12 -z-10 absolute">
        <div className="mb-4">
          <div className="relative bg-white">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Search blogs"
              onChange={(event) => setQuery(event.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2">
          {posts.length > 0 &&
            posts
              .filter((post) => {
                if (query == "") {
                  return post;
                } else if (
                  post.title.toLowerCase().includes(query.toLowerCase())
                ) {
                  return post;
                }
              })
              .map(
                (post) => (
                  <PostCard key={post._id} post={post} postType="news"/>
                )
              )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { subcategory } = context.params;
  const posts = await client.fetch(groq`
  *[_type == "post" && references(*[_type == "subcategory" && title == "${capitalize(
    subcategory
  )}"]._id)]{
      _id,
      title,
      "name": author->name,
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
