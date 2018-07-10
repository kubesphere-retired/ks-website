import React from 'react'
import classnames from 'classnames'

import logoImg from '../../assets/logo.svg'
import styles from './index.module.scss'

const Logo = ({ className }) => (
  <span className={classnames(styles.logo, className)}>
    <img src={logoImg} alt="" />
  </span>
)

export default Logo
