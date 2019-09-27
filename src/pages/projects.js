import React, { useState } from 'react'
import { graphql } from 'gatsby'
import classnames from 'classnames'

import Layout from '../layouts/opensource'

import withI18next from '../components/withI18next'

import { OEPN_SOURCE_PROJECTS, OPEN_SOURCE_GROUPS } from '../data'

import './projects.scss'

const ProjectsPage = props => {
  const { t } = props
  const [selectedGroup, setGroup] = useState('')
  return (
    <Layout {...props}>
      <div className="wrapper">
        <div className="projects-wrapper">
          <div className="projects-types">
            <ul>
              <li
                className={classnames({
                  'projects-type-selected': selectedGroup === '',
                })}
                onClick={() => setGroup('')}
              >
                {t('Open Source Projects')}
              </li>
              {OPEN_SOURCE_GROUPS.map(group => (
                <li
                  key={group}
                  className={classnames({
                    'projects-type-selected': selectedGroup === group,
                  })}
                  onClick={() => setGroup(group)}
                >
                  {t(group)}
                </li>
              ))}
            </ul>
          </div>
          <ul className="projects-cards">
            {OEPN_SOURCE_PROJECTS.filter(
              project => !selectedGroup || project.group === selectedGroup
            ).map(project => (
              <ProjectCard key={project.name} data={project} />
            ))}
          </ul>
        </div>
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
