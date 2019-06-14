import React from 'react'
import classnames from 'classnames'
import moment from 'moment-mini'
import { withTranslation } from 'react-i18next'

import styles from './index.module.scss'

const RoadMap = ({ className, data, t }) => (
  <div className={classnames(styles.roadmap, className)}>
    {data.map((item, index) => (
      <div key={item.name} className={styles.item}>
        <div
          className={classnames(styles.tip, {
            [styles.planning]: item.status === 'Planning',
          })}
        >
          <div className="dot" />
          <div className="line" />
        </div>
        <div
          className={classnames(styles.text, { [styles.top]: index % 2 === 1 })}
        >
          {item.time.length === 4
            ? moment(new Date(item.time)).format(t('YYYY'))
            : moment(new Date(item.time)).format(t('MMM YYYY'))}
          <div className={styles.br} />
          {t(item.name)}
        </div>
      </div>
    ))}
  </div>
)

export default withTranslation()(RoadMap)
