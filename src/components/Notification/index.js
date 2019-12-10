import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.module.scss'

export default class Notification extends React.Component {
  static propTypes = {
    text: PropTypes.any,
  }

  render() {
    const { text } = this.props

    return (
      <div className={styles.notify}>
        <div className={styles.text}>{text}</div>
      </div>
    )
  }
}
