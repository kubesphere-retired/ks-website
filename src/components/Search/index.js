import React from 'react'
import classnames from 'classnames'

import Button from '../Button'

import styles from './index.module.scss'

export default class Search extends React.Component {
  inputRef = React.createRef()

  handleSearch = () => {
    const { onSearch } = this.props
    if (onSearch && this.inputRef.current) {
      onSearch(this.inputRef.current.value)
    }
  }

  render() {
    const { className, placeholder, searchText } = this.props
    return (
      <div className={classnames(styles.search, className)}>
        <input type="text" ref={this.inputRef} placeholder={placeholder} />
        <Button type="control" onClick={this.handleSearch}>
          {searchText || 'Search'}
        </Button>
      </div>
    )
  }
}
