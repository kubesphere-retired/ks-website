import React from 'react'
import classnames from 'classnames';

import styles from './index.module.scss'

const Feature = ({ icon, title, desc }) => (
  <div className={styles.featureCard}>
    <img src={icon} alt=""/>
    <div className="h2">{title}</div>
    <p>{desc}</p>
  </div>
)

export default Feature
