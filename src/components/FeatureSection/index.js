import React from 'react'
import classnames from 'classnames';

import styles from './index.module.scss'

const Feature = ({ icon, title, secondTitle, desc, graphic, reverse = false }) => {
  const Words = () => (
    <div className={styles.words}>
      <div className={styles.title}>
        <img src={icon} alt=""/>
        <div className={styles.text}>
          <div className="h3 text-green">{title}</div>
          <div className="h2">{secondTitle}</div>
        </div>
      </div>
      <p>{desc}</p>
    </div>
  )

  const Graphic = () => (
    <div className={styles.graphic}>
      <img src={graphic} alt=""/>
    </div>
  )

  if(reverse) {
    return (
      <div className={classnames(styles.featureSection, styles.reverse)}>
        <Graphic />
        <Words />
      </div>
    );
  }

  return (
    <div className={styles.featureSection}>
      <Words />
      <Graphic />
    </div>
  );
}

export default Feature
