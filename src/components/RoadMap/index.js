import React from 'react'
import classnames from 'classnames'
import moment from 'moment-mini'
import { translate } from 'react-i18next'

import styles from './index.module.scss'

const RoadMap = ({ className, data, t }) => (
  <div className={classnames(styles.roadmap, className)}>
    {data.map(item => (
      <div key={item.name} className={styles.item}>
        <div
          className={classnames(styles.tip, {
            [styles.planning]: item.status === 'planning',
          })}
        >
          <div className="dot" />
          <div className="line" />
        </div>
        <p className={styles.text}>
          {moment(new Date(item.time)).format(t('MMM DD YYYY'))}
          <br />
          {t(item.name)}
        </p>
      </div>
    ))}
  </div>
)

export default translate('base')(RoadMap)
