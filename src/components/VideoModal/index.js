import React from 'react'

import Modal from '../Modal/index'

import styles from './index.module.scss'

import { ReactComponent as CloseIcon } from '../../assets/close.svg'

class VideoModal extends React.Component {
  render() {
    const { data } = this.props

    if (!data || !data.link) {
      return null
    }

    return (
      <Modal
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
        {...this.props}
      >
        <div className={styles.videoWrapper}>
          <div className={styles.close} onClick={this.props.onRequestClose}>
            <CloseIcon width={20} height={20} />
          </div>
          <video
            className={styles.video}
            title={data.title}
            src={data.link}
            controls
            autoPlay
          />
        </div>
      </Modal>
    )
  }
}

export default VideoModal
