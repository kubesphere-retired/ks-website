import React from 'react'
import classnames from 'classnames'

import styles from './index.module.scss'

const InstallCard = ({
  className,
  icon,
  type,
  title,
  desc,
  selected,
  onClick
}) => (
  <div
    className={classnames(
      styles.card,
      {[styles.select]: selected},
      className
    )}
    data-type={type}
    onClick={onClick}
  >
    <img src={icon} alt=""/>
    <div className={styles.text}>
      <div className="h3">{title}</div>
      <p>{desc}</p>
    </div>
  </div>
)

export default InstallCard
