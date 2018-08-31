import React from 'react'
import Link from 'gatsby-link'
import { translate } from 'react-i18next'

import Button from '../components/Button/index'
import ContribCard from '../components/Card/Contrib/index'
import RoadMap from '../components/RoadMap/index'
import Slider from '../components/Slider/index'

import DashboardImage from '../assets/dashboard.png'
import BannerBg from '../assets/banner-bg.svg'
import SliderBg from '../assets/slider-bg.svg'
import EasyUseIcon from '../assets/easyuse.svg'
import FlexibleIcon from '../assets/flexible.svg'
import EfficientIcon from '../assets/efficient.svg'
import bg3 from '../assets/bg-3.svg'
import BugIcon from '../assets/icon-bug.svg'
import RoadMapIcon from '../assets/icon-roadmap.svg'
import DesignIcon from '../assets/icon-design.svg'
import ChatIcon from '../assets/icon-chat.svg'

import slider1 from '../assets/slider-1.png'
import slider2 from '../assets/slider-2.png'
import slider3 from '../assets/slider-3.png'

import './index.scss'

const Banner = ({ t }) => {
  return (
    <div className="wrapper banner">
      <div className="banner-desc">
        <div
          className="h1"
          dangerouslySetInnerHTML={{
            __html: t(
              'Foreseeing the future. <br/>Going forward with KubeSphere'
            ),
          }}
        />
        <p>
          {t(
            'Kubesphere.io is an upstream project of the KubeSphere container management platform. Our vision is to provide an easier, more friendly and more powerful distributed management platform for individuals and enterprises based on Kubernetes,  as well as meet more business demands and help more users to use Kubernetes faster and better.'
          )}
        </p>
        <div className="banner-links">
          <Link to={'/download'}>
            <Button type="primary" size="large">
              {t('Get Community Edition')}
            </Button>
          </Link>
          <a href="https://kubesphere.qingcloud.com/" target="_blank">
            <Button type="primary" size="large" ghost>
              {t('Get Commercial Edition')}
            </Button>
          </a>
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
              'Besides the open source solutions, if users would like to realize higher demands for network and storage, <a href="//www.qingcloud.com" target="_blank">QingCloud</a> can be used as the underlying platform to integrate QingCloud SDN, block storage and NeonSAN with service-guaranteed network and storage solutions.'
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

const sliders = [slider1, slider2, slider3]

const AppInstall = ({ t }) => (
  <div className="wrapper section app-install">
    <div className="h1">
      {t('Enable one-click deployment for application.')}
    </div>
    <p>
      {t(
        'Based on the open source OpenPitrix project, providing full lifecycle management of applications, including development, test, release, upgrade and remove, as well as multi-application registries management and one-click deployment of applications'
      )}
    </p>
    <div className="slider-wrapper">
      <img src={SliderBg} alt="" />
      <Slider className="slider" data={sliders} />
      <img className="slider1" src={slider1} alt="" />
    </div>
  </div>
)

const ROADMAP = [
  {
    name: 'Community Edition 1.0.0 Alpha',
    time: '2018/6/30 00:00:00',
    status: 'Released',
  },
  {
    name: 'Community Edition 1.0.0 Beta',
    time: '2018/7/31 00:00:00',
    status: 'In Progress',
  },
  { name: 'Community Edition 1.0.0 GA', time: '2018/8/31', status: 'Planning' },
]

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
          <RoadMap data={ROADMAP} />
        </ContribCard>
        <ContribCard icon={BugIcon} title={t('Report the Bug')}>
          <p className="report">
            {t('KubeSphere uses GitHub issue to manage bug tracking')}
            <a
              href="https://github.com/kubesphere/kubesphere/issues"
              target="_blank"
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
                  'Read the KubeSphere <a href="//github.com/kubesphere/kubesphere/blob/master/docs/welcome-to-KubeSphere-new-developer-guide.md " target="_blank">Contributor Guide</a> carefully'
                ),
              }}
            />
            <li>
              {t('Fork KubeSphere Repo')}:{' '}
              <a
                href="https://github.com/kubesphere/kubesphere"
                target="_blank"
              >
                https://github.com/kubesphere/kubesphere
              </a>
            </li>
            <li>
              <a href="//docs.kubesphere.io/express/zh-CN/user-case/" target="_blank">
                {t('Read the KubeSphere User Guide')}
              </a>
            </li>
            <li>
              {t(
                'Participate in the upstream projects of KubeSphere such as Kubernetes, Docker, Kata, etc.'
              )}
            </li>
          </ul>
        </ContribCard>
        <ContribCard icon={ChatIcon} title={t('Communication')}>
          <ul className="list">
            <li>
              {t('Find us on the Slack channel')}：
              <a href="https://kubesphere.slack.com" target="_blank">
                kubesphere.slack.com
              </a>
            </li>
          </ul>
        </ContribCard>
      </div>
    </div>
  </div>
)

const IndexPage = props => (
  <div>
    <Banner {...props} />
    <Features {...props} />
    <AppInstall {...props} />
    <Contribution {...props} />
  </div>
)

export default translate('base')(IndexPage)
