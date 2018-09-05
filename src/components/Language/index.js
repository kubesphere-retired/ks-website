import React from 'react'
import classnames from 'classnames'
import { translate } from 'react-i18next'

import { ReactComponent as EarthIcon } from '../../assets/earth.svg'

import { getLanguage } from '../../utils/index'

import styles from './index.module.scss'

const LANGS = [
  { name: '简体中文', value: 'zh-CN' },
  { name: 'English', value: 'en' },
]

const Language = ({ className, i18n }) => {
  const handleChange = e => {
    i18n.changeLanguage(e.target.dataset.lang)
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  return (
    <div className={classnames(styles.lang, className)}>
      <EarthIcon />
      {LANGS.map(lang => (
        <a
          key={lang.value}
          className={classnames({
            [styles.select]: lang.value === getLanguage(i18n.language),
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

export default translate('base')(Language)
