import React from 'react'
import { translate } from 'react-i18next'

import buildingSVG from '../assets/building.svg'

import './index.scss'

const IndexPage = props => (
  <div className="wrapper building">
    <div className="h1">正在努力 Coding …</div>
    <img src={buildingSVG} alt="" />
  </div>
)

export default translate('base')(IndexPage)
