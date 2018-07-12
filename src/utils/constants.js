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

export const ARCH_FEATURES = [
  {
    title: '微服务',
    features: ['服务治理', '灰度发布', '熔断', '限流', '智能路由'],
  },
  {
    title: 'CI/CD',
    features: ['镜像仓库管理', '镜像迁移', 'Source to image', '安全扫描'],
  },
  { title: '大数据&人工智能', features: [] },
  {
    title: '应用全生命周期管理',
    features: ['应用发布', '应用部署', '版本控制', '计费', '应用仓库管理'],
  },
  {
    title: '监控&日志&告警',
    features: ['系统及服务监控', '系统及服务日志', '告警管理', '多终端提醒'],
  },
  {
    title: '安全',
    features: ['用户管理', '角色管理', 'SSO', '第三方登录认证', '密钥管理'],
  },
]

export const ARCH_BASES = [
  {
    icon: 'bare',
    title: '物理基础设施',
    desc: '物理服务器/裸金属服务器',
  },
  {
    icon: 'vmware',
    title: '虚拟机',
    desc: 'KVM/Vmware',
  },
  {
    icon: 'cloud',
    title: '公有云服务商',
    desc: 'QingCloud',
  },
]

export const PRODUCT_FEATURES = [
  {
    icon: 'workload',
    name: '工作负载',
    desc: '对 k8s 中的多种 workload 提供向导式管理界面，包括 Deployments, Daemon Sets, Stateful Sets, Jobs, CronJobs , Serverless。提供HPA支持即Horizonal Pod Autoscaler，pod 自动扩容/缩容',
  },
  {
    icon: 'service',
    name: '服务&应用路由',
    desc: '基于原生 API，对 k8s 中的服务，应用路由（ingress），以及 istio 中的 微服务治理，熔断，灰度发布，限流，智能路由等功能提供向导式管理界面，同时可以使用插件对接青云的负载均衡器。',
  },
  {
    icon: 'app_manage',
    name: '应用管理',
    desc: '后端使用开源的 OpenPitrix 服务，为 k8s 提供应用全生命周期管理功能，包括： 应用仓库，仓库管理，应用拓扑图，APM，应用变更，发布，审批，版本控制，鲁棒性测试。',
  },
  {
    icon: 'image_manage',
    name: '镜像管理',
    desc: '镜像仓库管理，镜像复制，权限管理，垃圾回收，镜像安全安全扫描。内置的镜像仓库支持高可用。',
  },
  {
    icon: 'monitor',
    name: '监控和告警',
    desc: '可使用内置监控告警模块，也可对接企业自有监控告警系统，提供对主机、容器以及应用服务多维度监控，并提供模板化告警定制服务。内置监控服务支持高可用。',
  },
  {
    icon: 'cicd',
    name: '持续集成和交付',
    desc: '支持可视化CI/CD流水线, 提供从仓库(svn/git)->代码编译->镜像制作->镜像安全->推送到仓库->应用版本->定时构建的端到端流水线设置，支持使用者在开发、测试等环境下的端到端高效流水线能力，整体提升开发测试等工作效率。同时，对于流水线的每个过程, 支持记录完整的日志用以记录集成过程',
  },
  {
    icon: 'log',
    name: '日志管理',
    desc: '可使用内置的日志模块，也可对接企业自有的日志系统，可提供管理类、操作类、审计类日志，可手机容器、应用以及主机日志。内置日志服务支持高可用。',
  },
  {
    icon: 'resource',
    name: '资源管理',
    desc: '提供存储、主机、集群以及配额管理。存储支持主流开源存储解决方案，对于青云平台用户也可对接青云的块存储和 NeonSAN。可批量添加主机，且对主机平台及系统弱依赖。',
  },
]

export const VERSION_COMPATE_HEADS = [
  { icon: '', name: '社区版' },
  { icon: '', name: '易捷版' },
  { icon: '', name: '标准版' },
  { icon: '', name: '企业版' },
]

export const VERSION_COMPARE = [
  {
    group: '工作负载',
    items: [
      { name: '部署', data: [true, true, true, true] },
      { name: '有状态副本', data: [true, true, true, true] },
      { name: '守护进程', data: [true, true, true, true] },
      { name: '任务', data: [false, false, true, true] },
      { name: '定时任务', data: [false, false, true, true] },
      { name: 'HPA Support', data: [false, false, true, true] },
    ]
  },
  {
    group: '服务与应用路由',
    items: [
      { name: '服务', data: [true, true, true, true] },
      { name: '应用路由', data: [true, true, true, true] },
      { name: '微服务治理', data: [false, false, true, true] },
    ]
  },
  {
    group: '存储设备',
    items: [
      { name: 'GlusterFS', data: [true, true, true, true] },
      { name: 'CephRBD', data: [true, true, true, true] },
      { name: 'NFS', data: [true, true, true, true] },
      { name: 'HostPath', data: [true, true, true, true] },
      { name: 'EmptyDir', data: [true, true, true, true] },
      { name: 'QingCloud Block Volume', data: [true, true, true, true] },
      { name: 'QingStor NeonSAN', data: [true, true, true, true] },
    ]
  },
  {
    group: '应用管理',
    items: [
      { name: '应用模板', data: [true, true, true, true] },
      { name: '已部署应用', data: [false, false, true, true] },
      { name: '应用仓库', data: [true, true, true, true] },
      { name: '版本控制', data: [false, false, true, true] },
      { name: '模板生成', data: [false, false, true, true] },
      { name: '应用拓扑', data: [false, false, false, true] },
      { name: 'APM', data: [false, false, false, true] },
      { name: '应用变更', data: [false, false, false, true] },
      { name: '发布', data: [false, false, false, true] },
      { name: '审批', data: [false, false, false, true] },
      { name: '鲁棒测试', data: [false, false, false, true] },
    ]
  },
  {
    group: '镜像管理',
    items: [
      { name: '镜像仓库', data: [true, true, true, true] },
      { name: '镜像复制', data: [false, false, true, true] },
      { name: '权限管理', data: [false, false, true, true] },
      { name: '垃圾回收', data: [false, false, true, true] },
      { name: '安全扫描', data: [false, false, true, true] },
    ]
  },
  {
    group: '监控告警',
    items: [
      { name: '宿主机监控', data: [true, true, true, true] },
      { name: '容器监控', data: [true, true, true, true] },
      { name: '网络监控', data: [false, false, true, true] },
      { name: '告警策略', data: [false, false, true, true] },
      { name: '支持第三方集成', data: [false, false, true, true] },
      { name: '应用模板变更审计', data: [false, false, true, true] },
      { name: '服务链路跟踪', data: [false, false, false, true] },
    ]
  },
  {
    group: '日志',
    items: [
      { name: '系统日志', data: [true, true, true, true] },
      { name: '应用日志', data: [true, true, true, true] },
    ]
  },
  {
    group: '安全',
    items: [
      { name: '账户', data: [true, true, true, true] },
      { name: '角色&权限', data: [true, true, true, true] },
      { name: '多租户', data: [true, true, true, true] },
      { name: '第三方认证', data: [false, false, true, true] },
    ]
  },
  {
    group: '资源管理',
    items: [
      { name: '节点', data: [true, true, true, true] },
      { name: '多集群', data: [false, false, true, true] },
      { name: '联邦集群', data: [false, false, false, true] },
      { name: '存储设备', data: [true, true, true, true] },
    ]
  },
  {
    group: '网络',
    items: [
      { name: 'Calico', data: [true, true, true, true] },
      { name: 'Flannel', data: [true, true, true, true] },
      { name: 'QingCloud CNI', data: [false, false, true, true] },
      { name: 'LB for BareMetal', data: [false, false, true, true] },
    ]
  },
  {
    group: '其它',
    items: [
      { name: '配置中心', data: [false, false, true, true] },
      { name: '高可用', data: [false, false, true, true] },
      { name: '持续集成和交付', data: [false, false, true, true] },
      { name: '人工智能', data: [false, false, false, true] },
      { name: '计量计费', data: [false, false, false, true] },
    ]
  }
]