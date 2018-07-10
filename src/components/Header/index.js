import React from 'react'
import Link from 'gatsby-link'
import { translate } from "react-i18next"

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

  getHeaderRef = (ref) => {
    this.headerRef = ref
  }

  render() {
    const { i18n } = this.props

    const lang = getLanguage(i18n.language)

    return (
      <div ref={this.getHeaderRef} className={styles.header}>
        <div className={styles.wrapper}>
          <Logo className={styles.logo}/>
          <div className={styles.nav}>
            <Link to="/">首页</Link>
            <Link to="/">产品</Link>
            <Link to={`/news/enterprise/${lang}`}>新闻动态</Link>
            <Link to="/">文档中心</Link>
            <Link to="/"><img src={githubIcon} />Github</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default translate('base')(Header)
