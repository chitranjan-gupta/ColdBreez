import { List } from "@/lib/schema";

export enum Type {
  blogs = "blogs",
  news = "news",
}
export const WEBSITE_TITLE = "coldbreez";
export const WEBSITE_URL = "https://coldbreez.me";
export const WEBSITE_KEYWORDS = "coldbreez, news";
export const WEBSITE_DESCRIPTION = "News, Articles";
export const WEBSITE_POSTER_URL = `${WEBSITE_URL}/poster.png`;
export const WEBSITE_NAME = "coldbreez";
export const WEBSITE_TYPE = Type.news;
export const Breadcrumbs: List[] = [
  {
    position: 1,
    name: "About Us",
    item: `${WEBSITE_URL}/about`,
  },
  {
    position: 2,
    name: "Sign In",
    item: `${WEBSITE_URL}/signin`,
  },
  {
    position: 3,
    name: "Sign Up",
    item: `${WEBSITE_URL}/signup`,
  },
  {
    position: 4,
    name: "Privacy Policy",
    item: `${WEBSITE_URL}/privacypolicy`,
  },
  {
    position: 5,
    name: "Terms",
    item: `${WEBSITE_URL}/terms`,
  },
  {
    position: 6,
    name: "Disclaimer",
    item: `${WEBSITE_URL}/disclaimer`,
  },
];
