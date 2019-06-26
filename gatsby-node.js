const fs = require('fs')
const path = require('path')
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

const availableLocales = [
  { value: 'zh-CN', text: 'Chinese' },
  { value: 'en', text: 'English' },
]

const defaultLocales = { value: 'zh-CN', text: 'English' }

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
    const newPath = `/${value}${page.path}`

    const localePage = {
      ...page,
      originalPath: page.path,
      path: newPath,
      context: {
        availableLocales,
        locale: value,
        routed: true,
        data: localesNSContent[value],
        originalPath: page.path,
      },
    }
    createPage(localePage)
  })

  if (page.path === '/') {
    createPage({
      ...page,
      context: {
        availableLocales,
        locale: 'zh-CN',
        routed: true,
        data: localesNSContent['zh-CN'],
        originalPath: page.path,
      },
    })
  } else {
    createRedirect({
      fromPath: page.path,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: `/${defaultLocales.value}${page.path}`,
    })
  }
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content/install` })

    const parts = slug.split('/').filter(p => !!p)

    if (parts.length !== 3) {
      throw new Error(`Unexpected node path of length !== 3: ${slug}`)
    }

    const [framework, language, article] = parts

    createNodeField({ node, name: `slug`, value: slug })
    createNodeField({ node, name: `framework`, value: framework })
    createNodeField({ node, name: `language`, value: language })
    createNodeField({ node, name: `article`, value: article })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  return new Promise(resolve => {
    graphql(`
      {
        pages: allMarkdownRemark {
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
        if (framework === 'install') {
          const originalPath = `/${framework}`
          availableLocales.map(({ value }) => {
            const newPath = `/${value}${originalPath}`

            const localePage = {
              originalPath,
              path: newPath,
              component: path.resolve(`./src/templates/install.js`),
              context: {
                availableLocales,
                locale: value,
                routed: true,
                data: localesNSContent[value],
                originalPath,
                framework,
              },
            }
            createPage(localePage)
          })

          createRedirect({
            fromPath: originalPath,
            isPermanent: true,
            redirectInBrowser: true,
            toPath: `/${defaultLocales.value}${originalPath}`,
          })
        }
      })

      resolve()
    })
  })
}
