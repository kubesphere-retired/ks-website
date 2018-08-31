import React from 'react'
import PropTypes from 'prop-types'
import Schema from 'async-validator'
import { set, get, debounce, isFunction, isEmpty } from 'lodash'
import classnames from 'classnames'

import styles from './index.module.scss'

export default class FormItem extends React.Component {
  static propTypes = {
    error: PropTypes.object,
  }

  static contextTypes = {
    formData: PropTypes.object,
    registerValidate: PropTypes.func,
    validateResults: PropTypes.array,
  }

  state = {
    error: null,
  }

  componentDidMount() {
    const { children, rules } = this.props
    if (rules) {
      this.context.registerValidate(children.props.name, rules)
      this.schema = new Schema({
        [children.props.name]: rules,
      })
    }
  }

  handleValueChange = (name, onChange, value) => {
    value = get(value, 'currentTarget.value', value)

    if (name) {
      set(this.context.formData, name, value)
    }

    if (isFunction(onChange)) {
      onChange(value)
    }

    this.forceUpdate()

    if (this.schema) {
      this.validate({ [name]: value })
    }
  }

  validate = debounce(data => {
    this.schema.validate(data, { firstFields: true }, errors => {
      this.setState({ error: errors ? errors[0] : {} })
    })
  }, 200)

  render() {
    const { children, error, className, desc, label } = this.props

    const name = children.props.name

    const childNode = React.cloneElement(children, {
      ...children.props,
      id: name,
      key: name,
      onChange: this.handleValueChange.bind(
        this,
        name,
        children.props.onChange
      ),
      value: get(this.context.formData, name),
    })

    const lastError =
      this.state.error ||
      error ||
      this.context.validateResults.find(item => item.field === name)

    const classNames = classnames(
      styles.item,
      { [styles.errorItem]: !isEmpty(lastError) },
      'form-item',
      className
    )

    return (
      <div className={classNames}>
        {label && (
          <label className={styles.label} htmlFor={name}>
            {label}
          </label>
        )}
        <div className={styles.control}>
          {childNode}
          {!isEmpty(lastError) && (
            <div
              className={styles.error}
              dangerouslySetInnerHTML={{ __html: lastError.message }}
            />
          )}
          {(isEmpty(lastError) || desc !== lastError.message) && (
            <div
              className={styles.desc}
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          )}
        </div>
      </div>
    )
  }
}
