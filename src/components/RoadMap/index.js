import React from 'react'
import classnames from 'classnames'

import styles from './index.module.scss'

const RoadMap = ({
  className,
  data,
}) => (
  <div
    className={classnames(
      styles.roadmap,
      className
    )}
  >
    {
      data.map(item => (
        <div key={item.name} className={styles.item}>
          <div className={classnames(styles.tip, {[styles.planning]: item.status === 'planning'})}>
            <div className="dot" />
            <div className="line"/>
          </div>
          <p className={styles.text}>{item.time}{item.name}</p>
        </div>
      ))
    }
  </div>
)

export default RoadMap
