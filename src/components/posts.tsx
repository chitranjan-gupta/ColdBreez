import Error from "@/components/404";
import { Post } from "@/components/post";
import { abs } from "@/lib/utils";

export function Posts({ posts, query, setQuery }) {
  return (
    <>
      {posts.length > 0 ? (
        <div className="w-full h-full p-5 mt-12 -z-10 absolute">
          <div
            className="absolute inset-x-0 -top-40 -z-20 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ff8bfb] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] background-design" />
          </div>
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
                placeholder="Search news"
                value={query}
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
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {posts.length > 0 &&
              posts
                .filter((post: { title: string }) => {
                  if (query == "") {
                    return post;
                  } else if (abs(post.title).includes(abs(query))) {
                    return post;
                  }
                })
                .map((post: { _id: React.Key }) => (
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
      ) : (
        <Error />
      )}
    </>
  );
}
