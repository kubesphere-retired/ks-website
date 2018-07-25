import React from 'react'
import { translate } from 'react-i18next'

import Button from '../components/Button/index'
import InstallCard from '../components/Card/Install/index'

import { ReactComponent as GithubIcon } from '../assets/icon-git.svg'
import { ReactComponent as NodeIcon } from '../assets/icon-node.svg'
import { ReactComponent as MultiNodeIcon } from '../assets/icon-multi-node.svg'

import '../styles/markdown.scss'
import './b16-tomorrow-dark.css'
import './index.scss'

const Banner = () => (
  <div className="wrapper install-banner text-center">
    <div className="h1">KubeSphere 安装</div>
    <p>
      KubeSphere 部署支持 All-in-one 和 Multi-node 两种部署模式， KubeSphere
      Installer采用 Ansible 对部署目标机器及部署流程进行集中化管理配置。
      采用预配置模板，可以在部署前通过对相关配置文件进行自定义实现对部署过程的预配置，以适应不同的IT环境，帮助您快速部署
      KubeSphere 。
    </p>
    <div style={{ textAlign: 'center' }}>
      <a href="https://github.com/kubesphere/kubesphere" target="_blank">
        <Button type="primary" ghost size="large">
          <GithubIcon />Github
        </Button>
      </a>
    </div>
  </div>
)

const INSTALL_CARDS = [
  {
    type: 'all-in-one',
    icon: <NodeIcon />,
    title: 'All-in-One 单节点部署',
    desc: '仅建议您用来了解 KubeSphere 功能特性',
  },
  {
    type: 'multi-node',
    icon: <MultiNodeIcon />,
    title: 'Multi-Node多节点集群部署',
    desc: 'Multi-Node 模式支持您在生产环境部署 KubeSphere',
  }
]

const Documents = ({ data, selectCard, onCardChange }) => {
  const edge = data.allMarkdownRemark.edges.find(
    item => item.node.fields.article === selectCard
  )

  const selectInstallCard = INSTALL_CARDS.find(card => card.type === selectCard)

  return (
    <div className="docs">
      <div className="docs-cards">
        {INSTALL_CARDS.map(card => (
          <InstallCard
            className="docs-card"
            {...card}
            key={card.type}
            onClick={onCardChange}
            selected={selectCard === card.type}
          />
        ))}
      </div>
      {selectInstallCard && (
        <div className="select-icon">{selectInstallCard.icon}</div>
      )}
      <div
        className="markdown md-body"
        dangerouslySetInnerHTML={{
          __html: edge.node.html,
        }}
      />
    </div>
  )
}

class InstallPage extends React.Component {
  state = {
    selectCard: 'all-in-one',
  }

  handleCardChange = e => {
    this.setState({ selectCard: e.currentTarget.dataset.type })
  }

  render() {
    const { selectCard } = this.state
    return (
      <div className="install">
        <Banner />
        <Documents
          {...this.props}
          selectCard={selectCard}
          onCardChange={this.handleCardChange}
        />
      </div>
    )
  }
}

export default translate('base')(InstallPage)

export const query = graphql`
  query InstallPageQuery($framework: String!, $language: String!) {
    allMarkdownRemark(
      filter: {
        fields: { framework: { eq: $framework }, language: { eq: $language } }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
            framework
            language
            article
          }
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
`
