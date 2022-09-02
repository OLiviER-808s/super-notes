/** @type {import('next').NextConfig} */

const withWorkbox = require("next-with-workbox")

const nextConfig = withWorkbox({
  reactStrictMode: true
})

module.exports = nextConfig
