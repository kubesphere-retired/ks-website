import React from 'react'
import classnames from 'classnames'
import Link from 'gatsby-link'
import { translate } from "react-i18next"

import Button from '../Button/index'
import styles from './index.module.scss'

import okIcon from '../../assets/ok.svg';

const VersionCard = ({ t, icon, title, desc, features, primaryButton }) => (
  <div className={styles.versionCard}>
    <div className={styles.title}>
      <img src={icon} alt=""/>
      <div className={styles.text}>
        <div className="h2">{title}</div>
        <div className={styles.desc}>{desc}</div>
      </div>
    </div>
    <div className={styles.features}>
      {
        features && features.map(feature => (
          <p 
            key={feature.text}
            className={classnames({
              [styles.checked]: feature.enable,
              [styles.highlight]: feature.highlight,
              [styles.important]: feature.important,
            })}
          >
            {feature.enable && <img src={okIcon} alt=""/>}
            {feature.text}
          </p>
        ))
      }
    </div>
    <div className={styles.actions}>
      <Link to={primaryButton.link}>
        <Button 
          className={classnames({[styles.button]: primaryButton.type === 'primary'})} 
          type={primaryButton.type}
        >
          {t(primaryButton.text)}
        </Button>
      </Link>
    </div>
  </div>
)

export default translate('base')(VersionCard)
