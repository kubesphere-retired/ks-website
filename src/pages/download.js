import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/index'
import withI18next from '../components/withI18next'
import Button from '../components/Button/index'
import ExpressModal from '../components/Download/ExpressModal/index'
import AdvancedModal from '../components/Download/AdvancedModal/index'

import DownloadBg from '../assets/download-bg.svg'
import { ReactComponent as Express } from '../assets/express.svg'
import { ReactComponent as Advanced } from '../assets/advanced.svg'

import './download.scss'

const Banner = ({ t }) => {
  return (
    <div className="wrapper download-banner">
      <div className="download-banner-desc">
        <div
          className="h1"
          dangerouslySetInnerHTML={{
            __html: t('Select the suitable version of KubeSphere'),
          }}
        />
        <p>
          {t(
            'We offer multiple versions of KubeSphere, you can select the suitable version.'
          )}
        </p>
        <div className="download-banner-links">
          <a
            href="https://kubesphere.qingcloud.com/#category"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="primary" size="large" ghost>
              {t('Version Comparison')} →
            </Button>
          </a>
        </div>
      </div>
      <div className="download-banner-snapshot">
        <img src={DownloadBg} alt="" />
      </div>
    </div>
  )
}

const Versions = ({ t, showExpressModal, showAdvancedModal }) => (
  <div className="version-compare-wrapper">
    <ul className="version-compare">
      <li onClick={showExpressModal}>
        <Express />
        <div className="version-compare-text">
          <div className="h2">{t('Community Edition')}</div>
          <p>
            {t(
              'KubeSphere provides workload and cluster management, wizard design operation interface, application repository and application template management, as well as our professional team support.'
            )}
          </p>
        </div>
        <span>{t('Get the version')} → </span>
      </li>
      <li onClick={showAdvancedModal}>
        <Advanced />
        <div className="version-compare-text">
          <div className="h2">{t('Advanced Edition')}</div>
          <p>
            {t(
              'KubeSphere provides workload management, CI/CD and Microservices governance, multi-cluster management, as well as multi-tenancy and fine-grained privilege separation for users of different enterprise scales.'
            )}
          </p>
        </div>
        <span>{t('Get the version')} → </span>
      </li>
    </ul>
  </div>
)

class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showCommunity: props.location.search.indexOf('community') !== -1,
      showExpress: props.location.search.indexOf('express') !== -1,
      showAdvanced: props.location.search.indexOf('advanced') !== -1,
    }
  }

  showCommunityModal = () => {
    this.setState({
      showCommunity: true,
    })
  }

  hideCommunityModal = () => {
    this.setState({
      showCommunity: false,
    })
  }

  showExpressModal = () => {
    this.setState({
      showExpress: true,
    })
  }

  hideExpressModal = () => {
    this.setState({
      showExpress: false,
    })
  }

  showAdvancedModal = () => {
    this.setState({
      showAdvanced: true,
    })
  }

  hideAdvancedModal = () => {
    this.setState({
      showAdvanced: false,
    })
  }

  render() {
    return (
      <Layout {...this.props}>
        <Banner {...this.props} />
        <Versions
          {...this.props}
          showExpressModal={this.showExpressModal}
          showAdvancedModal={this.showAdvancedModal}
        />
        <ExpressModal
          isOpen={this.state.showExpress}
          onRequestClose={this.hideExpressModal}
        />
        <AdvancedModal
          isOpen={this.state.showAdvanced}
          onRequestClose={this.hideAdvancedModal}
        />
      </Layout>
    )
  }
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
