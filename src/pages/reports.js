/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/index'

import withI18next from '../components/withI18next'

import { REPORTS } from '../data'

import './index.scss'

const ReportsPage = props => {
  const { t } = props
  return (
    <Layout {...props}>
      <div className="reports">
        <div className="reports-header">
          <div className="reports-title">{t('News Reports')}</div>
        </div>
        <ul className="reports-cards">
          {REPORTS.map(report => (
            <ReportCard key={report.title} data={report} />
          ))}
        </ul>
      </div>
    </Layout>
  )
}

const ReportCard = ({ data }) => (
  <div className="report-card">
    <div className="report-card-icon">
      <img src={`/${data.icon}`} alt="" />
    </div>
    <div className="report-card-title">
      <a
        className="strong"
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {data.title}
      </a>
      <p>{data.desc}</p>
    </div>
  </div>
)

export default withI18next({ ns: 'common' })(ReportsPage)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
