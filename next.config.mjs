

import {} from 'dotenv/config'

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ORIGIN_URL : process.env.ORIGIN_URL,
    },
    images: {
        domains: ['localhost', 'baiat.wattanapong.com'],
      },
}

export default nextConfig;