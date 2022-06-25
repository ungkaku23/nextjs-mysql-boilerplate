module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_BASE_URL: process.env.NEXT_BASE_URL,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/customers',
        permanent: true
      }
    ]
  }
}
