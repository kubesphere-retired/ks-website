import React from 'react'
import Link from 'gatsby-link'
import { withTranslation } from 'react-i18next'
import classnames from 'classnames'
import Tippy from '@tippy.js/react'

import Logo from '../Logo'
import Modal from '../Modal/index'
import Button from '../Button/index'
import styles from './index.module.scss'
import { getScrollTop } from '../../utils/index'
import { OPEN_SOURCE_SUB_MENUS } from '../../data'
import Language from '../Language/index'

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

    if (scrollTop >= 100 && !headerShadow) {
      classes.add('header-shadow')
    } else if (scrollTop < 100 && headerShadow) {
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

  renderSubMenu() {
    const {
      t,
      pageContext: { locale, originalPath },
    } = this.props

    return (
      <ul className={styles.menu}>
        {OPEN_SOURCE_SUB_MENUS.map(menu => (
          <li key={menu.value}>
            <Link
              to={`/${locale}/${menu.value}/`}
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
      pageContext: { locale, originalPath },
    } = this.props

    return (
      <div className={styles.nav} onClick={this.handleCloseModal}>
        <Link
          to={`/${locale}/`}
          className={classnames({
            [styles.selected]: originalPath === '/',
          })}
        >
          {t('Home')}
        </Link>
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
            {t('Open Source Community')}
          </span>
        </Tippy>
        <Link
          to={`/${locale}/install/`}
          className={classnames({
            [styles.selected]: originalPath === '/install',
          })}
        >
          {t('Quick Installation')}
        </Link>
        <a href={`/docs/zh-CN/`} target="_blank" rel="noopener noreferrer">
          {t('Documentation')}
        </a>
        <Link
          to={`/${locale}/trends/`}
          className={classnames({
            [styles.selected]: originalPath === '/trends/',
          })}
        >
          {t('Trends')}
        </Link>
      </div>
    )
  }

  render() {
    const {
      t,
      pageContext: { locale },
    } = this.props

    return (
      <div
        className={styles.header}
        ref={ref => {
          this.headerRef = ref
        }}
      >
        <div className={styles.wrapper}>
          <Link to={`/${locale}/`}>
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
