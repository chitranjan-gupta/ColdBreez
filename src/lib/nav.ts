import numWords from "num-words";

export type Navigation = {
  id: number;
  name: string;
  href: string;
};

export const navigation: Navigation[] = [
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

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export function getMonth(n: number) {
  return months[n];
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export function getDay(n: number) {
  return days[n];
}

export function getYear(n: number) {
  let a = n.toString();
  return `${capitalize(numWords(parseInt(a.substring(0, 2))))} ${capitalize(numWords(parseInt(a.substring(2, a.length))))}`;
}
