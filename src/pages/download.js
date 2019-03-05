import React from 'react'
import { translate } from 'react-i18next'

import Button from '../components/Button/index'
import CommunityModal from '../components/Download/CommunityModal/index'
import ExpressModal from '../components/Download/ExpressModal/index'
import AdvancedModal from '../components/Download/AdvancedModal/index'

import DownloadBg from '../assets/download-bg.svg'
import { ReactComponent as Community } from '../assets/community.svg'
import { ReactComponent as Express } from '../assets/express.svg'
import { ReactComponent as Advanced } from '../assets/advanced.svg'

import './index.scss'

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
          <a href="https://kubesphere.qingcloud.com/#category" target="_blank">
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

const Versions = ({ t, showCommunityModal, showExpressModal, showAdvancedModal }) => (
  <div className="version-compare-wrapper">
    <ul className="version-compare">
      <li onClick={showCommunityModal}>
        <Community />
        <div className="version-compare-text">
          <div className="h2">{t('Community Edition')}</div>
          <p>
            {t(
              'Welcome to the KubeSphere Community Edition, it\'s only recommended to understand the KubeSphere features. For production environment we recommend you to purchase the Commercial Edition.'
            )}
          </p>
        </div>
        <a>{t('Get the version')} → </a>
      </li>
      <li onClick={showExpressModal}>
        <Express />
        <div className="version-compare-text">
          <div className="h2">{t('Express Edition')}</div>
          <p>
            {t(
              'KubeSphere provides workload and cluster management, wizard design operation interface, application repository and application template management, as well as our professional team support.'
            )}
          </p>
        </div>
        <a>{t('Get the version')} → </a>
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
        <a>{t('Get the version')} → </a>
      </li>
    </ul>
  </div>
)

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

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
      <div>
        <Banner {...this.props} />
        <Versions
          {...this.props}
          showCommunityModal={this.showCommunityModal}
          showExpressModal={this.showExpressModal}
          showAdvancedModal={this.showAdvancedModal}
        />
        <CommunityModal
          isOpen={this.state.showCommunity}
          onRequestClose={this.hideCommunityModal}
        />
        <ExpressModal
          isOpen={this.state.showExpress}
          onRequestClose={this.hideExpressModal}
        />
        <AdvancedModal
          isOpen={this.state.showAdvanced}
          onRequestClose={this.hideAdvancedModal}
        />
      </div>
    )
  }
}

export default translate('base')(IndexPage)
