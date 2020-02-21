import React from 'react'
import Link from 'gatsby-link'
import classnames from 'classnames'

import Layout from './index'

import withI18next from '../components/withI18next'
import Button from '../components/Button/'

import { ReactComponent as GithubIcon } from '../assets/icon-git.svg'

import { OPEN_SOURCE_SUB_MENUS } from '../data'

import './opensource.scss'

const OpenSourceLayout = props => {
  const { children, ...rest } = props
  const {
    t,
    pageContext: { locale, originalPath },
  } = props

  const siteMetadata = props.data.site.siteMetadata
  siteMetadata.title = `${t('Open Source Community')} - ${siteMetadata.title}`

  return (
    <Layout {...rest}>
      <div className="opensource">
        <div className="opensource-header">
          <div className="opensource-title">{t('Open Source Community')}</div>
          <div className="opensource-desc">
            {t('open_source_projects_desc')}
          </div>
          <div>
            <a
              href="https://github.com/kubesphere"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="control" size="large">
                <GithubIcon />
                {t('Goto Github')}
              </Button>
            </a>
          </div>
        </div>
        <ul className="tabs">
          {OPEN_SOURCE_SUB_MENUS.map(menu => (
            <li
              key={menu.value}
              className={classnames({
                'tab-selected': originalPath === `/${menu.value}/`,
              })}
            >
              <Link to={`/${locale}/${menu.value}/`}>{t(menu.label)}</Link>
            </li>
          ))}
        </ul>
        <div className="tab-content">{children}</div>
      </div>
    </Layout>
  )
}

export default withI18next({ ns: 'common' })(OpenSourceLayout)
