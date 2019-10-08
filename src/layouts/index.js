import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import '../styles/main.scss'
import './index.scss'

import '../i18n'

import Header from '../components/Header/index'
import Footer from '../components/Footer/index'
import Star from '../components/Star/index'

import bg1 from '../assets/bg-1.svg'

const Layout = ({ children, location, data, pageContext }) => {
  const path = location.pathname.slice(1)

  const showBg = path !== 'download'

  return (
    <div className="main">
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: 'KubeSphere 是在 Kubernetes 之上构建的以应用为中心的开源容器平台，支持部署和运行在任何基础设施之上，帮助企业轻松应对敏捷开发、自动化运维、应用快速交付、微服务治理、多租户管理、监控日志告警、服务与网络管理等业务场景' },
          {
            name: 'keywords',
            content: 'KubeSphere, 微服务, Kubernetes Dashboard, 容器管理平台, DevOps, Istio, Kubernetes, Jenkins, Docker',
          },
          {
            name: 'google-site-verification',
            content: '4MQYB7t-JAew3en6iBUNg3yTLABe4xPSgxzfkArfhVw',
          },
        ]}
      />
      <Header
        siteTitle={data.site.siteMetadata.title}
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

export default Layout
