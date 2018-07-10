import React from 'react'
import classnames from 'classnames';

import styles from './index.module.scss'

const Button = ({ className, children, size='normal', type='primary', onClick }) => (
  <button 
    className={classnames(styles.button, styles[type], styles[size], className)}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button
