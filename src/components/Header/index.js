import React from 'react'
import Link from 'gatsby-link'
import { translate } from 'react-i18next'
import classnames from 'classnames'

import Logo from '../Logo'
import Modal from 'react-modal'
import styles from './index.module.scss'
import { getScrollTop } from '../../utils/index'

import Button from '../Button/index'

import { ReactComponent as GithubIcon } from '../../assets/icon-git.svg'

Modal.defaultStyles.overlay = Object.assign({}, Modal.defaultStyles.overlay, {
  padding: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(36, 46, 66, 0.06)',
})

Modal.defaultStyles.content = {
  position: 'relative',
  margin: '0 auto',
}

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
        <Link to="/">{t('Homepage')}</Link>
        <Link to={'/install'}>{t('Installation')}</Link>
        <Link to="/building">{t('KubeSphere Docs')}</Link>
        <a href="https://kubesphere.qingcloud.com/" target="_blank">
          {t('Commercial Edition')}
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
