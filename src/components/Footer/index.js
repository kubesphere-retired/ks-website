/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import classnames from 'classnames'
import { withTranslation } from 'react-i18next'

import Logo from '../Logo'
import Language from '../Language/index'

import styles from './index.module.scss'

const Footer = ({ className, t, pageContext }) => (
  <div className={classnames(styles.footer, className)}>
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div style={{ display: 'inline-block' }}>
          <Logo className={styles.logo} />
          <Language pageContext={pageContext} />
        </div>
        <div className={styles.links}>
          <ul>
            <li>
              <div className="h3">{t('Products')}</div>
              <a href={`/${pageContext.locale}`}>{t('Community Edition')}</a>
              <a
                href="https://kubesphere.qingcloud.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('Commercial Editions')}
              </a>
            </li>
            <li>
              <div className="h3">{t('Related Products')}</div>
              <a
                href="https://www.qingcloud.com/products/qingstor-neonsan/"
                target="_blank"
                rel="noopener noreferrer"
              >
                NeonSAN
              </a>
              <a
                href="https://www.qingcloud.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                QingCloud
              </a>
              <a
                href="https://openpitrix.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenPitrix
              </a>
            </li>
            <li>
              <div className="h3">{t('KubeSphere Docs')}</div>
              <a
                href="//docs.kubesphere.io/advanced-v2.0/zh-CN/installation/intro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('Installation')}
              </a>
              <a
                href="//docs.kubesphere.io/advanced-v2.0/zh-CN/quick-start/quick-start-guide/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('Tutorial')}
              </a>
            </li>
            <li>
              <div className="h3">{t('About')}</div>
              <a
                href="//activity.qingcloud.com/event/kubesphere2019/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('News')}
              </a>
              <a
                href="//www.qingcloud.com/jobs"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('Careers')}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className={styles.icp}>KubeSphere®️ 2019 All Rights Reserved.</p>
    </div>
  </div>
)

export default withTranslation()(Footer)
