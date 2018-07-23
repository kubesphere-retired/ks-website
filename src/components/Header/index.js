import React from 'react'
import Link from 'gatsby-link'
import { translate } from 'react-i18next'

import Logo from '../Logo'
import styles from './index.module.scss'
import { getLanguage } from '../../utils/index'

import Button from '../Button/index'

import githubIcon from '../../assets/icon-git.svg'

class Header extends React.Component {
  render() {
    const { i18n, t } = this.props

    const lang = getLanguage(i18n.language)

    return (
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <Logo className={styles.logo} />
          <div className={styles.nav}>
            <Link to="/">{t('Home')}</Link>
            <Link to={"/install/"+lang}>{t('Install')}</Link>
            <a href="https://kubesphere.qingcloud.com" target="_blank">{t('Documentation')}</a>
            <Link to="/">{t('Business Edition')}</Link>
          </div>
          <div style={{ float: 'right' }}>
            <a
              href="https://github.com/kubesphere/kubesphere.github.io"
              target="_blank"
            >
              <Button type="default" ghost>
                <img src={githubIcon} alt=""/>
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
