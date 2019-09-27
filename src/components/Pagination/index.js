import React from 'react'
import classnames from 'classnames'

import { ReactComponent as ArrowIcon } from '../../assets/paging.svg'

import styles from './index.module.scss'

class Pagination extends React.Component {
  handlePrev = () => {
    const { page, onPaging } = this.props
    if (page > 1) {
      onPaging(page - 1)
    }
  }

  handleNext = () => {
    const { page, total, limit, onPaging } = this.props
    const totalPages = Math.floor(total / limit) + 1

    if (page < totalPages) {
      onPaging(page + 1)
    }
  }

  handleClick = e => {
    const { onPaging } = this.props
    onPaging(Number(e.currentTarget.dataset.page))
  }

  render() {
    const { page, total, limit } = this.props

    const totalPages = Math.floor(total / limit) + 1

    return (
      <div className={styles.wrapper}>
        <ul>
          <li
            className={classnames(styles.leftArrow, {
              [styles.disabled]: page === 1,
            })}
            onClick={this.handlePrev}
          >
            <ArrowIcon width={20} height={20} />
          </li>
          {Array(totalPages)
            .fill('')
            .map((_, index) => (
              <li
                key={index}
                className={classnames({
                  [styles.selected]: page === index + 1,
                })}
                data-page={index + 1}
                onClick={this.handleClick}
              >
                {index + 1}
              </li>
            ))}
          <li
            className={classnames(styles.rightArrow, {
              [styles.disabled]: page === totalPages,
            })}
            onClick={this.handleNext}
          >
            <ArrowIcon width={20} height={20} />
          </li>
        </ul>
      </div>
    )
  }
}

export default Pagination
