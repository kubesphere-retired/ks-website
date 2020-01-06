/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import classnames from 'classnames'
import { withTranslation } from 'react-i18next'

import tippy from 'tippy.js'

import Logo from '../Logo'
import Search from '../Search'

import { ReactComponent as WechatIcon } from '../../assets/wechat.svg'
import { ReactComponent as GroupIcon } from '../../assets/group.svg'
import { ReactComponent as VideoIcon } from '../../assets/video.svg'
import { ReactComponent as SlackIcon } from '../../assets/slack.svg'
import { ReactComponent as SlackColorIcon } from '../../assets/slack-color.svg'
import WechatCode from '../../assets/wechat_code.svg'
import GroupCode from '../../assets/group_code.svg'

import styles from './index.module.scss'

class Footer extends React.Component {
  state = {
    hovered: false,
  }

  componentDidMount() {
    tippy('#wechat', {
      content: document.getElementById('wechat_tip').innerHTML,
      arrow: true,
      arrowType: 'round',
      theme: 'light',
      interactive: true,
    })
    tippy('#group', {
      content: document.getElementById('group_tip').innerHTML,
      arrow: true,
      arrowType: 'round',
      theme: 'light',
      interactive: true,
    })
  }

  handleMouseEnter = () => {
    this.setState({ hovered: true })
  }

  handleMouseLeave = () => {
    this.setState({ hovered: false })
  }

  render() {
    const { className, t, pageContext } = this.props
    const { hovered } = this.state
    return (
      <div className={classnames(styles.footer, className)}>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <div style={{ display: 'inline-block' }}>
              <Logo className={styles.logo} />
              <div className={styles.description}>
                {/* KubeSphere 最新的新闻，文章和动态，直接发送到您的邮箱。 */}
              </div>
              <Search
                className={styles.subscribe}
                searchText={t('Subscribe')}
                placeholder={t('Please input your email')}
                onSearch={this.handleSubscribe}
              />
            </div>
            <div className={styles.links}>
              <ul>
                <li>
                  <div className="h3">{t('Products')}</div>
                  <a href={`/${pageContext.locale}/`}>
                    {t('Community Edition')}
                  </a>
                  <a
                    href="https://appcenter.qingcloud.com/apps/app-cmgbd5k2/KubeSphere%C2%AE%EF%B8%8F%EF%BC%88QKE%EF%BC%89#Introduction"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('QKE')}
                  </a>
                  <a
                    href="https://kubesphere.qingcloud.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('Commercial Service')}
                  </a>
                </li>
                <li>
                  <div className="h3">{t('Related Products')}</div>
                  <a
                    href="https://appcenter.qingcloud.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    AppCenter
                  </a>
                  <a
                    href="https://www.qingcloud.com/products/qingstor-neonsan/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NeonSAN
                  </a>
                  <a
                    href="https://www.qingcloud.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    QingCloud
                  </a>
                  <a
                    href="https://openpitrix.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OpenPitrix
                  </a>
                </li>
                <li>
                  <div className="h3">{t('KubeSphere Docs')}</div>
                  <a
                    href={`/docs/v2.1/${
                      pageContext.locale
                    }/introduction/intro/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('Introduction')}
                  </a>
                  <a
                    href={`/docs/v2.1/${
                      pageContext.locale
                    }/installation/intro/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('Installation')}
                  </a>
                  <a
                    href={`/docs/v2.1/${
                      pageContext.locale
                    }/quick-start/quick-start-guide/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('Tutorial')}
                  </a>
                  <a
                    href={`/docs/v2.1/${
                      pageContext.locale
                    }/api-reference/api-docs/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('API Documentation')}
                  </a>
                </li>
                <li>
                  <div className="h3">{t('About')}</div>
                  <a
                    href="//activity.qingcloud.com/event/kubesphere2019/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('News')}
                  </a>
                  <a
                    href="//www.qingcloud.com/contactus"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('Contact')}
                  </a>
                  <a
                    href="//www.qingcloud.com/jobs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('Careers')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.logos}>
            <WechatIcon id="wechat" className={styles.wechat} />
            <GroupIcon id="group" className={styles.wechat} />
            <a
              href="https://www.youtube.com/channel/UCybIhsLg8P1xzCx97eELiwQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <VideoIcon className={styles.youtube} />
            </a>
            <a
              href="https://join.slack.com/t/kubesphere/shared_invite/enQtNTE3MDIxNzUxNzQ0LTZkNTdkYWNiYTVkMTM5ZThhODY1MjAyZmVlYWEwZmQ3ODQ1NmM1MGVkNWEzZTRhNzk0MzM5MmY4NDc3ZWVhMjE"
              target="_blank"
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              rel="noopener noreferrer"
            >
              {hovered ? <SlackColorIcon /> : <SlackIcon />}
            </a>
          </div>
          <p className={styles.icp}>KubeSphere®️ 2019 All Rights Reserved.</p>
        </div>
        <div id="wechat_tip" style={{ display: 'none' }}>
          <div className={styles.tooltip}>
            <div>{t('Follow the official account')}</div>
            <img src={WechatCode} alt="" />
          </div>
        </div>
        <div id="group_tip" style={{ display: 'none' }}>
          <div className={styles.tooltip}>
            <div>{t('Join the WeChat group')}</div>
            <img src={GroupCode} alt="" />
            <small>进群请备注 “公司 - 姓名”</small>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(Footer)
