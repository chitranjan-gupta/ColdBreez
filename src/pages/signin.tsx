import React, { useState } from "react";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { logo as poster } from "@/img/index";
import { WEBSITE_TITLE } from "@/lib/name";

export default function Sign_In() {
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
        json["email"] = formData.get("email").toString();
        json["password"] = formData.get("password").toString();
        return JSON.stringify(json);
      })(formData);
      const response = await fetch("/api/auth/login", {
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
        router.push("/dashboard");
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
        <title>{`Sign In - ${WEBSITE_TITLE}`}</title>
        <meta name="description" content={`Sign In on ${WEBSITE_TITLE}`} />
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
            Sign in to your account on {WEBSITE_TITLE}
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
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

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                    prefetch={false}
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
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

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="w-full flex flex-row justify-center items-center">
            {error && <div className="text-center text-red-500">{error}</div>}
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              prefetch={false}
            >
              Sign Up Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
