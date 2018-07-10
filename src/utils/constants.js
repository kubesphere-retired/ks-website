import versionCommunity from '../assets/version_community.svg'
import versionEnterprise from '../assets/version_enterprise.svg'
import versionExpress from '../assets/version_express.svg'
import versionStandard from '../assets/version_standard.svg'

export const VERSION_RELEASE = [
  { title: 'Community Edition Release', status: 'Released', time: '2018-6-30' },
  {
    title: 'KubeSphere Express',
    status: 'Coming soon',
    time: '2018-8-31',
    reverse: true,
  },
  {
    title: 'KubeSphere Enterprise',
    status: 'Planned release',
    time: '2018-12-31',
  },
]

export const VERSIONS = [
  {
    icon: versionCommunity,
    title: '社区版',
    desc: 'Community Edition',
    features: [
      { text: '可视化图形操作界面', enable: true },
      { text: 'Kubernetes工作负载及集群资源', enable: true },
      { text: '多租户管理及细粒度权限划分', enable: true, highlight: true },
      { text: '微服务治理平台' },
      { text: '应用全生命周期管理' },
      { text: 'DevOps运维平台' },
      { text: ['大数据', '人工智能场景支持'] },
      { text: '高可用' },
      { text: ['多集群管理', '联邦集群'] },
      { text: '第三方登录认证' },
      { text: '专业团队服务支持' },
    ],
    primaryButton: {
      text: '立即下载',
      link: '',
      type: 'primary',
    },
  },
  {
    icon: versionExpress,
    title: '易捷版',
    desc: 'Express Edition',
    features: [
      { text: '可视化图形操作界面', enable: true },
      { text: 'Kubernetes工作负载及集群资源', enable: true },
      { text: '多租户管理及细粒度权限划分', enable: true, highlight: true },
      { text: '微服务治理平台' },
      { text: '应用全生命周期管理' },
      { text: 'DevOps运维平台' },
      { text: ['大数据', '人工智能场景支持'] },
      { text: '高可用' },
      { text: ['多集群管理', '联邦集群'] },
      { text: '第三方登录认证' },
      {
        text: '专业团队服务支持',
        enable: true,
        highlight: true,
        important: true,
      },
    ],
    primaryButton: {
      text: 'Contact Us',
      link: '',
      type: 'primary',
    },
  },
  {
    icon: versionStandard,
    title: '高级版',
    desc: 'Premium Edition',
    features: [
      { text: '可视化图形操作界面', enable: true },
      { text: 'Kubernetes工作负载及集群资源', enable: true },
      { text: '多租户管理及细粒度权限划分', enable: true, highlight: true },
      { text: '微服务治理平台', enable: true, highlight: true },
      { text: '应用全生命周期管理', enable: true, highlight: true },
      { text: 'DevOps运维平台', enable: true, highlight: true },
      { text: ['大数据', '人工智能场景支持'] },
      { text: '高可用', enable: true, highlight: true },
      {
        text: ['多集群管理', '联邦集群'],
        enable: [true, false],
        highlight: [true, false],
      },
      { text: '第三方登录认证', enable: true, highlight: true },
      {
        text: '专业团队服务支持',
        enable: true,
        highlight: true,
        important: true,
      },
    ],
    primaryButton: {
      text: '即将发布',
      link: '',
      type: 'disabled',
    },
  },
  {
    icon: versionEnterprise,
    title: '企业版',
    desc: 'Enterprise Edition',
    features: [
      { text: '可视化图形操作界面', enable: true },
      { text: 'Kubernetes工作负载及集群资源', enable: true },
      { text: '多租户管理及细粒度权限划分', enable: true, highlight: true },
      { text: '微服务治理平台', enable: true, highlight: true },
      { text: '应用全生命周期管理', enable: true, highlight: true },
      { text: 'DevOps运维平台', enable: true, highlight: true },
      {
        text: ['大数据', '人工智能场景支持'],
        enable: [true, true],
        highlight: [true, true],
      },
      { text: '高可用', enable: true, highlight: true },
      {
        text: ['多集群管理', '联邦集群'],
        enable: [true, true],
        highlight: [true, true],
      },
      { text: '第三方登录认证', enable: true, highlight: true },
      {
        text: '专业团队服务支持',
        enable: true,
        highlight: true,
        important: true,
      },
    ],
    primaryButton: {
      text: '敬请期待',
      link: '',
      type: 'disabled',
    },
  },
]

export const NEWS_TYPES = ['enterprise', 'media', 'case']
