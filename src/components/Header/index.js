import React from 'react'
import Link from 'gatsby-link'
import { translate } from 'react-i18next'
import classnames from 'classnames'

import Logo from '../Logo'
import Modal from '../Modal/index'
import styles from './index.module.scss'
import { getScrollTop } from '../../utils/index'

import Button from '../Button/index'

import { ReactComponent as GithubIcon } from '../../assets/icon-git.svg'

class Header extends React.Component {
  state = {
    showModal: false,
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const scrollTop = getScrollTop()
    const classes = this.headerRef.classList
    const headerShadow = classes.contains('header-shadow')

    if (scrollTop >= 10 && !headerShadow) {
      classes.add('header-shadow')
    } else if (scrollTop < 10 && headerShadow) {
      classes.remove('header-shadow')
    }
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true,
    })
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    })
  }

  renderNav() {
    const { t } = this.props

    return (
      <div className={styles.nav} onClick={this.handleCloseModal}>
        <Link to={'/install'}>{t('Installation')}</Link>
        <a href="//docs.kubesphere.io" target="_blank">
          {t('Documentation')}
        </a>
        <a href="https://kubesphere.qingcloud.com/" target="_blank">
          {t('Commercial Editions')}
        </a>
        <div className={styles.github}>
          <a href="https://github.com/kubesphere/kubesphere" target="_blank">
            <Button type="default" ghost>
              <GithubIcon />
              Github
            </Button>
          </a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div
        className={styles.header}
        ref={ref => {
          this.headerRef = ref
        }}
      >
        <div className={styles.wrapper}>
          <Link to="/">
            <Logo className={styles.logo} />
          </Link>
          <div className={styles.navsWrapper}>{this.renderNav()}</div>
          <div
            className={classnames(styles.showModal)}
            onClick={this.handleOpenModal}
          >
            <span className="v-line" />
            <span className="v-line" />
            <span className="v-line" />
          </div>
          <Modal
            isOpen={this.state.showModal}
            shouldCloseOnOverlayClick
            ariaHideApp={false}
            onRequestClose={this.handleCloseModal}
          >
            {this.renderNav()}
          </Modal>
        </div>
      </div>
    )
  }
}

export default translate('base')(Header)
