import React from 'react'
import Link from 'gatsby-link'
import classnames from 'classnames'
import { translate } from "react-i18next"

import Button from '../Button'

import adviseBg from '../../assets/advise_bg.svg'
import styles from './index.module.scss'

const Advise = ({ className, t }) => (
  <div className={classnames(styles.advise, className)}>
    <div className={styles.wrapper} style={{ backgroundImage: `url(${adviseBg})`}}>
      <div className="h2">{t('拥抱容器，轻松管理 Kubernetes 集群')}</div>
      <Link to="/"><Button className={styles.button}>{t('Consult now')}</Button></Link>
    </div>
  </div>
)

export default translate("base")(Advise)
