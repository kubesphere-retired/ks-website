const path = require(`path`)
const fs = require("fs-extra")
const chokidar = require('chokidar')
const { createFilePath } = require(`gatsby-source-filesystem`)

const srcLocales = path.join(__dirname, "/src/locales")
const publicLocales = path.join(__dirname, "/public/locales")

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` })

    const parts = slug.split('/').filter(p => !!p)

    if (parts.length !== 4) {
      throw new Error(`Unexpected node path of length !== 4: ${slug}`)
    }

    const [framework, type, language, article] = parts

    createNodeField({ node, name: `slug`, value: slug, })
    createNodeField({ node, name: `framework`, value: framework })
    createNodeField({ node, name: `type`, value: type })
    createNodeField({ node, name: `language`, value: language })
    createNodeField({ node, name: `article`, value: article })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators
  return new Promise(resolve => {
    graphql(`
      {
        pages: allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                framework
                type
                language
                article
              }
            }
          }
        }
      }
    `).then(({ data: { pages: { edges } } }) => {
      let groups = new Set()

      edges.forEach(({ node }) => {
        const { slug, framework, type, language, article } = node.fields

        groups.add(`${framework}/${type}/${language}`)

        // create article detail page
        createPage({
          path: slug,
          component: path.resolve(`./src/templates/article.js`),
          context: { slug, framework, type, language, article },
        })
      })

      groups.forEach(group => {
        const [framework, type, language] = group.split('/')

        // create article list page
        createPage({
          path: group,
          component: path.resolve(`./src/templates/news.js`),
          context: { framework, type, language },
        })
      })

      resolve()
    })
  })
}

exports.onPostBuild = () => {
  fs.copySync(srcLocales, publicLocales)
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'develop') {
    chokidar.watch(srcLocales).on('all', () => {
      fs.copySync(srcLocales, publicLocales)
    })
  }

  return config
}
