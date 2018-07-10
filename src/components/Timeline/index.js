import React from 'react'
import classnames from 'classnames'
import moment from 'moment-mini'
import { translate } from 'react-i18next'

import line from '../../assets/line.svg'

import styles from './index.module.scss'

const Bar = () => (
  <div>
    <div className={styles.topBar} />
    <div className={styles.bottomBar} />
  </div>
)

const Step = ({ t, title, status, time, reverse = false }) => (
  <div
    className={classnames(styles.step, {
      [styles.reverse]: reverse,
      [styles.released]: status === 'Released',
      [styles.coming]: status === 'Coming soon',
    })}
  >
    <span className={styles.stepTitle}>
      {t(title)}
      {status !== 'Released' && (
        <span>
          <br />
          {t(status)}
        </span>
      )}
    </span>
    <img src={line} alt="" />
    <span className={styles.stepTime}>
      {moment(time).format(t('YYYY | MMMM Do'))}
    </span>
  </div>
)

const Timeline = ({ data = [], t }) => {
  return (
    <div className={styles.timeline}>
      <Bar />
      <div
        style={{
          display: 'flex',
          width: 940,
          justifyContent: 'space-around',
          position: 'absolute',
          top: 172,
          transform: 'translateY(-50%)',
        }}
      >
        {data.map(item => <Step key={item.title} t={t} {...item} />)}
      </div>
    </div>
  )
}

export default translate('base')(Timeline)
