import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.module.scss'

class BannerItem extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    snapshot: PropTypes.string.isRequired,
    children: PropTypes.any,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={styles.bannerItem}>
        {children}
      </div>
    );
  }
}

export default BannerItem
