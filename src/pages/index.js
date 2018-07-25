import React from 'react'
import Link from 'gatsby-link'
import { translate } from 'react-i18next'

import Button from '../components/Button/index'
import ContribCard from '../components/Card/Contrib/index'
import RoadMap from '../components/RoadMap/index'
import Slider from '../components/Slider/index'

import { getLanguage } from '../utils/index'

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

const Banner = ({ i18n }) => {
  const lang = getLanguage(i18n.language)

  return (
    <div className="wrapper banner">
      <div className="banner-desc">
        <div className="h1">
          预见未来,<br />遇见 KubeSphere
        </div>
        <p>
          kubesphere.io 是 KubeSphere 容器管理平台的上游开源项目，整合最新的
          CNCF
          生态开源项目，为开发者和体验者提供最新最酷的特性，且根据中国用户的特定需求，进行外延性的扩展。
        </p>
        <div className="banner-links">
          <Link to={'/install/' + lang}>
            <Button type="primary" size="large">
              获取社区版
            </Button>
          </Link>
          <a href="https://kubesphere.qingcloud.com/" target="_blank">
            <Button type="primary" size="large" ghost>
              获取商业版
            </Button>
          </a>
        </div>
      </div>
      <div className="banner-snapshot">
        <img src={BannerBg} alt="" />
        <img
          src={DashboardImage}
          alt=""
          className="banner-snapshot-sub"
        />
      </div>
    </div>
  )
}

const Features = () => (
  <div className="wrapper section feature">
    <div className="h1">什么是 KubeSphere ？</div>
    <p>
      KubeSphere 是一款开源项目，在目前主流容器调度平台 Kubernetes
      之上构建的企业级分布式多租户容器管理平台，提供简单易用的操作界面以及向导式操作方式，在降低用户使用容器调度平台学习成本的同时，极大减轻开发、测试、运维的日常工作的复杂度，
    </p>
    <div className="feature-cards">
      <div className="feature-card">
        <img src={EasyUseIcon} alt="" />
        <div className="h2">易用</div>
        <p>
          面向开发、测试、运维友好的 UI ，向导式用户体验，通过 KubeSphere
          控制台将 Kubernetes 的能力以一种极简的方式输送给用户。
        </p>
      </div>
      <div className="feature-card">
        <img src={FlexibleIcon} alt="" />
        <div className="h2">灵活</div>
        <p>
          除开源解决方案外，如用户对网络和存储有更高要求，可选用青云作为底层平台，可以使用有服务保障的网络和存储解决方案，集成青云
          SDN、块存储和 NeonSAN。
        </p>
      </div>
      <div className="feature-card">
        <img src={EfficientIcon} alt="" />
        <div className="h2">高效</div>
        <p>
          无基础设施依赖，无 Kubernetes
          依赖，支持跨物理机、虚拟机、云平台部署，可以纳管不同版本、不同厂商的
          Kubernetes 集群。
        </p>
      </div>
    </div>
  </div>
)

const sliders = [slider1, slider2, slider3]

const AppInstall = () => (
  <div className="wrapper section app-install">
    <div className="h1">应用一键部署</div>
    <p>
      基于开源的 OpenPitrix
      项目，提供应用的全生命周期管理，包含开发，测试，发布，升级，下架等应用相关操作，多应用仓库管理，一键部署应用
    </p>
    <div className="slider-wrapper">
      <img src={SliderBg} alt="" />
      <Slider className="slider" data={sliders} />
      <img className="slider1" src={slider1} alt=""/>
    </div>
  </div>
)

const ROADMAP = [
  { name: '社区版alpha', time: '2018年6月30日', status: 'released' },
  { name: '社区版beta', time: '2018年7月30日', status: 'releasing' },
  { name: '社区版1.0', time: '2018年8月30日', status: 'planning' },
]

const Contribution = () => (
  <div
    style={{
      backgroundImage: `url(${bg3})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div className="wrapper section contrib">
      <div className="h1">如何参与贡献</div>
      <p>
        积极参与到 KubeSphere 上游的开发中，了解项目进度，以及 Bug
        提交，可以通过 GitHub与 Slack 与我们保持联系
      </p>
      <div className="contrib-cards">
        <ContribCard icon={RoadMapIcon} title="RoadMap">
          <RoadMap data={ROADMAP} />
        </ContribCard>
        <ContribCard icon={BugIcon} title="报告 Bug">
          <p className="report">
            KubeSphere 使用 GitHub issue 来管理 bug 跟踪
            <a
              href="https://github.com/kubesphere/kubesphere/issues"
              target="_blank"
            >
              提交 BUG →
            </a>
          </p>
        </ContribCard>
        <ContribCard icon={DesignIcon} title="参与开发和设计">
          <ul className="list">
            <li>
              认真阅读 kubesphere <Link to="">贡献者指南</Link>
            </li>
            <li>
              fork 项目:{' '}
              <Link to="https://github.com/kubesphere/kubesphere">
                https://github.com/kubesphere/kubesphere
              </Link>
            </li>
            <li>
              <Link to="">阅读《使用手册》</Link>
            </li>
            <li>参与到Kubesphere的上游项目：kubernetes、Docker、Kata 等</li>
          </ul>
        </ContribCard>
        <ContribCard icon={ChatIcon} title="日常沟通">
          <ul className="list">
            <li>
              在 Slack 频道上找到我们：<a
                href="https://kubesphere.slack.com"
                target="_blank"
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

const IndexPage = props => (
  <div>
    <Banner {...props} />
    <Features />
    <AppInstall />
    <Contribution />
  </div>
)

export default translate('base')(IndexPage)
