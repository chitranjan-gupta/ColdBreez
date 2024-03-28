type List = {
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

const Breadcrumb: List[] = [
  {
    position: 1,
    name: "About Us",
    item: "https://coldbreez.me/about",
  },
  {
    position: 2,
    name: "Sign In",
    item: "https://coldbreez.me/signin",
  },
  {
    position: 3,
    name: "Sign Up",
    item: "https://coldbreez.me/signup",
  },
  {
    position: 4,
    name: "Privacy Policy",
    item: "https://coldbreez.me/privacypolicy",
  },
  {
    position: 5,
    name: "Terms",
    item: "https://coldbreez.me/terms",
  },
  {
    position: 6,
    name: "Disclaimer",
    item: "https://coldbreez.me/disclaimer",
  },
];

/**
 *
 * @param breadcrumbs List[]
 * @returns string
 */
export function BreadcrumbList(breadcrumbs: List[]) {
  return `<script type="application/ld+json">{
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement":[${breadcrumbs.map((breadcrumb) => ListItem(breadcrumb)).toString()}]
    }</script>`;
}
