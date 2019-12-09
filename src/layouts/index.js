import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import '../styles/main.scss'
import './index.scss'

import '../i18n'

import Header from '../components/Header/index'
import Footer from '../components/Footer/index'
import Star from '../components/Star/index'
import withI18next from '../components/withI18next'

import bg1 from '../assets/bg-1.svg'

const Layout = ({ t, children, location, data, pageContext }) => {
  const path = location.pathname.slice(1)

  const showBg = path !== 'download'

  return (
    <div className="main">
      <Helmet
        title={t(data.site.siteMetadata.title)}
        meta={[
          {
            name: 'description',
            content: t(
              'KubeSphere is an open source container platform based on Kubernetes for enterprise app development and deployment, suppors installing anywhere from on-premise datacenter to any cloud to edge.'
            ),
          },
          {
            name: 'keywords',
            content: t(
              'KubeSphere, Kubernetes Dashboard,  Install Enterprise Kubernetes, DevOps, Istio, Service Mesh, Jenkins, container platform'
            ),
          },
          {
            name: 'google-site-verification',
            content: '4MQYB7t-JAew3en6iBUNg3yTLABe4xPSgxzfkArfhVw',
          },
        ]}
      />
      <Header
        siteTitle={t(data.site.siteMetadata.title)}
        pageContext={pageContext}
      />
      {showBg && <img className="bg1" src={bg1} alt="" />}
      {children}
      <Footer pageContext={pageContext} />
      <Star />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default withI18next({ ns: 'common' })(Layout)
