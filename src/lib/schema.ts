import { Type } from "@/lib/name";
import { urlFor } from "@/lib/sanity";
import { abs } from "@/lib/utils";
import { logo as poster } from "@/img/index";

export type List = {
  position: number; //Position where you place this list item
  name: string; //Name of ListItem
  item: string; //URL of ListItem
};

/**
 *
 * @param list: List
 * @returns ListItem of BreadCumList of Schema.org
 */
function ListItem(list: List) {
  return `{
        "@type": "ListItem",
        "position": "${list.position}",
        "name": "${list.name}",
        "item": "${list.item}"
    }`;
}

/**
 *
 * @param breadcrumbs List[]
 * @returns string
 */
export function BreadcrumbSchema(breadcrumbs: List[]) {
  return `{
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement":[${breadcrumbs.map((breadcrumb) => ListItem(breadcrumb)).toString()}]
  }`;
}

export enum ArticleType {
  blogs = "BlogPosting",
  news = "NewsArticle",
}

type ArticleProps = {
  domain: string; // Name of the website
  url: string; // URL of the website
  type: Type; // Type of website: blogs or news
  articleType: ArticleType; //Type of Article Schema: BlogPosting or NewsArticle
  post: any; //Blog post or News post
};

/**
 *
 * @param articleProps ArticleProps
 * @returns string
 */
export function ArticleSchema({
  domain,
  url,
  type,
  articleType,
  post,
}: ArticleProps) {
  return `
  {
    "@context": "https://schema.org",
    "@type": "${articleType}",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}/${type}/${abs(post.categories[0])}/${abs(post.subcategories[0])}/${abs(post.slug.current)}"
    },
    "headline": "${post.title}",
    "description": "${post.description}",
    "image": [
      "${post.mainImage ? urlFor(post.mainImage).url() : `${url}${poster.src}`}"
    ],  
    "author": {
      "@type": "Person",
      "name": "${post.name}",
      "url": "${url}/${type}/author/${abs(post.authorSlug.current)}"
    },  
    "publisher": {
      "@type": "Organization",
      "name": "${domain}",
      "logo": {
        "@type": "ImageObject",
        "url": "${url}${poster.src}"
      }
    },
    "datePublished": "${new Date(post.publishedAt)}",
    "dateModified": "${new Date(post.modifiedAt)}"
  }`;
}

//ArticleSchema({ domain: "coldbreez", url: "https://coldbreez.me", type: Type.news, articleType: ArticleType.news, post: {} })

type SearchBoxProps = {
  domain: string; // Name of the website
  url: string; // URL of the website
  type: Type; // Type of website: blogs or news
};

/**
 *
 * @param searchBoxProps SearchBoxProps
 * @returns string
 */
export function SearchBoxSchema({ domain, url, type }: SearchBoxProps) {
  return `
  {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    "name": "${domain}",
    "url": "${url}",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "${url}/${type}/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  `;
}
