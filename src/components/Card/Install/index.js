import React from 'react'
import classnames from 'classnames'
import { translate } from 'react-i18next'

import styles from './index.module.scss'

const InstallCard = ({
  className,
  icon,
  type,
  title,
  desc,
  selected,
  onClick,
  t,
}) => (
  <div
    className={classnames(
      styles.card,
      { [styles.select]: selected },
      className
    )}
    data-type={type}
    onClick={onClick}
  >
    {icon}
    <div className={styles.text}>
      <div className="h3">{t(title)}</div>
      <p>{t(desc)}</p>
    </div>
  </div>
)

export default translate('base')(InstallCard)
