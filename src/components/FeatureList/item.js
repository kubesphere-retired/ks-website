import React from 'react'

import styles from './index.module.scss'

const FeatureItem = ({ icon, name, desc }) => (
  <div className={styles.item}>
    <div className={styles.name}>
      <img src={icon} alt=""/>
      {name}
    </div>
    <p className={styles.desc}>
      {desc}
    </p>
  </div>
)

export default FeatureItem;