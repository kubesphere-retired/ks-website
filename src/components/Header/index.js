import React from 'react'
import Link from 'gatsby-link'
import { withTranslation } from 'react-i18next'
import classnames from 'classnames'
import Tippy from '@tippy.js/react'

import Logo from '../Logo'
import Modal from '../Modal/index'
import Button from '../Button/index'
import styles from './index.module.scss'
import { getScrollTop, isPC } from '../../utils/index'
import { OPEN_SOURCE_SUB_MENUS } from '../../data'
import Language from '../Language/index'
import Notification from '../Notification/index'

class Header extends React.Component {
  state = {
    showModal: false,
  }

  componentWillMount() {
    this.isPC = isPC()
  }

  componentDidMount() {
    this.$main = document.getElementsByClassName('main')[0]

    if (!this.isPC) {
      document.addEventListener('scroll', this.handleMobileScroll)
    } else {
      document.addEventListener('scroll', this.handlePCScroll)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
    document.removeEventListener('scroll', this.handleMobileScroll)
  }

  handlePCScroll = () => {
    const scrollTop = getScrollTop()
    if (!this.headerRef) {
      return
    }

    const classes = this.headerRef.classList
    const headerShadow = classes.contains('header-shadow')
    const headerFixed = classes.contains('header-fixed')

    if (scrollTop >= 100 && !headerShadow) {
      classes.add('header-shadow')
    } else if (scrollTop < 100 && headerShadow) {
      classes.remove('header-shadow')
    }

    if (scrollTop >= 40 && !headerFixed) {
      classes.add('header-fixed')
      this.$main.style.paddingTop = '96px'
    } else if (scrollTop < 40 && headerFixed) {
      classes.remove('header-fixed')
      this.$main.style.paddingTop = '0px'
    }
  }

  handleMobileScroll = () => {
    const scrollTop = getScrollTop()
    if (!this.headerRef) {
      return
    }

    const classes = this.headerRef.classList
    const headerShadow = classes.contains('header-shadow')
    const headerFixed = classes.contains('header-mobile-fixed')

    if (scrollTop >= 100 && !headerShadow) {
      classes.add('header-shadow')
    } else if (scrollTop < 100 && headerShadow) {
      classes.remove('header-shadow')
    }

    if (!this.lastScrollTop) {
      this.lastScrollTop = scrollTop
    }

    if (this.lastScrollTop > scrollTop + 30) {
      if (!headerFixed) {
        classes.add('header-mobile-fixed')
        this.$main.style.paddingTop = '96px'
      }
      this.lastScrollTop = scrollTop
    } else if (this.lastScrollTop + 30 < scrollTop) {
      if (headerFixed) {
        classes.remove('header-mobile-fixed')
        this.$main.style.paddingTop = '0px'
      }
      this.lastScrollTop = scrollTop
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

  renderSubMenu() {
    const {
      t,
      pageContext: { prefix, originalPath },
    } = this.props

    return (
      <ul className={styles.menu}>
        {OPEN_SOURCE_SUB_MENUS.map(menu => (
          <li key={menu.value}>
            <Link
              to={`${prefix}${menu.value}/`}
              className={classnames({
                [styles.selected]: originalPath === `/${menu.value}/`,
              })}
            >
              {t(menu.label)}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderNav() {
    const {
      t,
      pageContext: { prefix, originalPath },
    } = this.props

    return (
      <div className={styles.nav} onClick={this.handleCloseModal}>
        <Link
          to={prefix}
          className={classnames({
            [styles.selected]: originalPath === '/',
          })}
        >
          {t('Home')}
        </Link>
        {this.isPC ? (
          <Tippy
            content={this.renderSubMenu()}
            arrowType="round"
            theme="light"
            placement="bottom"
            distance={-10}
            interactive
            arrow
          >
            <span
              href="#"
              className={classnames({
                [styles.selected]: OPEN_SOURCE_SUB_MENUS.some(
                  menu => originalPath === `/${menu.value}/`
                ),
              })}
            >
              {t('Open Source')}
            </span>
          </Tippy>
        ) : (
          <Link
            to={`${prefix}projects/`}
            className={classnames({
              [styles.selected]: OPEN_SOURCE_SUB_MENUS.some(
                menu => originalPath === `/${menu.value}/`
              ),
            })}
          >
            {t('Open Source')}
          </Link>
        )}
        <Link
          to={`${prefix}install/`}
          className={classnames({
            [styles.selected]: originalPath === '/install',
          })}
        >
          {t('Quick Installation')}
        </Link>
        <a href={`/docs/`} target="_blank" rel="noopener noreferrer">
          {t('Documentation')}
        </a>
        <a href={`/forum`} target="_blank" rel="noopener noreferrer">
          {t('Forum')}
        </a>
        <Link
          to={`${prefix}trends/`}
          className={classnames({
            [styles.selected]: originalPath === '/trends/',
          })}
        >
          {t('News')}
        </Link>
      </div>
    )
  }

  render() {
    const {
      t,
      pageContext: { prefix },
    } = this.props

    return (
      <div
        className={styles.header}
        ref={ref => {
          this.headerRef = ref
        }}
      >
        <Notification
          text={
            <span
              dangerouslySetInnerHTML={{
                __html: t('KUBESPHERE_210_NOTIFY'),
              }}
            />
          }
        />
        <div className={styles.wrapper}>
          <Link to={prefix}>
            <Logo className={styles.logo} />
          </Link>
          <div className={styles.navsWrapper}>{this.renderNav()}</div>
          <div className={styles.right}>
            <Language pageContext={this.props.pageContext} />
            <Tippy
              content={
                <span
                  className={styles.tip}
                  dangerouslySetInnerHTML={{
                    __html: t('DEMO_TIP'),
                  }}
                />
              }
              arrowType="round"
              theme="light"
              placement="bottom"
              interactive
              arrow
            >
              <div className={styles.demo}>
                <a
                  href="https://demo.kubesphere.io/login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="small" type="control">
                    {t('Online Demo')}
                  </Button>
                </a>
              </div>
            </Tippy>
          </div>
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

export default withTranslation()(Header)
