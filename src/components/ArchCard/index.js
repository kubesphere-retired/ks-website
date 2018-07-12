import React from 'react'
import classnames from 'classnames'
import { translate } from 'react-i18next'

import styles from './index.module.scss'

const ArchCard = ({ t, title, features }) => (
  <div className={styles.card}>
    <div className={styles.title}>{title}</div>
    {features && features.map(feature => <p key={feature}>{t(feature)}</p>)}
  </div>
)

export default translate('base')(ArchCard)
