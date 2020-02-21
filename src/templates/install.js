import React from 'react'
import Helmet from 'react-helmet'

import { graphql } from 'gatsby'

import { getScrollTop, getLanguage } from '../utils/index'

import Layout from '../layouts/index'
import withI18next from '../components/withI18next'
import Button from '../components/Button/index'
import InstallCard from '../components/Card/Install/index'
import InstallCardSelect from '../components/Card/Install/select'

import { ReactComponent as GithubIcon } from '../assets/icon-git.svg'
import { ReactComponent as NodeIcon } from '../assets/icon-node.svg'
import { ReactComponent as MultiNodeIcon } from '../assets/icon-multi-node.svg'

import '../styles/markdown.scss'
import './b16-tomorrow-dark.scss'
import './install.scss'

const Banner = ({ t }) => (
  <div className="wrapper install-banner text-center">
    <div className="h1">{t('KubeSphere Installation')}</div>
    <p>
      {t(
        'In addition to supporting deploy on VM and BM, KubeSphere also supports installing on cloud-hosted and on-premises Kubernetes clusters. For more details please reference the documentation center.'
      )}
    </p>
    <div style={{ textAlign: 'center' }}>
      <a
        href="https://github.com/kubesphere/kubesphere"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button type="primary" ghost size="large">
          <GithubIcon />
          Github
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
    desc:
      'All-in-One is single-node installation that supports one-click installation',
  },
  {
    type: 'kubesphere-on-k8s',
    icon: <MultiNodeIcon />,
    title: 'Install KubeSphere on K8s',
    desc:
      'KubeSphere supports installing on existing Kubernetes',
  },
]

const Documents = ({
  data,
  selectCard,
  selectorRef,
  onCardChange,
  pageContext: { locale },
}) => {
  const edge = data.allMarkdownRemark.edges.find(
    item =>
      item.node.fields.article === selectCard &&
      item.node.fields.language === getLanguage(locale)
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
    this.$docs = document.getElementsByClassName('docs')[0]
    document.addEventListener('scroll', this.handleScroll)
    this.setLinkTargetBlank()
  }

  componentDidUpdate() {
    this.setLinkTargetBlank()
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  setLinkTargetBlank() {
    const $links = document.querySelectorAll('.md-body a')
    Array.prototype.forEach.call($links, el => {
      el.setAttribute('target', '_blank')
    })
  }

  handleScroll = () => {
    const scrollTop = getScrollTop()
    const classes = this.selectorRef.classList
    const selectorFixed = classes.contains('selector-fixed')

    if (scrollTop >= 610 && !selectorFixed) {
      classes.add('selector-fixed')
      this.$docs.style.paddingTop = "100px"
    } else if (scrollTop < 610 && selectorFixed) {
      classes.remove('selector-fixed')
      this.$docs.style.paddingTop = "0"
    }
  }

  handleCardChange = e => {
    this.setState({ selectCard: e.currentTarget.dataset.type })
  }

  render() {
    const { selectCard } = this.state
    const { t } = this.props
    const siteMetadata = this.props.data.site.siteMetadata
    siteMetadata.title = `${t('KubeSphere Installation')} - ${siteMetadata.title}`
    return (
      <Layout {...this.props}>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/asciinema-player.css" />
          <script src="/asciinema-player.js" />
        </Helmet>
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
      </Layout>
    )
  }
}

export default withI18next({ ns: 'common' })(InstallPage)

export const query = graphql`
  query InstallPageQuery($framework: String!) {
    site {
      siteMetadata {
        title
      }
    }
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
