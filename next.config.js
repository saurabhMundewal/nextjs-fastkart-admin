/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    // For Local Server
     API_PROD_URL: "https://apis.vector-x.com/api/",
    //enter your api API_PROD_URL
   // API_PROD_URL: "",
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/dashboard",

        permanent: true,
      },
    ];
  },
  images: {
   // domains: ['apis.vector-x.com'],
     domains: ['apis.vector-x.com', 'laravel.pixelstrap.net'],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: "localhost",
  //     },
  //     {
  //       protocol: "http",
  //       hostname: "127.0.0.1:8000",
  //     },
  //     {
  //             protocol: "https",
  //             hostname: "laravel.pixelstrap.net",
  //           },

  //   ],
  // },
  devIndicators: {
    buildActivity: false,
  },
};

module.exports = nextConfig;
