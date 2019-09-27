import React from 'react'
import classNames from 'classnames'
import Tippy from '@tippy.js/react'

import styles from './index.module.scss'

export default class Select extends React.Component {
  handleChange = e => {
    const { onChange } = this.props
    onChange && onChange(e.currentTarget.dataset.value)
  }

  renderControl() {
    const { value, options, controlClassName } = this.props

    const item = options.find(option => option.value === value) || {}

    return (
      <div className={classNames(styles.control, controlClassName)}>
        <span>{item.label || value}</span>
        <div className={styles.arrow} />
      </div>
    )
  }

  renderOptions() {
    const { optionsClassName, options } = this.props
    return (
      <div
        className={classNames(styles.options, optionsClassName)}
        ref={this.optionsRef}
      >
        <ul>
          {options.map(option => (
            <li
              key={option.value}
              data-value={option.value}
              onClick={this.handleChange}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  render() {
    return (
      <Tippy
        content={this.renderOptions()}
        trigger="click"
        arrowType="round"
        theme="light"
        placement="bottom"
        interactive
        arrow
      >
        {this.renderControl()}
      </Tippy>
    )
  }
}
