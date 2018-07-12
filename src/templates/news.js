import React from 'react'
import Link from 'gatsby-link'
import classnames from 'classnames'
import { translate } from 'react-i18next'

import { NEWS_TYPES } from '../utils/constants'

import './index.scss'

const Heading = ({ t }) => (
  <div className="news-header">
    <div className="title">{t('News')}</div>
    <p>{t('Latest industry news')}</p>
  </div>
)

const NewsTypes = ({ t, types, selectType, selectLang }) => (
  <ul className="news-types">
    {types.map(type => (
      <li
        key={type}
        className={classnames({
          'news-types-selected': selectType === type,
        })}
      >
        <Link to={`/news/${type}/${selectLang}`}>{t(`news_${type}`)}</Link>
      </li>
    ))}
  </ul>
)

const NewsList = ({ data }) => (
  <div className="news-articles">
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id} className="article-box">
        <div className="h4">{node.frontmatter.title}</div>
        <p className="excerpt">{node.excerpt}</p>
        <div className="desc">
          <span>{node.frontmatter.author}</span>
          <span>发布时间: {node.frontmatter.date}</span>
          <Link className="link" to={node.fields.slug}>
            阅读全文
          </Link>
        </div>
      </div>
    ))}
  </div>
)

class News extends React.Component {
  constructor(props) {
    super(props)

    this.types = NEWS_TYPES

    const params = props.location.pathname.split('/')
    this.selectType = params[2]
    this.selectLang = params[3]
  }

  render() {
    const { t, data } = this.props

    return (
      <div className="news">
        <Heading t={t} />
        <div className="news-wrapper">
          <NewsTypes
            t={t}
            types={this.types}
            selectType={this.selectType}
            selectLang={this.selectLang}
          />
          <NewsList data={data} />
        </div>
      </div>
    )
  }
}

export default translate('base')(News)

export const query = graphql`
  query NewsPageQuery(
    $framework: String!
    $type: String!
    $language: String!
    $limit: Int = 10
    $skip: Int = 0
  ) {
    allMarkdownRemark(
      filter: {
        fields: {
          framework: { eq: $framework }
          type: { eq: $type }
          language: { eq: $language }
        }
      }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
            framework
            type
            language
            article
          }
          frontmatter {
            title
            date
            author
          }
          excerpt
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
