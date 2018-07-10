import React from 'react'
import Link from 'gatsby-link'
import classnames from 'classnames'
import { translate } from 'react-i18next'

import styles from './index.module.scss'

const Footer = ({ className, t }) => (
  <div className={classnames(styles.footer, className)}>
    <div className={styles.wrapper}>
      <p className={styles.icp}>KubeSphere Technology © 2018</p>
    </div>
  </div>
)

export default translate('base')(Footer)
