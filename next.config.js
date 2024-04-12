const { withAxiom } = require("next-axiom");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.tailgrids.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "prog-ace-cdn.azureedge.net",
        port: "",
      },
      { protocol: "https", hostname: "pbs.twimg.com", port: "" },
      { protocol: "https", hostname: "abs.twimg.com", port: "" },
      { protocol: "https", hostname: "flowbite.com", port: "" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/post/:slug*",
        destination: "/news/:slug*",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/news/:slug*",
        permanent: true,
      },
    ];
  },
  transpilePackages: ["react-tweet"],
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withAxiom(nextConfig);
