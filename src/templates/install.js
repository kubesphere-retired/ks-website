import React from 'react'
import { translate } from 'react-i18next'
import { navigateTo } from 'gatsby-link'

import { getScrollTop } from '../utils/index'

import Button from '../components/Button/index'
import InstallCard from '../components/Card/Install/index'
import InstallCardSelect from '../components/Card/Install/select'

import { ReactComponent as GithubIcon } from '../assets/icon-git.svg'
import { ReactComponent as NodeIcon } from '../assets/icon-node.svg'
import { ReactComponent as MultiNodeIcon } from '../assets/icon-multi-node.svg'

import '../styles/markdown.scss'
import './b16-tomorrow-dark.scss'
import './index.scss'

const Banner = ({ t }) => (
  <div className="wrapper install-banner text-center">
    <div className="h1">{t('KubeSphere Installation')}</div>
    <p>
      {t(
        'KubeSphere supports both all-in-one and multi-node mode to meet your installation demands. KubeSphere adopts Ansible to realize centralized management configuration on the target machine(s), as well as deployment procedures automation. With pre-configured templates, you are able to pre-configure the deployment procedures by customizing related configuration files before deployment, which means it is able to adapt to different IT environments and help you to deploy KubeSphere in a quick way.'
      )}
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
    title: 'All-in-One deployment',
    desc: 'It‘s only recommended to understand KubeSphere features',
  },
  {
    type: 'multi-node',
    icon: <MultiNodeIcon />,
    title: 'Multi-Node cluster deployment',
    desc:
      'Multi-Node mode allows you to deploy KubeSphere in production environments',
  },
]

const Documents = ({ data, selectCard, selectorRef, onCardChange, i18n }) => {
  const edge = data.allMarkdownRemark.edges.find(
    item =>
      item.node.fields.article === selectCard &&
      item.node.fields.language === i18n.language
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
      <div className="docs-cards-select" ref={selectorRef}>
        <InstallCardSelect
          value={selectCard}
          options={INSTALL_CARDS}
          onChange={onCardChange}
        />
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
  constructor(props) {
    super(props)

    this.state = {
      selectCard: 'all-in-one',
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const scrollTop = getScrollTop()
    const classes = this.selectorRef.classList
    const selectorFixed = classes.contains('selector-fixed')

    if (scrollTop >= 610 && !selectorFixed) {
      classes.add('selector-fixed')
    } else if (scrollTop < 610 && selectorFixed) {
      classes.remove('selector-fixed')
    }
  }

  handleCardChange = e => {
    this.setState({ selectCard: e.currentTarget.dataset.type })
  }

  render() {
    const { selectCard } = this.state
    return (
      <div className="install">
        <Banner {...this.props} />
        <Documents
          {...this.props}
          selectCard={selectCard}
          onCardChange={this.handleCardChange}
          selectorRef={ref => {
            this.selectorRef = ref
          }}
        />
      </div>
    )
  }
}

export default translate('base')(InstallPage)

export const query = graphql`
  query InstallPageQuery($framework: String!) {
    allMarkdownRemark(filter: { fields: { framework: { eq: $framework } } }) {
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
