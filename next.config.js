/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
  },
  env: {
    API_URL: "http://localhost:8000",
    imageUser: "http://localhost:8000/users/",
  },

  async rewrites() {
    return [
      {
        source: "/app/:path*",
        destination: "/app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
