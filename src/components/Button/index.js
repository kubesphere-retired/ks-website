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
  disabled = false,
}) => (
  <button
    className={classnames(
      styles.button,
      styles[type],
      styles[size],
      { [styles.ghost]: ghost, [styles.disabled]: disabled },
      className
    )}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button
