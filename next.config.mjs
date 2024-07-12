/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "sin1.contabostorage.com",
        pathname: "**",
      },
    ],
  },
  // images:{
  //     domains:['res.cloudinary.com','sin1.contabostorage.com']
  // }
};

export default nextConfig;
