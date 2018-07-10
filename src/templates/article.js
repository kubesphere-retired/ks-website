import React from 'react'
import Link from 'gatsby-link'
import { translate } from 'react-i18next'

import '../styles/markdown.scss'
import './index.scss'

const BreadCrum = ({ location, t }) => {
  const parts = location.pathname.split('/').filter(p => !!p)
  parts.pop()
  const path = `/${parts.join('/')}`

  return (
    <div className="breadcrum">
      <Link to={path}>{t('Back to list')}</Link>
    </div>
  )
}

const Article = ({ location, t, data }) => {
  const post = data.markdownRemark
  return (
    <div className="article">
      <BreadCrum location={location} t={t} />
      <div className="article-content">
        <div className="h2">{post.frontmatter.title}</div>
        <div className="desc">
          <span>阅读量: 22453(TODO)</span>
          <span>{post.frontmatter.author}</span>
          <span>发布时间: {post.frontmatter.date}</span>
        </div>
        <div
          className="article-detail md-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  )
}

export default translate('base')(Article)

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        author
        date
      }
    }
  }
`
