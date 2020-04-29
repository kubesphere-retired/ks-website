import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'

import Layout from '../layouts/index'

import withI18next from '../components/withI18next'
import Button from '../components/Button/index'
import ContribCard from '../components/Card/Contrib/index'
import RoadMap from '../components/RoadMap/index'

import DashboardImage from '../assets/dashboard.png'
import BannerBg from '../assets/banner-bg.svg'
import EasyUseIcon from '../assets/easyuse.svg'
import FlexibleIcon from '../assets/flexible.svg'
import EfficientIcon from '../assets/efficient.svg'
import bg3 from '../assets/bg-3.svg'
import BugIcon from '../assets/icon-bug.svg'
import RoadMapIcon from '../assets/icon-roadmap.svg'
import DesignIcon from '../assets/icon-design.svg'
import ChatIcon from '../assets/icon-chat.svg'
import AppInstallLeftImage from '../assets/app-install-left.svg'
import AppInstallRightImage from '../assets/app-install-right.svg'
import CloudNativeLogo from '../assets/cloud-native.png'
import CertifiedLogo from '../assets/certified.svg'

import { ReactComponent as DownloadIcon } from '../assets/download.svg'

import { VIDEO, ROAD_MAPS, APPS } from '../data'

import './index.scss'

const Banner = ({ t, pageContext: { prefix } }) => {
  return (
    <div className="wrapper banner">
      <div className="banner-title">
        <div className="banner-activities">
          <span className="banner-tag">{t('Activities')}</span>
          <ul>
            {VIDEO.map(item => (
              <li key={item.title}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t(item.title)}
                >
                  {t(item.title)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="h1"
          dangerouslySetInnerHTML={{
            __html: t(
              'The Kubernetes Platform, <br/>tailored to the DevOps teams'
            ),
          }}
        />
        <div className="banner-sub-title">
          {t('—— KubeSphere Container Platform')}
        </div>
        <p>{t('what_is_kubesphere_io')}</p>
        <div className="banner-links">
          <Link to={`${prefix}install/`}>
            <Button type="control" size="large">
              <DownloadIcon />
              {t('Get KubeSphere')}
            </Button>
          </Link>
        </div>
      </div>
      <div className="banner-snapshot">
        <img src={BannerBg} alt="" />
        <img src={DashboardImage} alt="" className="banner-snapshot-sub" />
      </div>
    </div>
  )
}

const Features = ({ t }) => (
  <div className="wrapper section feature">
    <div className="h1">{t('One Platform for full-stack solutions ')}</div>
    <p>
      {t(
        'KubeSphere is also a multi-tenant enterprise-grade container platform with full-stack automated IT operation and streamlined DevOps workflows. It provides developer-friendly wizard web UI, helping enterprises to build out a more robust and feature-rich platform, which includes most common functionalities needed for enterprise Kubernetes strategy.'
      )}
    </p>
    <div className="feature-cards">
      <div className="feature-card">
        <img src={EasyUseIcon} alt="" />
        <div className="h2">{t('Easy')}</div>
        <p>
          {t(
            'A CNCF certified Kubernetes platform, 100% open source, built and improved by the community. KubeSphere can be deployed on a Kubernetes cluster or Linux machines, supports online and air-gapped installation'
          )}
        </p>
      </div>
      <div className="feature-card">
        <img src={FlexibleIcon} alt="" />
        <div className="h2">{t('Flexible')}</div>
        <p
          dangerouslySetInnerHTML={{
            __html: t(
              'Delivers DevOps, service mesh, observability, application management, multi-tenancy, storage and networking management in an unified platform. These functionalities are loosely coupled with the platform since they are pluggable and optional. Other tools are easy to integrate and play'
            ),
          }}
        />
      </div>
      <div className="feature-card">
        <img src={EfficientIcon} alt="" />
        <div className="h2">{t('Efficient')}</div>
        <p>
          {t(
            'KubeSphere delivers consolidated views while integrating a wide breadth of ecosystem tools around Kubernetes and offers consistent user experience to reduce complexity, enabling teams to easily get started with cloud native stack'
          )}
        </p>
      </div>
    </div>
  </div>
)

const AppCard = ({ data }) => (
  <div className="app">
    <div className="app-header">
      <img className="app-icon" src={`/${data.icon}`} alt="" />
      <div className="app-title">
        <div className="app-name">{data.name}</div>
        <div className="app-version">{data.version}</div>
      </div>
    </div>
    <div className="app-desc">{data.desc}</div>
  </div>
)

class AppInstall extends React.Component {
  render() {
    const { t } = this.props
    return (
      <div className="section app-install">
        <div className="app-install-title">
          <img
            className="app-install-left-image"
            src={AppInstallLeftImage}
            alt=""
          />
          <img
            className="app-install-right-image"
            src={AppInstallRightImage}
            alt=""
          />
          <div className="h1">
            {t('Complete application lifecycle management')}
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: t('app_management_desc'),
            }}
          />
        </div>
        <div className="slider-wrapper">
          <div className="slider slider-repeat">
            {APPS.map((app, index) => (
              <AppCard key={`repeat-${index}`} data={app} />
            ))}
            {APPS.map((app, index) => (
              <AppCard key={`repeat2-${index}`} data={app} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const Contribution = ({ t }) => (
  <div
    style={{
      backgroundImage: `url(${bg3})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div className="wrapper section contrib">
      <div className="h1">{t('How to contribute')}</div>
      <p>
        {t(
          'KubeSphere is 100% open source and available on GitHub where you can find all source code, documents and discussions. All developers are active on Slack, join us on the Slack channel. '
        )}
      </p>
      <div className="contrib-cards">
        <ContribCard icon={RoadMapIcon} title="RoadMap">
          <RoadMap data={ROAD_MAPS} />
        </ContribCard>
        <ContribCard icon={BugIcon} title={t('Report the Bug')}>
          <p className="report">
            {t('KubeSphere uses GitHub issue to manage bug tracking')}
            <a
              href="https://github.com/kubesphere/kubesphere/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Submit the Bug')} →
            </a>
          </p>
        </ContribCard>
        <ContribCard
          icon={DesignIcon}
          title={t('Participate in development and design')}
        >
          <ul className="list">
            <li
              dangerouslySetInnerHTML={{
                __html: t(
                  'Read the KubeSphere <a href="//github.com/kubesphere/kubesphere/blob/master/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Development Guide</a> carefully'
                ),
              }}
            />
            <li>
              {t('Fork KubeSphere Repo')}:{' '}
              <a
                href="https://github.com/kubesphere/kubesphere"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/kubesphere/kubesphere
              </a>
            </li>
            <li>
              <a href="/docs" target="_blank" rel="noopener noreferrer">
                {t('Read the KubeSphere Documentation')}
              </a>
            </li>
            <li>
              {t(
                'Participate in the upstream projects of KubeSphere such as Kubernetes, Docker, Istio, etc.'
              )}
            </li>
          </ul>
        </ContribCard>
        <ContribCard icon={ChatIcon} title={t('Communication')}>
          <ul className="list">
            <li>
              {t('Find us on the Slack channel')}：
              <a
                href="https://join.slack.com/t/kubesphere/shared_invite/enQtNTE3MDIxNzUxNzQ0LTZkNTdkYWNiYTVkMTM5ZThhODY1MjAyZmVlYWEwZmQ3ODQ1NmM1MGVkNWEzZTRhNzk0MzM5MmY4NDc3ZWVhMjE"
                target="_blank"
                rel="noopener noreferrer"
              >
                kubesphere.slack.com
              </a>
            </li>
          </ul>
        </ContribCard>
      </div>
    </div>
  </div>
)

const CloudNative = ({ t }) => (
  <div className="cloud-native">
    <div>
      <img src={CloudNativeLogo} alt="" />
      <div>{t('Cloud Native Computing Foundation Member')}</div>
    </div>
    <div>
      <img src={CertifiedLogo} alt="" />
      <div>{t('Certified Kubernetes Conformance')}</div>
    </div>
  </div>
)

const IndexPage = props => {
  return (
    <Layout {...props}>
      <Banner {...props} />
      <Features {...props} />
      <AppInstall {...props} />
      <Contribution {...props} />
      <CloudNative {...props} />
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
