import React from 'react'
import Link from 'gatsby-link'
import classnames from 'classnames'
import { translate } from 'react-i18next'

import Logo from '../Logo'

import styles from './index.module.scss'

const Footer = ({ className, t }) => (
  <div className={classnames(styles.footer, className)}>
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <Logo className={styles.logo} />
        <ul className={styles.links}>
          <li>
            <div className="h3">产品</div>
            <Link to="">KubeSphere 社区版</Link>
            <Link to="">KubeSphere 商业版</Link>
          </li>
          <li>
            <div className="h3">相关产品</div>
            <Link to="">Radon DB</Link>
            <Link to="">NeonSAN</Link>
            <Link to="">QingCloud</Link>
            <Link to="">OpenPitrix</Link>
          </li>
          <li>
            <div className="h3">文档中心</div>
            <Link to="">Installer</Link>
            <Link to="">Tutorial</Link>
          </li>
          <li>
            <div className="h3">关于</div>
            <Link to="">关于我们</Link>
            <Link to="">加入我们</Link>
          </li>
        </ul>
      </div>
      <p className={styles.icp}>KubeSphere powered by Yunify Inc.</p>
    </div>
  </div>
)

export default translate('base')(Footer)
