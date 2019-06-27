/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import classNames from 'classnames'
import { graphql } from 'gatsby'

import Layout from '../layouts/index'

import withI18next from '../components/withI18next'

import { REPORTS, PRACTICES } from '../data'

import './index.scss'

const ReportsPage = props => {
  const { t } = props
  const [tab, setTab] = useState('practices')

  return (
    <Layout {...props}>
      <div className="reports">
        <div className="reports-header">
          <div className="reports-title">{t('Trends')}</div>
          <div className="reports-desc">
            {t("Share KubeSphere's best practices and media coverage")}
          </div>
        </div>
        <ul className="reports-tabs">
          <li
            className={classNames({
              'reports-tab-selected': tab === 'practices',
            })}
            onClick={() => setTab('practices')}
          >
            {t('Develop Practices')}
          </li>
          <li
            className={classNames({
              'reports-tab-selected': tab === 'reports',
            })}
            onClick={() => setTab('reports')}
          >
            {t('Media Coverage')}
          </li>
        </ul>
        <div className="reports-cards-wrapper">
          <ul
            className={classNames('reports-cards', {
              'reports-cards-show': tab === 'practices',
            })}
          >
            {PRACTICES.map(report => (
              <ReportCard key={report.title} data={report} />
            ))}
          </ul>
          <ul
            className={classNames('reports-cards', {
              'reports-cards-show': tab === 'reports',
            })}
          >
            {REPORTS.map(report => (
              <ReportCard key={report.title} data={report} />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

const ReportCard = ({ data }) => (
  <div className="report-card">
    {data.icon && (
      <div className="report-card-icon">
        <img src={`/${data.icon}`} alt="" />
      </div>
    )}
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
