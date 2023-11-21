import Image from "next/image";
import Link from "next/link";
import groq from "groq";
import { client, urlFor } from "@/lib/sanity";
import Meta from "@/component/meta";
import { DropDown } from "@/component/header";
import { navigation } from "@/lib/nav";
import {
  logo,
  instagram,
  threads,
  twitter,
  facebook,
} from "@/img/imgexport";

export default function Main({ posts }) {
  return (
    <>
      <Meta />
      <section name="hero" id="hero">
        <div className="bg-white">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav
              className="flex items-center justify-between p-4 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <div className="h-8 w-8">
                  <Image
                    priority={true}
                    alt="logo"
                    src={logo}
                    width={50}
                    height={50}
                  />
                </div>
                <a href="" className="p-1.5">
                  <span className="">AajKaNews</span>
                </a>
              </div>
              <div className="block sm:hidden">
                <DropDown options={navigation} />
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Link
                  href="/sign_in"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Sign In <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </nav>
          </header>

          <div className="relative isolate px-6 pt-14 lg:px-8">
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>

            <div className="w-full flex -ml-8 justify-between flex-col sm:flex-row md:flex-row lg:flex-row">
            </div>
            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section name="newsletter">
        <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="max-w-xl lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Subscribe to our newsletter.
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-300">
                  Don&apos;t Miss out: Exclusive Articles.
                </p>
                <div className="mt-6 flex max-w-md gap-x-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10"></div>
                  <dt className="mt-4 font-semibold text-white">
                    Weekly articles
                  </dt>
                  <dd className="mt-2 leading-7 text-gray-400">
                    Every week we post articles on car.
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10"></div>
                  <dt className="mt-4 font-semibold text-white">No spam</dt>
                  <dd className="mt-2 leading-7 text-gray-400">
                    We do not send spam emails.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div
            className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
            aria-hidden="true"
          >
            <div
              className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </section>
      <footer className="bg-white rounded-lg shadow m-4">
        <div className="w-full mx-auto p-4 md:py-8">
          <div className="w-full flex flex-col justify-between items-start md:flex-row">
            <div className=" h-16 w-30 mb-10 md:mb-0">
              <a href="">
                <Image alt="poster" src={logo} width={200} height={100} />
              </a>
            </div>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 ">
              <li className="flex flex-col justify-center items-center mr-2">
                <Link target="_blank" href="">
                  <Image
                    src={instagram}
                    alt="Instagram "
                    width={20}
                    height={20}
                  />
                </Link>
              </li>
              <li className="flex flex-col justify-center items-center mr-2">
                <Link
                  target="_blank"
                  href=""
                >
                  <Image src={threads} alt="Threads" width={20} height={20} />
                </Link>
              </li>
              <li className="flex flex-col justify-center items-center mr-2">
                <Link target="_blank" href="">
                  <Image src={twitter} alt="Twitter" width={20} height={20} />
                </Link>
              </li>
              <li className="flex flex-col justify-center items-center mr-2">
                <Link
                  target="_blank"
                  href=""
                  data-href=""
                >
                  <Image src={facebook} alt="Facebook" width={20} height={20} />
                </Link>
              </li>
              <li>
                <Link href="/about" className="mr-4 hover:underline md:mr-6 ">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy_policy"
                  className="mr-4 hover:underline md:mr-6"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact_us" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:underline ml-2">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline ml-2">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
          <span className="block text-sm sm:text-center">
            <a href="" className="hover:underline">
              © 2023 AajKaNews™
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc){
        _id,
        title,
        description,
        "name": author->name,
        "categories": categories[]->title,
        publishedAt,
        slug,
        "authorImage": author->image,
        mainImage,
      }
    `);
  return {
    props: {
      posts
    },
  };
}
