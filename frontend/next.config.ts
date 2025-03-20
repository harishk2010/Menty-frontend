// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true, // Disables ESLint checks
//   },
//   experimental: {
//     optimizeCss: true,
   
//   },
//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: [
//           {
//             key: "Access-Control-Allow-Origin",
//             value: "*", // Allow all origins or specify your domain
//           },
//           {
//             key: "Access-Control-Allow-Methods",
//             value: "GET,POST,OPTIONS",
//           },
//           {
//             key: "Access-Control-Allow-Headers",
//             value: "Content-Type, Authorization",
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint checks
  },
  experimental: {
    optimizeCss: true,
    serverActions: {
      allowedOrigins: ["https://menty.live", "https://test.payu.in"], // Allow both origins
      // strictOriginCheck: false, // (Optional: Disable strict checks)
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://menty.live, https://test.payu.in", // Explicitly allow both origins
          },
          {
            key: "Vary",
            value: "Origin", // Helps with caching based on origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS, PUT, DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-Forwarded-Host",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

