import get from 'lodash/get'
import React from 'react'
import classnames from 'classnames'

import OK from '../../assets/ok.svg'

import styles from './index.module.scss'

const VersionCompare = ({ className, theads, data }) => (
  <table className={classnames(styles.table, className)}>
    <thead>
      <tr>
        <th />
        {theads.map((head) => (
          <th key={head.name}>
            <img src={head.icon} alt=""/>
            {head.name}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {
        data && data.map && data.map(item => [
          <tr key={item.group} className={styles.group}>
            <td>{item.group}</td>
            {theads.map((head, index) => <td key={index}/>)}
          </tr>,
          ...(item.items ? item.items.map(subItem => (
            <tr key={subItem.name}>
              <td>{subItem.name}</td>
              {theads.map((head, index) => (
                <td key={index}>
                  {
                    get(subItem, `data[${index}]`) ? 
                    <img src={OK} alt=""/> : 
                    null 
                  }
                </td>
              ))}
            </tr>
          )) : [])
        ])
      }
    </tbody>
  </table>
)

export default VersionCompare;