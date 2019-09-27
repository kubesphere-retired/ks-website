import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { formatAnchor } from '../../utils/index'

import styles from './index.module.scss'

export default class Headings extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    headings: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        depth: PropTypes.number,
      })
    ).isRequired,
    onHeadClick: PropTypes.func,
    current: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      current: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.state.current) {
      this.setState({
        current: nextProps.current,
      })
    }
  }

  handleClick = e => {
    const anchor = e.target.dataset.anchor
    this.setState({
      current: anchor,
    })
    this.props.onHeadClick(anchor)
  }

  render() {
    const { title, headings } = this.props

    const current = decodeURIComponent(this.state.current)

    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>{title}</div>
        <div>
          {headings.map(({ value, depth }) => (
            <div
              className={classnames(styles.head, `level-${depth - 2}`, {
                [styles.selected]: `#${formatAnchor(value)}` === current,
              })}
              key={`${depth}-${value}`}
              data-anchor={`#${formatAnchor(value)}`}
              onClick={this.handleClick}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
