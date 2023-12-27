import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { logo as poster } from "@/img/imgexport";
import { WEBSITE_TITLE } from "@/lib/name";

export default function About() {
  return (
    <>
      <Head>
        <title>{WEBSITE_TITLE} - About Us</title>
        <meta name="description" content={`${WEBSITE_TITLE} - About Us`} />
      </Head>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="absolute flex flex-col items-start justify-between w-full h-full p-5">
        <div className="w-full">
          <h1 className="text-4xl underline text-center">About us</h1>
        </div>
        <div className="flex flex-row justify-between items-center w-full h-full">
          <div className="">
            <Link href="/" className="relative w-1/3 h-28">
              <Image
                priority={true}
                src={poster}
                alt={`${WEBSITE_TITLE}'s poster`}
                fill={true}
              />
            </Link>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-evenly items-start">
            <div>
              <h1>
                <strong>Introduction</strong>
              </h1>
              <p>
                Welcome to {WEBSITE_TITLE}, your one-stop destination for
                comprehensive world information and news. We are passionate
                about news and committed to providing you with the most accurate
                and up-to-date information, helping you make informed decisions
                about your needs.
              </p>
            </div>
            <div>
              <h1>
                <strong>Our Mission</strong>
              </h1>
              <p>
                At {WEBSITE_TITLE}, our mission is to empower people and
                enthusiasts with valuable resources to enhance their knowledge.
                We aim to be the go-to platform for all things related to world
                news.
              </p>
            </div>
            <div>
              <h1>
                <strong>Who We Are</strong>
              </h1>
              <p>
                We are a dedicated team of enthusiasts, and tech-savvy
                individuals who share a common love for latest and accurate
                information. Our combined knowledge and passion drive us to
                deliver reliable and trustworthy content for every person.
              </p>
            </div>
            <div>
              <h1>
                <strong>What We Offer</strong>
              </h1>
              <div>
                <li>
                  <strong>Extensive World Information:</strong>
                  <span>
                    Our website provides in-depth details about a wide range of
                    world news and information. From technical to financial, we
                    cover it all, making it easier for you to get the
                    information that suits your lifestyle.
                  </span>
                </li>
                <li>
                  <strong>User Reviews:</strong>
                  <span>
                    We encourage our community to share their experiences with
                    specific world news. User reviews provide valuable insights
                    and help others make informed decisions.
                  </span>
                </li>
              </div>
            </div>
            <div>
              <h1>
                <strong>Our Commitment to Quality</strong>
              </h1>
              <p>
                At {WEBSITE_TITLE}, we are committed to maintaining the highest
                standards of quality and accuracy in the information we provide.
                Our team meticulously researches and verifies all content to
                ensure that you receive reliable and up-to-date data.
              </p>
            </div>
            <div>
              <h1>
                <strong>Get in Touch</strong>
              </h1>
              <p>
                We love hearing from our users and value your feedback. Whether
                you have a suggestion, query, or just want to say hello, feel
                free to get in touch with us through our
                <Link href="/contact_us"> contact page</Link>. Your feedback
                helps us improve and serve you better.
              </p>
            </div>
            <div>
              <h1>
                <strong>Join Our Community</strong>
              </h1>
              <p>
                Become a part of our growing community of information
                enthusiasts. Follow us on social media platforms and subscribe
                to our newsletter to receive the latest world news, updates, and
                exclusive offers. Thank you for choosing {WEBSITE_TITLE}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
