import React from 'react'
import { withTranslation } from 'react-i18next'

import { ReactComponent as CloseIcon } from '../../assets/close.svg'
import { ReactComponent as GithubIcon } from '../../assets/icon-git.svg'
import { ReactComponent as StarLeftIcon } from '../../assets/star-left.svg'
import { ReactComponent as StarRightIcon } from '../../assets/star-right.svg'

import styles from './index.module.scss'

class Star extends React.Component {
  handleClick = () => {
    window.open('https://github.com/kubesphere/kubesphere', '_blank')
  }

  handleClose = e => {
    e.stopPropagation()
    localStorage.setItem('kubesphere-star', 'hidden')
    this.forceUpdate()
  }

  render() {
    const { t } = this.props

    const showStar =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('kubesphere-star') !== 'hidden'
        : true

    if (!showStar) {
      return null
    }

    return (
      <div className={styles.wrapper} onClick={this.handleClick}>
        <div className={styles.title}>🎉🎉🎉 {t('If you like KubeSphere')}</div>
        <p className={styles.desc}>
          {t('Please give us a GitHub Star as an encouragement.')}
        </p>
        <div className={styles.star}>
          <GithubIcon width={20} height={20} /> Github Star
        </div>
        <div className={styles.close} onClick={this.handleClose}>
          <CloseIcon width={20} height={20} />
        </div>
        <StarLeftIcon className={styles.left} />
        <StarRightIcon className={styles.right} />
      </div>
    )
  }
}

export default withTranslation()(Star)
