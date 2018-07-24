import React from 'react'
import classnames from 'classnames'

import styles from './index.module.scss'

export default class Slider extends React.Component {
  state = {
    select: 0,
  }

  componentDidMount() {
    const { data } = this.props

    this.timer = setInterval(() => {
      this.setState(({ select }) => ({
        select: select + 1 > data.length - 1 ? 0 : select + 1,
      }))
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  handleClick = e => {
    this.setState({
      select: Number(e.target.dataset.index),
    })
  }

  render() {
    const { className, data } = this.props
    const { select } = this.state

    const width = data.length * 650
    const translateX = select * -650

    return (
      <div className={classnames(styles.slider, className)}>
        <ul style={{ width, transform: `translateX(${translateX}px)` }}>
          {data.map((item, index) => (
            <li key={index}>
              <img src={item} alt="" />
            </li>
          ))}
        </ul>
        <div className={styles.dots}>
          {data.map((_, index) => (
            <div
              key={index}
              className={classnames(styles.dot, {
                [styles.select]: select === index,
              })}
              data-index={index}
              onClick={this.handleClick}
            />
          ))}
        </div>
      </div>
    )
  }
}
