import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'

import Layout from '../layouts/index'
import withI18next from '../components/withI18next'
import Headings from '../components/Headings'
import { getScrollTop } from '../utils/index'

import '../styles/markdown.scss'
import './b16-tomorrow-dark.scss'
import './blog.scss'

const FRAMEWORK_PATH = {
  conference: {
    title: 'KubeCon & QCon',
    path: 'conferences',
  },
  blog: {
    title: 'Technology Blogs',
    path: 'blogs',
  },
}

class BlogPage extends React.Component {
  markdownRef = React.createRef()

  blogRef = React.createRef()

  navRef = React.createRef()

  componentDidMount() {
    if (
      this.markdownRef &&
      this.markdownRef.current &&
      !this.scroll &&
      typeof SmoothScroll !== 'undefined'
    ) {
      /* eslint-disable no-undef */
      this.scroll = new SmoothScroll('a[href*="#"]', {
        offset: 100,
      })
    }

    this.scrollToHash()

    if (this.navRef && this.navRef.current) {
      this.navHeight = this.navRef.current.firstChild.clientHeight
      this.threshold = this.navHeight - (window.innerHeight - 205)
      this.navBottom = this.threshold < 0 ? -this.threshold + 20 : 20

      document.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  scrollToHash = () => {
    setTimeout(() => {
      if (this.props.location.hash) {
        if (this.scroll) {
          const hash = decodeURIComponent(this.props.location.hash)
          this.handleHeadClick(hash)
        } else {
          const id = decodeURIComponent(this.props.location.hash).slice(1)
          const element = document.getElementById(id)
          element && element.scrollIntoView()
        }
      }
    }, 0)
  }

  handleScroll = () => {
    const scrollTop = getScrollTop()
    const classes = this.navRef.current.classList
    const navFixed = classes.contains('navigation-fixed')
    const mdBottom = classes.contains('navigation-bottom')

    if (scrollTop >= this.threshold && !navFixed) {
      classes.add('navigation-fixed')
      this.navRef.current.style.bottom = `${this.navBottom}px`
    } else if (scrollTop < this.threshold && navFixed) {
      classes.remove('navigation-fixed')
      this.navRef.current.style.bottom = 'auto'
    }

    if (this.blogRef && this.blogRef.current) {
      this.bottom =
        this.blogRef.current.clientHeight +
        185 -
        window.innerHeight +
        this.navBottom

      if (scrollTop >= this.bottom && !mdBottom) {
        classes.add('navigation-bottom')
      } else if (scrollTop < this.bottom && mdBottom) {
        classes.remove('navigation-bottom')
      }
    }
  }

  handleHeadClick = head => {
    this.scroll.animateScroll(document.querySelector(head), null, {
      offset: 100,
    })
  }

  render() {
    const {
      t,
      pageContext: { locale },
    } = this.props
    const edge = this.props.data.allMarkdownRemark.edges[0]
    const framework = edge.node.fields.framework

    return (
      <Layout {...this.props}>
        <div className="wrapper">
          <div className="breadcrumbs">
            <div>
              <Link to={`/${locale}/${FRAMEWORK_PATH[framework].path}`}>
                {t(FRAMEWORK_PATH[framework].title)}
              </Link>
            </div>
            <div>{edge.node.frontmatter.title}</div>
          </div>
          <div className="blog-wrapper">
            <div className="blog" ref={this.blogRef}>
              <div className="blog-metadata">
                <div className="blog-metadata-title">
                  {edge.node.frontmatter.author}
                </div>
                <div className="blog-metadata-time">
                  {t('Published at')}: {edge.node.frontmatter.createTime}
                </div>
              </div>
              <div className="blog-title">{edge.node.frontmatter.title}</div>
              <div
                className="markdown md-body"
                ref={this.markdownRef}
                dangerouslySetInnerHTML={{
                  __html: edge.node.html,
                }}
              />
            </div>
            <div className="navigation" ref={this.navRef}>
              <Headings
                title={t('Table of Contents')}
                headings={edge.node.headings}
                current={this.props.location.hash}
                onHeadClick={this.handleHeadClick}
              />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withI18next({ ns: 'common' })(BlogPage)

export const query = graphql`
  query BlogQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          id
          fields {
            slug
            framework
            language
            article
          }
          html
          frontmatter {
            title
            author
            createTime
          }
          headings {
            value
            depth
          }
        }
      }
    }
  }
`
