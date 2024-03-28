import groq from "groq";
import { client } from "@/lib/sanity";
import { generateSiteMap } from "@/lib/sitemap";

function SiteMap() {}

export async function getServerSideProps({ res }) {
  const posts =
    await client.fetch(groq`*[_type == "post"] | order(publishedAt desc){
      _id,
      slug,
      "lastModified": _updatedAt,
      "categories":categories[]->title,
      "subcategories":subcategories[]->title,
  }`);
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
