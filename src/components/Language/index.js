/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import classnames from 'classnames'
import { withTranslation } from 'react-i18next'

import { ReactComponent as EarthIcon } from '../../assets/earth.svg'

import { getLanguage } from '../../utils/index'

import styles from './index.module.scss'

const LANGS = [
  { name: '简体中文', value: 'zh-CN' },
  { name: 'English', value: 'en' },
]

const Language = ({ className, pageContext: { locale, originalPath } }) => {
  const handleChange = e => {
    if (typeof window !== 'undefined') {
      window.location.href = `/${e.target.dataset.lang}${originalPath}`
    }
  }

  return (
    <div className={classnames(styles.lang, className)}>
      <EarthIcon />
      {LANGS.map(lang => (
        <a
          key={lang.value}
          className={classnames({
            [styles.select]: lang.value === getLanguage(locale),
          })}
          data-lang={lang.value}
          onClick={handleChange}
        >
          {lang.name}
        </a>
      ))}
    </div>
  )
}

export default withTranslation()(Language)
