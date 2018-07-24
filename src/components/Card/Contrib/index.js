import React from 'react'
import classnames from 'classnames'

import styles from './index.module.scss'

const ContribCard = ({ className, icon, title, children }) => (
  <div className={classnames(styles.card, className)}>
    <div className={styles.title}>
      <img src={icon} alt="" />
      {title}
    </div>
    <div className={styles.content}>{children}</div>
  </div>
)

export default ContribCard
