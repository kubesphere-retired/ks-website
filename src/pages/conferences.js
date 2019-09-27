import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'

import Layout from '../layouts/opensource'
import Button from '../components/Button'

import withI18next from '../components/withI18next'

import './conferences.scss'

const ConferencesPage = props => {
  const kubeConReports = []
  const qConReports = []

  props.data.allMarkdownRemark.edges.forEach(md => {
    if (md.node.frontmatter.type === 'KubeCon') {
      kubeConReports.push(md)
    } else if (md.node.frontmatter.type === 'QCon') {
      qConReports.push(md)
    }
  })

  return (
    <Layout {...props}>
      <div className="wrapper">
        <KubeConBanner {...props} />
        <Reports {...props} reports={kubeConReports} />
        <QConBanner {...props} />
        <Reports {...props} reports={qConReports} />
      </div>
    </Layout>
  )
}

const Reports = props => {
  const { reports, t } = props
  return (
    <div className="con-reports">
      {reports.map(({ node }) => (
        <div key={node.id} className="con-report">
          <div className="con-report-info">
            <div className="con-report-title">
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
            </div>
            <div className="con-report-author">{node.frontmatter.author}</div>
            <div className="con-report-excerpt">{node.excerpt}</div>
            <div className="con-report-more">
              <Link to={node.fields.slug}>
                <Button size="small" type="white">
                  {t('View Details')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="con-report-snapshot">
            <img src={node.frontmatter.snapshot} alt="" />
          </div>
        </div>
      ))}
    </div>
  )
}

const KubeConBanner = props => {
  const { t } = props
  return (
    <div className="con-banner">
      <img className="con-banner-bg" src="/kubecon-bg.svg" alt="" />
      <div className="con-banner-title">{t('KubeCon')}</div>
      <div className="con-banner-description">{t('KUBECON_DESC')}</div>
      <img
        className="con-banner-logo"
        src="/kubecon.svg"
        alt=""
        style={{ right: 158 }}
      />
    </div>
  )
}

const QConBanner = props => {
  const { t } = props
  return (
    <div
      className="con-banner"
      style={{
        backgroundImage: 'linear-gradient(to left, #34c5d1, #5fb6d8)',
        marginTop: 48,
      }}
    >
      <img className="con-banner-bg" src="/qcon-bg.svg" alt="" />
      <div className="con-banner-title">
        {t('QCon International Software Development Conference')}
      </div>
      <div className="con-banner-description">{t('QCON_DESC')}</div>
      <img
        className="con-banner-logo"
        src="/qcon.svg"
        alt=""
        style={{ right: 83 }}
      />
    </div>
  )
}

export default withI18next({ ns: 'common' })(ConferencesPage)

export const query = graphql`
  query ConPageQuery($locale: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        fields: { framework: { eq: "conference" }, language: { eq: $locale } }
      }
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
            type
            title
            author
            snapshot
            createTime
          }
        }
      }
    }
  }
`
