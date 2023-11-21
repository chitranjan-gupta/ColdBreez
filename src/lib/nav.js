export const navigation = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "News", href: "/news" },
];

export function NoU(obj) {
  //isUndefined
  return typeof obj !== "undefined" ? true : false;
}