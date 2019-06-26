/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/index'

import withI18next from '../components/withI18next'
import Button from '../components/Button/index'

import { ReactComponent as GithubIcon } from '../assets/icon-git.svg'

import { OEPN_SOURCE_PROJECTS } from '../data'

import './index.scss'

const ProjectsPage = props => {
  const { t } = props
  return (
    <Layout {...props}>
      <div className="projects">
        <div className="projects-header">
          <div className="projects-title">{t('Open Source Projects')}</div>
          <div className="projects-desc">{t('open_source_projects_desc')}</div>
          <div className="projects-goto-github">
            <a
              href="https://github.com/kubesphere"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="control" size="large">
                <GithubIcon />
                {t('Goto Github')}
              </Button>
            </a>
          </div>
        </div>
        <ul className="projects-cards">
          {OEPN_SOURCE_PROJECTS.map(project => (
            <ProjectCard key={project.name} data={project} />
          ))}
        </ul>
      </div>
    </Layout>
  )
}

const ProjectCard = ({ data }) => (
  <div className="project-card">
    <div className="project-card-icon">
      <img src={`/${data.icon}`} alt="" />
    </div>
    <div className="project-card-title">
      <a
        className="strong"
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {data.name}
      </a>
      <p>{data.desc}</p>
    </div>
    <div className="project-card-link">
      <a href={data.link} target="_blank" rel="noopener noreferrer">
        Github
      </a>
    </div>
  </div>
)

export default withI18next({ ns: 'common' })(ProjectsPage)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
