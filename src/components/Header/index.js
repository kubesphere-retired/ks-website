import React from 'react'
import Link from 'gatsby-link'
import { translate } from 'react-i18next'

import Logo from '../Logo'
import styles from './index.module.scss'
import { getScrollTop, getLanguage } from '../../utils/index'

import githubIcon from '../../assets/github.svg'

class Header extends React.Component {
  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const scrollTop = getScrollTop()
    const classes = this.headerRef.classList
    const darkHeader = classes.contains('header-dark')

    if (scrollTop >= 132 && !darkHeader) {
      classes.add('header-dark')
    } else if (scrollTop < 132 && darkHeader) {
      classes.remove('header-dark')
    }
  }

  getHeaderRef = ref => {
    this.headerRef = ref
  }

  render() {
    const { i18n, t } = this.props

    const lang = getLanguage(i18n.language)

    return (
      <div ref={this.getHeaderRef} className={styles.header}>
        <div className={styles.wrapper}>
          <Logo className={styles.logo} />
          <div className={styles.nav}>
            <Link to="/">{t('Home')}</Link>
            <Link to="/">{t('Product')}</Link>
            <Link to={`/news/enterprise/${lang}`}>{t('News')}</Link>
            <Link to="/">{t('Documentation')}</Link>
            <a
              href="https://github.com/kubesphere/kubesphere.github.io"
              target="_blank"
            >
              <img src={githubIcon} />Github
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default translate('base')(Header)
