import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
export const client = createClient({
  projectId: "8nutc7ib",
  dataset: "production",
  apiVersion: "2023-07-14",
  useCdn: true,
});
export function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}
