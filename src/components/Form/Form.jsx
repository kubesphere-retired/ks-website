import set from 'lodash/set'
import get from 'lodash/get'
import React from 'react'
import PropTypes from 'prop-types'
import Schema from 'async-validator'
import classnames from 'classnames'

import styles from './index.module.scss'

export default class Form extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func,
    data: PropTypes.object,
  }

  static defaultProps = {
    className: '',
  }

  static childContextTypes = {
    formData: PropTypes.object,
    registerValidate: PropTypes.func,
    validateResults: PropTypes.array,
  }

  getChildContext() {
    return {
      formData: this._formData,
      registerValidate: this.registerValidate,
      validateResults: this.state.errors,
    }
  }

  constructor(props) {
    super(props)
    this._formData = props.data || {}
    this.descriptor = {}

    this.state = { errors: [] }
  }

  handleSubmit = e => {
    e.preventDefault()

    const schema = new Schema(this.descriptor)
    const data = Object.keys(this.descriptor).reduce(
      (prev, cur) => ({
        ...prev,
        [cur]: get(this._formData, cur),
      }),
      {}
    )

    schema.validate(data, { firstFields: true }, errors => {
      if (errors) {
        return this.setState({ errors })
      }
      this.props.onSubmit(this._formData)
    })
  }

  registerValidate = (name, rules) => {
    this.descriptor[name] = rules
  }

  getData() {
    return this._formData
  }

  setData(name, value) {
    set(this._formData, name, value)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this._formData = nextProps.data
    }
  }

  render() {
    const { className, children } = this.props

    const classNames = classnames(styles.form, className)

    return (
      <form
        className={classNames}
        onSubmit={this.handleSubmit}
        autoComplete="off"
      >
        {children}
      </form>
    )
  }
}
