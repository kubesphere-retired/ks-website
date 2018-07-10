import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import '../styles/main.scss'

import '../utils/i18n'

import bodyBg from '../assets/bodybg.png'
import bodyBg2 from '../assets/bodybg2.png'

import Header from '../components/Header/index'
import Advise from '../components/Advise/index'
import Footer from '../components/Footer/index'

const Layout = ({ children, data, location }) => {
  const isHome = location.pathname === '/'

  const background = {
    backgroundImage: isHome ? `url(${bodyBg})` : `url(${bodyBg2})`,
    backgroundSize: 'cover',
  }

  return (
    <div style={background}>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <Header siteTitle={data.site.siteMetadata.title} />
      {children()}
      <Advise />
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
