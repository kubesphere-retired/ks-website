import React from 'react'
import Link from 'gatsby-link'

import Banner from '../components/Banner/index'
import FeatureCard from '../components/FeatureCard/index'
import FeatureSection from '../components/FeatureSection/index'
import VersionCard from '../components/VersionCard/index'
import Button from '../components/Button/index'

import next from '../assets/next.svg'
import bannerBg from '../assets/bannerbg.png'
import feature01 from '../assets/feature_01.svg'
import feature02 from '../assets/feature_02.svg'
import feature03 from '../assets/feature_03.svg'
import feature04 from '../assets/feature_04.svg'
import feature05 from '../assets/feature_05.svg'
import feature06 from '../assets/feature_06.svg'
import openpitrix from '../assets/openpitrix.svg'
import multipartIcon from '../assets/multipart_icon.svg'
import multipart from '../assets/multipart.svg'
import releaseBg from '../assets/release_bg.svg'

import { VERSIONS } from '../utils/constants'

import './index.scss'

const Page1 = () => (
  <div 
    className="banner-page"
    style={{
      background: `url(${bannerBg})`,
      backgroundSize: 'cover'
    }}
  >
    <div className="h1 font-id font-bold margin-b32">预见未来，遇见KubeSphere</div>
    <p className="font-xl margin-b32">容器化转型第一步，使用 KubeSphere<br/>轻松运维 Kubernetes 集群，加速迈向微服务</p>
    <Link to="/more"><Button type="primary" size="large">了解更多 <img src={next} height={10}/></Button></Link>
  </div>
)

const Banners = () => (
  <Banner>
    <Banner.Item name="page-1" snapshot={bannerBg} ><Page1 /></Banner.Item>
    <Banner.Item name="page-2" snapshot={bannerBg} ><Page1 /></Banner.Item>
    <Banner.Item name="page-3" snapshot={bannerBg} ><Page1 /></Banner.Item>
    <Banner.Item name="page-4" snapshot={bannerBg} ><Page1 /></Banner.Item>
    <Banner.Item name="page-5" snapshot={bannerBg} ><Page1 /></Banner.Item>
    <Banner.Item name="page-6" snapshot={bannerBg} ><Page1 /></Banner.Item>
    <Banner.Item name="page-7" snapshot={bannerBg} ><Page1 /></Banner.Item>
    <Banner.Item name="page-8" snapshot={bannerBg} ><Page1 /></Banner.Item>
  </Banner>
)

const Features = () => (
  <div className="features">
    <div style={{paddingBottom: 100}}>
      <div className="title">
        KubeSphere
      </div>
      <p className="font-thin text-desc">轻松运维 Kubernetes 集群，加速迈向微服务。</p>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 68}}>
        <FeatureCard icon={feature01} title="统一管理" desc="无基础设施依赖，无 Kubernetes 依赖，整合多种云平台，纳管多源 Kubernetes 集群"/>
        <FeatureCard icon={feature02} title="极简体验，向导UI" desc="面向开发、测试、运维友好的 UI ，向导式用户体验，降低 Kubernetes 学习成本的设计理念"/>
        <FeatureCard icon={feature03} title="整体化容器平台解决方案" desc="贯通应用开发、管理，CI/CD，服务治理，发布上线，流量管控等一系列流程"/>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 68}}>
        <FeatureCard icon={feature04} title="松耦合功能模块设计" desc="除提供基于原生 k8s 的管理功能之外，用户可以使用 KubeSphere 集成的诸如镜像仓库、应用仓库，监控、日志模块，也可通过配置的方式集成自建的相关服务"/>
        <FeatureCard icon={feature05} title="安全第一位" desc="多租户、细粒度安全架构设计，并可集成企业中心化用户中心系统"/>
        <FeatureCard icon={feature06} title="商业网络和存储解决方案" desc="除开源解决方案外，如用户对网络和存储有更高要求，可选用青云作为底层平台，可以使用性价比更高的网络和存储解决方案"/>
      </div>
    </div>
    <FeatureSection 
      icon={feature01}
      title="OpenPitrix"
      secondTitle="完整的应用生命周期管理"
      desc="基于开源的 OpenPitrix 项目，提供应用的全生命周期管理，包含开发，测试，发布，升级，下架等应用相关操作，多应用仓库管理，一键部署应用，并可实现版本控制、计费、审计等高级功能。"
      graphic={openpitrix}
    />
    <FeatureSection 
      icon={feature01}
      title="NeoSAN"
      secondTitle="企业级分布式存储 NeonSAN"
      desc="企业级分布式 SAN (NeonSAN) 是基于全闪存架构提供的分布式 SAN 服务，与超高性能型硬盘相比，单盘存储量更大，最大可达到50TB。以可选插件方式整合青云企业级分布式存储 NeonSAN，提供更经济、可靠、高效的存储保证。"
      graphic={openpitrix}
      reverse
    />
    <FeatureSection 
      icon={multipartIcon}
      title="多租户隔离 "
      secondTitle="一个环境,多个团队,完整的多租户模式"
      desc="通过划分不同的企业控件，提供完整的组织架构管理与权限管理，充分提高Kubesphere利用率，同时保持跨资源和工作负载的控制，隔离和访问控制。"
      graphic={multipart}
    />
  </div>
)

const VersionRelease = () => (
  <div className="release">
    <div className="release-wrapper" style={{ backgroundImage: `url(${releaseBg})`}}>
      <div className="release-title">版本发布计划</div>
    </div>
  </div>
)


const Versions = () => (
  <div className="versions">
    <div className="title">获取KubeSphere</div>
    <p className="font-thin text-desc">基于开源社区的整体化解决方案</p>
    <div className="versions-list">
      {
        VERSIONS && VERSIONS.map(version => (
          <VersionCard key={version.title} {...version}/>
        ))
      }
    </div>
  </div>
)

const IndexPage = () => (
  <div>
    <Banners />
    <Features />
    <VersionRelease />
    <Versions />
  </div>
)

export default IndexPage
