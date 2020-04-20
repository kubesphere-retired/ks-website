module.exports = {
  siteMetadata: {
    title: 'KubeSphere | Enterprise container platform, built on Kubernetes',
    siteUrl: 'https://kubesphere.io',
    availableLocales: [
      { name: '简体中文', value: 'zh-CN' },
      { name: 'English', value: 'en' },
    ],
    defaultLocale: 'en',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-prismjs', 'gatsby-remark-autolink-headers'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: true,
      },
    },
    {
      resolve: 'gatsby-plugin-no-sourcemaps',
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        exclude: ['/404', '/404.html'],
      },
    },
  ],
}
