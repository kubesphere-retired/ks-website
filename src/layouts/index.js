require('es6-shim')
require('promise-polyfill')
require('../utils/polifills')
require('whatwg-fetch')

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import '../styles/main.scss'
import './index.scss'

import '../utils/i18n'

import Header from '../components/Header/index'
import Footer from '../components/Footer/index'

import bg1 from '../assets/bg-1.svg'
import bg2 from '../assets/bg-2.svg'

const Layout = ({ children, location, data }) => {
  const path = location.pathname.slice(1)

  const showBg = path !== 'download'

  return (
    <div className="main">
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: 'KubeSphere' },
          {
            name: 'keywords',
            content: 'KubeSphere, OpenPitrix, Kubernetes, Container, Docker',
          },
          {
            name: 'google-site-verification',
            content: '4MQYB7t-JAew3en6iBUNg3yTLABe4xPSgxzfkArfhVw',
          },
        ]}
      />
      <Header siteTitle={data.site.siteMetadata.title} />
      {showBg && <img className="bg1" src={bg1} alt="" />}
      {showBg && <img className="bg2" src={bg2} alt="" />}
      {children()}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
