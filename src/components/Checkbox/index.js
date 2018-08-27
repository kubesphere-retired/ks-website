import React, { Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { ReactComponent as Check } from '../../assets/check.svg'

import styles from './index.module.scss'

class Checkbox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    onChange() {},
  }

  state = {
    checked: false,
  }

  handleClick = () => {
    const { onChange } = this.props

    this.setState(
      ({ checked }) => {
        onChange(checked)
        return {
          checked: !checked,
        }
      }
    )
  }

  render() {
    const { className, children } = this.props
    const { checked } = this.state

    return (
      <label
        className={classnames(
          styles.checkbox,
          { [styles.checked]: checked },
          className
        )}
        onClick={this.handleClick}
      >
        <span className={styles.input}>{checked && <Check />}</span>
        {children}
      </label>
    )
  }
}

export default Checkbox