import React from 'react'
import Link from 'gatsby-link'
import { translate } from 'react-i18next'

import Logo from '../Logo'
import styles from './index.module.scss'
import { getLanguage } from '../../utils/index'

import Button from '../Button/index'

import { ReactComponent as GithubIcon } from '../../assets/icon-git.svg'

class Header extends React.Component {
  render() {
    const { i18n, t } = this.props

    const lang = getLanguage(i18n.language)

    return (
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <Link to="/">
            <Logo className={styles.logo} />
          </Link>
          <div className={styles.nav}>
            <Link to="/">{t('Home')}</Link>
            <Link to={'/install/' + 'zh-CN'}>{t('Install')}</Link>
            <Link to="/building">{t('Documentation')}</Link>
            <Link to="/building">{t('Business Edition')}</Link>
          </div>
          <div style={{ float: 'right' }}>
            <a href="https://github.com/kubesphere/kubesphere" target="_blank">
              <Button type="default" ghost>
                <GithubIcon />
                Github
              </Button>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default translate('base')(Header)
