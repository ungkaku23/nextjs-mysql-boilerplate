module.exports = {
  reactStrictMode: true,
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
