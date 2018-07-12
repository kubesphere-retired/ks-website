import React from 'react'
import classnames from 'classnames'

import Item from './item'

import styles from './index.module.scss'

const FeatureList = ({ className, data }) => (
  <div className={classnames(styles.list, className)}>
    {
      data && data.map && data.map(item => (
        <Item key={item.name} {...item}/>
      ))
    }
  </div>
)

export default FeatureList;