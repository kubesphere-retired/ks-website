import React from 'react'
import classnames from 'classnames'

import styles from './index.module.scss'

const Button = ({
  className,
  children,
  size = 'normal',
  type = 'primary',
  onClick,
  ghost = false,
}) => (
  <button
    className={classnames(
      styles.button, 
      styles[type], 
      styles[size], 
      {[styles.ghost]: ghost}, 
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button
