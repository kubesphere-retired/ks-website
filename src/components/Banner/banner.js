import React from 'react'
import PropTypes from 'prop-types'

import Selector from './selector'

import styles from './index.module.scss'

class Banner extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  }

  constructor(props) {
    super(props)

    const firstChild = React.Children.toArray(props.children)[0] || {}

    this.state = {
      current: firstChild.props.name || '',
    }
  }

  handleSelect = name => {
    this.setState({ current: name })
  }

  render() {
    const { children } = this.props

    let selectChild = null
    const options = React.Children.map(children, child => {
      if (child.props.name === this.state.current) {
        selectChild = child
      }

      return { name: child.props.name, value: child.props.snapshot }
    })

    return (
      <div className={styles.banner}>
        <div className={styles.content}>{selectChild}</div>
        {options.length > 1 && (
          <Selector
            options={options}
            select={this.state.current}
            onChange={this.handleSelect}
          />
        )}
      </div>
    )
  }
}

export default Banner
