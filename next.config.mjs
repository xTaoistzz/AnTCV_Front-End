

import {} from 'dotenv/config'

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACK_URL : process.env.BACK_URL
    },
    images: {
        remotePatterns: [
        {
            protocol: process.env.BACK_URL_PROTOCOL,
            hostname: process.env.BACK_DOMAIN,
            port: process.env.BACK_URL_PORT,
            // pathname: `/img/**`  
        }
        ]
    },

};

export default nextConfig;