export const navigation = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "News", href: "/news" },
];

export function NoU(obj: Object) {
  //isUndefined
  return typeof obj !== "undefined" ? true : false;
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function decapitalize(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export function getMonth(n: number) {
  return month[n];
}
