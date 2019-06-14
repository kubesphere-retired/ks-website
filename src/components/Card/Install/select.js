import React from 'react'
import classnames from 'classnames'
import { withTranslation } from 'react-i18next'

import { ReactComponent as Arrow } from '../../../assets/arrow.svg'

import styles from './index.module.scss'

const Option = ({ icon, title, type, onClick, t }) => (
  <div className={styles.cardOption} data-type={type} onClick={onClick}>
    {icon}
    <div className="h3">{t(title)}</div>
  </div>
)

class InstallCardSelect extends React.Component {
  state = {
    open: false,
  }

  toggleShowOptions = () => {
    this.setState(({ open }) => ({
      open: !open,
    }))
  }

  handleOptionClick = e => {
    const { onChange } = this.props

    onChange(e)
    this.setState({
      open: false,
    })
  }

  render() {
    const { value, options, t } = this.props

    const selectOption = options.find(option => option.type === value)

    return (
      <div className={styles.cardSelect}>
        <div className={styles.cardControl} onClick={this.toggleShowOptions}>
          {selectOption.icon}
          <div className="h3">{selectOption.title}</div>
          <Arrow
            className={classnames(styles.arrow, {
              [styles.open]: this.state.open,
            })}
          />
        </div>
        {this.state.open && (
          <div className={styles.cardOptions}>
            {options.map(option => (
              <Option
                key={option.type}
                {...option}
                t={t}
                onClick={this.handleOptionClick}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default withTranslation()(InstallCardSelect)
