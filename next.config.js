module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'firebasestorage.googleapis.com',
      'res.cloudinary.com',
      'placehold.it',
    ],
  },
};
