import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
// import useSWR from "swr";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  PencilSquareIcon,
  TrashIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
  PaperClipIcon,
  MapPinIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import DropDown from "@/components/dropdown";

function CommentForm({ message = "", onSubmit }) {
  return (
    <div>
      <form className="mb-6" onSubmit={onSubmit}>
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows={3}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required
            defaultValue={message}
          ></textarea>
          <div className="flex flex-row justify-between">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Post comment
            </button>
            <div className="flex flex-row">
              <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <PaperClipIcon name="Insert file" className="h-5 w-5" />
              </div>
              <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <MapPinIcon name="Insert Location" className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function CommentView({
  profileUrl,
  name,
  time,
  message,
  children,
  edit,
  setEdit,
  isExpand,
  setIsExpand,
}) {
  return (
    <div>
      <article className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
              {profileUrl ? (
                <Image
                  className="mr-2 w-6 h-6 rounded-full"
                  src={profileUrl}
                  alt={name}
                  width={24}
                  height={24}
                />
              ) : (
                <UserCircleIcon className="h-5 w-5" />
              )}
              {name ? `${name}` : ""}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {time ? (
                <time dateTime={time} title={time}>
                  {time}
                </time>
              ) : (
                <></>
              )}
            </p>
          </div>
          <DropDown />
        </footer>
        <div>
          {edit ? (
            <CommentForm message={message} onSubmit={onSubmit} />
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              {message ? `${message}` : ""}
            </p>
          )}
          <div className="hidden md:flex md:items-center md:mt-4 md:space-x-4">
            <div
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setIsExpand(isExpand ? false : true)}
            >
              {isExpand ? (
                <ChevronDownIcon name="Expand" className="h-5 w-5" />
              ) : (
                <ChevronRightIcon name="Contract" className="h-5 w-5" />
              )}
            </div>
            <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <HandThumbUpIcon name="Like" className="h-5 w-5" />
            </div>
            <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <HandThumbDownIcon name="DisLike" className="h-5 w-5" />
            </div>
            <div
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setEdit(edit ? false : true)}
            >
              <PencilSquareIcon name="Edit" className="h-5 w-5" />
            </div>
            <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <ChatBubbleLeftEllipsisIcon name="Reply" className="h-5 w-5" />
            </div>
            <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <TrashIcon name="Delete" className="h-5 w-5" />
            </div>
          </div>
        </div>
      </article>
      {isExpand && (
        <div className="ml-6 lg:ml-12">
          {children.map((child) => (
            <Comment key={child.id} comment={child} />
          ))}
        </div>
      )}
    </div>
  );
}

async function onSubmit(event: FormEvent) {
  event.preventDefault();
}

function Comment({ comment }) {
  const [edit, setEdit] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  return (
    <CommentView
      {...comment}
      edit={edit}
      setEdit={setEdit}
      isExpand={isExpand}
      setIsExpand={setIsExpand}
    />
  );
}

const comments = [
  {
    id: 1,
    profileUrl: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
    name: "Michael Gough",
    time: "2022-02-08",
    message: `Very straight-to-point article. Really worth time reading. Thank you! 
But tools are just the instruments for the UX designers. The
knowledge of the design tools are as important as the creation of
the design strategy.`,
    children: [
      {
        id: 1,
        profileUrl:
          "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
        name: "Jese Leos",
        time: "2022-02-12",
        message: `Much appreciated! Glad you liked it ☺️`,
        children: [],
      },
      {
        id: 2,
        profileUrl:
          "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
        name: "Bonnie Green",
        time: "2022-03-12",
        message: `The article covers the essentials, challenges, myths and stages
        the UX designer should consider while creating the design
        strategy.`,
        children: [
          {
            id: 1,
            profileUrl:
              "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
            name: "Michael Gough",
            time: "2022-02-08",
            message: `Very straight-to-point article. Really worth time reading. Thank
                you! But tools are just the instruments for the UX designers. The
                knowledge of the design tools are as important as the creation of
                the design strategy.`,
            children: [
              {
                id: 1,
                profileUrl:
                  "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
                name: "Jese Leos",
                time: "2022-02-12",
                message: `Much appreciated! Glad you liked it ☺️`,
                children: [],
              },
              {
                id: 2,
                profileUrl:
                  "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
                name: "Bonnie Green",
                time: "2022-03-12",
                message: `The article covers the essentials, challenges, myths and stages
                the UX designer should consider while creating the design
                strategy.`,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    profileUrl: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
    name: "Bonnie Green",
    time: "2022-03-12",
    message: `The article covers the essentials, challenges, myths and stages
    the UX designer should consider while creating the design
    strategy.`,
    children: [],
  },
  {
    id: 3,
    profileUrl: "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
    name: "Helene Engels",
    time: "2022-06-23",
    message: `Thanks for sharing this. I do came from the Backend development
    and explored some of the tools to design my Side Projects.`,
    children: [],
  },
];

export default function Comments() {
  //   const fetcher = (...args) => fetch(...args).then((res) => res.json());
  //   const { data, error, isLoading } = useSWR("/api/comment", fetcher);
  const [edit, setEdit] = useState(false);
  return (
    <>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion (20)
            </h2>
          </div>
          <CommentForm onSubmit={onSubmit} />
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </section>
    </>
  );
}
