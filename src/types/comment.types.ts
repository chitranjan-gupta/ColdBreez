import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { User } from "./user.types";

export type CommentFormProps = {
  messages: string;
  setMessages: Dispatch<SetStateAction<string>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  loading?: boolean;
};

export type CommentViewProps = {
  _id?: string;
  profileUrl: string;
  userId: User;
  createdAt: string;
  message: string;
  parentId?: string;
  parentID?: string;
  messages: string;
  setMessages: Dispatch<SetStateAction<string>>;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  isExpand: boolean;
  setIsExpand: Dispatch<SetStateAction<boolean>>;
  reply: boolean;
  setReply: Dispatch<SetStateAction<boolean>>;
  parentReply?: Dispatch<SetStateAction<boolean>>;
  children: comment[] | string[];
};

export type comment = {
  _id?: string;
  profileUrl: string;
  userId: User;
  createdAt: string;
  message: string;
  children: comment[] | string[];
  parentId?: string;
};

export type CommentProps = {
  comment: comment;
  isEdit: boolean;
  parentID?: string;
  parentReply?: Dispatch<SetStateAction<boolean>>;
};
