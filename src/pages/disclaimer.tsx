import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { WEBSITE_TITLE } from "@/lib/name";
import { logo as poster } from "@/img/index";

export default function Disclaimer() {
  return (
    <>
      <Head>
        <title>{`${WEBSITE_TITLE} - Disclaimer`}</title>
        <meta name="description" content={`${WEBSITE_TITLE} - Disclaimer`} />
      </Head>
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] background-design" />
      </div>
      <div className="p-5 flex flex-col justify-between items-start">
        <div className="w-full">
          <div className="flex flex-row justify-center items-center w-full">
            <h1 className="text-xl font-bold">
              Disclaimer for {WEBSITE_TITLE}
            </h1>
            <Link href="/" prefetch={false}>
              <Image
                src={poster}
                alt={`${WEBSITE_TITLE}'s poster`}
                width={200}
                height={200}
              />
            </Link>
          </div>
          <ul>
            <li>
              <strong>{`Disclaimer for ${WEBSITE_TITLE}`}</strong>
            </li>
            <li>
              <strong>
                All the information on this website - {WEBSITE_TITLE} - is
                published in good faith and for general information purposes
                only.
              </strong>
            </li>
          </ul>
        </div>
        {WEBSITE_TITLE} does not make any warranties about the completeness,
        reliability, and accuracy of this information. Any action you take upon
        the information you find on this website {WEBSITE_TITLE}, is strictly at
        your own risk. {WEBSITE_TITLE} will not be liable for any losses and/or
        damages in connection with the use of our website. From our website, you
        can visit other websites by following hyperlinks to such external sites.
        While we strive to provide only quality links to useful and ethical
        websites, we have no control over the content and nature of these sites.
        These links to other websites do not imply a recommendation for all the
        content found on these sites. Site owners and content may change without
        notice and may occur before we have the opportunity to remove a link
        that may have gone &apos;bad&apos;. Please be also aware that when you
        leave our website, other sites may have different privacy policies and
        terms that are beyond our control. Please be sure to check the Privacy
        Policies of these sites as well as their &quot;Terms of Service&quot;
        before engaging in any business or uploading any information.
        <div>
          <li>
            <strong>Consent</strong>
            <br />
            <span>
              By using our website, you hereby consent to our disclaimer and
              agree to its terms.
            </span>
          </li>
          <li>
            <strong>Update</strong>
            <br />
            <span>
              Should we update, amend or make any changes to this document,
              those changes will be prominently posted here.
            </span>
          </li>
        </div>
        <span>
          If you require any more information or have any questions about our
          site&apos;s disclaimer, please feel free to contact us by email at
          admin@{WEBSITE_TITLE}.
        </span>
      </div>
    </>
  );
}
