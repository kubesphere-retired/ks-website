const path = require(`path`)
const fs = require("fs-extra")
const chokidar = require('chokidar')
const { createFilePath } = require(`gatsby-source-filesystem`)

const srcLocales = path.join(__dirname, "/src/locales")
const publicLocales = path.join(__dirname, "/public/locales")

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content/install` })

    const parts = slug.split('/').filter(p => !!p)

    if (parts.length !== 3) {
      throw new Error(`Unexpected node path of length !== 3: ${slug}`)
    }

    const [framework, language, article] = parts

    createNodeField({ node, name: `slug`, value: slug, })
    createNodeField({ node, name: `framework`, value: framework })
    createNodeField({ node, name: `language`, value: language })
    createNodeField({ node, name: `article`, value: article })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
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

        if(framework === 'install') {
          createPage({
            path: framework,
            component: path.resolve(`./src/templates/install.js`),
            context: { framework },
          })
        }
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
