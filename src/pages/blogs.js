import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'

import Layout from '../layouts/opensource'
import Tags from '../components/Tags'

import withI18next from '../components/withI18next'
import { isPC } from '../utils/index'

import { ReactComponent as RightArrowIcon } from '../assets/right-arrow.svg'
import { ReactComponent as PeopleIcon } from '../assets/people.svg'

import './blogs.scss'

const BlogsPage = props => {
  const [tag, setTag] = useState('')

  const tags = []
  props.data.allMarkdownRemark.edges.forEach(md => {
    const _tag = md.node.frontmatter.tag
    _tag.split(',').forEach(item => {
      item = item.replace(/^\s+/, '').replace(/\s+$/, '')
      if (!tags.includes(item)) {
        tags.push(item)
      }
    })
  })

  return (
    <Layout {...props}>
      <div className="wrapper">
        {isPC() && <Tags options={tags} value={tag} onChange={setTag} />}
        <BlogList
          data={props.data.allMarkdownRemark.edges}
          tag={tag}
          pageContext={props.pageContext}
        />
      </div>
    </Layout>
  )
}

const BlogList = ({ data, tag, pageContext }) => (
  <div className="blog-list">
    {data.map(item => (
      <BlogItem
        key={item.node.id}
        data={item}
        tag={tag}
        pageContext={pageContext}
      />
    ))}
  </div>
)

const BlogItem = ({ data, tag, pageContext }) => {
  const tags = data.node.frontmatter.tag.split(',')

  const { defaultLocale, locale } = pageContext

  if (tag && !tags.includes(tag)) {
    return null
  }

  const convert =
    defaultLocale === locale ? str => str.replace(`/${locale}`, '') : str => str

  return (
    <div key={data.node.id} className="blog-item">
      <div className="blog-item-snapshot">
        <img src={data.node.frontmatter.snapshot} alt="" />
      </div>
      <div className="blog-item-content">
        <div className="blog-item-time">{data.node.frontmatter.createTime}</div>
        <div className="blog-item-title">
          <Link to={convert(data.node.fields.slug)}>
            {data.node.frontmatter.title}
          </Link>
        </div>
        <div className="blog-item-author">
          <PeopleIcon width={16} height={16} />
          <span>{data.node.frontmatter.author}</span>
        </div>
        <div className="blog-item-excerpt">{data.node.excerpt}</div>
        <div>
          {tags.map(tagItem => (
            <div key={tagItem} className="blog-item-tag">
              {tagItem}
            </div>
          ))}
        </div>
      </div>
      <Link to={convert(data.node.fields.slug)} className="blog-item-more">
        <RightArrowIcon />
      </Link>
    </div>
  )
}

export default withI18next({ ns: 'common' })(BlogsPage)

export const query = graphql`
  query BlogsPageQuery($locale: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        fields: { framework: { eq: "blog" }, language: { eq: $locale } }
      }
      sort: { fields: [frontmatter___createTime], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
            framework
            language
            article
          }
          excerpt
          frontmatter {
            title
            author
            tag
            createTime
            snapshot
          }
        }
      }
    }
  }
`
