import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.module.scss'

import { ReactComponent as CloseIcon } from '../../assets/close.svg'

export default class Notification extends React.Component {
  static propTypes = {
    text: PropTypes.any,
  }

  render() {
    const { text, onClick } = this.props

    return (
      <div className={styles.notify}>
        <div className="wrapper">
          <div className={styles.text}>{text}</div>
          <CloseIcon className={styles.close} onClick={onClick}/>
        </div>
      </div>
    )
  }
}
