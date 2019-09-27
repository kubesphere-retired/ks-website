import React, { useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/opensource'
import Groups from '../components/Tags'
import Labels from '../components/Labels'
import VideoModal from '../components/VideoModal'
import Pagination from '../components/Pagination'

import withI18next from '../components/withI18next'

import { ReactComponent as PlayIcon } from '../assets/play.svg'

import VIDEOS from '../data/videos'

import './videos.scss'

const VideosPage = props => {
  const [label, setLabel] = useState('')
  const [group, setGroup] = useState('')
  const [video, setVideo] = useState(null)

  const labels = []
  const groups = []
  VIDEOS.forEach(vi => {
    const _tag = vi.tag
    _tag.split(',').forEach(item => {
      if (!labels.includes(item)) {
        labels.push(item)
      }
    })

    const _group = vi.group
    if (!groups.includes(_group)) {
      groups.push(_group)
    }
  })

  const videos = VIDEOS.filter(vi => {
    if (group !== '' && vi.group !== group) {
      return false
    }

    const tags = vi.tag.split(',')
    if (label !== '' && !tags.includes(label)) {
      return false
    }

    return true
  })

  return (
    <Layout {...props}>
      <div className="wrapper">
        <Groups options={groups} value={group} onChange={setGroup} />
        <Labels options={labels} value={label} onChange={setLabel} />
        <VideoList data={videos} showModal={setVideo} />
        <VideoModal
          isOpen={video !== null}
          data={video}
          onRequestClose={() => setVideo(null)}
        />
      </div>
    </Layout>
  )
}

const VideoList = ({ data, showModal }) => {
  const limit = 12
  const [page, setPage] = useState(1)

  const pagedData = data.slice((page - 1) * limit, page * limit)
  return (
    <>
      <div className="video-list">
        {pagedData.map(item => (
          <VideoItem key={item.title} data={item} onClick={showModal} />
        ))}
      </div>
      <div className="video-pagination">
        <Pagination
          page={page}
          total={data.length}
          limit={limit}
          onPaging={setPage}
        />
      </div>
    </>
  )
}

const VideoItem = ({ data, onClick }) => {
  const handleClick = () => onClick(data)
  return (
    <div key={data.id} className="video-item" onClick={handleClick}>
      {data.snapshot && (
        <img className="video-item-bg" src={data.snapshot} alt="" />
      )}
      <div className="video-item-mask">
        <div className="video-item-play">
          <PlayIcon width={40} height={40} />
        </div>
        <div className="video-item-text">
          <div className="video-item-title">{data.title}</div>
          <div className="video-item-description">
            <span>{data.group}</span>
            <span className="video-item-time">{data.createTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withI18next({ ns: 'common' })(VideosPage)

export const query = graphql`
  query VideosPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
