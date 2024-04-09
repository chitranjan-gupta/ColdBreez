import React, { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { logo as poster } from "@/img/index";
import { WEBSITE_TITLE } from "@/lib/name";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts
    try {
      const formData = new FormData(event.currentTarget);
      const jsonData = (function (formData) {
        const json = {};
        json["name"] = formData
          .get("first-name")
          .toString()
          .concat(" ")
          .concat(formData.get("last-name").toString());
        formData.delete("first-name");
        formData.delete("last-name");
        formData.forEach((value, key) => {
          json[key] = value;
        });
        return JSON.stringify(json);
      })(formData);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: jsonData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (response.ok) {
        router.push("/dashboard/thankyou");
        console.log(data);
      }
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Head>
        <title>{`${WEBSITE_TITLE} - Contact Us`}</title>
        <meta name="description" content={`${WEBSITE_TITLE} - Contact Us`} />
      </Head>
      <div className="isolate bg-white px-6 py-10 sm:py-10 lg:px-4">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem] background-design" />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex flex-row justify-center items-center w-full h-16">
            <Link href="/" prefetch={false}>
              <Image
                alt={`${WEBSITE_TITLE}'s poster`}
                src={poster}
                width={200}
                height={100}
                className="w-auto h-auto"
              />
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl mt-4 font-bold tracking-tight text-gray-900 sm:text-4xl">
            {WEBSITE_TITLE} - Contact us
          </h1>
        </div>
        <form onSubmit={onSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                First name <i className="text-red-500">*</i>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Last name <i className="text-red-500">*</i>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="last-name"
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email <i className="text-red-500">*</i>
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Message <i className="text-red-500">*</i>
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue=""
                  required
                />
              </div>
            </div>
            <input type="hidden" name="policy" value={String(agreed)} />
            <div className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <div
                  onClick={() => (agreed ? setAgreed(false) : setAgreed(true))}
                  className={classNames(
                    agreed ? "bg-indigo-600" : "bg-gray-200",
                    "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                  )}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      agreed ? "translate-x-3.5" : "translate-x-0",
                      "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out",
                    )}
                  />
                </div>
              </div>
              <div className="text-sm leading-6 text-gray-600">
                By selecting this, you agree to our{" "}
                <Link
                  href="/privacy_policy"
                  className="font-semibold text-indigo-600"
                  prefetch={false}
                >
                  privacy&nbsp;policy
                </Link>
                .
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row justify-center items-center">
            {error && <div className="text-center text-red-500">{error}</div>}
          </div>
          <div className="mt-10">
            <button
              type="submit"
              disabled={isLoading}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? "Loading..." : "Let's talk"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
