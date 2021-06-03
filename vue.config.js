module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Igloo | My WORKS',
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/my-igloo-works/' : '/',
  outputDir: 'docs',
};
