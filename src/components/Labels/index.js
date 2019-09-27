import React from 'react'
import classnames from 'classnames'
import { withTranslation } from 'react-i18next'

import styles from './index.module.scss'

const Item = ({ value, label, selected, onClick }) => {
  const handleClick = () => onClick(value)
  return (
    <li
      className={classnames({ [styles.selected]: selected })}
      onClick={handleClick}
    >
      {label || value}
    </li>
  )
}

class Labels extends React.Component {
  render() {
    const { t, options, value, onChange } = this.props

    return (
      <div className={styles.wrapper}>
        <ul>
          <span>{t('Tags')}: </span>
          <Item
            label={t('All')}
            value=""
            selected={'' === value}
            onClick={onChange}
          />
          {options.map(item => (
            <Item
              key={item}
              value={item}
              selected={item === value}
              onClick={onChange}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default withTranslation()(Labels)
