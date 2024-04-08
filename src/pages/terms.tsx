import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { logo as poster } from "@/img/index";
import { WEBSITE_TITLE } from "@/lib/name";

export default function Terms() {
  return (
    <>
      <Head>
        <title>{`${WEBSITE_TITLE} - Terms of Service`}</title>
        <meta
          name="description"
          content={`${WEBSITE_TITLE} - Terms of Service`}
        />
      </Head>
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] background-design" />
      </div>
      <div className="mt-5 flex flex-row justify-center items-center">
        <div className="flex flex-row justify-center items-center h-16">
          <Link href="/" prefetch={false}>
            <Image
              alt={`${WEBSITE_TITLE}'s poster`}
              src={poster}
              width={200}
              height={100}
            />
          </Link>
        </div>
        <div>
          <h1 className="font-bold text-xl">{`${WEBSITE_TITLE} - Terms of Service`}</h1>
        </div>
      </div>
      <div className="flex flex-col justify-between items-start p-3">
        <span>{WEBSITE_TITLE} - Terms of Service</span>
        <span>Last Updated: 21st July 2023.</span>
        <span>Welcome to {WEBSITE_TITLE} (&quot;Website&quot;).</span>
        <span>
          Please read these Terms of Service (&quot;Terms&quot;) carefully
          before using the Website or any of its services. By accessing or using
          the Website, you agree to be bound by these Terms. If you do not agree
          to these Terms, please do not use the Website.
        </span>
        <div className="p-5">
          <li className="list-decimal">
            <strong>Introduction</strong>
            <br />
            <span>
              {WEBSITE_TITLE} is a platform that provides world information and
              news details for informational purposes only. The information on
              this Website is not intended as professional advice and should not
              be relied upon as such. We aim to provide accurate and up-to-date
              information, but we do not warrant the completeness, accuracy,
              reliability, or suitability of the information provided.
            </span>
          </li>
          <li className="list-decimal">
            <strong>Use of Content</strong>
            <br />
            <span>
              All content provided on the Website, including text, graphics,
              images, videos, logos, icons, and any other materials, are the
              intellectual property of {WEBSITE_TITLE} or its respective owners
              and are protected by applicable copyright, trademark, and other
              intellectual property laws. You may not modify, reproduce,
              distribute, or use any content from this Website without obtaining
              prior written permission from {WEBSITE_TITLE} or the relevant
              rights holder.
            </span>
          </li>
          <li className="list-decimal">
            <strong>User Conduct</strong>
            <br />
            <span>
              When using {WEBSITE_TITLE}, you agree to abide by the following
              guidelines:
            </span>
            <ul className=" pl-5">
              <li className=" list-disc">
                You will not use the Website for any unlawful purpose or in
                violation of any applicable laws or regulations.
              </li>
              <li className=" list-disc">
                You will not post or transmit any offensive, defamatory,
                harmful, or inappropriate content.
              </li>
              <li className=" list-disc">
                You will not attempt to disrupt the functioning of the Website
                or its services.
              </li>
              <li className=" list-disc">
                You will not impersonate any person or entity or misrepresent
                your affiliation with any person or entity.
              </li>
              <li className=" list-disc">
                You will not use any automated means or scripts to access the
                Website or its content.
              </li>
            </ul>
          </li>
          <li className="list-decimal">
            <strong>Third-Party Websites and Services</strong>
            <br />
            <span>
              The Website may contain links to third-party websites or services
              that are not owned or controlled by {WEBSITE_TITLE}. We do not
              endorse or assume responsibility for the content, privacy
              policies, or practices of any third-party websites or services.
              You acknowledge and agree that {WEBSITE_TITLE} shall not be
              liable, directly or indirectly, for any damage or loss caused or
              alleged to be caused by or in connection with the use of any such
              content, goods, or services available on or through any such
              third-party websites or services.
            </span>
          </li>
          <li className="list-decimal">
            <strong>Disclaimer of Warranties</strong>
            <br />
            <span>
              The information and services provided on the Website are provided
              on an &quot;as is&quot; and &quot;as available&quot; basis without
              any representations or warranties, express or implied.
              {WEBSITE_TITLE} makes no warranties or representations regarding
              the accuracy, reliability, availability, or completeness of the
              Website&apos;s content or services.
            </span>
          </li>
          <li className="list-decimal">
            <strong>Limitation of Liability</strong>
            <br />
            <span>
              To the fullest extent permitted by applicable law, {WEBSITE_TITLE}
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or
              revenue, arising out of or in connection with your use of the
              Website or its services.
            </span>
          </li>
          <li className="list-decimal">
            <strong> Modifications to Terms </strong>
            <br />
            <span>
              {WEBSITE_TITLE} reserves the right to modify or update these Terms
              at any time without prior notice. It is your responsibility to
              review these Terms periodically for any changes. Your continued
              use of the Website after any modifications to these Terms
              constitutes acceptance of such changes.
            </span>
          </li>
          <li className="list-decimal">
            <strong> Governing Law </strong>
            <br />
            <span>
              These Terms shall be governed by and construed in accordance with
              the laws of India, without regard to its conflict of law
              principles.
            </span>
          </li>
          <li className="list-decimal">
            <strong> Contact Us</strong>
            <br />
            <span>
              If you have any questions or concerns regarding these Terms or the
              Website, you may contact us at admin@{WEBSITE_TITLE}.
            </span>
          </li>
        </div>
        <span>
          By using {WEBSITE_TITLE}, you acknowledge that you have read,
          understood, and agree to be bound by these Terms.
        </span>
        <span>Thank you for using {WEBSITE_TITLE}.</span>
      </div>
    </>
  );
}
