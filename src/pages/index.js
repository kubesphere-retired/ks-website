/* eslint-disable jsx-a11y/anchor-is-valid */
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

import { ACTIVITIES, ROAD_MAPS, APPS } from '../data'

import './index.scss'

const Banner = ({ t, pageContext: { locale } }) => {
  return (
    <div className="wrapper banner">
      <div className="banner-title">
        <div className="banner-activities">
          <span className="banner-tag">{t('Activities')}</span>
          <ul>
            {ACTIVITIES.map(item => (
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
              'Foreseeing the future. <br/>Going forward with KubeSphere'
            ),
          }}
        />
        <div className="banner-sub-title">
          {t('—— Future container orchestration platform')}
        </div>
        <p>{t('what_is_kubesphere_io')}</p>
        <div className="banner-links">
          <Link to={`/${locale}/install/`}>
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
    <div className="h1">{t('What is KubeSphere')}</div>
    <p>
      {t(
        'KubeSphere is an open source project, built on Kubernetes, which is a powerful production-grade container orchestration system. KubeSphere provides users with easy-to-use interface and wizard design, it reduces the complexity of development, testing and maintenance, as well as lower the learning cost of the container orchestration platform.'
      )}
    </p>
    <div className="feature-cards">
      <div className="feature-card">
        <img src={EasyUseIcon} alt="" />
        <div className="h2">{t('Easy')}</div>
        <p>
          {t(
            'KubeSphere providing friendly UI and wizard-design experience to users who work at development, testing or operation. Kubernetes’ powerful features could be delivered to users in an easiest way through the KubeSphere console.'
          )}
        </p>
      </div>
      <div className="feature-card">
        <img src={FlexibleIcon} alt="" />
        <div className="h2">{t('Flexible')}</div>
        <p
          dangerouslySetInnerHTML={{
            __html: t(
              'Besides the open source solutions, if users would like to realize higher demands for network and storage, <a href="//www.qingcloud.com" target="_blank" rel="noopener noreferrer">QingCloud</a> can be used as the underlying platform to integrate QingCloud SDN, block storage and NeonSAN with service-guaranteed network and storage solutions.'
            ),
          }}
        />
      </div>
      <div className="feature-card">
        <img src={EfficientIcon} alt="" />
        <div className="h2">{t('Efficient')}</div>
        <p>
          {t(
            'No infrastructure dependencies, no Kubernetes dependencies, support for deployment across physical machines, virtual machines, cloud platforms, and enables Kubernetes clusters of different versions and vendors management.'
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
          'If you would like to participate in the development of KubeSphere upstream, or understand the progress of the project and report the bug, you can keep in touch with us through GitHub and Slack.'
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
    <div style={{ marginLeft: 60 }}>
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
