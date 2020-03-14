import React from 'react'
import classnames from 'classnames'
import { withTranslation } from 'react-i18next'

import { ReactComponent as EarthIcon } from '../../assets/earth.svg'

import { getLanguage } from '../../utils/index'

import Select from '../Select'

import styles from './index.module.scss'

const LANGS = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en' },
]

const Language = ({
  className,
  pageContext: { locale, defaultLocale, originalPath },
}) => {
  const handleChange = value => {
    if (typeof window !== 'undefined') {
      window.location.href =
        value === defaultLocale ? originalPath : `/${value}${originalPath}`
    }
  }

  return (
    <div className={classnames(styles.lang, className)}>
      <EarthIcon />
      <Select
        controlClassName={styles.selectControl}
        value={getLanguage(locale)}
        options={LANGS}
        onChange={handleChange}
      />
    </div>
  )
}

export default withTranslation()(Language)
