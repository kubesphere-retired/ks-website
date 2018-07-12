import React from 'react'
import { translate } from 'react-i18next'

import ArchCard from '../components/ArchCard/index'
import FeatureList from '../components/FeatureList/index'
import VersionCompare from '../components/VersionCompare/index'

import { ARCH_FEATURES, PRODUCT_FEATURES, VERSION_COMPARE, VERSION_COMPATE_HEADS } from '../utils/constants'

import Logo from '../assets/logo.svg'
import Cloud from '../assets/cloud.svg'
import Gluster from '../assets/gluster.svg'
import Laptop from '../assets/laptop.svg'
import Network from '../assets/network.svg'
import K8s from '../assets/k8s.svg'
import Volume from '../assets/volume.svg'

import './index.scss'


const Banner = ({ t }) => (
  <div className="product-banner wrapper">
    <div className="product-title">{t('What is KubeSphere')}</div>
    <p className="product-desc">KubeSphere 是在目前主流容器调度平台 Kubernetes 之上构建的企业级分布式多租户容器管理平台，提供简单易用的操作界面以及向导式操作方式，在降低用户使用容器调度平台学习成本的同时，极大减轻开发、测试、运维的日常工作的复杂度，除此之外，平台整合并优化了多个适用于容器场景的功能模块，以帮助企业轻松应对服务治理、CI/CD、应用管理、监控日志、大数据、人工智能以及IAM等复杂业务场景，快速构建完整容器平台运维生态链条。</p>
  </div>
)

const Nav = ({ t }) => (
  <ul className="product-nav">
    <li><a href="#architecture">{t('Product Architecture')}</a></li>
    <li><a href="#features">{t('Product Features')}</a></li>
    <li><a href="#version">{t('Version Comparison')}</a></li>
  </ul>
)

const Architecture = ({ t }) => (
  <section id="architecture">
  <div className="wrapper">
    <div className="title">{t('Product Architecture')}</div>
      <div className="archi">
        <div className="archi-left">
          <div className="archi-features">
            {
              ARCH_FEATURES && ARCH_FEATURES.map(feature => (
                <ArchCard key={feature.title} {...feature}/>
              ))
            }
          </div>
          <div className="archi-kube">
            <div className="archi-kube-wrapper">
              <img src={Logo} alt=""/>
              <div>
                <div className="archi-kube-box">
                  <img src={Network} alt="" />
                  <div className="archi-kube-text">
                    <div className="h4">网络</div>
                    <p>Calico/Flannel/</p>
                    <p>QingCloud HostNIC</p>
                  </div>
                </div>
                <div className="archi-kube-box" style={{padding: '8px 20px'}}>
                  <div className="archi-kube-imgs">
                    <img src={K8s} alt="" />
                    <img src={K8s} alt="" />
                    <img src={K8s} alt="" />
                  </div>
                  <div className="archi-kube-bottom-title">kubernetes集群</div>
                </div>
                <div className="archi-kube-box" style={{padding: '17px 7px 17px 11px'}}>
                  <img src={Volume} alt="" style={{marginRight: 10}}/>
                  <div className="archi-kube-text">
                    <div className="h4" style={{marginBottom: 6}}>存储</div>
                    <p>分布式存储/主机存储/块存储</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="archi-base">
            <div className="archi-base-box">
              <img src={Gluster} alt="" />
              <div className="archi-base-text">
                <div className="h4">物理基础设施</div>
                <p>物理服务器/裸金属服务器</p>
              </div>
            </div>
            <div className="archi-base-box">
              <img src={Laptop} alt="" />
              <div className="archi-base-text">
                <div className="h4">虚拟机</div>
                <p>KVM/Vmware</p>
              </div>
            </div>
            <div className="archi-base-box">
              <img src={Cloud} alt=""/>
              <div className="archi-base-text">
                <div className="h4">公有云服务商</div>
                <p>QingCloud</p>
              </div>
            </div>
          </div>
        </div>
        <div className="archi-right">
          <div className="archi-layer">
            <div className="h3">● 分布式容器调度管理平台</div>
            <p>KubeSphere 部署在 Kubernetes之上，采用无侵入式 api 调用，整合 Kubernetes 各种资源以及容器调度能力，同时，或集成、或改善、或自研多个上游功能模块，为企业用户提供一揽子容器平台解决方案，满足微服务、自动化运维、持续集成等诸多业务场景。</p>
          </div>
          <div className="archi-layer">
            <div className="h3">● 容器调度层</div>
            <p>Kubernetes 基于底层的基础设施去构建自己的虚拟化分布式容器运行环境，并使用各种开源插件在其上构建自己的二次虚拟化网络和存储，某些云厂商，比如青云，基于其自身提供的插件，可以帮容器达成：诸如容器直接挂载 SDN 网卡、使用平台的块存储或者分布式存储的能力</p>
          </div>
          <div className="archi-layer">
            <div className="h3">● 基础设施层</div>
            <p>这一层主要提供的是计算、存储、网络通信等能力，KubeSphere 或者说 Kubernetes 并没有对这一层有十分严格的依赖限制，可以是物理主机，也可以是kvm等类型的虚拟主机，主要保证操作系统支持某种容器运行时环境，比如Docker，或者rkt，另外主机之间网络可通即可</p>
          </div>
        </div>
      </div>
  </div>
    
  </section>
)

const Features = ({ t }) => (
  <section id="features">
    <div className="title">{t('Product Features')}</div>
    <p className="text-desc font-thin ">整合并优化了多个适用于容器场景的功能模块，以帮助企业快速构建完整容器平台运维生态链条</p>
    <div className="wrapper">
      <FeatureList className="product-features" data={PRODUCT_FEATURES}/>
    </div>
  </section>
)

const Version = ({ t }) => (
  <section id="version">
    <div className="title">{t('Version Comparison')}</div>
    <div className="wrapper version-compare">
      <VersionCompare data={VERSION_COMPARE} theads={VERSION_COMPATE_HEADS}/>
    </div>
  </section>
)

const IndexPage = props => (
  <div className="product">
    <Banner {...props} />
    <Nav {...props}/>
    <Architecture {...props}/>
    <Features {...props}/>
    <Version {...props}/>
  </div>
)

export default translate('base')(IndexPage)
