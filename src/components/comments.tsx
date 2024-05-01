import { useState, useRef, forwardRef, useId } from "react";
import type { FormEvent } from "react";
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
import type {
  CommentFormProps,
  CommentViewProps,
  comment,
  CommentProps,
} from "@/types/index";
import DropDown from "@/components/dropdown";
import { Spinner } from "@/components/Spinner";
import {
  useGetCommentsQuery,
  useGetCommentQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "state/api/comment.api";
import { useAuthContext } from "@/context/AuthContext";

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
                {props.loading ? (
                  <div className="flex flex-row items-center text-white">
                    <Spinner /> Loading...
                  </div>
                ) : (
                  "Post Comment"
                )}
              </button>
              <div className="flex flex-row">
                <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                  <input
                    type="checkbox"
                    name="anonymous"
                    className="rounded-xl outline-none"
                  />
                  <label className="ml-2">Comment as Anonymous User</label>
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

const CommentView = forwardRef<HTMLTextAreaElement, CommentViewProps>(
  function CommentView(props, ref) {
    const { userId, email, name } = useAuthContext();
    const [deleteComment, { isLoading: isDeleting }] =
      useDeleteCommentMutation();
    const [updateComment, { isLoading: isUpdating }] =
      useUpdateCommentMutation();
    const [addComment, { isLoading: isCreating }] = useAddCommentMutation();
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
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      props.setEdit(false);
      if (props.messages != props.message) {
        const formData = new FormData(event.currentTarget);
        const jsonData = (function (formData) {
          const json = {};
          json["postId"] = "d116ded5-268f-4971-a85a-0c9925a0af03";
          if (
            !userId ||
            (formData.has("anonymous") &&
              formData.get("anonymous").toString() == "on")
          ) {
            json["userId"] = "661540dcc9dd75cc41f93879";
            formData.delete("anonymous");
          } else {
            json["userId"] = userId;
          }
          if (props.parentID) {
            json["parentId"] = props.parentID;
          } else {
            json["commentId"] = props._id;
          }
          formData.forEach((value, key) => {
            json[key] = value;
          });
          return json;
        })(formData) as comment;
        if (props.parentID) {
          await addComment(jsonData);
          if (props.parentID) {
            props.parentReply(false);
          }
        } else {
          await updateComment(jsonData);
        }
      }
    }
    async function onDelete() {
      const jsonData = (function () {
        const json = {};
        json["postId"] = "d116ded5-268f-4971-a85a-0c9925a0af03";
        if (!userId) {
          json["userId"] = "661540dcc9dd75cc41f93879";
        } else {
          json["userId"] = userId;
        }
        if (props.parentId) {
          json["parentId"] = props.parentId;
        }
        json["commentId"] = props._id;
        return json;
      })() as comment;
      await deleteComment(jsonData);
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
                onSubmit={onSubmit}
                loading={isUpdating}
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                {props.messages ? `${props.messages}` : ""}
              </p>
            )}
            <div className="hidden md:flex md:items-center md:mt-4 md:space-x-4">
              <button
                onClick={() =>
                  check(props.setIsExpand, props.isExpand ? false : true)
                }
              >
                <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
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
              </button>
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
              <button
                onClick={() => {
                  props.setIsExpand(true);
                  props.setReply(true);
                }}
              >
                <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                  <ChatBubbleLeftEllipsisIcon
                    title="Reply"
                    className="h-5 w-5 hover:text-violet-500"
                  />
                </div>
              </button>
              <button disabled={isDeleting} onClick={onDelete}>
                <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                  <TrashIcon
                    title="Delete"
                    className="h-5 w-5 hover:text-violet-500"
                  />
                </div>
              </button>
            </div>
          </div>
        </article>
        {props.isExpand && (
          <div className="ml-6 lg:ml-12">
            {props.reply && (
              <Comment
                key={String(props.children.length + 1)}
                ref={newRef}
                isEdit={true}
                comment={{
                  profileUrl: props.profileUrl,
                  userId:
                    userId && name
                      ? {
                          _id: userId,
                          name: name,
                        }
                      : {
                          _id: "661540dcc9dd75cc41f93879",
                          name: "Anonymous User",
                        },
                  createdAt: new Date().toDateString(),
                  message: "",
                  children: [],
                  parentId: props._id,
                }}
                parentReply={props.setReply}
                parentID={props._id}
              />
            )}
            {props.children.map((child) => (
              <>
                {child instanceof Object ? (
                  <Comment key={child._id} comment={child} isEdit={false} />
                ) : (
                  <SuspenseComment key={child.toString()} _id={child} />
                )}
              </>
            ))}
          </div>
        )}
      </div>
    );
  },
);

const Comment = forwardRef<HTMLTextAreaElement, CommentProps>(
  function Comment(props, ref) {
    const [edit, setEdit] = useState(props.isEdit); // Enable editing comment
    const [isExpand, setIsExpand] = useState(false); //Browser child comments
    const [messages, setMessages] = useState(
      props.comment && props.comment.message ? props.comment.message : "",
    ); //Store the comment
    const [reply, setReply] = useState(false); // Enable reply to comment
    return (
      <CommentView
        key={props.comment._id}
        ref={ref}
        edit={edit}
        setEdit={setEdit}
        isExpand={isExpand}
        setIsExpand={setIsExpand}
        messages={messages}
        setMessages={setMessages}
        reply={reply}
        setReply={setReply}
        parentID={props.parentID}
        parentReply={props.parentReply}
        {...props.comment}
      />
    );
  },
);

const SuspenseComment = forwardRef<HTMLTextAreaElement, { _id: string }>(
  function SuspenseComment(props, ref) {
    const { data: comment, isLoading } = useGetCommentQuery(props._id);
    return (
      <>
        {isLoading ? (
          "Loading..."
        ) : (
          <Comment key={props._id} comment={comment} isEdit={false} />
        )}
      </>
    );
  },
);

export default function Comments() {
  const { userId, email } = useAuthContext();
  const [message, setMessage] = useState("");
  const { data: comments, isLoading, isError, error } = useGetCommentsQuery();
  const [addComment, { isLoading: loading }] = useAddCommentMutation();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const jsonData = (function (formData) {
      const json = {};
      json["postId"] = "d116ded5-268f-4971-a85a-0c9925a0af03";
      if (
        !userId ||
        (formData.has("anonymous") &&
          formData.get("anonymous").toString() == "on")
      ) {
        json["userId"] = "661540dcc9dd75cc41f93879";
        formData.delete("anonymous");
      } else {
        json["userId"] = userId;
      }
      formData.forEach((value, key) => {
        json[key] = value;
      });
      return json;
    })(formData) as comment;
    await addComment(jsonData);
  }
  return (
    <>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              {`Discussion (${comments && comments.length ? comments.length : 0})`}
            </h2>
          </div>
          <CommentForm
            messages={message}
            setMessages={setMessage}
            onSubmit={onSubmit}
            loading={loading}
          />
          <div>{isError && <p>{JSON.stringify(error)}</p>}</div>
          <div>{isLoading ? <p>Loading...</p> : ""}</div>
          {comments &&
            comments.map((comment) => (
              <Comment key={comment._id} comment={comment} isEdit={false} />
            ))}
        </div>
      </section>
    </>
  );
}
