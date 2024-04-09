import React, { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { logo as poster } from "@/img/index";
import { WEBSITE_TITLE, WEBSITE_TYPE, WEBSITE_URL } from "@/lib/name";

export default function Sign_Up() {
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
      const response = await fetch("/api/user/register", {
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
        router.push("/signin");
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
        <title>{`Sign Up - ${WEBSITE_TITLE}`}</title>
        <meta name="description" content={`Sign Up on ${WEBSITE_TITLE}`} />
      </Head>
      <form
        className="flex flex-col justify-center items-center mt-3 p-5"
        onSubmit={onSubmit}
      >
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
          <h1 className="text-center text-3xl font-bold text-gray-900 mt-4">
            Sign up your account on {WEBSITE_TITLE}
          </h1>
        </div>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name <i className="text-red-500">*</i>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name <i className="text-red-500">*</i>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="last-name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username <i className="text-red-500">*</i>
                </label>
                <div className="mt-2">
                  <div className="flex flex-col md:flex-row md:items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="select-none px-2 text-gray-500 w-full md:w-3/5 leading-6">
                      {`${WEBSITE_URL}/${WEBSITE_TYPE}/author/`}
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block w-full md:w-2/5 flex-1 border-0 bg-transparent px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="bablu"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address <i className="text-red-500">*</i>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password <i className="text-red-500">*</i>
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-row justify-center items-center">
          {error && <div className="text-center text-red-500">{error}</div>}
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            href="/signin"
            className="text-sm font-semibold leading-6 text-gray-900"
            prefetch={false}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
