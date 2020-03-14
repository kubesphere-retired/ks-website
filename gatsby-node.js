const fs = require('fs')
const path = require('path')
const config = require('./gatsby-config')
const { createFilePath } = require(`gatsby-source-filesystem`)

const localesNSContent = {
  en: [
    {
      content: fs.readFileSync(`src/locales/en/common.json`, 'utf8'),
      ns: 'common',
    },
  ],
  'zh-CN': [
    {
      content: fs.readFileSync(`src/locales/zh-CN/common.json`, 'utf8'),
      ns: 'common',
    },
  ],
}

const { availableLocales, defaultLocale } = config.siteMetadata

exports.onCreatePage = async props => {
  const {
    page,
    actions: { createPage, createRedirect, deletePage },
  } = props

  if (page.path.indexOf('404') !== -1) {
    return
  }

  deletePage(page)

  availableLocales.map(({ value }) => {
    const newPath =
      value === defaultLocale ? page.path : `/${value}${page.path}`

    const localePage = {
      ...page,
      originalPath: page.path,
      path: newPath,
      context: {
        availableLocales,
        defaultLocale,
        locale: value,
        prefix: value === defaultLocale ? '/' : `/${value}/`,
        routed: true,
        data: localesNSContent[value],
        originalPath: page.path,
      },
    }
    createPage(localePage)
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` })

    const parts = slug.split('/').filter(p => !!p)

    if (parts.length !== 3) {
      throw new Error(`Unexpected node path of length !== 3: ${slug}`)
    }

    const [framework, language, article] = parts

    createNodeField({
      node,
      name: `slug`,
      value: `/${language}/${framework}/${article}/`,
    })
    createNodeField({ node, name: `framework`, value: framework })
    createNodeField({ node, name: `language`, value: language })
    createNodeField({ node, name: `article`, value: article })
  }
}

const createInstallPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  return new Promise(resolve => {
    graphql(`
      {
        pages: allMarkdownRemark(
          filter: { fields: { framework: { eq: "install" } } }
        ) {
          edges {
            node {
              fields {
                framework
              }
            }
          }
        }
      }
    `).then(({ data: { pages: { edges } } }) => {
      let groups = new Set()

      edges.forEach(({ node }) => {
        const { framework } = node.fields
        groups.add(framework)
      })

      groups.forEach(framework => {
        const originalPath = `/${framework}`
        availableLocales.map(({ value }) => {
          const newPath = value === defaultLocale ? originalPath : `/${value}${originalPath}`

          const localePage = {
            originalPath,
            path: newPath,
            component: path.resolve(`./src/templates/install.js`),
            context: {
              availableLocales,
              defaultLocale,
              locale: value,
              prefix: value === defaultLocale ? '/' : `/${value}/`,
              routed: true,
              data: localesNSContent[value],
              originalPath,
              framework,
            },
          }
          createPage(localePage)
        })
      })

      resolve()
    })
  })
}

const createMarkdownPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise(resolve => {
    graphql(`
      {
        pages: allMarkdownRemark(
          filter: { fields: { framework: { in: ["blog", "conference"] } } }
        ) {
          edges {
            node {
              fields {
                slug
                framework
                language
              }
            }
          }
        }
      }
    `).then(({ data: { pages: { edges } } }) => {
      edges.forEach(({ node }) => {
        const { language, slug } = node.fields

        createPage({
          path: language === defaultLocale ? slug.replace(`/${defaultLocale}`, '') : slug,
          component: path.resolve(`./src/templates/blog.js`),
          context: {
            slug: slug,
            availableLocales,
            defaultLocale,
            locale: language,
            prefix: language === defaultLocale ? '/' : `/${language}/`,
            routed: true,
            data: localesNSContent[language],
          },
        })
      })

      resolve()
    })
  })
}

exports.createPages = (...rest) => {
  return Promise.all([
    createMarkdownPages(...rest),
    createInstallPages(...rest),
  ])
}
