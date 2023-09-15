/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flagsapi.com',
            },
        ],
    },
}

module.exports = nextConfig
