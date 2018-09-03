import React from 'react'
import Link from 'gatsby-link'
import classnames from 'classnames'
import { translate } from 'react-i18next'

import Logo from '../Logo'
import Language from '../Language/index'

import styles from './index.module.scss'

const Footer = ({ className, t }) => (
  <div className={classnames(styles.footer, className)}>
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div style={{ display: 'inline-block' }}>
          <Logo className={styles.logo} />
          <Language />
        </div>
        <div className={styles.links}>
          <ul>
            <li>
              <div className="h3">{t('Products')}</div>
              <Link to="">{t('Community Edition')}</Link>
              <a href="https://kubesphere.qingcloud.com/" target="_blank">
                {t('Commercial Editions')}
              </a>
            </li>
            <li>
              <div className="h3">{t('Related Products')}</div>
              <a
                href="https://www.qingcloud.com/products/radondb/"
                target="_blank"
              >
                Radon DB
              </a>
              <a
                href="https://www.qingcloud.com/products/qingstor-neonsan/"
                target="_blank"
              >
                NeonSAN
              </a>
              <a href="https://www.qingcloud.com" target="_blank">
                QingCloud
              </a>
              <a href="https://openpitrix.io" target="_blank">
                OpenPitrix
              </a>
            </li>
            <li>
              <div className="h3">{t('KubeSphere Docs')}</div>
              <a
                href="//docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/"
                target="_blank"
              >
                {t('Installer')}
              </a>
              <a
                href="//docs.kubesphere.io/express/zh-CN/user-case/"
                target="_blank"
              >
                {t('Tutorial')}
              </a>
            </li>
            <li>
              <div className="h3">{t('About')}</div>
              <Link to="">{t('About us')}</Link>
              <Link to="">{t('Careers')}</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className={styles.icp}>KubeSphere™ 2018 All Rights Reserved.</p>
    </div>
  </div>
)

export default translate('base')(Footer)
