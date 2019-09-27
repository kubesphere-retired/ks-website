import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/index'
import withI18next from '../components/withI18next'
import buildingSVG from '../assets/building.svg'

import './building.scss'

const IndexPage = props => {
  const { t } = props
  return (
    <Layout {...props}>
      <div className="wrapper building">
        <div className="h1">{t('Working hard Coding')} …</div>
        <img src={buildingSVG} alt="" />
      </div>
    </Layout>
  )
}

export default withI18next({ ns: 'common' })(IndexPage)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
