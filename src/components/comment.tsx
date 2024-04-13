import { useState, useRef, forwardRef, useEffect } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import Image from "next/image";
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

type CommentFormProps = {
  messages: string;
  setMessages: Dispatch<SetStateAction<string>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  loading?: boolean;
};

const CommentForm = forwardRef<HTMLTextAreaElement, CommentFormProps>(
  function CommentForm(props, ref) {
    return (
      <div>
        <form className="mb-6" onSubmit={props.onSubmit}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              name="message"
              rows={3}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
              defaultValue={props.messages}
              onChange={(event) => props.setMessages(event.target.value)}
              ref={ref}
            ></textarea>
            <div className="flex flex-row justify-between">
              <button
                type="submit"
                disabled={props.loading ? props.loading : false}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {props.loading ? "Loading..." : "Post Comment"}
              </button>
              <div className="flex flex-row">
                <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                  <input
                    id="anonymous"
                    type="checkbox"
                    name="anonymous"
                    className="rounded-xl outline-none"
                  />
                  <input type="hidden" name="anonymous" value="off" />
                  <label htmlFor="anonymous" className="ml-2">
                    Comment as Anonymous User
                  </label>
                </div>
                <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                  <PaperClipIcon title="Insert file" className="h-5 w-5" />
                </div>
                <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                  <MapPinIcon title="Insert Location" className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  },
);

type User = {
  _id: string;
  name: string;
};

type CommentViewProps = {
  profileUrl: string;
  userId: User;
  createdAt: string;
  messages: string;
  setMessages: Dispatch<SetStateAction<string>>;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  isExpand: boolean;
  setIsExpand: Dispatch<SetStateAction<boolean>>;
  reply: boolean;
  setReply: Dispatch<SetStateAction<boolean>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  children: string[];
};

const CommentView = forwardRef<HTMLTextAreaElement, CommentViewProps>(
  function CommentView(props, ref) {
    const newRef = useRef<any>();
    function check(callback, args) {
      if (props.reply && newRef.current) {
        if (newRef.current.value && newRef.current.value.length > 0) {
          newRef.current.focus();
          //callback(args);
          return true;
        } else {
          props.setReply(false);
          callback(args);
          return false;
        }
      } else {
        callback(args);
        return true;
      }
    }
    return (
      <div>
        <article className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                {props.profileUrl ? (
                  <Image
                    className="mr-2 w-6 h-6 rounded-full"
                    src={props.profileUrl}
                    alt={
                      props.userId && props.userId.name
                        ? `${props.userId.name}`
                        : "Anonymous User"
                    }
                    width={24}
                    height={24}
                  />
                ) : (
                  <UserCircleIcon className="mr-2 h-6 w-6 rounded-full" />
                )}
                {props.userId && props.userId.name
                  ? `${props.userId.name}`
                  : "Anonymous User"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {props.createdAt ? (
                  <time dateTime={props.createdAt} title={props.createdAt}>
                    {new Date(props.createdAt).toDateString()}
                  </time>
                ) : (
                  <></>
                )}
              </p>
            </div>
            <DropDown />
          </footer>
          <div>
            {props.edit ? (
              <CommentForm
                ref={ref}
                messages={props.messages}
                setMessages={props.setMessages}
                onSubmit={props.onSubmit}
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                {props.messages ? `${props.messages}` : ""}
              </p>
            )}
            <div className="hidden md:flex md:items-center md:mt-4 md:space-x-4">
              <div
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() =>
                  check(props.setIsExpand, props.isExpand ? false : true)
                }
              >
                {props.isExpand ? (
                  <ChevronDownIcon
                    title="Expand"
                    className="h-5 w-5 hover:text-violet-500"
                  />
                ) : (
                  <ChevronRightIcon
                    title="Contract"
                    className="h-5 w-5 hover:text-violet-500"
                  />
                )}
              </div>
              <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <HandThumbUpIcon
                  title="Like"
                  className="h-5 w-5 hover:text-violet-500"
                />
              </div>
              <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <HandThumbDownIcon
                  title="DisLike"
                  className="h-5 w-5 hover:text-violet-500"
                />
              </div>
              <div
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => props.setEdit(props.edit ? false : true)}
              >
                <PencilSquareIcon
                  title="Edit"
                  className="h-5 w-5 hover:text-violet-500"
                />
              </div>
              <div
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => {
                  props.setIsExpand(true);
                  props.setReply(true);
                }}
              >
                <ChatBubbleLeftEllipsisIcon
                  title="Reply"
                  className="h-5 w-5 hover:text-violet-500"
                />
              </div>
              <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <TrashIcon
                  title="Delete"
                  className="h-5 w-5 hover:text-violet-500"
                />
              </div>
            </div>
          </div>
        </article>
        {props.isExpand && (
          <div className="ml-6 lg:ml-12">
            {props.reply && (
              <Comment
                ref={newRef}
                isEdit={true}
                comment={{
                  _id: props.children.length + 1,
                  profileUrl: props.profileUrl,
                  userId:
                    props.userId && props.userId.name
                      ? props.userId
                      : { _id: "Anonymous User", name: "Anonymous User" },
                  createdAt: new Date().toDateString(),
                  message: "",
                  children: [],
                }}
              />
            )}
            {props.children.map((child) => (
              <SuspenseComment key={child.toString()} _id={child} />
            ))}
          </div>
        )}
      </div>
    );
  },
);

type CommentProps = {
  comment: comment;
  isEdit: boolean;
};

const Comment = forwardRef<HTMLTextAreaElement, CommentProps>(
  function Comment(props, ref) {
    const [edit, setEdit] = useState(props.isEdit); // Enable editing comment
    const [isExpand, setIsExpand] = useState(false); //Browser child comments
    const [messages, setMessages] = useState(
      props.comment && props.comment.message ? props.comment.message : "",
    ); //Store the comment
    const [reply, setReply] = useState(false); // Enable reply to comment
    async function onSubmit(event: FormEvent) {
      event.preventDefault();
      setEdit(false);
      if (messages.length > 0) {
        // const index = comments.findIndex(
        //   (comment) => comment._id == props.comment._id,
        // );
        // if (index > -1) {
        //   comments[index].children.push({
        //     message: messages,
        //     ...props.comment,
        //   });
        //   setReply(false);
        // }
      }
    }
    return (
      <CommentView
        ref={ref}
        edit={edit}
        setEdit={setEdit}
        isExpand={isExpand}
        setIsExpand={setIsExpand}
        messages={messages}
        setMessages={setMessages}
        reply={reply}
        setReply={setReply}
        onSubmit={onSubmit}
        {...props.comment}
      />
    );
  },
);

type comment = {
  _id: number;
  profileUrl: string;
  userId: User;
  createdAt: string;
  message: string;
  children: string[];
};

const SuspenseComment = forwardRef<HTMLTextAreaElement, { _id: string }>(
  function SuspenseComment(props, ref) {
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState<comment>();
    const [error, setError] = useState("");
    async function getComment(_id: string) {
      setLoading(true);
      setError(null); // Clear previous errors when a new request starts
      try {
        const res = await fetch("/api/comment/read", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: "d116ded5-268f-4971-a85a-0c9925a0af03",
            commentId: _id,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        if (res.ok) {
          setComment(data);
        }
      } catch (err) {
        // Capture the error message to display to the user
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    useEffect(() => {
      void getComment(props._id);
    }, [props._id]);
    return (
      <>
        {loading ? "Loading..." : <Comment comment={comment} isEdit={false} />}
      </>
    );
  },
);

export default function Comments() {
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState<comment[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors when a new request starts
    try {
      const formData = new FormData(event.currentTarget);
      const jsonData = (function (formData) {
        const json = {};
        json["postId"] = "d116ded5-268f-4971-a85a-0c9925a0af03";
        console.log(formData.get("anonymous").toString());
        json["userId"] =
          formData.get("anonymous").toString() == "on"
            ? "661540dcc9dd75cc41f93879"
            : "661540dcc9dd75cc41f93899";
        formData.delete("anonymous");
        formData.forEach((value, key) => {
          json[key] = value;
        });
        return JSON.stringify(json);
      })(formData);
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        throw new Error(res.statusText);
      }
      if (res.ok) {
        console.log(data);
      }
    } catch (err) {
      // Capture the error message to display to the user
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    async function getComments() {
      const res = await fetch("/api/comment/read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: "d116ded5-268f-4971-a85a-0c9925a0af03",
        }),
      });
      const data = await res.json();
      console.log(data);
      setComments(data);
    }
    void getComments();
  }, []);
  return (
    <>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              {`Discussion (${comments.length})`}
            </h2>
          </div>
          <CommentForm
            messages={message}
            setMessages={setMessage}
            onSubmit={onSubmit}
            loading={loading}
          />
          <div>{error && <p>{error}</p>}</div>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} isEdit={false} />
          ))}
        </div>
      </section>
    </>
  );
}
